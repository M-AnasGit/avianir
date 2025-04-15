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
CREATE INDEX IF NOT EXISTS idx_user_public_id ON public.user (public_id);

CREATE TABLE IF NOT EXISTS public.course (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_id UUID REFERENCES public.user(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.chapter (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    course_id UUID REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    size INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_id UUID REFERENCES public.user(id) ON DELETE CASCADE
);

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

CREATE POLICY course_details_dev_policy
ON storage.objects
FOR ALL
USING (bucket_id = 'course_details');


