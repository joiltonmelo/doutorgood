
-- Atualizar política para permitir que qualquer usuário crie mensagens de suporte
-- (não apenas profissionais autenticados)
DROP POLICY IF EXISTS "Professionals can create messages" ON public.support_messages;

CREATE POLICY "Anyone can create support messages"
  ON public.support_messages
  FOR INSERT
  WITH CHECK (true);

-- Criar policy para permitir inserção de mensagens sem autenticação
DROP POLICY IF EXISTS "Public can create messages" ON public.support_messages;

CREATE POLICY "Public can create messages"
  ON public.support_messages
  FOR INSERT
  WITH CHECK (true);
