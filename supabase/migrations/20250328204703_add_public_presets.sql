CREATE TABLE IF NOT EXISTS public.public_presets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    globalStyle BOOLEAN DEFAULT TRUE,
    type TEXT NOT NULL,
    content JSONB DEFAULT NULL,
    formContent JSONB DEFAULT NULL,
    stylePerDevice JSONB DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_id UUID REFERENCES public.user(id) ON DELETE CASCADE
);

CREATE VIEW public.public_presets_view AS
SELECT
    pp.*,
    u.name AS user_name
FROM
    public.public_presets pp
JOIN
    public.user u ON pp.user_id = u.id;