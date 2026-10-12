import { useState } from 'react'
import Quiz from './components/Quiz'
import { trackEvent } from './analytics'

function App() {
  const [started, setStarted] = useState(false)

  function handleStartQuiz() {
    trackEvent('quiz_started')
    setStarted(true)
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white flex items-center justify-center">
      {!started ? (
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            Teste gratuito de Excel
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Descubra seu nível de Excel
          </h1>

          <p className="mt-5 max-w-lg leading-7 text-slate-400">
            Responda a perguntas práticas e descubra quais habilidades
            você já domina e quais pode desenvolver.
          </p>

          <button
            type="button"
            onClick={handleStartQuiz}
            className="mt-8 rounded-lg bg-blue-600 px-7 py-3 font-semibold transition hover:bg-blue-500"
          >
            Começar teste
          </button>

          <p className="mt-4 text-xs text-slate-500">
            Resultado gratuito. Sem necessidade de informar seu nome.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-3xl">
          <Quiz />
        </div>
      )}
    </main>
  )
}

export default App