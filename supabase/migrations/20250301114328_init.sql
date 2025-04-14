CREATE TABLE IF NOT EXISTS public.user (
    id UUID PRIMARY KEY NOT NULL REFERENCES auth.users,
    public_id UUID DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    pfp TEXT DEFAULT NULL,
    tokens_used INT DEFAULT 0,
    subscription_plan TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS course (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_id UUID REFERENCES public.user(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS chapter (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    course_id UUID REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    size INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_id UUID REFERENCES public.user(id) ON DELETE CASCADE
);

CREATE OR REPLACE VIEW course_chapters AS
SELECT
    c.id AS course_id,
    c.name AS course_name,
    c.created_at AS course_created_at,
    c.updated_at AS course_updated_at,
    c.user_id AS user_id,
    jsonb_agg(
        jsonb_build_object(
            'chapter_id', ch.id,
            'chapter_name', ch.name,
            'chapter_created_at', ch.created_at,
            'chapter_updated_at', ch.updated_at
        )
    ) AS chapters
FROM
    course c
LEFT JOIN
    chapter ch ON c.id = ch.course_id
GROUP BY
    c.id, c.name, c.created_at, c.updated_at, c.user_id;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ 
DECLARE 
    tbl_name TEXT;
BEGIN
    FOR tbl_name IN 
        (SELECT table_name 
         FROM information_schema.tables 
         WHERE table_schema = 'public'
         AND table_type = 'BASE TABLE') 
    LOOP
        EXECUTE format(
            'CREATE TRIGGER set_timestamp 
            BEFORE UPDATE ON %I 
            FOR EACH ROW 
            EXECUTE FUNCTION update_updated_at_column();', 
            tbl_name
        );
    END LOOP;
END $$;

-- CREATE POLICY course_details_dev_policy
-- ON storage.objects
-- FOR ALL
-- USING (bucket_id = 'course_details');

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.user (id, name, subscription_plan)
  values (new.id, new.raw_user_meta_data ->> 'name', 'free');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

CREATE OR REPLACE FUNCTION public.purge_old_users()
RETURNS void
LANGUAGE sql
AS $$
  DELETE FROM public.user
  WHERE deleted_at IS NOT NULL
    AND deleted_at < now() - interval '30 days';
$$;

-- Uncomment below if you're using Supabase cron jobs (in prod)

-- SELECT cron.schedule(
--   'purge_old_users_job',
--   '0 3 * * *',  -- daily at 3 AM UTC
--   $$SELECT public.purge_old_users();$$
-- );
