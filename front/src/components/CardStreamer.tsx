import { Link } from "react-router-dom"
import type { StreamerType } from "../utils/StreamerType"

export function CardStreamer({data}: {data: StreamerType}) {
    return (
        <div className="bg-slate-400 border border-purple-500 rounded-lg shadow-sm grid grid-cols-2 ">
            <img className="rounded-t-lg w-60 h-60 mx-auto mb-4 mt-4 object-cover rounded-xl" src={data.foto} alt="Foto" />
            <div className="p-3 flex flex-col justify-center">
                <h5 className="mb-2 text-2xl font-bold font-mono tracking-tight text-gray-900 dark:text-white ">
                    {data.nome} <span className="text-purple-500 font-bold dark:text-purple"> {data.plataforms}</span>
                </h5>
                <p className="mb-3 font-bold dark:text-gray-300">
                    Idade: {Number(data.idade)} anos
                </p>
                <p className="mb-3 font-bold dark:text-gray-300 font-mono">
                    Destaque: <span className="text-purple-500 font-bold dark:text-purple">{data.destaque ? "Sim" : "Não"}</span> - Seguidores: <span className="text-purple-500 font-bold dark:text-purple">{data.seguidores.toLocaleString("pt-br")}</span>
                </p>
                <Link to={`/detalhes/${data.id}`} className="inline-flex w-auto self-start items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg font-mono mt-6 dark:hover:bg-purple-900 dark:focus:ring-purple-900">
                    Ver Detalhes
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}