'use client';

import * as React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';

interface RelatorioFormProps {
  relatorio: any;
  profissional: any;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (field: string, value: string) => void;
  onCheckboxChange: (section: string, field: string) => void;
  onParticipanteChange: (index: number, field: string, value: string) => void;
  onAddParticipante: () => void;
  onRemoveParticipante: (index: number) => void;
}

export default function RelatorioForm({
  relatorio,
  profissional,
  onSubmit,
  onInputChange,
  onCheckboxChange,
  onParticipanteChange,
  onAddParticipante,
  onRemoveParticipante
}: RelatorioFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Informações Básicas */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Informações Básicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="data">Data</Label>
              <Input
                id="data"
                type="text"
                value={relatorio.data}
                onChange={(e) => onInputChange('data', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="horario">Horário</Label>
              <Input
                id="horario"
                type="text"
                value={relatorio.horario}
                onChange={(e) => onInputChange('horario', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="numeroSessao">Número da Sessão</Label>
              <Input
                id="numeroSessao"
                type="text"
                value={relatorio.numeroSessao}
                onChange={(e) => onInputChange('numeroSessao', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Participantes */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Participantes</h2>
            <Button type="button" onClick={onAddParticipante}>
              Adicionar Participante
            </Button>
          </div>
          {relatorio.participantes.map((p: any, i: number) => (
            <div key={i} className="mb-6 p-4 border rounded">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold">Participante {i + 1}</h3>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => onRemoveParticipante(i)}
                >
                  Remover
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nome</Label>
                  <Input
                    value={p.nome}
                    onChange={(e) => onParticipanteChange(i, 'nome', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Idade</Label>
                  <Input
                    value={p.idade}
                    onChange={(e) => onParticipanteChange(i, 'idade', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Responsável</Label>
                  <Input
                    value={p.responsavel}
                    onChange={(e) => onParticipanteChange(i, 'responsavel', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Diagnóstico</Label>
                  <Input
                    value={p.diagnostico}
                    onChange={(e) => onParticipanteChange(i, 'diagnostico', e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Objetivos Específicos</Label>
                  <Textarea
                    value={p.objetivosEspecificos}
                    onChange={(e) => onParticipanteChange(i, 'objetivosEspecificos', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Estado Geral */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Estado Geral</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(relatorio.estadoGeral).map(([estado, checked]) => (
              <div key={estado} className="flex items-center space-x-2">
                <Checkbox
                  id={`estado-${estado}`}
                  checked={checked as boolean}
                  onCheckedChange={() => onCheckboxChange('estadoGeral', estado)}
                />
                <Label htmlFor={`estado-${estado}`}>{estado}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Humor Inicial */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Humor Inicial</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(relatorio.humorInicial).map(([humor, checked]) => (
              <div key={humor} className="flex items-center space-x-2">
                <Checkbox
                  id={`humor-${humor}`}
                  checked={checked as boolean}
                  onCheckedChange={() => onCheckboxChange('humorInicial', humor)}
                />
                <Label htmlFor={`humor-${humor}`}>{humor}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disposição */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Disposição</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(relatorio.disposicao).map(([disp, checked]) => (
              <div key={disp} className="flex items-center space-x-2">
                <Checkbox
                  id={`disp-${disp}`}
                  checked={checked as boolean}
                  onCheckedChange={() => onCheckboxChange('disposicao', disp)}
                />
                <Label htmlFor={`disp-${disp}`}>{disp}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Objetivos e Atividades */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Objetivos e Atividades</h2>
          <div className="space-y-4">
            <div>
              <Label>Objetivos Principais</Label>
              <Textarea
                value={relatorio.objetivosPrincipais}
                onChange={(e) => onInputChange('objetivosPrincipais', e.target.value)}
              />
            </div>
            <div>
              <Label>Objetivos Secundários</Label>
              <Textarea
                value={relatorio.objetivosSecundarios}
                onChange={(e) => onInputChange('objetivosSecundarios', e.target.value)}
              />
            </div>
            <div>
              <Label>Atividades Realizadas</Label>
              <Textarea
                value={relatorio.atividadesRealizadas}
                onChange={(e) => onInputChange('atividadesRealizadas', e.target.value)}
              />
            </div>
            <div>
              <Label>Recursos Utilizados</Label>
              <Textarea
                value={relatorio.recursosUtilizados}
                onChange={(e) => onInputChange('recursosUtilizados', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex justify-end space-x-4">
        <Button type="submit">Salvar Relatório</Button>
      </div>
    </form>
  );
}
