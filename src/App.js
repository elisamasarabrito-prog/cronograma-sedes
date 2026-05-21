import { useState, useMemo, useEffect } from "react";

const COLORS = {
  lp: { bg: "#1a3a5c", accent: "#4a9eff", light: "#d0e8ff", label: "Língua Portuguesa" },
  suas: { bg: "#1a4a2e", accent: "#4adf7f", light: "#d0f5e0", label: "SUAS / LOAS / PNAS" },
  df: { bg: "#4a2e00", accent: "#ffaa33", light: "#fff0cc", label: "Programas DF / Legislação" },
  prot: { bg: "#3a1a4a", accent: "#cc77ff", light: "#f0d8ff", label: "Proteção Social" },
  disc: { bg: "#4a1a1a", accent: "#ff6655", light: "#ffd8d0", label: "Redação Discursiva" },
  rev: { bg: "#2a2a2a", accent: "#ffdd55", light: "#fffacc", label: "⟳ Revisão" },
  sim: { bg: "#001a3a", accent: "#55ddff", light: "#ccf5ff", label: "🎯 Simulado" },
  folga: { bg: "#111", accent: "#888", light: "#eee", label: "Descanso" },
};

const PHASE_COLORS = {
  1: "#4a9eff",
  2: "#4adf7f",
  3: "#ffaa33",
  4: "#ff6655",
};

// Conteúdo diário: [tipo, título, teoria (min), questões, anki_cards, tarefas[]]
const schedule = [
  // --- FASE 1: BASE TEÓRICA (25/mai a 21/jun) ---
  // Semana 1 (25–31/mai)
  {
    date: "25/05 (Dom)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "lp",
    title: "Leitura de Edital + Interpretação de Texto",
    teoria: 40, questoes: 10, anki: 15,
    tasks: [
      "📖 Leia o edital do SEDES DF completo (só para entender o que vem por aí — não precisa decorar)",
      "📖 Estude: O que é interpretação de texto? Como a Quadrix cobra? (foco em inferência e ideia principal)",
      "✏️ Resolva 10 questões de interpretação de texto da Quadrix (use QConcursos ou TEC Concursos, filtre por banca 'Quadrix')",
      "🃏 Crie 15 flashcards Anki: frases com sinônimos e vocabulário do edital (ex: 'socioassistencial', 'vulnerabilidade', 'SUAS')",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "26/05 (Seg)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "suas",
    title: "O que é o SUAS? Origem e Princípios",
    teoria: 40, questoes: 10, anki: 15,
    tasks: [
      "📖 Estude: O que é o SUAS (Sistema Único de Assistência Social) — origem, ano de criação, objetivo",
      "📖 Estude: Os 4 princípios do SUAS (universalidade, gratuidade, integralidade, descentralização)",
      "📖 Estude: Diferença entre Proteção Social Básica e Proteção Social Especial (conceito geral, sem detalhes ainda)",
      "✏️ Resolva 10 questões sobre SUAS/LOAS no QConcursos",
      "🃏 Crie 15 flashcards: 'Ano de criação do SUAS?', 'Quem coordena o SUAS?', 'SUAS é regulamentado por qual lei?'",
      "⏱️ Tempo estimado: 1h40"
    ]
  },
  {
    date: "27/05 (Ter)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "suas",
    title: "LOAS – Lei Orgânica da Assistência Social",
    teoria: 45, questoes: 10, anki: 15,
    tasks: [
      "📖 Estude a LOAS (Lei 8.742/1993): o que ela estabelece, quem tem direito, o que é BPC",
      "📖 Leia os artigos 1º ao 6º da LOAS (são curtos e diretos — é lei seca, a Quadrix cobra literalmente!)",
      "📖 BPC: quem recebe, valor, critério de renda (1/4 do salário mínimo per capita)",
      "✏️ Resolva 10 questões sobre LOAS e BPC no TEC Concursos",
      "🃏 Crie 15 flashcards: 'O que é a LOAS?', 'Valor do BPC?', 'Critério de renda do BPC?', 'Ano da LOAS?'",
      "⏱️ Tempo estimado: 1h45"
    ]
  },
  {
    date: "28/05 (Qua)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "lp",
    title: "Língua Portuguesa – Ortografia e Pontuação",
    teoria: 35, questoes: 10, anki: 10,
    tasks: [
      "📖 Estude ortografia: uso do 'mal' vs 'mau', 'onde' vs 'aonde', 'senão' vs 'se não' (esses são clássicos da Quadrix!)",
      "📖 Estude pontuação: uso correto da vírgula (especialmente para isolar adjunto adverbial e aposto)",
      "✏️ Resolva 10 questões de ortografia/pontuação da Quadrix",
      "🃏 Crie 10 flashcards: regras com exemplo certo/errado (ex: 'Mal/Mau: quando usar cada um?')",
      "⏱️ Tempo estimado: 1h20"
    ]
  },
  {
    date: "29/05 (Qui)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "suas",
    title: "PNAS – Política Nacional de Assistência Social",
    teoria: 40, questoes: 10, anki: 15,
    tasks: [
      "📖 Estude a PNAS (2004): o que é, objetivos, quem são os usuários da assistência social",
      "📖 Diferença entre PNAS e LOAS (PNAS é a política, LOAS é a lei)",
      "📖 Estude a NOB-SUAS: o que é, para que serve (só o conceito básico por hoje)",
      "✏️ Resolva 10 questões sobre PNAS/NOB-SUAS",
      "🃏 Crie 15 flashcards sobre PNAS: ano, objetivos, quem são os usuários",
      "⏱️ Tempo estimado: 1h40"
    ]
  },
  {
    date: "30/05 (Sex)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "rev",
    title: "⟳ REVISÃO SEMANA 1",
    teoria: 0, questoes: 20, anki: 0,
    tasks: [
      "🔁 Faça todos os flashcards Anki acumulados da semana (são ~70 cards — leve uns 25 min)",
      "✏️ Resolva 20 questões mistas: SUAS + LOAS + PNAS + LP (pegue questões que você errou e refaça)",
      "📝 Anote em um caderno ou bloco de notas: os 3 pontos que você mais errou esta semana",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "31/05 (Sáb)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "folga",
    title: "🛋️ Descanso",
    teoria: 0, questoes: 0, anki: 0,
    tasks: [
      "✅ Dia livre — você merece! TDAH precisa de reset mental",
      "💡 Se quiser, leia algo leve sobre assistência social (notícia, vídeo curto) — mas sem pressão"
    ]
  },
  // Semana 2 (01–07/jun)
  {
    date: "01/06 (Dom)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "prot",
    title: "Proteção Social Básica – CRAS e PAIF",
    teoria: 40, questoes: 10, anki: 15,
    tasks: [
      "📖 Estude o CRAS (Centro de Referência de Assistência Social): o que é, onde se localiza, o que oferece",
      "📖 Estude o PAIF (Serviço de Proteção e Atendimento Integral à Família): o que é, quem atende",
      "📖 Diferença entre CRAS e CREAS (básico vs especial — grave na memória!)",
      "✏️ Resolva 10 questões sobre CRAS/PAIF",
      "🃏 Crie 15 flashcards: 'O que é o CRAS?', 'O que é o PAIF?', 'CRAS = proteção ___ ?'",
      "⏱️ Tempo estimado: 1h40"
    ]
  },
  {
    date: "02/06 (Seg)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "prot",
    title: "Proteção Social Especial – CREAS e PAEFI",
    teoria: 40, questoes: 10, anki: 15,
    tasks: [
      "📖 Estude o CREAS (Centro de Referência Especializado): o que é, casos que atende",
      "📖 Estude o PAEFI (Serviço de Proteção e Atendimento Especializado a Famílias e Indivíduos)",
      "📖 Diferença entre Proteção Especial de Média Complexidade e Alta Complexidade",
      "✏️ Resolva 10 questões sobre CREAS/PSE",
      "🃏 Crie 15 flashcards: 'CREAS = proteção ___ ?', 'Exemplos de média complexidade?', 'Exemplos de alta complexidade?'",
      "⏱️ Tempo estimado: 1h40"
    ]
  },
  {
    date: "03/06 (Ter)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "df",
    title: "Programas Sociais do DF – Parte 1",
    teoria: 40, questoes: 10, anki: 15,
    tasks: [
      "📖 Estude o Cartão Prato Cheio: o que é, quem recebe, valor, critério de renda",
      "📖 Estude o Cartão Gás: o que é, quem recebe, valor",
      "📖 Estude o DF Social: o que é, objetivo",
      "✏️ Resolva 10 questões sobre programas sociais do DF",
      "🃏 Crie 15 flashcards sobre os programas: 'Cartão Prato Cheio — critério de renda?', 'Cartão Gás — frequência do benefício?'",
      "⏱️ Tempo estimado: 1h40"
    ]
  },
  {
    date: "04/06 (Qua)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "df",
    title: "Programas Sociais do DF – Parte 2 + Restaurantes Comunitários",
    teoria: 35, questoes: 10, anki: 12,
    tasks: [
      "📖 Estude os Restaurantes Comunitários do DF: localização, preço do prato, objetivo",
      "📖 Estude benefícios eventuais da assistência social (o que são, quem tem direito)",
      "📖 Estude o Programa Bolsa Família (transferência de renda federal — pode cair como contexto)",
      "✏️ Resolva 10 questões sobre programas DF e transferência de renda",
      "🃏 Crie 12 flashcards: 'Preço do prato no restaurante comunitário DF?', 'O que são benefícios eventuais?'",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "05/06 (Qui)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "lp",
    title: "Língua Portuguesa – Classes de Palavras",
    teoria: 35, questoes: 10, anki: 10,
    tasks: [
      "📖 Estude as classes de palavras: substantivo, adjetivo, verbo, advérbio, pronome (foco em função, não em decorar listas)",
      "📖 Estude pronomes: pessoais, demonstrativos, relativos (o 'que' e o 'qual' são os mais cobrados)",
      "✏️ Resolva 10 questões de classes de palavras da Quadrix",
      "🃏 Crie 10 flashcards: diferença entre advérbio/adjetivo, uso dos pronomes relativos",
      "⏱️ Tempo estimado: 1h20"
    ]
  },
  {
    date: "06/06 (Sex)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "rev",
    title: "⟳ REVISÃO SEMANA 2",
    teoria: 0, questoes: 20, anki: 0,
    tasks: [
      "🔁 Faça todos os flashcards Anki acumulados (foque nos cards que o Anki marcou como difíceis)",
      "✏️ Resolva 20 questões mistas: CRAS, CREAS, Programas DF, LP",
      "📝 Releia as anotações dos 3 pontos mais errados da semana passada — você melhorou?",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "07/06 (Sáb)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "folga",
    title: "🛋️ Descanso",
    teoria: 0, questoes: 0, anki: 0,
    tasks: [
      "✅ Dia livre",
      "💡 Opcional: veja um vídeo no YouTube sobre SUAS ou CRAS (visual ajuda o TDAH a consolidar)"
    ]
  },
  // Semana 3 (08–14/jun)
  {
    date: "08/06 (Dom)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "suas",
    title: "Abordagem Social e População em Situação de Rua",
    teoria: 40, questoes: 10, anki: 15,
    tasks: [
      "📖 Estude a Política Nacional para a População em Situação de Rua (Decreto 7.053/2009)",
      "📖 Estude o Serviço Especializado em Abordagem Social: o que é, onde funciona, quem atende",
      "📖 Estude o Centro POP (Centro de Referência Especializado para PSR): o que oferece",
      "✏️ Resolva 10 questões sobre PSR e abordagem social",
      "🃏 Crie 15 flashcards: 'Decreto da PSR?', 'O que é o Centro POP?', 'Quem executa a abordagem social?'",
      "⏱️ Tempo estimado: 1h40"
    ]
  },
  {
    date: "09/06 (Seg)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "suas",
    title: "Saúde Mental, Álcool e Drogas na Assistência Social",
    teoria: 35, questoes: 10, anki: 12,
    tasks: [
      "📖 Estude como a assistência social se relaciona com saúde mental (intersetorialidade com o SUS)",
      "📖 Estude o CAPS (apenas contexto para a assistência social — não é prova de saúde)",
      "📖 Estude noções de redução de danos no contexto do SUAS",
      "✏️ Resolva 10 questões sobre saúde mental no SUAS",
      "🃏 Crie 12 flashcards: conceitos básicos de saúde mental + SUAS",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "10/06 (Ter)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "df",
    title: "Legislação do DF – Direitos Humanos e Política para Mulheres",
    teoria: 40, questoes: 10, anki: 15,
    tasks: [
      "📖 Estude a Lei Maria da Penha (11.340/2006): tipos de violência, medidas protetivas, quem pode acionar",
      "📖 Estude a Política para Mulheres do DF: o que é, objetivos",
      "📖 Estude Direitos Humanos básicos: o que são, declaração universal (artigos principais — 1, 2, 3, 25)",
      "✏️ Resolva 10 questões sobre Lei Maria da Penha e direitos humanos",
      "🃏 Crie 15 flashcards: tipos de violência da Lei Maria da Penha, artigos importantes",
      "⏱️ Tempo estimado: 1h40"
    ]
  },
  {
    date: "11/06 (Qua)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "df",
    title: "Noções de Primeiros Socorros",
    teoria: 35, questoes: 10, anki: 10,
    tasks: [
      "📖 Estude RCP (Reanimação Cardiopulmonar): sequência correta, quantas compressões, relação compressão/ventilação",
      "📖 Estude engasgo: manobra de Heimlich, como fazer em adulto, criança e bebê",
      "📖 Estude sangramentos, desmaios e convulsões: o que fazer e o que NÃO fazer",
      "✏️ Resolva 10 questões de primeiros socorros",
      "🃏 Crie 10 flashcards: sequência do RCP, manobra de Heimlich, o que fazer em convulsão",
      "⏱️ Tempo estimado: 1h20"
    ]
  },
  {
    date: "12/06 (Qui)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "lp",
    title: "Língua Portuguesa – Concordância e Regência",
    teoria: 35, questoes: 10, anki: 10,
    tasks: [
      "📖 Estude concordância verbal: sujeito composto, sujeito coletivo, sujeito oracional",
      "📖 Estude regência verbal: os verbos mais cobrados pela Quadrix (assistir, visar, aspirar, preferir)",
      "📖 Estude regência nominal: casos com 'necessidade de', 'aversão a', etc.",
      "✏️ Resolva 10 questões de concordância e regência da Quadrix",
      "🃏 Crie 10 flashcards: 'Assistir = verbo transitivo ___ quando = ?' com exemplo",
      "⏱️ Tempo estimado: 1h20"
    ]
  },
  {
    date: "13/06 (Sex)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "rev",
    title: "⟳ REVISÃO SEMANA 3",
    teoria: 0, questoes: 20, anki: 0,
    tasks: [
      "🔁 Sessão Anki completa — revise todos os cards com 'difícil' e 'bom'",
      "✏️ Resolva 20 questões mistas desta semana (PSR, Saúde Mental, Legislação DF, Primeiros Socorros, LP)",
      "📝 Separe os temas que mais erraste — são os que precisam de mais atenção na Fase 2",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "14/06 (Sáb)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "folga",
    title: "🛋️ Descanso",
    teoria: 0, questoes: 0, anki: 0,
    tasks: ["✅ Dia livre — descanse, saia, cuide de você!"]
  },
  // Semana 4 (15–21/jun)
  {
    date: "15/06 (Dom)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "suas",
    title: "NOB-SUAS e NOB-RH: O que cobrar em prova",
    teoria: 40, questoes: 10, anki: 15,
    tasks: [
      "📖 Estude NOB-SUAS (2012): finalidade, o que regulamenta, gestão descentralizada",
      "📖 Estude NOB-RH: trabalhadores do SUAS, pisos salariais, plano de carreira (Quadrix adora isso!)",
      "📖 Estude a divisão de competências no SUAS: União, Estado, Município e DF",
      "✏️ Resolva 10 questões sobre NOB-SUAS e NOB-RH",
      "🃏 Crie 15 flashcards sobre divisão de competências e NOBs",
      "⏱️ Tempo estimado: 1h40"
    ]
  },
  {
    date: "16/06 (Seg)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "df",
    title: "Conhecimentos do DF – História e Organização",
    teoria: 35, questoes: 10, anki: 12,
    tasks: [
      "📖 Estude a Lei Orgânica do DF: o que é, quando foi criada, principais diretrizes",
      "📖 Estude a estrutura do governo do DF: GDF, secretarias, conselhos de assistência social",
      "📖 Estude: quando o DF foi fundado, por que é diferente dos municípios (acumula funções)",
      "✏️ Resolva 10 questões sobre o DF e sua organização",
      "🃏 Crie 12 flashcards sobre organização do DF e LODF",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "17/06 (Ter)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "disc",
    title: "Redação Discursiva – Como a Quadrix Cobra",
    teoria: 40, questoes: 0, anki: 0,
    tasks: [
      "📖 Leia como funciona a discursiva do SEDES: texto dissertativo-argumentativo, 20 a 30 linhas",
      "📖 Entenda os critérios de correção: Conteúdo Argumentativo Contextualizado (CAC × 7), Organização Textual (× 1,5), Domínio da Língua Portuguesa (× 1,5)",
      "📖 Estude estrutura da dissertação: introdução (tese), desenvolvimento (2 parágrafos com argumentos), conclusão (proposta de intervenção)",
      "✍️ Escreva seu PRIMEIRO rascunho de redação sobre SUAS (só rascunho, sem pressão — o objetivo é só praticar a estrutura)",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "18/06 (Qua)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "lp",
    title: "Língua Portuguesa – Crase e Colocação Pronominal",
    teoria: 30, questoes: 10, anki: 10,
    tasks: [
      "📖 Estude crase: quando usar, casos proibidos (antes de verbos, masculinos sem artigo, pronomes pessoais)",
      "📖 Estude colocação pronominal: próclise, mesóclise, ênclise — com foco nos atratores da próclise",
      "✏️ Resolva 10 questões de crase e colocação pronominal da Quadrix",
      "🃏 Crie 10 flashcards: regras de crase com exemplos certos/errados",
      "⏱️ Tempo estimado: 1h15"
    ]
  },
  {
    date: "19/06 (Qui)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "suas",
    title: "Rede Socioassistencial e Trabalho em Território",
    teoria: 35, questoes: 10, anki: 12,
    tasks: [
      "📖 Estude o conceito de rede socioassistencial: entidades governamentais e não governamentais",
      "📖 Estude territorialização: o que é, por que o SUAS prioriza o território",
      "📖 Estude vigilância socioassistencial: o que é, para que serve no SUAS",
      "✏️ Resolva 10 questões sobre rede e território no SUAS",
      "🃏 Crie 12 flashcards sobre rede, território e vigilância socioassistencial",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "20/06 (Sex)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "rev",
    title: "⟳ REVISÃO SEMANA 4 + REVISÃO GERAL FASE 1",
    teoria: 0, questoes: 25, anki: 0,
    tasks: [
      "🔁 Sessão Anki — revise TODOS os decks criados até agora (são ~160 cards — reserve 40 min)",
      "✏️ Resolva 25 questões mistas de toda a Fase 1 (misture todos os temas)",
      "📝 Monte uma lista de 5 temas que você ainda se sente insegura — isso vai guiar a Fase 2",
      "⏱️ Tempo estimado: 2h"
    ]
  },
  {
    date: "21/06 (Sáb)", phase: 1, phaseLabel: "FASE 1 – BASE TEÓRICA",
    type: "folga",
    title: "🛋️ Descanso + Inscrição no Concurso",
    teoria: 0, questoes: 0, anki: 0,
    tasks: [
      "✅ Dia livre",
      "⚠️ ATENÇÃO: Inscrições abrem em 09/06 e vão até 13/07. Não esqueça de se inscrever!"
    ]
  },
  // --- FASE 2: APROFUNDAMENTO E QUESTÕES (22/jun a 19/jul) ---
  // Semana 5 (22–28/jun)
  {
    date: "22/06 (Dom)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "suas",
    title: "SUAS Aprofundado – Tipificação dos Serviços",
    teoria: 30, questoes: 15, anki: 10,
    tasks: [
      "📖 Estude a Tipificação Nacional de Serviços Socioassistenciais (Resolução CNAS 109/2009): quais serviços existem, em qual nível de proteção cada um se encaixa",
      "📖 Monte uma tabela mental: PSB → CRAS → PAIF | PSE Média → CREAS → PAEFI | PSE Alta → abrigo, república, casa-lar",
      "✏️ Resolva 15 questões sobre Tipificação e serviços do SUAS",
      "🃏 Adicione 10 cards com a tabela de serviços por nível de proteção",
      "⏱️ Tempo estimado: 1h45"
    ]
  },
  {
    date: "23/06 (Seg)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "lp",
    title: "LP Aprofundada – Interpretação + Tipologia Textual",
    teoria: 30, questoes: 15, anki: 8,
    tasks: [
      "📖 Estude tipologia textual: dissertativo-argumentativo, narrativo, descritivo, injuntivo — foque em como identificar cada um",
      "📖 Estude coesão e coerência: conectivos mais cobrados (entretanto, todavia, portanto, assim sendo)",
      "✏️ Resolva 15 questões de interpretação com textos longos da Quadrix (treina sua resistência ao texto)",
      "🃏 Crie 8 flashcards de conectivos com a relação que expressam",
      "⏱️ Tempo estimado: 1h45"
    ]
  },
  {
    date: "24/06 (Ter)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "df",
    title: "Legislação DF Aprofundada – ECA e Idoso",
    teoria: 35, questoes: 15, anki: 12,
    tasks: [
      "📖 Estude ECA (Lei 8.069/1990): doutrina da proteção integral, Conselho Tutelar, o que é e o que faz",
      "📖 Estude o Estatuto do Idoso (Lei 10.741/2003): direitos, violência, o que é maus-tratos",
      "📖 Estude o Estatuto da Pessoa com Deficiência (Lei 13.146/2015): conceito de deficiência, inclusão",
      "✏️ Resolva 15 questões sobre ECA, Idoso e PCD",
      "🃏 Crie 12 flashcards com artigos-chave do ECA e Estatuto do Idoso",
      "⏱️ Tempo estimado: 1h50"
    ]
  },
  {
    date: "25/06 (Qua)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "suas",
    title: "Gestão do SUAS – CNAS, CMAS e Conselhos",
    teoria: 30, questoes: 15, anki: 10,
    tasks: [
      "📖 Estude o CNAS (Conselho Nacional de Assistência Social): composição, funções, quem nomeia",
      "📖 Estude o CMAS-DF: o que é, para que serve no contexto do DF",
      "📖 Estude o FNAS (Fundo Nacional de Assistência Social) e FEAS: cofinanciamento do SUAS",
      "✏️ Resolva 15 questões sobre gestão e financiamento do SUAS",
      "🃏 Crie 10 flashcards sobre CNAS, fundos e controle social",
      "⏱️ Tempo estimado: 1h45"
    ]
  },
  {
    date: "26/06 (Qui)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "disc",
    title: "Redação Discursiva – Prática 1",
    teoria: 20, questoes: 0, anki: 0,
    tasks: [
      "📖 Releia a estrutura da dissertação (só 10 min de revisão)",
      "✍️ Escreva uma redação completa sobre: 'A importância do CRAS para a proteção social básica no Brasil' (20-30 linhas, com cronômetro: 50 minutos)",
      "🔍 Autoavalie: você teve introdução com tese? 2 argumentos com exemplos? Conclusão com proposta?",
      "⏱️ Tempo estimado: 1h20"
    ]
  },
  {
    date: "27/06 (Sex)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "rev",
    title: "⟳ REVISÃO SEMANA 5",
    teoria: 0, questoes: 20, anki: 0,
    tasks: [
      "🔁 Sessão Anki — priorize os cards com mais erros",
      "✏️ Resolva 20 questões mistas da semana",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "28/06 (Sáb)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "folga",
    title: "🛋️ Descanso",
    teoria: 0, questoes: 0, anki: 0,
    tasks: ["✅ Dia livre"]
  },
  // Semana 6 (29/jun–05/jul)
  {
    date: "29/06 (Dom)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "suas",
    title: "Benefícios Eventuais e Transferência de Renda",
    teoria: 30, questoes: 15, anki: 10,
    tasks: [
      "📖 Estude benefícios eventuais: definição, situações que geram direito (natalidade, morte, calamidade, vulnerabilidade)",
      "📖 Estude o Programa Bolsa Família: critérios de renda, condicionalidades",
      "📖 Estude o BPC-LOAS: diferença entre BPC para idoso e BPC para pessoa com deficiência",
      "✏️ Resolva 15 questões sobre transferência de renda e benefícios",
      "🃏 Crie 10 flashcards sobre BPC, Bolsa Família e benefícios eventuais",
      "⏱️ Tempo estimado: 1h45"
    ]
  },
  {
    date: "30/06 (Seg)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "lp",
    title: "LP – Sintaxe da Oração",
    teoria: 30, questoes: 15, anki: 8,
    tasks: [
      "📖 Estude sujeito e predicado: tipos de sujeito (simples, composto, oculto, indeterminado, inexistente)",
      "📖 Estude objeto direto e indireto: como identificar, diferença com adjunto adverbial",
      "📖 Estude orações subordinadas adjetivas: restritiva vs explicativa (diferença de vírgula!)",
      "✏️ Resolva 15 questões de sintaxe da Quadrix",
      "🃏 Crie 8 flashcards: 'Como identificar objeto indireto?', 'Diferença entre adjetiva restritiva/explicativa?'",
      "⏱️ Tempo estimado: 1h45"
    ]
  },
  {
    date: "01/07 (Ter)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "df",
    title: "Segurança Alimentar e Nutricional – SISAN",
    teoria: 30, questoes: 15, anki: 10,
    tasks: [
      "📖 Estude a LOSAN (Lei 11.346/2006): o que é segurança alimentar, CONSEA, SISAN",
      "📖 Estude o Programa Nacional de Alimentação Escolar (PNAE) no contexto do DF",
      "📖 Estude o Mapa da Fome e o contexto da fome no Brasil (pode cair como atualidade)",
      "✏️ Resolva 15 questões sobre segurança alimentar",
      "🃏 Crie 10 flashcards: 'LOSAN — ano, objetivo?', 'O que é o SISAN?'",
      "⏱️ Tempo estimado: 1h40"
    ]
  },
  {
    date: "02/07 (Qua)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "suas",
    title: "SUAS e Grupos Vulneráveis: Criança, Adolescente, Mulher",
    teoria: 30, questoes: 15, anki: 10,
    tasks: [
      "📖 Estude o SCFV (Serviço de Convivência e Fortalecimento de Vínculos): faixas etárias, o que oferece",
      "📖 Estude violência doméstica no âmbito do SUAS: fluxo de atendimento, encaminhamentos",
      "📖 Estude o SINASE (adolescente em conflito com a lei) no contexto do SUAS",
      "✏️ Resolva 15 questões sobre grupos vulneráveis no SUAS",
      "🃏 Crie 10 flashcards sobre SCFV e fluxos de atendimento",
      "⏱️ Tempo estimado: 1h45"
    ]
  },
  {
    date: "03/07 (Qui)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "disc",
    title: "Redação Discursiva – Prática 2",
    teoria: 10, questoes: 0, anki: 0,
    tasks: [
      "✍️ Escreva uma redação completa sobre: 'O papel do CREAS no combate à violência doméstica' (20-30 linhas, 50 minutos)",
      "🔍 Autoavalie o texto — foque nos conectivos e coesão entre os parágrafos",
      "⏱️ Tempo estimado: 1h"
    ]
  },
  {
    date: "04/07 (Sex)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "rev",
    title: "⟳ REVISÃO SEMANA 6",
    teoria: 0, questoes: 20, anki: 0,
    tasks: [
      "🔁 Sessão Anki completa",
      "✏️ Resolva 20 questões mistas desta semana",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "05/07 (Sáb)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "folga",
    title: "🛋️ Descanso",
    teoria: 0, questoes: 0, anki: 0,
    tasks: ["✅ Dia livre"]
  },
  // Semana 7 (06–12/jul)
  {
    date: "06/07 (Dom)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "sim",
    title: "🎯 SIMULADO 1 – 30 questões",
    teoria: 0, questoes: 30, anki: 0,
    tasks: [
      "📋 Faça um simulado de 30 questões mistas (LP + SUAS + DF + Legislação) no QConcursos",
      "⏱️ Use cronômetro: 60 minutos para as 30 questões",
      "🔍 Corrija TODAS as questões, mesmo as que acertou — leia a explicação",
      "📊 Anote seu percentual de acertos por disciplina (ex: LP: 70%, SUAS: 60%)",
      "⏱️ Tempo estimado: 2h"
    ]
  },
  {
    date: "07/07 (Seg)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "suas",
    title: "Revisão dos Erros do Simulado 1 + SUAS",
    teoria: 20, questoes: 15, anki: 8,
    tasks: [
      "🔁 Revise todos os erros do Simulado 1 — estude o conteúdo de cada erro",
      "📖 Aprofunde o tema em que você mais errou no simulado",
      "✏️ Resolva 15 questões sobre o tema de maior erro",
      "🃏 Crie 8 flashcards dos pontos que erraste no simulado",
      "⏱️ Tempo estimado: 1h45"
    ]
  },
  {
    date: "08/07 (Ter)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "df",
    title: "Legislação DF – Lei Orgânica do DF + SUAS no DF",
    teoria: 30, questoes: 15, anki: 10,
    tasks: [
      "📖 Estude a LODF: artigos sobre assistência social, proteção social, família",
      "📖 Estude a estrutura da SEDES-DF: o que é, subordinação, missão",
      "📖 Estude os Conselhos do DF: CMAS-DF, composição, função",
      "✏️ Resolva 15 questões sobre legislação do DF e SEDES",
      "🃏 Crie 10 flashcards sobre a estrutura do SUAS no DF",
      "⏱️ Tempo estimado: 1h45"
    ]
  },
  {
    date: "09/07 (Qua)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "lp",
    title: "LP – Revisão Completa + Questões Difíceis",
    teoria: 20, questoes: 15, anki: 0,
    tasks: [
      "📖 Revise os tópicos de LP que mais errou (crase? regência? interpretação?)",
      "✏️ Resolva 15 questões de LP difíceis da Quadrix — foque em questões de nível médio/alto",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "10/07 (Qui)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "disc",
    title: "Redação Discursiva – Prática 3",
    teoria: 0, questoes: 0, anki: 0,
    tasks: [
      "✍️ Escreva uma redação sobre: 'Segurança alimentar como direito social: o papel da assistência social' (20-30 linhas, 50 minutos)",
      "🔍 Autoavalie: introdução com tese clara? Argumentos com dados do SUAS? Proposta de intervenção?",
      "⏱️ Tempo estimado: 1h"
    ]
  },
  {
    date: "11/07 (Sex)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "rev",
    title: "⟳ REVISÃO SEMANA 7",
    teoria: 0, questoes: 20, anki: 0,
    tasks: [
      "🔁 Sessão Anki — revise TODOS os decks",
      "✏️ Resolva 20 questões mistas",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "12/07 (Sáb)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "folga",
    title: "🛋️ Descanso",
    teoria: 0, questoes: 0, anki: 0,
    tasks: ["✅ Dia livre", "⚠️ Prazo de inscrição: até 13/07! Confirme que sua inscrição está OK."]
  },
  // Semana 8 (13–19/jul)
  {
    date: "13/07 (Dom)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "suas",
    title: "SUAS – Revisão Total com Questões",
    teoria: 0, questoes: 20, anki: 0,
    tasks: [
      "📖 Releia seu material de SUAS (pode ser os flashcards Anki — uns 30 minutos)",
      "✏️ Resolva 20 questões de SUAS/LOAS/PNAS misturando todos os subteams",
      "📊 Calcule seu percentual de acerto em SUAS — meta: acima de 70%",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "14/07 (Seg)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "df",
    title: "Programas DF – Revisão Total",
    teoria: 0, questoes: 20, anki: 0,
    tasks: [
      "📖 Revise mentalmente (ou nos cards Anki) todos os programas: Cartão Prato Cheio, Cartão Gás, DF Social, Restaurantes, BPC, Bolsa Família",
      "✏️ Resolva 20 questões sobre programas DF e legislação",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "15/07 (Ter)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "lp",
    title: "LP – Revisão Total",
    teoria: 0, questoes: 20, anki: 0,
    tasks: [
      "📖 Revise os tópicos de LP pelos cards Anki",
      "✏️ Resolva 20 questões de LP — variadas (interpretação, ortografia, gramática)",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "16/07 (Qua)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "sim",
    title: "🎯 SIMULADO 2 – 40 questões",
    teoria: 0, questoes: 40, anki: 0,
    tasks: [
      "📋 Faça um simulado de 40 questões (mais próximo do formato real da prova)",
      "⏱️ Use cronômetro: 90 minutos",
      "🔍 Corrija tudo e anote os erros por disciplina",
      "📊 Compare com o Simulado 1 — você melhorou?",
      "⏱️ Tempo estimado: 2h30"
    ]
  },
  {
    date: "17/07 (Qui)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "suas",
    title: "Revisão dos Erros do Simulado 2",
    teoria: 20, questoes: 15, anki: 5,
    tasks: [
      "🔁 Revise todos os erros do Simulado 2",
      "📖 Estude os conteúdos de cada erro",
      "✏️ Resolva 15 questões extras nos temas com mais erros",
      "⏱️ Tempo estimado: 1h45"
    ]
  },
  {
    date: "18/07 (Sex)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "rev",
    title: "⟳ REVISÃO SEMANA 8 + FIM DA FASE 2",
    teoria: 0, questoes: 20, anki: 0,
    tasks: [
      "🔁 Sessão Anki completa — última revisão de todos os decks",
      "✏️ Resolva 20 questões mistas",
      "📝 Faça um balanço: quais matérias você domina? Quais ainda precisam de atenção?",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "19/07 (Sáb)", phase: 2, phaseLabel: "FASE 2 – APROFUNDAMENTO",
    type: "folga",
    title: "🛋️ Descanso",
    teoria: 0, questoes: 0, anki: 0,
    tasks: ["✅ Dia livre — você chegou na metade! Isso é muito!"]
  },
  // --- FASE 3: INTENSIVO (20/jul a 23/ago) ---
  // Semana 9 (20–26/jul)
  {
    date: "20/07 (Dom)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "suas",
    title: "Bateria SUAS – 30 questões",
    teoria: 0, questoes: 30, anki: 0,
    tasks: [
      "✏️ 30 questões de SUAS/LOAS/PNAS — sem teoria, só questões",
      "🔍 Corrija e anote os erros",
      "🔁 Anki (15 min)",
      "⏱️ Tempo estimado: 1h45"
    ]
  },
  {
    date: "21/07 (Seg)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "df",
    title: "Bateria Programas DF – 30 questões",
    teoria: 0, questoes: 30, anki: 0,
    tasks: [
      "✏️ 30 questões sobre programas e legislação do DF",
      "🔍 Corrija e anote os erros",
      "🔁 Anki (15 min)",
      "⏱️ Tempo estimado: 1h45"
    ]
  },
  {
    date: "22/07 (Ter)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "lp",
    title: "Bateria LP – 30 questões",
    teoria: 0, questoes: 30, anki: 0,
    tasks: [
      "✏️ 30 questões de Língua Portuguesa",
      "🔍 Corrija e anote os erros",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "23/07 (Qua)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "prot",
    title: "Bateria Proteção Social – 30 questões",
    teoria: 0, questoes: 30, anki: 0,
    tasks: [
      "✏️ 30 questões sobre CRAS, CREAS, PSB, PSE",
      "🔍 Corrija e anote os erros",
      "🔁 Anki (15 min)",
      "⏱️ Tempo estimado: 1h45"
    ]
  },
  {
    date: "24/07 (Qui)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "disc",
    title: "Redação Discursiva – Prática 4",
    teoria: 0, questoes: 0, anki: 0,
    tasks: [
      "✍️ Redação sobre: 'Desafios do SUAS no atendimento à população em situação de rua' (50 min, cronômetro)",
      "🔍 Autoavalie com os critérios reais da Quadrix (CAC, OT, DLP)",
      "⏱️ Tempo estimado: 1h"
    ]
  },
  {
    date: "25/07 (Sex)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "rev",
    title: "⟳ REVISÃO + Anki",
    teoria: 0, questoes: 20, anki: 0,
    tasks: [
      "🔁 Sessão Anki longa (30 min — todos os cards difíceis)",
      "✏️ 20 questões sobre os temas mais errados da semana",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "26/07 (Sáb)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "folga",
    title: "🛋️ Descanso",
    teoria: 0, questoes: 0, anki: 0,
    tasks: ["✅ Dia livre"]
  },
  // Semana 10 (27/jul–02/ago)
  {
    date: "27/07 (Dom)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "sim",
    title: "🎯 SIMULADO 3 – 50 questões (formato real)",
    teoria: 0, questoes: 50, anki: 0,
    tasks: [
      "📋 Simulado de 50 questões (20 Gerais + 30 Específicas) — formato real do SEDES",
      "⏱️ Cronômetro: 2h",
      "🔍 Corrija tudo com atenção",
      "📊 Meta: acerto geral acima de 65%",
      "⏱️ Tempo estimado: 3h"
    ]
  },
  {
    date: "28/07 (Seg)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "suas",
    title: "Revisão Erros Simulado 3 + SUAS",
    teoria: 20, questoes: 20, anki: 0,
    tasks: [
      "🔁 Revise todos os erros do Simulado 3",
      "✏️ 20 questões extras nos temas mais errados",
      "⏱️ Tempo estimado: 1h45"
    ]
  },
  {
    date: "29/07 (Ter)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "df",
    title: "Bateria Legislação – 30 questões",
    teoria: 0, questoes: 30, anki: 0,
    tasks: [
      "✏️ 30 questões de legislação: ECA, Idoso, Lei Maria da Penha, LOAS",
      "🔍 Corrija tudo",
      "🔁 Anki 15 min",
      "⏱️ Tempo estimado: 1h45"
    ]
  },
  {
    date: "30/07 (Qua)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "lp",
    title: "Bateria LP + Revisão de Pontos Críticos",
    teoria: 0, questoes: 30, anki: 0,
    tasks: [
      "✏️ 30 questões de LP (foque em concordância, crase e interpretação — os 3 mais cobrados)",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "31/07 (Qui)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "disc",
    title: "Redação – Prática 5 + Revisão das Anteriores",
    teoria: 0, questoes: 0, anki: 0,
    tasks: [
      "✍️ Redação: 'A intersetorialidade como estratégia do SUAS' (50 min)",
      "🔍 Releia suas 4 redações anteriores — veja a evolução",
      "⏱️ Tempo estimado: 1h20"
    ]
  },
  {
    date: "01/08 (Sex)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "rev",
    title: "⟳ REVISÃO SEMANA 10",
    teoria: 0, questoes: 20, anki: 0,
    tasks: [
      "🔁 Anki completo",
      "✏️ 20 questões mistas",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "02/08 (Sáb)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "folga",
    title: "🛋️ Descanso",
    teoria: 0, questoes: 0, anki: 0,
    tasks: ["✅ Dia livre"]
  },
  // Semanas 11–14 (03/ago a 23/ago) — resumidas
  {
    date: "03/08 (Dom)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "suas",
    title: "Bateria SUAS – 30 questões",
    teoria: 0, questoes: 30, anki: 0,
    tasks: ["✏️ 30 questões de SUAS + Anki 15 min", "⏱️ Tempo estimado: 1h45"]
  },
  {
    date: "04/08 (Seg)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "df",
    title: "Bateria Programas DF – 30 questões",
    teoria: 0, questoes: 30, anki: 0,
    tasks: ["✏️ 30 questões de programas DF + Anki 15 min", "⏱️ Tempo estimado: 1h45"]
  },
  {
    date: "05/08 (Ter)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "lp",
    title: "Bateria LP – 30 questões",
    teoria: 0, questoes: 30, anki: 0,
    tasks: ["✏️ 30 questões de LP", "⏱️ Tempo estimado: 1h30"]
  },
  {
    date: "06/08 (Qua)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "sim",
    title: "🎯 SIMULADO 4 – 60 questões (prova completa!)",
    teoria: 0, questoes: 60, anki: 0,
    tasks: [
      "📋 Simulado COMPLETO de 60 questões (formato idêntico ao SEDES: 20 gerais + 40 específicas)",
      "⏱️ Cronômetro: 4h (como vai ser no dia real)",
      "🔍 Corrija tudo",
      "📊 Meta: acerto geral acima de 70%",
      "⏱️ Tempo estimado: 5h (dia dedicado!)"
    ]
  },
  {
    date: "07/08 (Qui)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "suas",
    title: "Revisão Erros Simulado 4",
    teoria: 20, questoes: 20, anki: 0,
    tasks: ["🔁 Revise todos os erros", "✏️ 20 questões nos temas mais errados", "⏱️ Tempo estimado: 1h45"]
  },
  {
    date: "08/08 (Sex)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "rev",
    title: "⟳ REVISÃO + Anki",
    teoria: 0, questoes: 20, anki: 0,
    tasks: ["🔁 Anki completo", "✏️ 20 questões mistas", "⏱️ Tempo estimado: 1h30"]
  },
  {
    date: "09/08 (Sáb)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "folga",
    title: "🛋️ Descanso",
    teoria: 0, questoes: 0, anki: 0,
    tasks: ["✅ Dia livre"]
  },
  {
    date: "10/08 (Dom)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "suas",
    title: "Bateria Geral – 30 questões SUAS",
    teoria: 0, questoes: 30, anki: 0,
    tasks: ["✏️ 30 questões SUAS + Anki 15 min", "⏱️ Tempo estimado: 1h45"]
  },
  {
    date: "11/08 (Seg)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "df",
    title: "Bateria Legislação DF – 30 questões",
    teoria: 0, questoes: 30, anki: 0,
    tasks: ["✏️ 30 questões legislação DF + Anki 15 min", "⏱️ Tempo estimado: 1h45"]
  },
  {
    date: "12/08 (Ter)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "lp",
    title: "Bateria LP – 30 questões",
    teoria: 0, questoes: 30, anki: 0,
    tasks: ["✏️ 30 questões LP", "⏱️ Tempo estimado: 1h30"]
  },
  {
    date: "13/08 (Qua)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "disc",
    title: "Redação – Prática 6",
    teoria: 0, questoes: 0, anki: 0,
    tasks: [
      "✍️ Redação: 'Benefícios eventuais e proteção social: garantia de direitos' (50 min)",
      "🔍 Autoavalie com os critérios da Quadrix",
      "⏱️ Tempo estimado: 1h"
    ]
  },
  {
    date: "14/08 (Qui)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "suas",
    title: "Bateria Específica – temas mais cobrados",
    teoria: 0, questoes: 30, anki: 0,
    tasks: ["✏️ 30 questões nos temas de maior erro histórico nos seus simulados", "⏱️ Tempo estimado: 1h30"]
  },
  {
    date: "15/08 (Sex)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "rev",
    title: "⟳ REVISÃO SEMANA 13",
    teoria: 0, questoes: 20, anki: 0,
    tasks: ["🔁 Anki completo", "✏️ 20 questões mistas", "⏱️ Tempo estimado: 1h30"]
  },
  {
    date: "16/08 (Sáb)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "folga",
    title: "🛋️ Descanso",
    teoria: 0, questoes: 0, anki: 0,
    tasks: ["✅ Dia livre"]
  },
  {
    date: "17/08 (Dom)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "sim",
    title: "🎯 SIMULADO 5 – 60 questões CRONOMETRADO",
    teoria: 0, questoes: 60, anki: 0,
    tasks: [
      "📋 Simulado completo de 60 questões com 4h de cronômetro",
      "📊 Meta: acerto geral acima de 75%",
      "🔍 Corrija e anote erros",
      "⏱️ Tempo estimado: 5h"
    ]
  },
  {
    date: "18/08 (Seg)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "suas",
    title: "Revisão Erros Simulado 5",
    teoria: 20, questoes: 20, anki: 0,
    tasks: ["🔁 Revise todos os erros", "✏️ 20 questões extras", "⏱️ Tempo estimado: 1h45"]
  },
  {
    date: "19/08 (Ter)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "df",
    title: "Bateria Final DF – 30 questões",
    teoria: 0, questoes: 30, anki: 0,
    tasks: ["✏️ 30 questões DF", "🔁 Anki 15 min", "⏱️ Tempo estimado: 1h45"]
  },
  {
    date: "20/08 (Qua)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "lp",
    title: "Bateria Final LP – 30 questões",
    teoria: 0, questoes: 30, anki: 0,
    tasks: ["✏️ 30 questões LP", "⏱️ Tempo estimado: 1h30"]
  },
  {
    date: "21/08 (Qui)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "disc",
    title: "Redação – Prática 7 (penúltima antes da prova)",
    teoria: 0, questoes: 0, anki: 0,
    tasks: [
      "✍️ Redação livre — escolha um tema do edital que ainda te gera insegurança (50 min)",
      "⏱️ Tempo estimado: 1h"
    ]
  },
  {
    date: "22/08 (Sex)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "rev",
    title: "⟳ REVISÃO GERAL FASE 3",
    teoria: 0, questoes: 25, anki: 0,
    tasks: [
      "🔁 Anki completo — última revisão profunda de todos os decks",
      "✏️ 25 questões mistas",
      "📝 Monte uma lista final dos 10 pontos que mais precisam de atenção na Fase 4",
      "⏱️ Tempo estimado: 2h"
    ]
  },
  {
    date: "23/08 (Sáb)", phase: 3, phaseLabel: "FASE 3 – INTENSIVO DE QUESTÕES",
    type: "folga",
    title: "🛋️ Descanso",
    teoria: 0, questoes: 0, anki: 0,
    tasks: ["✅ Dia livre — você está na reta final! Respira e segue."]
  },
  // --- FASE 4: REVISÃO FINAL (24/ago a 30/ago) ---
  {
    date: "24/08 (Dom)", phase: 4, phaseLabel: "FASE 4 – REVISÃO FINAL",
    type: "suas",
    title: "Revisão Final SUAS – Só os pontos mais quentes",
    teoria: 30, questoes: 15, anki: 0,
    tasks: [
      "📖 Releia: LOAS (artigos 1-6), PNAS (objetivos), Tipificação (serviços por nível)",
      "🔁 Anki — apenas os cards marcados como difíceis",
      "✏️ 15 questões de SUAS",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "25/08 (Seg)", phase: 4, phaseLabel: "FASE 4 – REVISÃO FINAL",
    type: "df",
    title: "Revisão Final DF – Programas e Legislação",
    teoria: 30, questoes: 15, anki: 0,
    tasks: [
      "📖 Revise: Cartão Prato Cheio, Cartão Gás, DF Social, Lei Maria da Penha, ECA (pontos-chave)",
      "🔁 Anki — cards difíceis de legislação",
      "✏️ 15 questões de legislação DF",
      "⏱️ Tempo estimado: 1h30"
    ]
  },
  {
    date: "26/08 (Ter)", phase: 4, phaseLabel: "FASE 4 – REVISÃO FINAL",
    type: "lp",
    title: "Revisão Final LP",
    teoria: 20, questoes: 15, anki: 0,
    tasks: [
      "📖 Revise: crase, concordância, regência e interpretação (pontos mais errados)",
      "✏️ 15 questões de LP",
      "⏱️ Tempo estimado: 1h15"
    ]
  },
  {
    date: "27/08 (Qua)", phase: 4, phaseLabel: "FASE 4 – REVISÃO FINAL",
    type: "disc",
    title: "Redação Final – Prática 8",
    teoria: 0, questoes: 0, anki: 0,
    tasks: [
      "✍️ Redação sobre tema livre do edital (50 min, cronômetro)",
      "🔍 Avalie com os critérios da Quadrix — você está pronta!",
      "⏱️ Tempo estimado: 1h"
    ]
  },
  {
    date: "28/08 (Qui)", phase: 4, phaseLabel: "FASE 4 – REVISÃO FINAL",
    type: "sim",
    title: "🎯 SIMULADO FINAL – 60 questões",
    teoria: 0, questoes: 60, anki: 0,
    tasks: [
      "📋 Último simulado completo, com 4h de cronômetro",
      "📊 Não se estresse com a nota — só observe onde está",
      "🔍 Corrija apenas as questões de dúvida",
      "⏱️ Tempo estimado: 5h"
    ]
  },
  {
    date: "29/08 (Sex)", phase: 4, phaseLabel: "FASE 4 – REVISÃO FINAL",
    type: "rev",
    title: "⟳ Revisão Leve – Anki e Pontos-Chave",
    teoria: 20, questoes: 10, anki: 0,
    tasks: [
      "🔁 Anki — apenas os cards difíceis (30 min)",
      "📖 Leia suas anotações dos pontos mais críticos — não estude coisa nova!",
      "✏️ 10 questões para aquecer a mente",
      "⏱️ Tempo estimado: 1h"
    ]
  },
  {
    date: "30/08 (Sáb)", phase: 4, phaseLabel: "FASE 4 – REVISÃO FINAL",
    type: "folga",
    title: "🛋️ Descanso TOTAL",
    teoria: 0, questoes: 0, anki: 0,
    tasks: [
      "✅ Descanso total — não estude nada!",
      "🗺️ Consulte o local de prova (vai ser divulgado no site do Quadrix)",
      "🎒 Separe o material: documento com foto, caneta azul ou preta transparente, lanche",
      "😴 Durma cedo!"
    ]
  },
];

const phases = [
  { id: 1, label: "Fase 1", desc: "Base Teórica", dates: "25/mai – 21/jun", color: PHASE_COLORS[1] },
  { id: 2, label: "Fase 2", desc: "Aprofundamento", dates: "22/jun – 19/jul", color: PHASE_COLORS[2] },
  { id: 3, label: "Fase 3", desc: "Intensivo", dates: "20/jul – 23/ago", color: PHASE_COLORS[3] },
  { id: 4, label: "Fase 4", desc: "Revisão Final", dates: "24/ago – 30/ago", color: PHASE_COLORS[4] },
];

export default function App() {
  const [selectedPhase, setSelectedPhase] = useState(1);
  const [selectedDay, setSelectedDay] = useState(null);
  const [completedDays, setCompletedDays] = useState(() => {
    try {
      const saved = localStorage.getItem("sedes-completed");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sedes-completed", JSON.stringify(completedDays));
    } catch {}
  }, [completedDays]);

  const filteredDays = useMemo(
    () => schedule.filter((d) => d.phase === selectedPhase),
    [selectedPhase]
  );

  const totalQuestoes = useMemo(
    () => schedule.reduce((a, d) => a + (d.questoes || 0), 0),
    []
  );

  const completedCount = Object.values(completedDays).filter(Boolean).length;
  const totalDays = schedule.filter(d => d.type !== "folga").length;

  const toggleDay = (date) => {
    setCompletedDays((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  const c = selectedDay ? COLORS[selectedDay.type] : null;

  return (
    <div style={{
      fontFamily: "'Georgia', serif",
      background: "#0a0f1a",
      minHeight: "100vh",
      color: "#e8e4d8",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0d1b2a 0%, #1a2e45 50%, #0d1b2a 100%)",
        borderBottom: "2px solid #1e3a5f",
        padding: "24px 20px 20px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(74,158,255,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(74,223,127,0.06) 0%, transparent 60%)",
        }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#4a9eff", textTransform: "uppercase", marginBottom: "6px" }}>
            Concurso SEDES-DF 2026 · TDAS Nível Médio · Banca Quadrix
          </div>
          <h1 style={{ margin: "0 0 4px", fontSize: "22px", fontWeight: "normal", color: "#fff", letterSpacing: "0.5px" }}>
            Plano de Estudos Completo
          </h1>
          <div style={{ fontSize: "13px", color: "#8ab4d8" }}>
            25 de maio → 30 de agosto · Prova: <span style={{ color: "#ffaa33", fontWeight: "bold" }}>06 de setembro de 2026</span>
          </div>

          {/* Progress */}
          <div style={{ marginTop: "16px", display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            {[
              { label: "Dias de Estudo", val: totalDays },
              { label: "Total de Questões", val: totalQuestoes + "+" },
              { label: "Simulados", val: "6" },
              { label: "Redações", val: "8" },
              { label: "Concluídos", val: `${completedCount}/${totalDays}` },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: "bold", color: "#4a9eff" }}>{s.val}</div>
                <div style={{ fontSize: "10px", color: "#6a8aaa", letterSpacing: "1px", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phase selector */}
      <div style={{ display: "flex", gap: "8px", padding: "16px 16px 8px", overflowX: "auto" }}>
        {phases.map((p) => {
          const pDays = schedule.filter(d => d.phase === p.id && d.type !== "folga");
          const pDone = pDays.filter(d => completedDays[d.date]).length;
          return (
            <button
              key={p.id}
              onClick={() => { setSelectedPhase(p.id); setSelectedDay(null); }}
              style={{
                flexShrink: 0,
                padding: "10px 14px",
                background: selectedPhase === p.id ? p.color : "rgba(255,255,255,0.05)",
                border: `1px solid ${selectedPhase === p.id ? p.color : "rgba(255,255,255,0.1)"}`,
                borderRadius: "8px",
                color: selectedPhase === p.id ? "#000" : "#aaa",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: "11px", fontWeight: "bold", letterSpacing: "1px" }}>{p.label}</div>
              <div style={{ fontSize: "10px", opacity: 0.8 }}>{p.desc}</div>
              <div style={{ fontSize: "9px", opacity: 0.7 }}>{p.dates}</div>
              <div style={{ fontSize: "9px", marginTop: "2px", fontWeight: "bold" }}>{pDone}/{pDays.length} dias</div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", padding: "0 16px 12px" }}>
        {Object.entries(COLORS).map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: v.accent }} />
            <span style={{ fontSize: "10px", color: "#6a8aaa" }}>{v.label}</span>
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div style={{ padding: "0 16px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "8px" }}>
        {filteredDays.map((day) => {
          const col = COLORS[day.type];
          const done = completedDays[day.date];
          const isSelected = selectedDay?.date === day.date;
          return (
            <div
              key={day.date}
              onClick={() => setSelectedDay(isSelected ? null : day)}
              style={{
                background: isSelected
                  ? col.bg
                  : done
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${isSelected ? col.accent : done ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.06)"}`,
                borderLeft: `3px solid ${col.accent}`,
                borderRadius: "8px",
                padding: "10px",
                cursor: "pointer",
                transition: "all 0.2s",
                opacity: done ? 0.5 : 1,
                position: "relative",
              }}
            >
              {done && (
                <div style={{
                  position: "absolute", top: "6px", right: "8px",
                  color: "#4adf7f", fontSize: "14px"
                }}>✓</div>
              )}
              <div style={{ fontSize: "10px", color: col.accent, letterSpacing: "0.5px", fontWeight: "bold" }}>
                {day.date}
              </div>
              <div style={{ fontSize: "11px", color: "#ddd", marginTop: "4px", lineHeight: "1.3" }}>
                {day.title}
              </div>
              {day.questoes > 0 && (
                <div style={{ fontSize: "9px", color: "#6a8aaa", marginTop: "4px" }}>
                  {day.questoes} questões
                  {day.anki > 0 && ` · ${day.anki} cards`}
                </div>
              )}
              {day.type === "folga" && (
                <div style={{ fontSize: "10px", color: "#666", marginTop: "4px" }}>Descanso</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      {selectedDay && (
        <div style={{
          margin: "16px",
          background: `linear-gradient(135deg, ${c.bg}dd, #0a0f1a)`,
          border: `1px solid ${c.accent}44`,
          borderLeft: `4px solid ${c.accent}`,
          borderRadius: "12px",
          padding: "20px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <div>
              <div style={{ fontSize: "12px", color: c.accent, letterSpacing: "2px", textTransform: "uppercase" }}>
                {selectedDay.phaseLabel} · {selectedDay.date}
              </div>
              <h2 style={{ margin: "4px 0 0", fontSize: "18px", color: "#fff", fontWeight: "normal" }}>
                {selectedDay.title}
              </h2>
            </div>
            <button
              onClick={() => toggleDay(selectedDay.date)}
              style={{
                background: completedDays[selectedDay.date] ? "#4adf7f22" : "rgba(255,255,255,0.05)",
                border: `1px solid ${completedDays[selectedDay.date] ? "#4adf7f" : "rgba(255,255,255,0.2)"}`,
                color: completedDays[selectedDay.date] ? "#4adf7f" : "#aaa",
                padding: "8px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "12px",
                flexShrink: 0,
              }}
            >
              {completedDays[selectedDay.date] ? "✓ Feito!" : "Marcar como feito"}
            </button>
          </div>

          {/* Stats row */}
          {(selectedDay.teoria > 0 || selectedDay.questoes > 0 || selectedDay.anki > 0) && (
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
              {selectedDay.teoria > 0 && (
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "6px", padding: "8px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: "16px", fontWeight: "bold", color: c.accent }}>{selectedDay.teoria} min</div>
                  <div style={{ fontSize: "9px", color: "#6a8aaa", textTransform: "uppercase" }}>Teoria</div>
                </div>
              )}
              {selectedDay.questoes > 0 && (
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "6px", padding: "8px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: "16px", fontWeight: "bold", color: c.accent }}>{selectedDay.questoes}</div>
                  <div style={{ fontSize: "9px", color: "#6a8aaa", textTransform: "uppercase" }}>Questões</div>
                </div>
              )}
              {selectedDay.anki > 0 && (
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "6px", padding: "8px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: "16px", fontWeight: "bold", color: c.accent }}>{selectedDay.anki}</div>
                  <div style={{ fontSize: "9px", color: "#6a8aaa", textTransform: "uppercase" }}>Cards Anki</div>
                </div>
              )}
            </div>
          )}

          {/* Task list */}
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#6a8aaa", textTransform: "uppercase", marginBottom: "10px" }}>
              O que fazer hoje
            </div>
            {selectedDay.tasks.map((task, i) => (
              <div key={i} style={{
                display: "flex",
                gap: "10px",
                padding: "8px 0",
                borderBottom: i < selectedDay.tasks.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                lineHeight: "1.5",
              }}>
                <span style={{ fontSize: "13px", flexShrink: 0, marginTop: "1px" }}>{task.split(" ")[0]}</span>
                <span style={{ fontSize: "13px", color: "#ccc" }}>{task.split(" ").slice(1).join(" ")}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer tip */}
      <div style={{
        margin: "16px",
        padding: "14px 16px",
        background: "rgba(74,158,255,0.06)",
        border: "1px solid rgba(74,158,255,0.15)",
        borderRadius: "8px",
        fontSize: "12px",
        color: "#8ab4d8",
        lineHeight: "1.6",
      }}>
        <strong style={{ color: "#4a9eff" }}>💡 Dica TDAH:</strong> Clique em qualquer dia para ver as tarefas detalhadas. 
        Marque como feito para acompanhar seu progresso. 
        Se perder um dia, <strong>não tente compensar</strong> — apenas continue do próximo dia. 
        Consistência bate intensidade.
      </div>

      <div style={{ height: "32px" }} />
    </div>
  );
}
