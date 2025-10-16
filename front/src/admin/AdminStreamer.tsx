import { useEffect, useState } from "react"

import ItemStreamer from './components/ItemStreamer'
import type { StreamerType } from "../utils/StreamerType"
import { Link } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminStreamer() {
  const [streamers, setStreamers] = useState<StreamerType[]>([])

  useEffect(() => {
    async function getStreamers() {
      const response = await fetch(`${apiUrl}/streamer`)
      const dados = await response.json()
      setStreamers(dados)
    }
    getStreamers()
  }, [])

  const listaStreamer = streamers.map(streamer => (
    <ItemStreamer key={streamer.id} streamer={streamer} streamers={streamers} setStreamer={setStreamers} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="underline underline-offset-3 text-black decoration-8 dark:decoration-purple-500 text-3xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl">
          Cadastro de Streamers
        </h1>
        <Link to="/admin/streamers/novo" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-purple-500 dark:hover:bg-red-400 focus:outline-none dark:focus:ring-red-400 mt-10 font-mono">
          Novo Streamer
        </Link>
      </div>

      <div className="w-full text-sm text-left rtl:text-right">
        <table className="w-full text-sm text-left rtl:text-right text-white font-mono">
          <thead className="text-xs text-purple-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-purple-500">
            <tr>
              <th scope="col" className="px-6 py-3 text-purple-500 font-bold font-mono">
                Foto
              </th>
              <th scope="col" className="px-6 py-3 text-purple-500font-bold font-mono">
                Streamer
              </th>
              <th scope="col" className="px-6 py-3 text-purple-500 font-bold font-mono">
                Plataforma
              </th>
              <th scope="col" className="px-6 py-3 text-purple-500font-bold font-mono">
                Idade
              </th>
              <th scope="col" className="px-6 py-3 text-purple-500 font-bold font-mono">
                Seguidores
              </th>
              <th scope="col" className="px-6 py-3 text-purple-500 font-bold font-mono">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaStreamer}
          </tbody>
        </table>
      </div>
    </div>
  )
}