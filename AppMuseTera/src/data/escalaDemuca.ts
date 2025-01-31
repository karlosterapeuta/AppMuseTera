export const ESCALA_DEMUCA = [
  {
    categoria: 'Comportamentos restritivos',
    parametros: [
      'Estereotipias',
      'Agressividade',
      'Desinteresse',
      'Passividade',
      'Resistência',
      'Reclusão (isolamento)',
      'Pirraça'
    ],
    escala: {
      nao: 2,
      pouco: 1,
      muito: 0
    }
  },
  {
    categoria: 'Interação social / Cognição',
    parametros: [
      'Contato visual',
      'Comunicação verbal',
      'Interação com instrumentos musicais',
      'Interação com outros objetos',
      'Interação com educador ou musicoterapeuta',
      'Interação com pais (se aplicável)',
      'Interação com pares (se aplicável)',
      'Atenção',
      'Imitação'
    ],
    escala: {
      nao: 0,
      pouco: 1,
      muito: 2
    }
  },
  {
    categoria: 'Percepção / Exploração rítmica',
    parametros: [
      'Pulso interno',
      'Regulação temporal',
      { nome: 'Apoio', multiplicador: 2 },
      { nome: 'Ritmo real', multiplicador: 2 },
      { nome: 'Contrastes de andamento', multiplicador: 2 }
    ],
    escala: {
      nao: 0,
      pouco: 1,
      muito: 2
    }
  },
  {
    categoria: 'Percepção / Exploração sonora',
    parametros: [
      'Som/silêncio',
      'Timbre',
      'Planos de altura',
      'Movimento sonoro',
      'Contrastes de intensidade',
      'Repetição de ideias rítmicas e/ou melódicas',
      'Senso de conclusão'
    ],
    escala: {
      nao: 0,
      pouco: 1,
      muito: 2
    }
  },
  {
    categoria: 'Exploração vocal',
    parametros: [
      'Vocalizações',
      'Balbucios',
      'Sílabas canônica',
      { nome: 'Imitação de canções', multiplicador: 2 },
      { nome: 'Criação vocal', multiplicador: 2 }
    ],
    escala: {
      nao: 0,
      pouco: 1,
      muito: 2
    }
  },
  {
    categoria: 'Movimentação corporal com a música',
    parametros: [
      'Andar',
      'Correr',
      'Parar',
      'Dançar',
      'Pular',
      'Gesticular',
      'Movimentar-se no lugar'
    ],
    escala: {
      nao: 0,
      pouco: 1,
      muito: 2
    }
  }
]
