
-- Criar tabela para mensagens do chat de suporte
CREATE TABLE public.support_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  professional_id UUID REFERENCES public.professionals(id) ON DELETE CASCADE,
  professional_name TEXT NOT NULL,
  professional_email TEXT NOT NULL,
  message TEXT NOT NULL,
  admin_reply TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  replied_at TIMESTAMP WITH TIME ZONE
);

-- Criar tabela para posts do blog
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Equipe Doutor GO',
  featured_image TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS para mensagens de suporte
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;

-- Política para profissionais verem suas próprias mensagens
CREATE POLICY "Professionals can view their own messages"
  ON public.support_messages
  FOR SELECT
  USING (professional_id IN (
    SELECT id FROM public.professionals WHERE user_id = auth.uid()
  ));

-- Política para profissionais criarem mensagens
CREATE POLICY "Professionals can create messages"
  ON public.support_messages
  FOR INSERT
  WITH CHECK (professional_id IN (
    SELECT id FROM public.professionals WHERE user_id = auth.uid()
  ));

-- Política para admin ver todas as mensagens
CREATE POLICY "Admin can view all messages"
  ON public.support_messages
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() AND email = 'joiltonvetor@gmail.com'
  ));

-- RLS para posts do blog
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Política para todos verem posts publicados
CREATE POLICY "Everyone can view published posts"
  ON public.blog_posts
  FOR SELECT
  USING (published = true);

-- Política para admin gerenciar posts
CREATE POLICY "Admin can manage all posts"
  ON public.blog_posts
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() AND email = 'joiltonvetor@gmail.com'
  ));

-- Inserir alguns posts de exemplo
INSERT INTO public.blog_posts (title, slug, excerpt, content, published) VALUES
(
  'Telemedicina: O Futuro da Consulta Médica',
  'telemedicina-futuro-consulta-medica',
  'Descubra como a telemedicina está revolucionando o atendimento médico e facilitando o acesso aos cuidados de saúde.',
  'A telemedicina representa uma das maiores inovações na área da saúde dos últimos anos. Com a possibilidade de realizar consultas médicas à distância, pacientes e profissionais da saúde descobriram uma nova forma de se conectar, especialmente após a pandemia de COVID-19.

**Vantagens da Telemedicina:**

1. **Acessibilidade**: Pacientes em áreas remotas podem ter acesso a especialistas
2. **Conveniência**: Reduz deslocamentos e tempo de espera
3. **Eficiência**: Otimiza a agenda dos profissionais
4. **Segurança**: Reduz exposição a doenças contagiosas

**Como Funciona no Doutor GO:**

Nossa plataforma facilita a conexão entre pacientes e profissionais, oferecendo ferramentas para agendamento e comunicação segura. Os médicos cadastrados podem oferecer tanto consultas presenciais quanto online.

**O Futuro da Medicina Digital:**

Com o avanço da tecnologia, esperamos ver ainda mais inovações, como uso de inteligência artificial para diagnósticos preliminares e monitoramento remoto de pacientes crônicos.',
  true
),
(
  'Importância da Prevenção na Medicina Moderna',
  'importancia-prevencao-medicina-moderna',
  'Entenda por que a medicina preventiva é fundamental para uma vida mais saudável e como ela pode reduzir custos com tratamentos.',
  'A medicina preventiva tem ganhado cada vez mais destaque no cenário atual da saúde. Focada em evitar doenças antes que elas se manifestem, essa abordagem representa uma mudança de paradigma importante.

**Principais Pilares da Medicina Preventiva:**

1. **Exames Regulares**: Check-ups periódicos para detecção precoce
2. **Vacinação**: Imunização contra doenças evitáveis
3. **Estilo de Vida Saudável**: Alimentação equilibrada e exercícios
4. **Acompanhamento Médico**: Monitoramento contínuo da saúde

**Benefícios da Prevenção:**

- Redução significativa de custos com tratamentos
- Melhor qualidade de vida
- Detecção precoce de doenças graves
- Menor necessidade de internações

**Como o Doutor GO Apoia a Prevenção:**

Nossa plataforma conecta você aos melhores profissionais preventivos, facilitando o agendamento de consultas regulares e acompanhamento médico personalizado.',
  true
),
(
  'Especialidades Médicas em Alta Demanda',
  'especialidades-medicas-alta-demanda',
  'Conheça as especialidades médicas que mais crescem e como encontrar os melhores profissionais em cada área.',
  'O campo da medicina está em constante evolução, com algumas especialidades ganhando destaque devido às mudanças no perfil epidemiológico e nas necessidades da população.

**Especialidades em Crescimento:**

1. **Geriatria**: Com o envelhecimento populacional
2. **Psiquiatria**: Crescente atenção à saúde mental
3. **Dermatologia**: Aumento da preocupação estética
4. **Endocrinologia**: Epidemia de diabetes e obesidade

**Como Escolher o Especialista Certo:**

- Verifique as credenciais e especializações
- Leia avaliações de outros pacientes
- Considere a localização e disponibilidade
- Avalie a compatibilidade pessoal

**Doutor GO e as Especialidades:**

Nossa plataforma oferece acesso a profissionais de todas as especialidades, com filtros de busca que facilitam encontrar exatamente o que você precisa.',
  true
);
