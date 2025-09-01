
-- Adicionar coluna user_id na tabela professionals para vincular ao auth.users
ALTER TABLE public.professionals 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Criar índice para melhor performance
CREATE INDEX idx_professionals_user_id ON public.professionals(user_id);

-- Policy para médicos verem apenas seus próprios dados
CREATE POLICY "Professionals can view their own data" 
  ON public.professionals 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Policy para médicos editarem apenas seus próprios dados
CREATE POLICY "Professionals can update their own data" 
  ON public.professionals 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Policy para admins verem todos os dados (usando o email específico do admin)
CREATE POLICY "Admin can view all professionals" 
  ON public.professionals 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'joiltonvetor@gmail.com'
    )
  );
