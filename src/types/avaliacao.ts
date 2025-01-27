export interface AvaliacaoQuestion {
  id: string
  category: string
  question: string
  type: 'text' | 'select' | 'radio' | 'checkbox'
  options?: string[]
}

export const AVALIACAO_QUESTIONS: AvaliacaoQuestion[] = [
  {
    id: 'aspectos_sonoros_percepcao',
    category: 'aspectos_sonoros',
    question: 'Como é a percepção sonora do paciente?',
    type: 'text'
  },
  {
    id: 'aspectos_sonoros_ritmo',
    category: 'aspectos_sonoros',
    question: 'Como é a resposta rítmica do paciente?',
    type: 'text'
  },
  {
    id: 'aspectos_sonoros_melodia',
    category: 'aspectos_sonoros',
    question: 'Como é a resposta melódica do paciente?',
    type: 'text'
  },
  {
    id: 'aspectos_fisicos_motricidade',
    category: 'aspectos_fisicos',
    question: 'Como é a motricidade do paciente?',
    type: 'text'
  },
  {
    id: 'aspectos_fisicos_coordenacao',
    category: 'aspectos_fisicos',
    question: 'Como é a coordenação motora?',
    type: 'text'
  },
  {
    id: 'aspectos_cognitivos_atencao',
    category: 'aspectos_cognitivos',
    question: 'Como é a atenção do paciente durante as atividades?',
    type: 'text'
  },
  {
    id: 'aspectos_cognitivos_memoria',
    category: 'aspectos_cognitivos',
    question: 'Como é a memória do paciente?',
    type: 'text'
  },
  {
    id: 'aspectos_sociais_interacao',
    category: 'aspectos_sociais',
    question: 'Como é a interação social do paciente?',
    type: 'text'
  },
  {
    id: 'aspectos_sociais_comunicacao',
    category: 'aspectos_sociais',
    question: 'Como é a comunicação do paciente?',
    type: 'text'
  },
  {
    id: 'aspectos_emocionais_expressao',
    category: 'aspectos_emocionais',
    question: 'Como é a expressão emocional do paciente?',
    type: 'text'
  },
  {
    id: 'aspectos_emocionais_humor',
    category: 'aspectos_emocionais',
    question: 'Como é o humor do paciente durante as atividades?',
    type: 'text'
  },
  {
    id: 'aspectos_musicais_preferencias',
    category: 'aspectos_musicais',
    question: 'Quais são as preferências musicais do paciente?',
    type: 'text'
  },
  {
    id: 'aspectos_musicais_instrumentos',
    category: 'aspectos_musicais',
    question: 'Como é a relação do paciente com os instrumentos musicais?',
    type: 'text'
  },
  {
    id: 'conclusao_objetivos',
    category: 'conclusao',
    question: 'Quais são os objetivos terapêuticos propostos?',
    type: 'text'
  },
  {
    id: 'conclusao_estrategias',
    category: 'conclusao',
    question: 'Quais estratégias musicoterapêuticas são recomendadas?',
    type: 'text'
  }
]
