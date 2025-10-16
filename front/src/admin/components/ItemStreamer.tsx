import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"

import type { StreamerType } from "../../utils/StreamerType"
import { useAdminStore } from "../context/AdminContext"

type listaStreamerProps = {
  streamer: StreamerType;
  streamers: StreamerType[];
  setStreamer: React.Dispatch<React.SetStateAction<StreamerType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemStreamer({ streamer, streamers, setStreamer }: listaStreamerProps) {
  const { admin } = useAdminStore()

  async function excluirStreamer() {
    if (!admin || admin.nivel == 1) {
      alert("Você não tem permissão para excluir um streamer");
      return;
    }

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${apiUrl}/streamer/${streamer.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`
          },
        },
      )

      if (response.status == 200) {
        const streamers2 = streamers.filter(x => x.id != streamer.id)
        setStreamer(streamers2)
        alert("Streamer excluído com sucesso")
      } else {
        alert("Erro... Streamer não foi excluído")
      }
    }
  }

  async function alterarDestaque() {

    const response = await fetch(`${apiUrl}/streamer/destacar/${streamer.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
      },
    )

    if (response.status == 200) {
      const streamers2 = streamers.map(x => {
        if (x.id == streamer.id) {
          return { ...x, destaque: !x.destaque }
        }
        return x
      })
      setStreamer(streamers2)
    }
  }

  return (
    <tr key={streamer.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={streamer.foto} alt={`Foto do ${streamer.nome}`}
          style={{ width: 200 }} />
      </th>
      <td className={`px-6 py-4 ${streamer.destaque ? "font-extrabold" : ""}`}>
        {streamer.nome}
      </td>
            <td className={`px-6 py-4 ${streamer.destaque ? "font-extrabold" : ""}`}>
        {streamer.plataforms}
      </td>
      <td className={`px-6 py-4 ${streamer.destaque ? "font-extrabold" : ""}`}>
        {streamer.seguidores}
      </td>
     <td className={`px-6 py-4 ${streamer.destaque ? "font-extrabold" : ""}`}>
        {streamer.idade}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-400 inline-block cursor-pointer" title="Excluir"
          onClick={excluirStreamer} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-400 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </td>
    </tr>
  )
}
