--verified-user-only
CREATE OR REPLACE FUNCTION public.handle_verified_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL THEN
    INSERT INTO public.user (id, name, subscription_plan, auth_provider)
    VALUES (
        NEW.id, 
        NEW.raw_user_meta_data->>'name',
        'free',
        NEW.raw_app_meta_data->>'provider'
    );
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_verified
AFTER UPDATE OF email_confirmed_at ON auth.users
FOR EACH ROW
WHEN (NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL)
EXECUTE PROCEDURE public.handle_verified_user();

--soft-delete unverified users
CREATE OR REPLACE FUNCTION public.purge_unverified_users()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM auth.users
  WHERE 
    email_confirmed_at IS NULL 
    AND created_at < (NOW() - INTERVAL '10 minutes');
END;
$$;

CREATE OR REPLACE FUNCTION public.purge_old_users()
RETURNS void
LANGUAGE sql
AS $$
  DELETE FROM public.user
  WHERE deleted_at IS NOT NULL
    AND deleted_at < now() - interval '30 days';
$$;

-- SELECT cron.schedule(
--   'purge_unverified_users_job',
--   '* * * * *',
--   $$SELECT public.purge_unverified_users();$$
-- );