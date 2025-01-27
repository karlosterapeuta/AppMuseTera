export type TipoRelatorio = 
  | 'avaliacao_inicial'
  | 'sessao'
  | 'evolucao_mensal'
  | 'evolucao_semestral'
  | 'alta'
  | 'reavaliacao'
  | 'familia'
  | 'equipe'
  | 'interacao_musical'

export interface SecaoRelatorio {
  id: string
  titulo: string
  tipo: 'texto' | 'checkbox' | 'radio' | 'escala' | 'lista'
  obrigatorio: boolean
  opcoes?: string[]
  descricao?: string
  valor?: string
}

export interface TemplateRelatorio {
  tipo: TipoRelatorio
  titulo: string
  descricao: string
  secoes: SecaoRelatorio[]
}

export interface Relatorio {
  id: string
  tipo: TipoRelatorio
  patientId: string
  therapistId: string
  data: Date
  respostas: Record<string, any>
  status: 'rascunho' | 'finalizado'
  createdAt: Date
  updatedAt: Date
}

// Templates pré-configurados
export const TEMPLATES_RELATORIO: Record<TipoRelatorio, TemplateRelatorio> = {
  interacao_musical: {
    tipo: 'interacao_musical',
    titulo: 'Relatório de Sessão - Enfoque na Interação Musical',
    descricao: 'Registro detalhado da sessão com foco na interação musical',
    secoes: [
      {
        id: 'objetivos',
        titulo: 'Objetivos Terapêuticos',
        tipo: 'lista',
        obrigatorio: true,
        opcoes: [
          'Desenvolver habilidades de comunicação não-verbal através da interação musical recíproca',
          'Estimular a expressão emocional e autorregulação através de experiências musicais estruturadas',
          'Promover engajamento social e reciprocidade por meio de atividades musicais interativas',
          'Fortalecer a consciência corporal e coordenação motora através do ritmo e movimento',
          'Desenvolver habilidades de atenção compartilhada e turn-taking em contextos musicais'
        ]
      },
      {
        id: 'atividades',
        titulo: 'Atividades Realizadas',
        tipo: 'lista',
        obrigatorio: true,
        opcoes: [
          'Improvisação musical dialógica utilizando instrumentos de percussão, com foco em turn-taking e reciprocidade sonora',
          'Experiência de songwriting com estrutura musical pré-estabelecida, explorando temas emocionais e expressão verbal',
          'Re-criação musical com arranjo adaptado para promover participação ativa e senso de competência',
          'Atividade rítmica estruturada com instrumentos de percussão, focando em sincronização e coordenação motora',
          'Experiência receptiva com música ao vivo, trabalhando reconhecimento emocional e regulação'
        ]
      },
      {
        id: 'observacoes',
        titulo: 'Observações Clínicas',
        tipo: 'texto',
        obrigatorio: true,
        valor: `Durante a sessão, o paciente apresentou [nível de engajamento: alto/moderado/baixo] nas atividades propostas, demonstrando [aspectos positivos observados, ex: boa iniciativa nas improvisações/facilidade em manter o pulso rítmico/interesse em explorar diferentes timbres].

No contexto da interação musical, observou-se [padrões de interação, ex: capacidade de manter contato visual durante o fazer musical/resposta consistente aos direcionamentos musicais/tendência a liderar as improvisações].

Na atividade de [nome da atividade específica], destacou-se [comportamento específico relevante], evidenciando [interpretação clínica do comportamento]. Em momentos de [situação específica], o paciente demonstrou [resposta comportamental/emocional], sugerindo [análise técnica da resposta].

Quanto aos aspectos não-verbais, notou-se [observações sobre expressão facial, postura corporal, gestualidade]. A qualidade da produção sonora caracterizou-se por [descrição técnica: intensidade, ritmo, melodia, timbre], indicando [interpretação do estado emocional/nível de organização].`
      },
      {
        id: 'resultados',
        titulo: 'Resultados e Progresso',
        tipo: 'texto',
        obrigatorio: true,
        valor: `Em relação aos objetivos terapêuticos, o paciente demonstrou [avanços específicos, ex: maior consistência na manutenção do pulso rítmico/ampliação do repertório de expressão sonoro-musical/melhor modulação da intensidade vocal].

Houve progresso significativo em [área específica], evidenciado por [comportamentos observáveis, ex: aumento do tempo de engajamento em atividades interativas/maior flexibilidade nas improvisações/melhor regulação emocional durante transições].

O uso de [intervenção musical específica] mostrou-se particularmente efetivo para [objetivo específico], resultando em [mudanças observadas]. A resposta do paciente à [técnica específica] indica [interpretação clínica].

Comparado às sessões anteriores, observa-se evolução em [aspectos específicos], especialmente em relação a [área de desenvolvimento]. O paciente demonstra maior [habilidade/competência] quando [contexto específico].`
      },
      {
        id: 'plano',
        titulo: 'Plano para a Próxima Sessão',
        tipo: 'texto',
        obrigatorio: true,
        valor: `Propõe-se dar continuidade ao trabalho com [técnica/abordagem atual], intensificando o foco em [aspecto específico] para potencializar os resultados observados.

Planeja-se introduzir [nova intervenção] visando [objetivo específico], considerando a resposta positiva do paciente a [elemento musical/técnica atual].

Objetivos específicos para próxima sessão:
1. Expandir [habilidade específica] através de [atividade planejada]
2. Trabalhar [aspecto do desenvolvimento] utilizando [recurso musical]
3. Fortalecer [competência] por meio de [experiência musical]

Considerar ajustes em [aspecto da intervenção] caso [condição específica] seja observada, mantendo a flexibilidade necessária para adaptação às necessidades apresentadas.`
      }
    ]
  },
  
  avaliacao_inicial: {
    tipo: 'avaliacao_inicial',
    titulo: 'Relatório de Avaliação Inicial',
    descricao: 'Avaliação inicial do paciente para estabelecimento de linha de base e planejamento terapêutico',
    secoes: [
      {
        id: 'dados_gerais',
        titulo: 'Dados Gerais',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Informações sobre encaminhamento, queixa principal e histórico'
      },
      {
        id: 'aspectos_musicais',
        titulo: 'Aspectos Musicais',
        tipo: 'lista',
        obrigatorio: true,
        opcoes: [
          'Preferências musicais',
          'Experiência musical prévia',
          'Resposta a diferentes estilos',
          'Habilidades rítmicas',
          'Habilidades vocais',
          'Interação com instrumentos'
        ]
      },
      {
        id: 'aspectos_comportamentais',
        titulo: 'Aspectos Comportamentais',
        tipo: 'escala',
        obrigatorio: true,
        opcoes: [
          'Atenção e concentração',
          'Interação social',
          'Comunicação',
          'Comportamentos repetitivos',
          'Regulação emocional'
        ]
      },
      {
        id: 'conclusoes',
        titulo: 'Conclusões e Recomendações',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Impressões gerais, objetivos propostos e recomendações terapêuticas'
      }
    ]
  },

  sessao: {
    tipo: 'sessao',
    titulo: 'Relatório de Sessão',
    descricao: 'Registro detalhado das atividades e observações da sessão',
    secoes: [
      {
        id: 'atividades_realizadas',
        titulo: 'Atividades Realizadas',
        tipo: 'lista',
        obrigatorio: true
      },
      {
        id: 'participacao',
        titulo: 'Participação e Engajamento',
        tipo: 'escala',
        obrigatorio: true,
        opcoes: [
          'Interesse nas atividades',
          'Interação com terapeuta',
          'Resposta aos estímulos musicais',
          'Iniciativa',
          'Manutenção da atenção'
        ]
      },
      {
        id: 'observacoes',
        titulo: 'Observações Específicas',
        tipo: 'texto',
        obrigatorio: false,
        descricao: 'Comportamentos, respostas ou eventos relevantes'
      }
    ]
  },

  evolucao_mensal: {
    tipo: 'evolucao_mensal',
    titulo: 'Relatório de Evolução Mensal',
    descricao: 'Acompanhamento mensal do progresso do paciente',
    secoes: [
      {
        id: 'objetivos_trabalhados',
        titulo: 'Objetivos Trabalhados',
        tipo: 'checkbox',
        obrigatorio: true,
        opcoes: [
          'Desenvolvimento musical',
          'Habilidades sociais',
          'Comunicação',
          'Aspectos motores',
          'Aspectos cognitivos',
          'Regulação emocional'
        ]
      },
      {
        id: 'evolucao_por_area',
        titulo: 'Evolução por Área',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Descreva o progresso em cada área trabalhada'
      }
    ]
  },

  evolucao_semestral: {
    tipo: 'evolucao_semestral',
    titulo: 'Relatório de Evolução Semestral',
    descricao: 'Análise detalhada do progresso em 6 meses de terapia',
    secoes: [
      {
        id: 'objetivos_alcancados',
        titulo: 'Objetivos Alcançados',
        tipo: 'checkbox',
        obrigatorio: true,
        opcoes: [
          'Desenvolvimento musical',
          'Habilidades sociais',
          'Comunicação',
          'Aspectos motores',
          'Aspectos cognitivos',
          'Regulação emocional'
        ]
      },
      {
        id: 'evolucao_detalhada',
        titulo: 'Evolução Detalhada',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Descreva detalhadamente o progresso em cada área'
      },
      {
        id: 'ajustes_plano',
        titulo: 'Ajustes no Plano Terapêutico',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Sugestões de modificações nos objetivos e estratégias'
      }
    ]
  },

  alta: {
    tipo: 'alta',
    titulo: 'Relatório de Alta',
    descricao: 'Documentação da conclusão do processo terapêutico',
    secoes: [
      {
        id: 'motivo_alta',
        titulo: 'Motivo da Alta',
        tipo: 'radio',
        obrigatorio: true,
        opcoes: [
          'Objetivos alcançados',
          'Alta a pedido',
          'Encaminhamento',
          'Outros'
        ]
      },
      {
        id: 'objetivos_alcancados',
        titulo: 'Objetivos Alcançados',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Descreva os objetivos alcançados durante o tratamento'
      },
      {
        id: 'recomendacoes',
        titulo: 'Recomendações',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Orientações para manutenção dos ganhos terapêuticos'
      }
    ]
  },

  reavaliacao: {
    tipo: 'reavaliacao',
    titulo: 'Relatório de Reavaliação',
    descricao: 'Reavaliação periódica do paciente',
    secoes: [
      {
        id: 'evolucao_geral',
        titulo: 'Evolução Geral',
        tipo: 'escala',
        obrigatorio: true,
        opcoes: [
          'Aspectos musicais',
          'Comunicação',
          'Interação social',
          'Aspectos motores',
          'Aspectos cognitivos',
          'Regulação emocional'
        ]
      },
      {
        id: 'novos_objetivos',
        titulo: 'Novos Objetivos',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Definição de novos objetivos terapêuticos'
      }
    ]
  },

  familia: {
    tipo: 'familia',
    titulo: 'Relatório para Família',
    descricao: 'Comunicação com a família sobre o progresso do paciente',
    secoes: [
      {
        id: 'atividades_realizadas',
        titulo: 'Atividades Realizadas',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Descrição das principais atividades do período'
      },
      {
        id: 'progresso_observado',
        titulo: 'Progresso Observado',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Evolução observada em linguagem acessível'
      },
      {
        id: 'orientacoes',
        titulo: 'Orientações para Casa',
        tipo: 'lista',
        obrigatorio: true,
        opcoes: [
          'Atividades musicais sugeridas',
          'Estratégias de comunicação',
          'Rotinas recomendadas',
          'Exercícios específicos'
        ]
      }
    ]
  },

  equipe: {
    tipo: 'equipe',
    titulo: 'Relatório para Equipe Interdisciplinar',
    descricao: 'Comunicação com outros profissionais da equipe',
    secoes: [
      {
        id: 'objetivos_terapeuticos',
        titulo: 'Objetivos Terapêuticos',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Objetivos trabalhados e estratégias utilizadas'
      },
      {
        id: 'evolucao_tecnica',
        titulo: 'Evolução Técnica',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Descrição técnica do progresso observado'
      },
      {
        id: 'sugestoes_interdisciplinares',
        titulo: 'Sugestões Interdisciplinares',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Sugestões para trabalho integrado com a equipe'
      }
    ]
  }
}