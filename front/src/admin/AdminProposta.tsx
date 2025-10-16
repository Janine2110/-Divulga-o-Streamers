import { useEffect, useState } from "react"

import type { PropostaType } from "../utils/PropostaType"
import ItemProposta from "./components/ItemProposta"

const apiUrl = import.meta.env.VITE_API_URL

function ControlePropostas() {
  const [propostas, setPropostas] = useState<PropostaType[]>([])

  useEffect(() => {
    async function getPropostas() {
      const response = await fetch(`${apiUrl}/proposta`)
      const dados = await response.json()
      setPropostas(dados)
    }
    getPropostas()
  }, [])

  const listaPropostas = propostas.map(proposta => (
    <ItemProposta key={proposta.id} proposta={proposta} propostas={propostas} setPropostas={setPropostas} />
  ))

  return (
    <div className='m-4 mt-24'>
      <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
        Controle <span className="underline underline-offset-3 decoration-8 decoration-purple-500 dark:decoration-purple-500">de Propostas</span>
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-purple-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto do Streamer
              </th>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Patrocinador
              </th>
              <th scope="col" className="px-6 py-3">
                Proposta
              </th>
              <th scope="col" className="px-6 py-3">
                Resposta
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaPropostas}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ControlePropostas