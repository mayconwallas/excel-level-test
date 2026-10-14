
import { useState } from 'react'
import { questions } from '../data/questions'
import { trackEvent } from '../analytics'

const LEVELS = ['basic', 'intermediate', 'advanced']

const LEVEL_LABELS = {
  basic: 'Fundamentos do Excel',
  intermediate: 'Funções e análise de dados',
  advanced: 'Recursos avançados e automação',
}

const LEVEL_NAMES = {
  basic: 'Básico',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
}

// Calcula os acertos de cada nível.
function calculateLevelResults(answerList) {
  return LEVELS.map((level) => {
    const levelQuestions = questions
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.level === level)

    const correct = levelQuestions.filter(
      ({ item, index }) => item.correctAnswer === answerList[index],
    ).length

    return {
      level,
      correct,
      total: levelQuestions.length,
    }
  })
}

// Considera aprovado quem acerta pelo menos 75% das questões do nível.
function hasPassedLevel(result) {
  return (
    result != null &&
    result.total > 0 &&
    result.correct >= Math.ceil(result.total * 0.75)
  )
}

// Determina a classificação com base nos três níveis.
function getClassification(levelResults) {
  const basic = levelResults.find((item) => item.level === 'basic')
  const intermediate = levelResults.find(
    (item) => item.level === 'intermediate',
  )
  const advanced = levelResults.find(
    (item) => item.level === 'advanced',
  )

  if (!hasPassedLevel(basic)) {
    return 'beginner'
  }

  if (!hasPassedLevel(intermediate)) {
    return 'basic'
  }

  if (!hasPassedLevel(advanced)) {
    return 'intermediate'
  }

  return 'advanced'
}

const RESULT_DETAILS = {
  beginner: {
    title: 'Nível iniciante',
    description:
      'Você está construindo sua base no Excel. Recomendamos reforçar fórmulas, referências de células e organização de dados antes de avançar.',
    recommendation:
      'Pratique fórmulas básicas, referências de células e filtros antes de avançar para funções condicionais.',
    courseMessage:
      'Comece reforçando os fundamentos do Excel e avance gradualmente para fórmulas e organização de dados.',
  },
  basic: {
    title: 'Nível básico',
    description:
      'Você já demonstra domínio dos fundamentos. Seu próximo passo é desenvolver funções condicionais, tabelas dinâmicas e análise de dados.',
    recommendation:
      'Consolide funções condicionais, como SOMASE e CONT.SE, e pratique tabelas dinâmicas.',
    courseMessage:
      'Busque desenvolver funções condicionais, tabelas dinâmicas e recursos que ajudam a resolver tarefas do dia a dia.',
  },
  intermediate: {
    title: 'Nível intermediário',
    description:
      'Você demonstra boa capacidade para tarefas comuns no Excel. Pode avançar explorando ferramentas de tratamento de dados, modelos de dados e automação.',
    recommendation:
      'Explore o Power Query, os modelos de dados e técnicas de automação para melhorar sua produtividade.',
    courseMessage:
      'Priorize recursos de análise e tratamento de dados para ampliar suas possibilidades de uso do Excel.',
  },
  advanced: {
    title: 'Nível avançado',
    description:
      'Você teve bom desempenho nos três grupos de perguntas. Continue praticando recursos avançados e aprofundando suas habilidades com dados e automação.',
    recommendation:
      'Aprofunde seus conhecimentos em modelagem de dados, DAX e VBA por meio de projetos práticos.',
    courseMessage:
      'Procure aprofundar suas habilidades com ferramentas avançadas, análise de dados e automação.',
  },
}

const AFFILIATE_LINK = 'https://go.hotmart.com/Q107972225C?ap=354a'

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)

  const question = questions[currentQuestion]
  const progress =
    questions.length > 0
      ? ((currentQuestion + 1) / questions.length) * 100
      : 0

  function handleAnswer(optionIndex) {
    const updatedAnswers = [...answers]
    updatedAnswers[currentQuestion] = optionIndex

    setAnswers(updatedAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      return
    }

    const correctAnswers = questions.filter(
      (item, index) => item.correctAnswer === updatedAnswers[index],
    ).length

    const percentage =
      questions.length > 0
        ? Math.round((correctAnswers / questions.length) * 100)
        : 0

    const levelResults = calculateLevelResults(updatedAnswers)
    const classification = getClassification(levelResults)

    trackEvent('quiz_completed', {
      total_questions: questions.length,
      correct_answers: correctAnswers,
      score_percentage: percentage,
      classification,
    })

    setFinished(true)
  }

  function restartQuiz() {
    setCurrentQuestion(0)
    setAnswers([])
    setFinished(false)

    trackEvent('quiz_started', {
      entry_point: 'restart',
    })
  }

  if (questions.length === 0) {
    return (
      <section className="mx-auto max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-8 text-white">
        <h2 className="text-xl font-bold">
          Nenhuma pergunta encontrada
        </h2>

        <p className="mt-3 text-slate-400">
          Adicione perguntas ao arquivo questions.js.
        </p>
      </section>
    )
  }

  if (finished) {
    const correctAnswers = questions.filter(
      (item, index) => item.correctAnswer === answers[index],
    ).length

    const percentage = Math.round(
      (correctAnswers / questions.length) * 100,
    )

    const levelResults = calculateLevelResults(answers)
    const classification = getClassification(levelResults)
    const resultDetails = RESULT_DETAILS[classification]

    const strengths = levelResults
      .filter((result) => hasPassedLevel(result))
      .map((result) => LEVEL_LABELS[result.level])

    const nextSteps = levelResults
      .filter((result) => !hasPassedLevel(result))
      .map((result) => LEVEL_LABELS[result.level])

    if (strengths.length === 0) {
      strengths.push(
        'Continue praticando para consolidar os fundamentos e identificar seus pontos fortes.',
      )
    }

    if (nextSteps.length === 0) {
      nextSteps.push(
        'Pratique com bases de dados reais e aprofunde recursos avançados.',
      )
    }

    return (
      <section className="mx-auto max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white shadow-xl sm:p-8">
        <div className="text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-blue-500/10 text-3xl">
            ✓
          </div>

          <h2 className="mt-5 text-2xl font-bold">
            Teste concluído!
          </h2>

          <p className="mt-3 text-slate-400">
            Este é o seu resultado com base nas respostas fornecidas.
          </p>

          <div className="mt-8 rounded-xl border border-blue-500/30 bg-blue-500/10 p-6">
            <p className="text-sm text-blue-300">
              Seu resultado
            </p>

            <h3 className="mt-2 text-3xl font-bold text-blue-400">
              {resultDetails.title}
            </h3>

            <p className="mt-4 leading-7 text-slate-300">
              {resultDetails.description}
            </p>
          </div>

          <div className="mt-5 rounded-xl bg-slate-800 p-6">
            <p className="text-sm text-slate-400">
              Pontuação geral
            </p>

            <p className="mt-2 text-4xl font-bold text-blue-400">
              {correctAnswers}/{questions.length}
            </p>

            <p className="mt-2 text-slate-300">
              {percentage}% de acertos
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold">
            Desempenho por nível
          </h3>

          <div className="mt-4 space-y-3">
            {levelResults.map((result) => {
              const levelPercentage =
                result.total > 0
                  ? Math.round(
                      (result.correct / result.total) * 100,
                    )
                  : 0

              return (
                <div
                  key={result.level}
                  className="rounded-xl border border-slate-700 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">
                      {LEVEL_NAMES[result.level]}
                    </span>

                    <span className="text-sm text-slate-300">
                      {result.correct}/{result.total} acertos
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${levelPercentage}%` }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    {levelPercentage}% de acertos
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border border-green-800 bg-green-950/30 p-5">
            <h3 className="text-lg font-bold text-green-400">
              Seus pontos fortes
            </h3>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
              {strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-amber-800 bg-amber-950/30 p-5">
            <h3 className="text-lg font-bold text-amber-400">
              O que desenvolver
            </h3>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
              {nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-6 rounded-xl border border-blue-500/30 bg-blue-500/10 p-5">
          <h3 className="text-lg font-bold text-blue-300">
            Seu próximo passo
          </h3>

          <p className="mt-2 leading-7 text-slate-300">
            {resultDetails.recommendation}
          </p>
        </section>

        <section className="mt-6 rounded-xl border border-slate-700 bg-slate-800/70 p-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Curso recomendado
          </p>

          <h3 className="mt-3 text-xl font-bold text-white">
            Curso de Excel — Expert Cursos
          </h3>

          <p className="mt-3 leading-7 text-slate-300">
            {resultDetails.courseMessage}
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Conheça o conteúdo do curso e avalie se ele atende aos seus
            objetivos de aprendizagem.
          </p>

          <a
            href={AFFILIATE_LINK}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() =>
              trackEvent('affiliate_click', {
                item_name: 'Curso de Excel - Expert Cursos',
                classification,
                score_percentage: percentage,
              })
            }
            className="mt-5 block w-full rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
          >
            Conhecer o curso
          </a>
        </section>

        <div className="mt-8">
          <h3 className="text-lg font-bold">
            Revisão das respostas
          </h3>

          <div className="mt-4 space-y-3">
            {questions.map((item, index) => {
              const isCorrect =
                item.correctAnswer === answers[index]

              return (
                <div
                  key={item.id}
                  className="rounded-lg border border-slate-700 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium leading-6">
                      {index + 1}. {item.question}
                    </p>

                    <span
                      className={
                        isCorrect
                          ? 'shrink-0 text-sm font-semibold text-green-400'
                          : 'shrink-0 text-sm font-semibold text-red-400'
                      }
                    >
                      {isCorrect ? 'Acertou' : 'Errou'}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-400">
                    Sua resposta:{' '}
                    {item.options[answers[index]] ?? 'Não respondida'}
                  </p>

                  {!isCorrect && (
                    <p className="mt-2 text-sm text-green-400">
                      Resposta correta:{' '}
                      {item.options[item.correctAnswer]}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <p className="mt-6 text-sm leading-6 text-slate-400">
          Esta classificação é uma estimativa baseada nas 12 questões
          deste teste, não uma certificação oficial de proficiência
          em Excel.
        </p>

        <button
          type="button"
          onClick={restartQuiz}
          className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500"
        >
          Refazer teste
        </button>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white shadow-xl sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4 text-sm text-slate-400">
        <span>Teste de Excel</span>

        <span>
          Pergunta {currentQuestion + 1} de {questions.length}
        </span>
      </div>

      <div
        className="mb-8 h-2 overflow-hidden rounded-full bg-slate-700"
        role="progressbar"
        aria-label="Progresso do teste"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={currentQuestion + 1}
      >
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
        {question.level === 'basic'
          ? 'Nível básico'
          : question.level === 'intermediate'
            ? 'Nível intermediário'
            : 'Nível avançado'}
      </p>

      <h2 className="mt-3 text-xl font-semibold leading-relaxed sm:text-2xl">
        {question.question}
      </h2>

      <div className="mt-7 flex flex-col gap-3">
        {question.options.map((option, index) => (
          <button
            key={`${question.id}-${index}`}
            type="button"
            onClick={() => handleAnswer(index)}
            className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 text-left transition hover:border-blue-500 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            <span className="flex items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-slate-600 text-sm text-slate-300">
                {String.fromCharCode(65 + index)}
              </span>

              <span>{option}</span>
            </span>
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        Selecione uma alternativa para avançar.
      </p>
    </section>
  )
}

export default Quiz
