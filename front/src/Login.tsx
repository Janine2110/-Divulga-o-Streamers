import { useForm } from "react-hook-form"

import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner"
import { usePatrocinadorStore } from "./context/Patrocinador.Context"

type Inputs = {
    email: string
    senha: string
    manter: boolean
}

const apiUrl = import.meta.env.VITE_API_URL

export default function Login() {
    const { register, handleSubmit } = useForm<Inputs>()    
    const { logaPatrocinador } = usePatrocinadorStore()

    const navigate = useNavigate()

    async function verificaLogin(data: Inputs) {
        // alert(`${data.email} ${data.senha} ${data.manter}`)
        const response = await 
          fetch(`${apiUrl}/patrocinador/login`, {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({ email: data.email, senha: data.senha })
          })
        
        // console.log(response)
        if (response.status == 200) {
            // toast.success("Ok!")            
            const dados = await response.json()

            // "coloca" os dados do cliente no contexto
            logaPatrocinador(dados)
            
            // se o cliente indicou que quer se manter conectado
            // salvamos os dados (id) dele em localStorage
            if (data.manter) {
                localStorage.setItem("patrocinadorKey", dados.id)
            } else {
                // se indicou que não quer permanecer logado e tem
                // uma chave (anteriormente) salva, remove-a
                if (localStorage.getItem("patrocinadorKey")) {
                    localStorage.removeItem("patrocinadorKey")
                }
            }

            // carrega a página principal, após login do cliente
            navigate("/")
        } else {
            toast.error("Erro... Login ou senha incorretos")
        }
    }

    return (
        <section>
            <p style={{ height: 48 }}></p>
            <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg border border-purple-500 md:mt-0 sm:max-w-md xl:p-0 dark:bg-slate-400">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold font-mono leading-tight md:text-2xl dark:text-purple-500">
                            Dados de Acesso do Patrocinador
                        </h1>
                        <form className="space-y-4 md:space-y-6" 
                           onSubmit={handleSubmit(verificaLogin)} >
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-mono">Seu e-mail</label>
                                <input type="email" id="email" placeholder="Digite seu e-mail"
                                       className="bg-gray-50 border border-purple-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                       required 
                                       {...register("email")} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-mono">Senha de Acesso</label>
                                <input type="password" id="password" placeholder="Digite sua senha"
                                       className="bg-gray-50 border border-purple-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:text-black" 
                                       required 
                                       {...register("senha")} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" 
                                               aria-describedby="remember" type="checkbox" 
                                               className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
                                               {...register("manter")} />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className=" dark:text-purple-500 font-mono font-bold">Manter Conectado</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium hover:underline dark:text-white font-mono">Esqueceu sua senha?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-purple-600  focus:ring-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center font-mono mt-4 dark:hover:bg-purple-900 dark:focus:ring-purple-900">
                                Entrar
                            </button>
                            <p className="text-sm text-center font-light text-white font-mono">
                                Ainda não possui conta? <Link to="/cadPatrocinador" className="font-bold text-primary-600 hover:underline dark:text-primary-500 text-purple-500 border-b-4 border-white w-fit">Cadastre-se</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}