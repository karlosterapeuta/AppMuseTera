'use client'

import { Card } from '@/components/ui/Card'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { calcularPorcentagens } from '@/utils/avaliacaoCalculos'
import { useEffect, useState, useRef } from 'react'

const COLORS = ['#4ade80', '#ff87ab']
const CHART_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308']

interface ResultadosGraficosProps {
  avaliacoes: Record<string, string>
  pieChartRef?: React.RefObject<HTMLDivElement>
  barChartRef?: React.RefObject<HTMLDivElement>
}

export function ResultadosGraficos({ 
  avaliacoes, 
  pieChartRef,
  barChartRef 
}: ResultadosGraficosProps) {
  const resultados = calcularPorcentagens(avaliacoes)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth)
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const getPieChartSize = () => {
    if (windowWidth < 480) return { width: 280, height: 250 }
    if (windowWidth < 640) return { width: 320, height: 280 }
    if (windowWidth < 768) return { width: 400, height: 300 }
    return { width: 450, height: 320 }
  }

  const getBarChartSize = () => {
    if (windowWidth < 480) return { width: 280, height: 280 }
    if (windowWidth < 640) return { width: 320, height: 300 }
    if (windowWidth < 768) return { width: 400, height: 320 }
    return { width: 450, height: 340 }
  }

  const pieSize = getPieChartSize()
  const barSize = getBarChartSize()

  return (
    <Card className="p-4 sm:p-6 mt-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 text-center">
        Resultados da Escala de Avaliação TEA
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
            Habilidades Adquiridas
          </h3>
          <div className="flex justify-center items-center min-h-[250px]" ref={pieChartRef}>
            <ResponsiveContainer width="100%" height={pieSize.height}>
              <PieChart>
                <Pie
                  data={resultados.habilidades}
                  cx="50%"
                  cy="50%"
                  innerRadius={windowWidth < 480 ? "25%" : "30%"}
                  outerRadius={windowWidth < 480 ? "45%" : "50%"}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {resultados.habilidades.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      className="hover:opacity-80 transition-opacity duration-200"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    padding: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    fontSize: windowWidth < 640 ? '12px' : '14px'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => (
                    <span className={`text-${windowWidth < 640 ? 'xs' : 'sm'} text-gray-700`}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
            Desempenho por Categoria
          </h3>
          <div className="flex justify-center items-center min-h-[250px]" ref={barChartRef}>
            <ResponsiveContainer width="100%" height={barSize.height}>
              <BarChart
                data={resultados.categorias}
                margin={{
                  top: 5,
                  right: windowWidth < 640 ? 10 : 30,
                  left: windowWidth < 640 ? 10 : 20,
                  bottom: 65,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100}
                  tick={{ 
                    fill: '#4b5563', 
                    fontSize: windowWidth < 640 ? 10 : 12 
                  }}
                  interval={0}
                />
                <YAxis
                  tick={{ 
                    fill: '#4b5563', 
                    fontSize: windowWidth < 640 ? 10 : 12 
                  }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    padding: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    fontSize: windowWidth < 640 ? '12px' : '14px'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  name="Porcentagem"
                  radius={[4, 4, 0, 0]}
                >
                  {resultados.categorias.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                      className="hover:opacity-80 transition-opacity duration-200"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  )
}
