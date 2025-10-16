import { FiUsers } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useAdminStore } from "../context/AdminContext"

export function Titulo() {
  const { admin } = useAdminStore()

  return (
    <nav className="bg-purple-500 border-purple-600 dark:bg-purple-500 flex flex-wrap justify-between fixed top-0 left-0 w-full z-50">
      <div className="flex flex-wrap justify-between max-w-screen-xl p-4">
        <Link to="/admin" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./sorriso.png" className="h-16" alt="Logo Herbie" />
          <span className="self-center text-3xl text-center whitespace-nowrap dark:text-white font-mono">
            Divulgação Streamers: Admin
          </span>
        </Link>
      </div>
      <div className="flex me-4 items-center font-bold font-mono text-white">
        <span className="mr-2">
          <FiUsers />
        </span>
        {admin.nome}
      </div>
    </nav>
  )
}