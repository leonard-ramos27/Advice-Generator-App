import { useState } from "react"
import getImageURL from "./utils/image-util"

function App() {
  const [adviceSlip, setAdviceSlip] = useState({
    id: 117,
    advice: "It is easy to sit up and take notice, what's difficult is getting up and taking actions."
  }) // Manually set the initial advice to match the design
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchAdvice = async () => {
    try {
      setLoading(true)
      setError("")
      let url = "https://api.adviceslip.com/advice"
      const response = await fetch(url)
      const result = await response.json()
      setAdviceSlip(result.slip)
    } catch (error) {
      setError("Something went wrong with getting the advice.")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <main className="flex-grow p-4 flex justify-center items-center">
      <div className="mt-4 px-6 pt-7 pb-12 md:px-10 md:pt-[50px] md:pb-[72px] rounded-xl bg-grayish-blue bg-opacity-35 shadow-xl max-w-[540px] text-center relative">
        {loading ? 
          <div 
            role="status" 
            class="max-w-sm mx-auto mb-10 animate-pulse">
            <div class="h-2.5 bg-gray-600 rounded-full dark:bg-gray-800 w-48 mb-4 mx-auto"></div>
            <div class="h-2 bg-gray-600 rounded-full dark:bg-gray-800 max-w-[360px] mb-2.5 mx-auto"></div>
            <div class="h-2 bg-gray-600 rounded-full dark:bg-gray8700 mb-2.5"></div>
            <span class="sr-only">Loading...</span>
          </div>
        : error ? <div className="mb-7 md:mb-10 text-rose-400">{error}</div> :
          <div className="mb-7 md:mb-10">
            <h1 className="text-[13px] uppercase font-extrabold text-neon-green tracking-[4px] pb-6">
              Advice #{adviceSlip.id}
            </h1>
            <p className="text-[24px] md:text-[28px] text-light-cyan font-extrabold leading-[34px] md:leading-[38px] tracking-[-0.2px] advice-text">
              {adviceSlip.advice}
            </p>
          </div>
        }
        <picture>
          <source 
            media="(max-width: 768px)" 
            srcSet={getImageURL("pattern-divider-mobile.svg")}/> 
          <source 
            media="(min-width: 769px)" 
            srcSet={getImageURL("pattern-divider-desktop.svg")}/>
          <img 
            src={getImageURL("pattern-divider-desktop.svg")} 
            className="w-full"/>
        </picture>
        <button 
          onClick={fetchAdvice} 
          className="p-5 bg-neon-green rounded-full absolute -bottom-[30px] left-1/2 -translate-x-1/2 transition ease-out hover:shadow-[0px_0px_25px_0px_var(--neon-green)] duration-300">
          <img src={getImageURL("icon-dice.svg")} alt="Dice Icon" />
        </button>
      </div>
    </main>
    <footer className="text-center p-2 mt-4">
      <p className="mb-0 text-sm text-light-cyan">
        Challenge by
        <a 
          href="https://www.frontendmentor.io/challenges/advice-generator-app-QdUG-13db" 
          target="_blank"
          className="ml-1 text-neon-green">
          Frontend Mentor
        </a>
        . Coded by 
        <a 
          href="https://www.frontendmentor.io/profile/leonard-ramos27" 
          target="_blank"
          className="ml-1 text-neon-green">
          Leonard Ramos
        </a>.
      </p>
    </footer>
  </>
  )
}

export default App
