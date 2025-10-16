import { TiDeleteOutline } from "react-icons/ti"
import { FaRegEdit  } from "react-icons/fa"
import type { PropostaType } from "../../utils/PropostaType"
import { useAdminStore } from "../context/AdminContext"

type listaPropostaProps = {
  proposta: PropostaType,
  propostas: PropostaType[],
  setPropostas: React.Dispatch<React.SetStateAction<PropostaType[]>>
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemProposta({ proposta, propostas, setPropostas }: listaPropostaProps) {

  const { admin } = useAdminStore()

  async function excluirProposta() {

    if (confirm(`Confirma Exclusão da Proposta "${proposta.descricao}"?`)) {
      const response = await fetch(`${apiUrl}/proposta/${proposta.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`
          },
        },
      )

      if (response.status == 200) {
        const propostas2 = propostas.filter(x => x.id != proposta.id)
        setPropostas(propostas2)
        alert("Proposta excluída com sucesso")
      } else {
        alert("Erro... Proposta não foi excluída")
      }
    }
  }

  async function responderProposta() {
    const respostaRevenda = prompt(`Resposta Proposta para "${proposta.descricao}"`)

    if (respostaRevenda == null || respostaRevenda.trim() == "") {
      return
    }

    const response = await fetch(`${apiUrl}/proposta/${proposta.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
        body: JSON.stringify({resposta: respostaRevenda})
      },
    )

    if (response.status == 200) {
      const propostas2 = propostas.map(x => {
        if (x.id == proposta.id) {
          return { ...x, resposta: respostaRevenda}
        }
        return x
      })
      setPropostas(propostas2)
    }
  }

  return (
    <tr key={proposta.id} className="bg-white border-b dark:bg-slate-400 dark:border-purple-500">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white font-mono">
        <img src={proposta.streamer.foto} alt="Foto do Streamer"
          style={{ width: 200 }} />
      </th>
      <td className={"px-6 py-4 text-white font-bold font-mono"}>
        {proposta.streamer.nome}
      </td>
      <td className={"px-6 py-4 text-white font-bold font-mono"}>
        {proposta.patrocinador?.nome}
      </td>
      <td className={`px-6 py-4 text-white font-bold font-mono`}>
        {proposta.descricao}
      </td>
      <td className={`px-6 py-4 text-purple-500 font-mono font-bold uppercase text-xl`}>
        {proposta.resposta}
      </td>
      <td className="px-6 py-4 text-white font-bold font-mono">
        {proposta.resposta ? 
          <>
            <img src="/ok.png" alt="Ok" style={{width: 60}} />
          </>
        :
          <>
            <TiDeleteOutline className="text-3xl text-purple-500 inline-block cursor-pointer" title="Excluir"
              onClick={excluirProposta} />&nbsp;
            <FaRegEdit className="text-3xl text-green-500 inline-block cursor-pointer" title="Resposta"
              onClick={responderProposta} />
          </>
        }
      </td>

    </tr>
  )
}