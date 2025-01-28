'use client'

import { Card } from '@/components/ui/Card'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import EmotionalAssessment from '@/components/hawkins/EmotionalAssessment'

const musicCategories = {
  chiptunes: {
    title: 'Chiptunes 4 Autism',
    description: 'Músicas em 8-bit e chiptunes que podem ajudar crianças com TEA',
    songs: [
      {
        title: 'Green Hill Zone (Trilha de Sonic the Hedgehog)',
        description: 'Ritmo animado, melodia cativante, ótima para atividades motoras.'
      },
      {
        title: 'Tetris Theme (Korobeiniki)',
        description: 'Clássico russo adaptado para 8-bit, ritmo previsível e reconfortante.'
      },
      {
        title: 'Mega Man 2 - Dr. Wily\'s Castle',
        description: 'Energia intensa, mas sem elementos caóticos, ideal para foco.'
      },
      {
        title: 'Pokémon Center Theme',
        description: 'Melodia calma e repetitiva, ajuda na transição entre atividades.'
      },
      {
        title: 'The Legend of Zelda: Overworld Theme',
        description: 'Estimula a imaginação e a resolução de problemas.'
      },
      {
        title: 'Super Mario Bros. Underwater Theme',
        description: 'Sons suaves e fluidos, ótimos para relaxamento.'
      },
      {
        title: 'Donkey Kong Country - Aquatic Ambiance',
        description: 'Ambiente subaquático com notas tranquilizantes.'
      },
      {
        title: 'Final Fantasy Victory Fanfare',
        description: 'Curta e celebratória, reforça conquistas durante atividades.'
      },
      {
        title: 'Castlevania - Vampire Killer (versão 8-bit)',
        description: 'Ritmo marcante para estimular movimento coordenado.'
      },
      {
        title: 'Undertale - Megalovania (versão chiptune)',
        description: 'Combinação de energia e padrões repetitivos que algumas crianças TEA adoram.'
      }
    ]
  },
  focus: {
    title: 'Foco e Concentração',
    description: 'Músicas calmas e ambientais para momentos que exigem concentração',
    songs: [
      {
        title: 'Sweden (Minecraft – Volume Alpha, C418)',
        description: 'Melodia suave e repetitiva, perfeita para criar um ambiente tranquilo.'
      },
      {
        title: '5 PM (Animal Crossing: New Horizons)',
        description: 'Ritmo relaxante que evoca a sensação de final de tarde, ótimo para concentração.'
      },
      {
        title: 'Wet Hands (Minecraft – Volume Alpha, C418)',
        description: 'Notas pianísticas suaves, associadas à calma e à introspecção.'
      },
      {
        title: 'Hateno Village (Day) (The Legend of Zelda: Breath of the Wild)',
        description: 'Trilha ambiental que promove serenidade e foco.'
      },
      {
        title: 'Stardew Valley – Spring (The Valley Comes Alive)',
        description: 'Melodia pastoral que estimula a criatividade sem sobrecarregar.'
      },
      {
        title: 'Minecraft – Volume Beta: Aria Math (C418)',
        description: 'Sons eletrônicos suaves, com padrões musicais previsíveis.'
      },
      {
        title: '7 PM (Animal Crossing: New Horizons)',
        description: 'Ritmo calmo e nostálgico, ideal para atividades manuais ou leitura.'
      }
    ]
  },
  imitation: {
    title: 'Músicas para Atividades de Imitação',
    description: 'Músicas tradicionais e infantis que incentivam a imitação e interação',
    songs: [
      {
        title: 'Cabeça, Ombro, Joelho e Pé',
        description: 'Estimula a consciência corporal e a coordenação ao tocar partes do corpo em sequência.'
      },
      {
        title: 'Se Você Está Feliz e Sabe',
        description: 'Ações como bater palmas, estalar os dedos e pisar os pés, incentivando a imitação e a expressão emocional.'
      },
      {
        title: 'O Sapo Não Lava o Pé',
        description: 'Imitar gestos de lavar partes do corpo, trabalhando sequências e ritmo.'
      },
      {
        title: 'Ciranda, Cirandinha',
        description: 'Dança em grupo de mãos dadas, promovendo interação social e sincronia.'
      },
      {
        title: 'Marcha Soldado',
        description: 'Marchar no lugar ou em linha, desenvolvendo coordenação motora grossa.'
      },
      {
        title: 'A Galinha do Vizinho',
        description: 'Imitar movimentos de animais (bater asas, cacarejar), estimulando a criatividade e a imitação.'
      },
      {
        title: 'O Leãozinho',
        description: 'Rugir como um leão ou imitar passos de animais, trabalhando expressão vocal e motricidade.'
      },
      {
        title: 'Peixe Vivo',
        description: 'Movimentos de nadar ou balançar os braços como peixes, ideal para atividades aquáticas simbólicas.'
      }
    ]
  }
}

export default function BibliotecaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Seção Hawkins */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Hawkins</h1>
          <div className="mt-4 bg-white rounded-lg shadow p-6">
            <p className="text-gray-700 leading-relaxed">
              A escala "Níveis de consciência de Hawkins" foi desenvolvida pelo psiquiatra David R. Hawkins. 
              Esta metodologia inovadora é capaz de medir a frequência do campo vibracional de pessoas, filmes, 
              documentos, criando uma escala abrangente de estados de consciência.
            </p>
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Como funciona?</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Selecione seu estado emocional atual no menu</li>
                <li>Visualize a frequência correspondente em Hz</li>
                <li>Explore a descrição detalhada do estado</li>
                <li>Receba recomendações musicais personalizadas</li>
              </ul>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Use esta ferramenta para:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Avaliar seu estado emocional atual</li>
                <li>Compreender diferentes níveis de consciência</li>
                <li>Receber sugestões musicais terapêuticas</li>
                <li>Acompanhar sua evolução ao longo do tempo</li>
              </ul>
            </div>
          </div>
          
          {/* Avaliação Emocional de Hawkins */}
          <div className="mt-6">
            <EmotionalAssessment />
          </div>
        </div>

        {/* Seção de Músicas para TEA */}
        <div className="mt-12">
          <h1 className="text-2xl font-bold mb-6">Músicas Infantis para TEA</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              Nossa biblioteca musical foi especialmente curada para auxiliar no desenvolvimento e bem-estar de crianças com TEA (Transtorno do Espectro Autista). 
              Cada música foi selecionada considerando suas características específicas e benefícios terapêuticos.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Como utilizar:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Escolha a categoria mais adequada para o momento</li>
                <li>Leia a descrição de cada música para entender seus benefícios</li>
                <li>Use as músicas em conjunto com atividades terapêuticas</li>
                <li>Observe as reações e preferências da criança</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(musicCategories).map(([key, category]) => (
              <Disclosure key={key}>
                {({ open }) => (
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <Disclosure.Button className="w-full px-6 py-4 text-left bg-indigo-50 hover:bg-indigo-100 transition-colors flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
                        <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                      </div>
                      <ChevronUpIcon
                        className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-indigo-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-6 py-4">
                      <div className="space-y-4">
                        {category.songs.map((song, index) => (
                          <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                            <h3 className="font-medium text-gray-900">{song.title}</h3>
                            <p className="text-gray-600 text-sm mt-1">{song.description}</p>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}