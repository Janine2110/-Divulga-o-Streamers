import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Toaster, toast } from 'sonner'
import { useAdminStore } from "./context/AdminContext"

import { useNavigate } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  email: string
  senha: string
}

export default function AdminLogin() {
  const { register, handleSubmit, setFocus } = useForm<Inputs>()
  const navigate = useNavigate()
  const { logaAdmin } = useAdminStore()

  useEffect(() => {
    setFocus("email")
  }, [])

  async function verificaLogin(data: Inputs) {
    const response = await fetch(`${apiUrl}/admins/login`, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({ email: data.email, senha: data.senha })
    })

    // console.log(response)
    if (response.status == 200) {
      const admin = await response.json()
      logaAdmin(admin)
      navigate("/admin", { replace: true })
    } else if (response.status == 400) {
      toast.error("Erro... Login ou senha incorretos")
    }
  }

  return (
    <main className="max-w-screen-xl flex flex-col items-center mx-auto p-6">
      <img src="../../sorriso.png" alt="Emoji Sorriso" style={{ width: 230 }}
        className="d-block" />
      <div className="w-full max-w-md bg-white rounded-lg border border-purple-500 p-8 shadow-md dark:bg-slate-400 min-h-[420px] mt-8">
        <h1 className="text-xl font-medium font-mono leading-tight md:text-2xl dark:text-purple-500 ">Admin: Divulgação Streamers</h1>
        <form className="max-w-sm mx-auto"
          onSubmit={handleSubmit(verificaLogin)} >
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-8">E-mail:</label>
            <input type="email" id="email" className="bg-gray-50 border border-purple-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Digite seu e-mail"
              {...register("email")}
              required />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha:</label>
            <input type="password" id="password" className="bg-gray-50 border border-purple-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Digite sua senha"
              {...register("senha")}
              required />
          </div>
          <button type="submit" className="w-full text-white bg-purple-600  focus:ring-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center font-mono mt-8">Entrar</button>
        </form>
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
