'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Card } from '../../components/ui/Card'
import { AgendamentoModal } from '../../components/agenda/AgendamentoModal'
import { useAgendamentos } from '../../hooks/useAgendamentos'
import { Agendamento } from '../../types/agenda'

const Calendario = dynamic(
  () => import('../../components/agenda/Calendario').then(mod => mod.Calendario),
  { ssr: false }
)

export default function AgendaPage() {
  const { agendamentos, addAgendamento, updateAgendamento } = useAgendamentos()
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Agendamento | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedSlot(start)
    setSelectedEvent(null)
    setIsModalOpen(true)
  }

  const handleSelectEvent = (event: Agendamento) => {
    setSelectedEvent(event)
    setSelectedSlot(null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedSlot(null)
    setSelectedEvent(null)
  }

  const handleSaveAgendamento = async (agendamento: Agendamento) => {
    if (selectedEvent) {
      await updateAgendamento(agendamento)
    } else {
      await addAgendamento(agendamento)
    }
    handleCloseModal()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
            <p className="mt-2 text-gray-600">Gerencie seus agendamentos e consultas</p>
          </div>

          <Card className="p-6">
            <div style={{ height: 'calc(100vh - 250px)' }}>
              <Calendario
                agendamentos={agendamentos}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
              />
            </div>
          </Card>

          <AgendamentoModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveAgendamento}
            selectedSlot={selectedSlot}
            selectedEvent={selectedEvent}
          />
        </div>
      </div>
    </div>
  )
}