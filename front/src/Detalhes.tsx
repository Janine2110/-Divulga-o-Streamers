import type { StreamerType } from "./utils/StreamerType"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { usePatrocinadorStore } from "./context/Patrocinador.Context"
import { toast } from "sonner"
import { useForm } from "react-hook-form"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  descricao: string
}

export default function Detalhes() {
  const params = useParams()

  const [streamers, setStreamer] = useState<StreamerType>()
  const { patrocinador } = usePatrocinadorStore()

  const { register, handleSubmit, reset } = useForm<Inputs>()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/streamer/${params.streamerId}`)
      const dados = await response.json()
      setStreamer(dados)
    }
    buscaDados()
  }, [])

  async function enviaProposta(data: Inputs) {

    const response = await fetch(`${apiUrl}/proposta`, 
      {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        patrocinadorId: patrocinador.id,
        streamerId: Number(params.streamerId),
        adminId: streamers?.adminId,
        descricao: data.descricao
      })
    })

    if (response.status == 201) {
      toast.success("Obrigado. Sua proposta foi enviada. Aguarde retorno")
      reset()
    } else {
      toast.error("Erro... Não foi possível enviar sua proposta")
    }
  }

  return (
    <>
    <section className="flex mt-6 mx-auto flex-col items-center border border-purple-600 rounded-lg shadow md:flex-row md:max-w-5xl  dark:bg-slate-400">
  <img
    className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
    src={streamers?.foto}
    alt={`Foto de ${streamers?.nome}`}
  />
  <div className="flex flex-col justify-between p-4 leading-normal">
    <h5 className="mb-2 text-2xl font-bold font-mono tracking-tight text-purple-700 dark:text-white">
      {streamers?.nome} - <span className="text-purple-500 font-bold dark:text-purple">{streamers?.plataforms}</span>
    </h5>
    <h5 className="mb-2 text-xl tracking-tight text-gray-900 font-mono font-bold">
      Idade: {streamers?.idade} anos
    </h5>
    <h5 className="mb-2 text-xl tracking-tight text-gray-900 font-bold font-mono">
      Seguidores: {streamers?.seguidores.toLocaleString("pt-br")}
    </h5>
    <p className="mb-3  font-normal tracking-tight  text-gray-900 dark:text-gray-400 font-bold font-mono">
      Destaque: {streamers?.destaque ? "Sim" : "Não"}
    </p>
    {patrocinador.id ?
            <>
              <h3 className="text-xl font-medium tracking-tight dark:text-purple-500 mb-2 font-mono">
                🎫 Você pode fazer um Patrocínio para esse Streamer!</h3>
              <form onSubmit={handleSubmit(enviaProposta)}>
                <input type="text" className="mb-2 mt-4 bg-gray-100 border border-purple-500 text-purple-500 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed dark:bg-blue-100 dark:placeholder-purple-500 dark:text-gray-400 font-mono dark:bg-blue-100 font-bold" value={`${patrocinador.nome} (${patrocinador.email})`} disabled readOnly />
                <textarea id="message" className="mb-2 block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-purple-500 focus:ring-blue-500 dark:bg-blue-100 dark:placeholder-gray-400 font-mono text-purple-900 font-bold" rows={4}
                  placeholder="Descreva a sua proposta"
                  required {...register("descricao")}></textarea>
                <button type="submit" className="text-white bg-purple-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:hover:bg-purple-900 dark:focus:ring-purple-900 font-mono">Enviar Proposta</button>
              </form>
            </>
            :
            <h2 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-purple-500 font-medium font-mono">
              😎Gostou? Identifique-se e faça uma Proposta!
            </h2>
          }


        </div>
      </section>
    </>
  )
}
