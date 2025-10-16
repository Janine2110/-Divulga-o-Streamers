import { useEffect, useState } from "react"

import ItemAdmin from "./components/ItemAdmin"
import { Link } from "react-router-dom"
import type { AdminType } from "../utils/AdminType"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminCadAdmin() {
  const [admins, setAdmins] = useState<AdminType[]>([])

  useEffect(() => {
    async function getAdmins() {
      const response = await fetch(`${apiUrl}/admins`)
      const dados = await response.json()
      setAdmins(dados)
    }
    getAdmins()
  }, [])

  const listaAdmins = admins.map(admin => (
    <ItemAdmin key={admin.id} adminLinha={admin} admins={admins} setAdmins={setAdmins} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Cadastro de Administradores do Sistema
        </h1>
        <Link to="/admin/admins/novo" 
          className="text-white bg-purple-600 focus:ring-purple-500 rounded-lg text-sm px-5 py-2.5 text-center font-mono mt-4 dark:hover:bg-purple-900 dark:focus:ring-purple-900 font-bold mb-8 uppercase ">
          Novo Admin
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-white dark:text-white font-mono">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 font-mono">
            <tr>
              <th scope="col" className="px-6 py- font-medium text-purple-500 whitespace-nowrap dark:text-purple font-mono">
                Nome do Admin
              </th>
              <th scope="col" className= "px-6 py-3 font-medium text-purple-500 whitespace-nowrap dark:text-purple font-mono">
                E-mail
              </th>
              <th scope="col" className="px-6 py-3 font-medium text-purple-500 whitespace-nowrap dark:text-purple font-mono">
                Nível
              </th>
              <th scope="col" className="px-6 py-3 font-medium text-purple-500 whitespace-nowrap dark:text-purple font-mono">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaAdmins}
          </tbody>
        </table>
      </div>
    </div>
  )
}