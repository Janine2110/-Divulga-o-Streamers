import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import type { PlataformaType } from "../utils/PlataformaType"
import { useAdminStore } from "./context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  idade: number
  seguidores: number          
  foto: string    
  plataforms: string  
  plataformaId: string
  nome: string       
  adminId: string  
}

export default function AdminNovoStreamer() {
  const [, setPlataformas] = useState<PlataformaType[]>([])
  const { admin } = useAdminStore()

  const {
    register,
    handleSubmit,
    reset,
    setFocus
  } = useForm<Inputs>()

  useEffect(() => {
    async function getPlataformas() {
      const response = await fetch(`${apiUrl}/plataformas`)
      const dados = await response.json()
      setPlataformas(dados)
    }
    getPlataformas()
    setFocus("nome")
  }, [])

  // const optionsPlataforma = plataforma.map(plataforma => (
  //   <option key={plataforma.id} value={plataforma.id}>{plataforma.nome}</option>
  //   ))

  async function incluirStreamer(data: Inputs) {

    const novoStreamer: Inputs = {
      nome: data.nome,
      plataformaId: data.plataformaId,
      idade: Number(data.idade),
      seguidores: Number(data.seguidores),
      foto: data.foto,
      plataforms: data.plataforms,
      adminId: admin.id
    }

    const response = await fetch(`${apiUrl}/streamer`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`
        },
        body: JSON.stringify(novoStreamer)
      },
    )

    if (response.status == 201) {
      toast.success("Ok! Streamer cadastrado com sucesso")
      reset()
    } else {
      toast.error("Erro no cadastro do Streamer...")
    }
  }

  return (
    <>
      <h1 className="mb-20 mt-24 text-3xl font-extrabold leading-none tracking-tight text-black md:text-4xl lg:text-5xl">
        Inclusão <span className="underline underline-offset-3 text-black decoration-8 dark:decoration-purple-500">de Streamer</span>
      </h1>
      <section>
            <p style={{ height: 48 }}></p>
            <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg border border-purple-500 md:mt-0 sm:max-w-md xl:p-0 dark:bg-slate-400">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold font-mono leading-tight md:text-2xl dark:text-purple-500">
                            Dados Para Inclusão
                        </h1>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(incluirStreamer)}>
        <div className="mb-3">
          <label htmlFor="modelo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-mono">
            Nome do Streamer</label>
          <input type="text" id="modelo"
            className="bg-gray-50 border border-purple-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Digite o nome do Streamer" required
            {...register("nome")}
          />
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label
              htmlFor="foto"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-mono"
            >
              Foto
            </label>
            <input
              type="text"
              id="foto"
              placeholder="Cole a URL da foto"
              {...register("foto")}
              className="bg-gray-50 border border-purple-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ano" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-mono">
              Idade</label>
            <input type="number" id="idade"
              className="bg-gray-50 border border-purple-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Digite a Idade" required
              {...register("idade")}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
            <div className="mb-3">
            <label
              htmlFor="seguidores"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-mono"
            >
              Seguidores
            </label>
            <input
              type="number"
              id="seguidores"
              {...register("seguidores")}
              className="bg-gray-50 border border-purple-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex: 1000"
              required
              min={0}
            />
            </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-mono">
              Plataforma</label>
            <select id="plataforma"
              className="bg-gray-50 border border-purple-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("plataforms")}
            >
              <option value="">Selecione uma plataforma</option>
              <option value="YOUTUBE">YOUTUBE</option>
              <option value="TWITCH">TWITCH</option>
              <option value="TIKTOK">TIKTOK</option>
              <option value="KICK">KICK</option>
              <option value="FACEBOOK">FACEBOOK</option>
              <option value="INSTAGRAM">INSTAGRAM</option>
            </select>
          </div>
        </div>
        <button type="submit" className="text-white font-bold bg-purple-700 hover:bg-purple-700 focus:ring-2 focus:outline-none focus:ring-purple-600 rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center dark:bg-purple-600 dark:hover:bg-purple-600 dark:focus:ring-purple-600 dark:hover:bg-purple-900 dark:focus:ring-purple-900">
          Incluir</button>
      </form>
    </div>
  </div>
  </div>
</section>
    </>
  )
}

