import { CardStreamer } from "./components/CardStreamer";
import { InputPesquisa } from "./components/InputPesquisa";
import type { StreamerType } from "./utils/StreamerType";
import { useEffect, useState } from "react";
import { usePatrocinadorStore } from "./context/Patrocinador.Context"

const apiUrl = import.meta.env.VITE_API_URL

export default function App() { 
  const [streamers, setStreamer] = useState<StreamerType[]>([])
  const { logaPatrocinador } = usePatrocinadorStore()
 

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/streamer`)
      const dados = await response.json()
      setStreamer(dados)
    }
    buscaDados()

    
    async function buscaPatrocinador(id: string) {
      const response = await fetch(`${apiUrl}/patrocinador/${id}`)
      const dados = await response.json()
      logaPatrocinador(dados)
    }
    if (localStorage.getItem("patrocinadorKey")) {
      const idPatrocinador = localStorage.getItem("patrocinadorKey")
      buscaPatrocinador(idPatrocinador as string)
    }
  }, [])

  const listaStreamers = streamers.map((streamer) => (
    <CardStreamer data={streamer} key={streamer.id} />
  ))

  return (
<>
  <InputPesquisa setStreamer={setStreamer} />
  <div className="max-w-7xl mx-auto">
    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
      Streamers <span className="underline underline-offset-3 decoration-8 decoration-purple-500 dark:decoration-purple-500">em destaque</span>
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {listaStreamers}
    </div>
  </div>
</>
  );
}
