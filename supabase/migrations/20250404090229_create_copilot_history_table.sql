CREATE TABLE IF NOT EXISTS public.copilot_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prompt TEXT NOT NULL,
    response JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    course_id UUID REFERENCES public.course(id) ON DELETE CASCADE
);
