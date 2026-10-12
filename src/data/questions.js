
export const questions = [
  // ========================================
  // NÍVEL BÁSICO — PERGUNTAS 1 A 4
  // ========================================
  {
    id: 1,
    level: 'basic',
    question:
      'A célula B2 contém a quantidade de produtos e C2 contém o preço unitário. Qual fórmula calcula o valor total?',
    options: [
      '=B2+C2',
      '=B2*C2',
      '=B2/C2',
      '=SOMA(B2:C2)',
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    level: 'basic',
    question:
      'Qual função soma os valores das células A1 até A10?',
    options: [
      '=CONT.NÚM(A1:A10)',
      '=MÉDIA(A1:A10)',
      '=SOMA(A1:A10)',
      '=MÁXIMO(A1:A10)',
    ],
    correctAnswer: 2,
  },
  {
    id: 3,
    level: 'basic',
    question:
      'Na fórmula =$B$2*C3, o que acontece com a referência $B$2 quando a fórmula é copiada para outra célula?',
    options: [
      'A coluna e a linha permanecem fixas',
      'A coluna muda, mas a linha permanece fixa',
      'A coluna permanece fixa, mas a linha muda',
      'A coluna e a linha mudam',
    ],
    correctAnswer: 0,
  },
  {
    id: 4,
    level: 'basic',
    question:
      'Você tem uma tabela com nomes de clientes e valores de compras. Quer exibir apenas os clientes com compras acima de R$ 500, sem excluir os demais registros. Qual recurso deve usar?',
    options: [
      'Classificar em ordem alfabética',
      'Mesclar células',
      'Remover duplicatas',
      'Filtro numérico — Maior que',
    ],
    correctAnswer: 3,
  },

  // ========================================
  // NÍVEL INTERMEDIÁRIO — PERGUNTAS 5 A 8
  // ========================================
  {
    id: 5,
    level: 'intermediate',
    question:
      'Na coluna A estão as regiões e na coluna B estão os valores de vendas. Qual função soma apenas as vendas da região Sul?',
    options: [
      'CONT.SE',
      'SOMASE',
      'MÉDIA',
      'MÁXIMO',
    ],
    correctAnswer: 1,
  },
  {
    id: 6,
    level: 'intermediate',
    question:
      'Você precisa contar quantas vezes a palavra "Pago" aparece no intervalo C2:C100. Qual função é mais adequada?',
    options: [
      'SOMA',
      'CONT.NÚM',
      'CONT.SE',
      'SOMASE',
    ],
    correctAnswer: 2,
  },
  {
    id: 7,
    level: 'intermediate',
    question:
      'Você possui uma base de vendas com centenas de registros e quer resumir o total vendido por região e por mês, podendo reorganizar os campos rapidamente. Qual recurso é mais adequado?',
    options: [
      'Tabela dinâmica',
      'Formatação condicional',
      'Congelar painéis',
      'Validação de dados',
    ],
    correctAnswer: 0,
  },
  {
    id: 8,
    level: 'intermediate',
    question:
      'Você quer destacar automaticamente, em vermelho, as vendas abaixo da meta. Qual recurso deve usar?',
    options: [
      'Classificação de dados',
      'Texto para colunas',
      'Congelar painéis',
      'Formatação condicional',
    ],
    correctAnswer: 3,
  },

  // ========================================
  // NÍVEL AVANÇADO — PERGUNTAS 9 A 12
  // ========================================
  {
    id: 9,
    level: 'advanced',
    question:
      'Você recebe semanalmente arquivos de vendas e precisa importar, limpar e padronizar os dados, repetindo as mesmas etapas a cada atualização. Qual recurso é mais adequado?',
    options: [
      'Formatação condicional',
      'Power Query',
      'Congelar painéis',
      'Validação de dados',
    ],
    correctAnswer: 1,
  },
  {
    id: 10,
    level: 'advanced',
    question:
      'Você precisa procurar um código de produto em uma tabela e retornar a descrição correspondente. No Excel moderno, qual função permite procurar em uma coluna e retornar o resultado de outra coluna, mesmo que ela esteja à esquerda da coluna pesquisada?',
    options: [
      'CONT.SE',
      'SOMASE',
      'PROCX',
      'SUBTOTAL',
    ],
    correctAnswer: 2,
  },
  {
    id: 11,
    level: 'advanced',
    question:
      'Você precisa criar medidas que calculem indicadores usando tabelas relacionadas em um modelo de dados do Excel. Qual ferramenta ou linguagem é mais apropriada para criar essas medidas?',
    options: [
      'DAX no Modelo de Dados',
      'Formatação condicional',
      'Validação de dados',
      'Localizar e substituir',
    ],
    correctAnswer: 0,
  },
  {
    id: 12,
    level: 'advanced',
    question:
      'Você precisa automatizar uma sequência de tarefas repetitivas no Excel, incluindo ações que normalmente executaria manualmente. Qual recurso é voltado à automação por meio de código no Excel?',
    options: [
      'Filtro automático',
      'Formatação como tabela',
      'Congelar painéis',
      'Macros com VBA',
    ],
    correctAnswer: 3,
  },
]
