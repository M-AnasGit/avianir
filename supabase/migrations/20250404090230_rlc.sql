ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only auth users can insert avatars"
ON storage.objects
FOR INSERT
WITH CHECK (
  auth.role() = 'authenticated' AND bucket_id = 'avatars'
);
