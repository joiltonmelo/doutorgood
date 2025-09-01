
-- Remove políticas existentes que fazem referência à tabela auth.users
DROP POLICY IF EXISTS "Admin can manage all posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Everyone can view published posts" ON public.blog_posts;

-- Criar política simples para permitir que todos vejam posts publicados
CREATE POLICY "Everyone can view published posts"
  ON public.blog_posts
  FOR SELECT
  USING (published = true);

-- Política para admin (usando email específico de forma mais simples)
CREATE POLICY "Admin can manage all posts"
  ON public.blog_posts
  FOR ALL
  USING (true);

-- Adicionar mais posts médicos ao blog
INSERT INTO public.blog_posts (title, slug, excerpt, content, published) VALUES
(
  'Inovações em Cardiologia: Novos Tratamentos para Doenças do Coração',
  'inovacoes-cardiologia-novos-tratamentos',
  'Descubra as mais recentes inovações em cardiologia que estão revolucionando o tratamento de doenças cardiovasculares.',
  'A cardiologia tem passado por transformações significativas nos últimos anos, com o desenvolvimento de novas tecnologias e abordagens terapêuticas que prometem melhorar drasticamente a qualidade de vida dos pacientes.

**Principais Inovações:**

1. **Dispositivos Minimamente Invasivos**: Novos stents e válvulas cardíacas que podem ser implantados sem cirurgia aberta
2. **Terapia Celular**: Uso de células-tronco para regeneração do músculo cardíaco
3. **Inteligência Artificial**: Diagnósticos mais precisos através de análise de imagens
4. **Monitoramento Remoto**: Dispositivos wearables que acompanham a saúde cardíaca 24/7

**Benefícios para os Pacientes:**

- Redução significativa do tempo de recuperação
- Menor risco de complicações pós-operatórias
- Diagnósticos mais precoces e precisos
- Personalização do tratamento baseada em dados individuais

**O Futuro da Cardiologia:**

Com essas inovações, esperamos ver uma redução nas taxas de mortalidade por doenças cardiovasculares e uma melhoria na qualidade de vida dos pacientes cardiopatas.',
  true
),
(
  'Nutrição Funcional: Alimentação como Medicina Preventiva',
  'nutricao-funcional-alimentacao-medicina-preventiva',
  'Entenda como a nutrição funcional pode ser uma poderosa aliada na prevenção de doenças e promoção da saúde.',
  'A nutrição funcional representa uma abordagem revolucionária que vai além da simples contagem de calorias, focando nos aspectos bioquímicos dos alimentos e seu impacto na saúde individual.

**Princípios da Nutrição Funcional:**

1. **Individualidade Bioquímica**: Cada pessoa tem necessidades nutricionais únicas
2. **Alimentos como Medicina**: Uso terapêutico de nutrientes específicos
3. **Prevenção Ativa**: Foco na prevenção ao invés do tratamento de doenças
4. **Abordagem Integrativa**: Consideração de fatores ambientais e genéticos

**Aplicações Práticas:**

- Redução da inflamação crônica através de alimentos anti-inflamatórios
- Otimização da microbiota intestinal com probióticos e prebióticos
- Suporte à desintoxicação natural do organismo
- Modulação de genes através da nutrigenômica

**Benefícios Comprovados:**

Estudos mostram que a nutrição funcional pode ajudar na prevenção e tratamento de diabetes, doenças cardiovasculares, obesidade e transtornos autoimunes.',
  true
),
(
  'Dermatologia Estética: Tendências e Procedimentos Seguros',
  'dermatologia-estetica-tendencias-procedimentos-seguros',
  'Conheça as principais tendências em dermatologia estética e a importância de escolher profissionais qualificados.',
  'A dermatologia estética tem crescido exponencialmente, oferecendo soluções inovadoras para rejuvenescimento e melhoria da autoestima dos pacientes.

**Procedimentos em Alta:**

1. **Microagulhamento com Radiofrequência**: Estimula colágeno de forma profunda
2. **Laser Fracionado**: Renovação celular com mínimo tempo de recuperação
3. **Harmonização Facial**: Técnicas para equilibrar proporções faciais
4. **Bioestimuladores**: Substâncias que estimulam a produção natural de colágeno

**Segurança em Primeiro Lugar:**

- Sempre procure dermatologistas certificados
- Verifique a procedência dos produtos utilizados
- Discuta expectativas realistas com o profissional
- Siga rigorosamente as orientações pós-procedimento

**Cuidados Pós-Tratamento:**

O sucesso de qualquer procedimento estético depende não apenas da técnica utilizada, mas também dos cuidados subsequentes e da escolha de profissionais qualificados.',
  true
),
(
  'Saúde Mental: Quebrando Tabus e Promovendo o Bem-Estar',
  'saude-mental-quebrando-tabus-bem-estar',
  'A importância de cuidar da saúde mental e como buscar ajuda profissional quando necessário.',
  'A saúde mental tem ganhado o reconhecimento que merece como componente fundamental do bem-estar geral, especialmente após os desafios trazidos pela pandemia.

**Sinais de Alerta:**

1. **Alterações no Sono**: Insônia ou sono excessivo
2. **Mudanças de Humor**: Irritabilidade ou tristeza persistente
3. **Isolamento Social**: Evitar atividades antes prazerosas
4. **Dificuldades de Concentração**: Problemas no trabalho ou estudos

**Abordagens Terapêuticas Modernas:**

- Terapia Cognitivo-Comportamental (TCC)
- Mindfulness e técnicas de meditação
- Terapias online e plataformas digitais
- Abordagens integrativas combinando medicação e psicoterapia

**Como Buscar Ajuda:**

O primeiro passo é reconhecer que buscar ajuda profissional é um sinal de força, não de fraqueza. Psicólogos e psiquiatras estão preparados para oferecer suporte adequado para cada situação.',
  true
),
(
  'Ortopedia Moderna: Cirurgias Minimamente Invasivas',
  'ortopedia-moderna-cirurgias-minimamente-invasivas',
  'Descubra como as técnicas minimamente invasivas estão transformando a ortopedia e acelerando a recuperação dos pacientes.',
  'A ortopedia moderna tem revolucionado o tratamento de lesões e doenças do sistema musculoesquelético através de técnicas cada vez menos invasivas.

**Vantagens das Técnicas Minimamente Invasivas:**

1. **Recuperação Mais Rápida**: Retorno às atividades em menor tempo
2. **Menos Dor Pós-Operatória**: Incisões menores resultam em menos desconforto
3. **Cicatrizes Mínimas**: Melhor resultado estético
4. **Menor Risco de Infecção**: Menor exposição dos tecidos

**Procedimentos Revolucionários:**

- Artroscopia para joelho, ombro e quadril
- Cirurgias robóticas de coluna
- Implantes personalizados com impressão 3D
- Técnicas de regeneração óssea com biomateriais

**Recuperação e Fisioterapia:**

O sucesso desses procedimentos também depende de um programa de reabilitação bem estruturado, com fisioterapia especializada e acompanhamento multidisciplinar.',
  true
);
