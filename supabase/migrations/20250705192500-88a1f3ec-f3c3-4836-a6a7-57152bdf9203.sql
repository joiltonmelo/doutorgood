
-- Add education and working_hours columns to the professionals table
ALTER TABLE public.professionals 
ADD COLUMN education TEXT,
ADD COLUMN working_hours TEXT;
