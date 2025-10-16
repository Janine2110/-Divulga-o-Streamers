import './MinhasPropostas.css'
import { useEffect, useState } from "react";
import { usePatrocinadorStore } from "./context/Patrocinador.Context";
import type { PropostaType } from "./utils/PropostaType";
import { TiTick } from "react-icons/ti";

const apiUrl = import.meta.env.VITE_API_URL

export default function Propostas() {
    const [propostas, setPropostas] = useState<PropostaType[]>([])
    const { patrocinador } = usePatrocinadorStore()

    useEffect(() => {
        async function buscaDados() {
            const response = await fetch(`${apiUrl}/proposta/${patrocinador.id}`)
            const dados = await response.json()
            setPropostas(dados)
        }
        buscaDados()
    }, [])

    // para retornar apenas a data do campo no banco de dados
    // 2024-10-10T22:46:27.227Z => 10/10/2024
    function dataDMA(data: string) {
        const ano = data.substring(0, 4)
        const mes = data.substring(5, 7)
        const dia = data.substring(8, 10)
        return dia + "/" + mes + "/" + ano
    }

    const propostasTable = propostas.map(proposta => (
    <tr key={proposta.id} className="bg-white border-b dark:bg-slate-400 dark:border-purple-500">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white font-mono">
            <p><b>{proposta.streamer.nome}</b></p>
        </th>
        <td className="px-6 py-4">
            <img
                src={proposta.streamer.foto}
                alt={proposta.streamer.nome}
                className="h-12 w-12 rounded-full"
            />
        </td>
        <td className="px-6 py-4">
            <p className='text-purple-500'><b>{proposta.descricao}</b></p>
            <p className='text-white font-mono'><i>Enviado em: {dataDMA(proposta.createdAt)}</i></p>
        </td>
        <td className="px-6 py-4 text-white font-mono font-medium">
            {proposta.resposta ?
                <>
                  <p className="flex items-center text-white font-mono font-bold border-b-4 border-purple-500 w-fit">
                    <span className="mr-2">{proposta.resposta}</span>
                    <TiTick className="text-purple-500" />
                </p>
                    <p className='text-white font-mono font-medium'><i>Respondido em: {dataDMA(proposta.updatedAt as string)}</i></p>
                </>
                :
                <i>Aguardando...</i>}
        </td>
    </tr>
))

    return (
        <section className="max-w-7xl mx-auto">
            <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-black md:text-4xl lg:text-5xl">
                Listagem de <span className="underline underline-offset-3 text-black decoration-8 dark:decoration-purple-500">Minhas Propostas</span></h1>

            {propostas.length == 0 ?
                <h2 className="mb-4 mt-10 text-3xl font-extrabold leading-none tracking-tight text-purple-500 md:text-4xl ">
                   &nbsp;&nbsp; Ah... Você ainda não fez propostas para os nossos streamers. 🖥️😒
                </h2>
                :
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-purple-500">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Streamer
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Foto
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Proposta
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Resposta
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {propostasTable}
                    </tbody>
                </table>
            }
        </section>
    )
}