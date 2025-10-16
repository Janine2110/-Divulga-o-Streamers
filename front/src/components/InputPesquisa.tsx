import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { StreamerType } from "../utils/StreamerType";

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
    termo: string
}

type InputPesquisaProps = {
    setStreamer: React.Dispatch<React.SetStateAction<StreamerType[]>>
}

export function InputPesquisa({ setStreamer }: InputPesquisaProps) {
    const { register, handleSubmit, reset } = useForm<Inputs>()

    async function enviaPesquisa(data: Inputs) {
        // alert(data.termo)
        if (data.termo.length < 2) {
            toast.error("Informe, no mínimo, 2 caracteres")
            return
        }

        const response = await fetch(`${apiUrl}/streamer/pesquisa/${data.termo}`)
        const dados = await response.json()
        // console.log(dados)
        setStreamer(dados)
    }

    async function mostraDestaques() {
        const response = await fetch(`${apiUrl}/streamer`)
        const dados = await response.json()
        
        reset({ termo: "" })
        setStreamer(dados)
    }

    return (
        <div className="flex mx-auto max-w-5xl mt-3">
            <form className="flex-1" onSubmit={handleSubmit(enviaPesquisa)}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-purple-900 border border-white rounded-lg bg-white focus:ring-purple-500 focus:border-purple-500 dark:bg-blue-100 dark:border-purple-500 dark:placeholder-gray-400 dark:text-purple-900 dark:focus:ring-purple-500 dark:focus:border-purple-500 font-mono font-bold"
                        placeholder="Informe o nome do Streamer" required 
                        {...register('termo')} />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-700">
                        Pesquisar
                    </button>
                </div>
            </form>
            <button type="button" className="ms-3 mt-2 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-900 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-500 dark:hover:bg-purple-900 dark:focus:ring-purple-900 mb-10"
                    onClick={mostraDestaques}>
                Exibir Destaques
            </button>
        </div>
    )
}