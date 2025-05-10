---------User-----------------
CREATE OR REPLACE VIEW public.user_public AS
SELECT 
  public_id,
  name,
  avatar,
  created_at
FROM public.user
WHERE deleted_at IS NULL;

CREATE OR REPLACE VIEW public.user_private AS
SELECT 
  u.*,
  a.email,
  a.last_sign_in_at
FROM public.user u
JOIN auth.users a ON u.id = a.id
WHERE a.deleted_at IS NULL;

ALTER TABLE public.user ENABLE ROW LEVEL SECURITY;

-- Public can only see public view
CREATE POLICY select_public_user_policy ON public.user
FOR SELECT USING (
  deleted_at IS NULL
);

-- Authenticated users can see their full private data
CREATE POLICY select_private_user_policy ON public.user
FOR SELECT USING (
  auth.uid() = id AND deleted_at IS NULL
);

-- Users can only update their own records
CREATE POLICY update_user_policy ON public.user
FOR UPDATE USING (
  auth.uid() = id AND deleted_at IS NULL
) WITH CHECK (
  auth.uid() = id AND deleted_at IS NULL
);

-- Users can only soft-delete their own accounts
CREATE POLICY delete_user_policy ON public.user
FOR UPDATE USING (
  auth.uid() = id AND deleted_at IS NULL
) WITH CHECK (
  auth.uid() = id AND deleted_at IS NULL
);

----------------Course------------------

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