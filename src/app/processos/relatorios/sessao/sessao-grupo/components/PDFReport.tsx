'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 15,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    backgroundColor: '#f3f4f6',
    padding: 5,
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
  },
  label: {
    fontSize: 10,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 10,
    marginBottom: 8,
    marginLeft: 10,
  },
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  checkbox: {
    width: '33%',
    marginBottom: 5,
    fontSize: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    borderTop: '1 solid black',
    paddingTop: 10,
  },
  signatureLine: {
    width: '60%',
    marginHorizontal: 'auto',
    borderBottom: '1 solid black',
    marginBottom: 5,
  },
  professionalInfo: {
    fontSize: 10,
    textAlign: 'center',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    fontSize: 8,
  },
});

interface PDFReportProps {
  relatorio: any;
  profissional: {
    nome: string;
    registro: string;
  };
}

const PDFReport: React.FC<PDFReportProps> = ({ relatorio, profissional }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>RELATÓRIO DE SESSÃO EM GRUPO</Text>
        <Text style={styles.subtitle}>MUSICOTERAPIA CLÍNICA</Text>
      </View>

      {/* Informações Básicas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>INFORMAÇÕES BÁSICAS</Text>
        <Text style={styles.text}>Data: {relatorio.data}</Text>
        <Text style={styles.text}>Horário: {relatorio.horario}</Text>
        <Text style={styles.text}>Sessão Nº: {relatorio.numeroSessao}</Text>
      </View>

      {/* Participantes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. PARTICIPANTES</Text>
        {relatorio.participantes.map((p: any, i: number) => (
          <View key={i} style={{ marginBottom: 15 }}>
            <Text style={styles.label}>Participante {i + 1}:</Text>
            <Text style={styles.value}>Nome: {p.nome}</Text>
            <Text style={styles.value}>Idade: {p.idade}</Text>
            <Text style={styles.value}>Responsável: {p.responsavel}</Text>
            <Text style={styles.value}>Diagnóstico: {p.diagnostico}</Text>
            <Text style={styles.value}>Objetivos Específicos: {p.objetivosEspecificos}</Text>
          </View>
        ))}
      </View>

      {/* Estado Geral e Humor */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. AVALIAÇÃO INICIAL</Text>
        
        <Text style={styles.label}>Estado Geral:</Text>
        <View style={styles.checkboxGroup}>
          {Object.entries(relatorio.estadoGeral).map(([estado, checked]) => (
            <Text key={estado} style={styles.checkbox}>
              {checked ? '☑' : '☐'} {estado}
            </Text>
          ))}
        </View>

        <Text style={styles.label}>Humor Inicial:</Text>
        <View style={styles.checkboxGroup}>
          {Object.entries(relatorio.humorInicial).map(([humor, checked]) => (
            <Text key={humor} style={styles.checkbox}>
              {checked ? '☑' : '☐'} {humor}
            </Text>
          ))}
        </View>

        <Text style={styles.label}>Disposição:</Text>
        <View style={styles.checkboxGroup}>
          {Object.entries(relatorio.disposicao).map(([disp, checked]) => (
            <Text key={disp} style={styles.checkbox}>
              {checked ? '☑' : '☐'} {disp}
            </Text>
          ))}
        </View>
      </View>
    </Page>

    {/* Segunda Página */}
    <Page size="A4" style={styles.page}>
      {/* Objetivos e Atividades */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. OBJETIVOS E ATIVIDADES</Text>
        <Text style={styles.label}>Objetivos Principais:</Text>
        <Text style={styles.value}>{relatorio.objetivosPrincipais}</Text>
        
        <Text style={styles.label}>Objetivos Secundários:</Text>
        <Text style={styles.value}>{relatorio.objetivosSecundarios}</Text>
        
        <Text style={styles.label}>Atividades Realizadas:</Text>
        <Text style={styles.value}>{relatorio.atividadesRealizadas}</Text>
        
        <Text style={styles.label}>Recursos Utilizados:</Text>
        <Text style={styles.value}>{relatorio.recursosUtilizados}</Text>
      </View>

      {/* Respostas e Análises */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. RESPOSTAS E ANÁLISES</Text>
        
        <Text style={styles.label}>Respostas Musicais:</Text>
        <Text style={styles.value}>Percepção Rítmica: {relatorio.respostasMusicalidade.percepcaoRitmica}</Text>
        <Text style={styles.value}>Participação Musical: {relatorio.respostasMusicalidade.participacaoMusical}</Text>
        <Text style={styles.value}>Preferências Instrumentais: {relatorio.respostasMusicalidade.preferenciasInstrumentais}</Text>
        <Text style={styles.value}>Resposta Sonora: {relatorio.respostasMusicalidade.respostaSonora}</Text>
        <Text style={styles.value}>Improvisação: {relatorio.respostasMusicalidade.improvisacao}</Text>
        
        <Text style={styles.label}>Respostas Socioemocionais:</Text>
        <Text style={styles.value}>{relatorio.respostasSocioEmocional}</Text>
        
        <Text style={styles.label}>Respostas de Comunicação:</Text>
        <Text style={styles.value}>{relatorio.respostasComunicacao}</Text>
        
        <Text style={styles.label}>Análise Comportamental:</Text>
        <Text style={styles.value}>{relatorio.analiseComportamental}</Text>
      </View>
    </Page>

    {/* Terceira Página */}
    <Page size="A4" style={styles.page}>
      {/* Conclusões e Planejamento */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. CONCLUSÕES E PLANEJAMENTO</Text>
        
        <Text style={styles.label}>Progressos Observados:</Text>
        <Text style={styles.value}>{relatorio.progressosObservados}</Text>
        
        <Text style={styles.label}>Desafios Identificados:</Text>
        <Text style={styles.value}>{relatorio.desafiosIdentificados}</Text>
        
        <Text style={styles.label}>Recomendações:</Text>
        <Text style={styles.value}>{relatorio.recomendacoes}</Text>
        
        <Text style={styles.label}>Planejamento para Próxima Sessão:</Text>
        <Text style={styles.value}>{relatorio.planejamentoProximaSessao}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.signatureLine} />
        <Text style={styles.professionalInfo}>{profissional.nome}</Text>
        <Text style={styles.professionalInfo}>Registro: {profissional.registro}</Text>
      </View>

      <Text 
        style={styles.pageNumber} 
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} 
        fixed 
      />
    </Page>
  </Document>
);

export default PDFReport;
