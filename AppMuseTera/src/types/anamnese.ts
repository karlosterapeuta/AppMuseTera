export interface AnamneseQuestion {
  id: string
  question: string
  type: 'single' | 'multiple' | 'text' | 'date'
  options?: string[]
  category: 'dados_pessoais' | 'historia_musical' | 'desenvolvimento' | 'comportamento' | 'saude' | 'social' | 'preferencias_musicais'
}

export const ANAMNESE_QUESTIONS: AnamneseQuestion[] = [
  // Dados Pessoais e Familiares
  {
    id: 'responsavel',
    question: 'Responsável Legal',
    type: 'text',
    category: 'dados_pessoais'
  },
  {
    id: 'parentesco',
    question: 'Vínculo Familiar',
    type: 'text',
    category: 'dados_pessoais'
  },
  {
    id: 'encaminhamento',
    question: 'Profissional/Instituição Encaminhadora',
    type: 'text',
    category: 'dados_pessoais'
  },
  {
    id: 'queixa_principal',
    question: 'Demanda Clínica Principal',
    type: 'text',
    category: 'dados_pessoais'
  },

  // História Musical
  {
    id: 'experiencia_musical',
    question: 'Histórico de Experiências Musicais',
    type: 'multiple',
    options: [
      'Educação Musical Formal',
      'Expressão Vocal Espontânea',
      'Prática Instrumental',
      'Participação em Atividades Corais',
      'Expressão Corporal-Musical',
      'Sem Experiência Musical Prévia'
    ],
    category: 'historia_musical'
  },
  {
    id: 'musica_em_casa',
    question: 'Comportamento Musical no Ambiente Domiciliar',
    type: 'multiple',
    options: [
      'Escuta Musical Ativa',
      'Expressão Vocal Espontânea',
      'Expressão Corporal-Musical',
      'Exploração Instrumental',
      'Responsividade a Estímulos Sonoros',
      'Reatividade Sonora Adversa'
    ],
    category: 'historia_musical'
  },
  {
    id: 'preferencias_musicais',
    question: 'Preferências e Identidade Musical',
    type: 'multiple',
    options: [
      'Repertório Infantil',
      'Música Popular Brasileira',
      'Gênero Rock',
      'Música Sertaneja',
      'Música Sacra/Gospel',
      'Música Erudita',
      'Outros Gêneros Musicais'
    ],
    category: 'preferencias_musicais'
  },
  {
    id: 'reacoes_sonoras',
    question: 'Processamento e Resposta a Estímulos Sonoro-Musicais',
    type: 'multiple',
    options: [
      'Hipersensibilidade Auditiva',
      'Busca Ativa por Estímulos Sonoros',
      'Responsividade Musical Positiva',
      'Aversão a Estímulos Sonoros Específicos',
      'Resposta ao Chamado Nominal',
      'Localização de Fonte Sonora'
    ],
    category: 'historia_musical'
  },

  // Desenvolvimento
  {
    id: 'desenvolvimento_motor',
    question: 'Desenvolvimento Neuropsicomotor',
    type: 'multiple',
    options: [
      'Controle Cervical Estabelecido',
      'Sedestação Independente',
      'Padrão de Engatinhar',
      'Deambulação Autônoma',
      'Desenvolvimento da Motricidade Fina',
      'Desenvolvimento da Motricidade Ampla'
    ],
    category: 'desenvolvimento'
  },
  {
    id: 'desenvolvimento_linguagem',
    question: 'Desenvolvimento da Linguagem e Comunicação',
    type: 'multiple',
    options: [
      'Produção de Balbucios',
      'Aquisição das Primeiras Palavras',
      'Construção de Frases Simples',
      'Comunicação Não-Verbal Funcional',
      'Presença de Ecolalia',
      'Ausência de Linguagem Verbal'
    ],
    category: 'desenvolvimento'
  },

  // Comportamento
  {
    id: 'comportamento_social',
    question: 'Aspectos Sociointeracionais',
    type: 'multiple',
    options: [
      'Estabelecimento de Contato Visual',
      'Interação Social com Pares',
      'Engajamento em Brincadeiras Compartilhadas',
      'Padrão de Isolamento Social',
      'Comportamentos Estereotipados',
      'Padrões de Interesse Restritos'
    ],
    category: 'comportamento'
  },
  {
    id: 'regulacao_emocional',
    question: 'Regulação Socioemocional',
    type: 'multiple',
    options: [
      'Manifestações de Irritabilidade',
      'Quadro de Ansiedade',
      'Comportamentos Heteroagressivos',
      'Episódios de Choro Frequente',
      'Labilidade Emocional',
      'Baixa Tolerância à Frustração'
    ],
    category: 'comportamento'
  },

  // Saúde
  {
    id: 'diagnosticos',
    question: 'Diagnósticos Clínicos',
    type: 'multiple',
    options: [
      'Transtorno do Espectro do Autismo',
      'Transtorno do Déficit de Atenção/Hiperatividade',
      'Síndrome de Down',
      'Encefalopatia Crônica Não Progressiva',
      'Deficiência Intelectual',
      'Transtornos de Ansiedade',
      'Outros Diagnósticos'
    ],
    category: 'saude'
  },
  {
    id: 'medicamentos',
    question: 'Terapêutica Medicamentosa',
    type: 'text',
    category: 'saude'
  },
  {
    id: 'outros_tratamentos',
    question: 'Acompanhamentos Terapêuticos',
    type: 'multiple',
    options: [
      'Terapia Fonoaudiológica',
      'Terapia Ocupacional',
      'Acompanhamento Psicológico',
      'Fisioterapia',
      'Intervenção Psicopedagógica',
      'Equoterapia'
    ],
    category: 'saude'
  },

  // Social
  {
    id: 'escolaridade',
    question: 'Inserção Escolar',
    type: 'single',
    options: [
      'Não Inserido em Ambiente Escolar',
      'Educação Infantil',
      'Ensino Fundamental I',
      'Ensino Fundamental II',
      'Escola Especial'
    ],
    category: 'social'
  },
  {
    id: 'adaptacao_escolar',
    question: 'Adaptação Escolar',
    type: 'text',
    category: 'social'
  },
  {
    id: 'atividades_extras',
    question: 'Atividades Extracurriculares',
    type: 'text',
    category: 'social'
  }
]

export interface AnamneseFormData {
  id?: string
  patientId: string
  respostas: Record<string, string | string[]>
  observacoes?: string
  createdAt?: Date
  updatedAt?: Date
}