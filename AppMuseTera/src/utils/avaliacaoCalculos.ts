import { ESCALA_DEMUCA } from '@/data/escalaDemuca'

type Parametro = string | { nome: string; multiplicador: number }

// Função auxiliar para calcular a pontuação máxima de uma categoria
const calcularPontuacaoMaximaCategoria = (categoria: typeof ESCALA_DEMUCA[0]): number => {
  return categoria.parametros.reduce((total, parametro) => {
    const multiplicador = typeof parametro === 'string' ? 1 : (parametro.multiplicador || 1)
    return total + (2 * multiplicador) // 2 é a pontuação máxima por parâmetro
  }, 0)
}

// Função auxiliar para verificar se a pontuação máxima está correta
const verificarPontuacaoMaxima = (categoria: string, pontuacao: number): void => {
  const pontosEsperados = {
    'Comportamentos restritivos': 14,
    'Interação social / Cognição': 18,
    'Percepção / Exploração rítmica': 16,
    'Percepção / Exploração sonora': 14,
    'Exploração vocal': 14,
    'Movimentação corporal com a música': 14
  }
  
  if (pontuacao !== pontosEsperados[categoria]) {
    console.warn(`Aviso: Pontuação máxima calculada para ${categoria} (${pontuacao}) difere do esperado (${pontosEsperados[categoria]})`)
  }
}

export function calcularPorcentagens(avaliacoes: Record<string, string>) {
  if (Object.keys(avaliacoes).length === 0) {
    return {
      habilidades: [
        { name: 'Adquirido', value: 0 },
        { name: 'Não adquirido', value: 100 }
      ],
      categorias: [
        { name: 'Comportamentos Restritivos', value: 0 },
        { name: 'Interação Social', value: 0 },
        { name: 'Exploração Rítmica', value: 0 },
        { name: 'Exploração Sonora', value: 0 },
        { name: 'Exploração Vocal', value: 0 },
        { name: 'Movimentação com a Música', value: 0 }
      ]
    }
  }

  // Função auxiliar para obter o nome do parâmetro
  const getParametroNome = (parametro: Parametro): string => {
    return typeof parametro === 'string' ? parametro : parametro.nome
  }

  // Função auxiliar para obter o multiplicador
  const getMultiplicador = (parametro: Parametro): number => {
    return typeof parametro === 'string' ? 1 : (parametro.multiplicador || 1)
  }

  // Calcula pontuação total e máxima possível
  let totalPontos = 0
  let maxPontosPossiveis = 0

  ESCALA_DEMUCA.forEach(categoria => {
    const maxCategoria = calcularPontuacaoMaximaCategoria(categoria)
    verificarPontuacaoMaxima(categoria.categoria, maxCategoria)
    
    categoria.parametros.forEach(parametro => {
      const nome = getParametroNome(parametro)
      const multiplicador = getMultiplicador(parametro)
      const valor = avaliacoes[nome]

      if (valor) {
        maxPontosPossiveis += 2 * multiplicador

        if (categoria.categoria === 'Comportamentos restritivos') {
          if (valor === 'muito') totalPontos += 0
          else if (valor === 'pouco') totalPontos += 1 * multiplicador
          else if (valor === 'nao') totalPontos += 2 * multiplicador
        } else {
          if (valor === 'muito') totalPontos += 2 * multiplicador
          else if (valor === 'pouco') totalPontos += 1 * multiplicador
        }
      }
    })
  })

  const porcentagemAdquirida = maxPontosPossiveis > 0 
    ? Math.round((totalPontos / maxPontosPossiveis) * 100)
    : 0

  // Calcula porcentagem por categoria
  const categorias = ESCALA_DEMUCA.map(categoria => {
    let pontosCategoria = 0
    const maxPontosCategoria = calcularPontuacaoMaximaCategoria(categoria)
    let respostasCategoria = 0

    categoria.parametros.forEach(parametro => {
      const nome = getParametroNome(parametro)
      const multiplicador = getMultiplicador(parametro)
      const valor = avaliacoes[nome]

      if (valor) {
        respostasCategoria++
        
        if (categoria.categoria === 'Comportamentos restritivos') {
          if (valor === 'muito') pontosCategoria += 0
          else if (valor === 'pouco') pontosCategoria += 1 * multiplicador
          else if (valor === 'nao') pontosCategoria += 2 * multiplicador
        } else {
          if (valor === 'muito') pontosCategoria += 2 * multiplicador
          else if (valor === 'pouco') pontosCategoria += 1 * multiplicador
        }
      }
    })

    const porcentagem = respostasCategoria > 0 
      ? Math.round((pontosCategoria / maxPontosCategoria) * 100)
      : 0

    return {
      name: categoria.categoria
        .replace('Percepção / ', '')
        .replace(' / Cognição', ''),
      value: porcentagem
    }
  })

  return {
    habilidades: [
      { name: 'Adquirido', value: porcentagemAdquirida },
      { name: 'Não adquirido', value: 100 - porcentagemAdquirida }
    ],
    categorias
  }
}
