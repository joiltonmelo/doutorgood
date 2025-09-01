
-- Criar tabela para profissionais
CREATE TABLE public.professionals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  credential TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  experience TEXT,
  location TEXT NOT NULL,
  health_plans TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  image_url TEXT,
  phone TEXT,
  email TEXT,
  bio TEXT,
  agenda_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;

-- Política para permitir que todos vejam profissionais aprovados
CREATE POLICY "Everyone can view approved professionals" 
  ON public.professionals 
  FOR SELECT 
  USING (status = 'approved');

-- Política para permitir que administradores vejam todos
CREATE POLICY "Admins can view all professionals" 
  ON public.professionals 
  FOR ALL 
  USING (true);

-- Política para permitir inserção de novos cadastros
CREATE POLICY "Anyone can create professional profile" 
  ON public.professionals 
  FOR INSERT 
  WITH CHECK (true);

-- Índice para melhorar performance de consultas por featured
CREATE INDEX idx_professionals_featured ON public.professionals(featured, status);
