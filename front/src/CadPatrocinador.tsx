import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { toast } from "sonner"

type Inputs = {
    nome: string
    idade: number
    email: string
    cidade: string
    senha: string
    senha2: string
}

const apiUrl = import.meta.env.VITE_API_URL

export default function CadPatrocinador() {
    const { register, handleSubmit } = useForm<Inputs>()

    async function cadastraPatrocinador(data: Inputs) {

        if (data.senha != data.senha2) {
            toast.error("Erro... Senha e Confirme Senha precisam ser iguais")
            return
        }

        const response = await
            fetch(`${apiUrl}/patrocinador`, {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({
                    nome: data.nome,
                    idade: Number(data.idade),
                    cidade: data.cidade,
                    email: data.email,
                    senha: data.senha
                })
            })

        console.log(response)
        if (response.status == 201) {
            toast.success("Ok! Cadastro realizado com sucesso...")
            // carrega a página principal, após login do cliente
            // navigate("/login")
        } else {
            toast.error("Erro... Não foi possível realizar o cadastro")
        }
    }

    return (
        <section className="bg-white dark:bg-white">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-slate-400 dark:border-purple-500">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold font-mono leading-tight md:text-2xl dark:text-purple-500">
                            Cadastro de Patrocinador
                        </h1>
                        <form className="space-y-4 md:space-y-6" 
                          onSubmit={handleSubmit(cadastraPatrocinador)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-mono">Nome</label>
                                <input type="text" id="nome" className="bg-gray-50 border border-purple-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Seu nome completo" required 
                                    {...register("nome")} />
                            </div>
                            <div>
                                <label htmlFor="idade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-mono">Idade</label>
                                <input type="number" id="idade" className="bg-gray-50 border border-purple-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sua idade" required 
                                    {...register("idade", { valueAsNumber: true })} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-mono">E-mail</label>
                                <input type="email" id="email" className="bg-gray-50 border border-purple-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nome@gmail.com" required 
                                    {...register("email")} />
                            </div>
                            <div>
                                <label htmlFor="cidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-mono">Cidade</label>
                                <input type="text" id="cidade" className="bg-gray-50 border border-purple-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sua cidade" required 
                                    {...register("cidade")} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-mono">Senha de Acesso</label>
                                <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-purple-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
                                      {...register("senha")} />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-mono">Confirme a Senha</label>
                                <input type="password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-purple-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
                                      {...register("senha2")} />
                            </div>
                            <button type="submit" className="w-full text-white bg-purple-600  focus:ring-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center font-mono mt-4 dark:hover:bg-purple-900 dark:focus:ring-purple-900">Criar sua Conta</button>
                            <p className="text-sm text-center font-light text-white font-mono">
                                Já possui uma conta? <Link to="/login" className="font-bold text-primary-600 hover:underline dark:text-primary-500 text-purple-500 border-b-4 border-white w-fit">Faça Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}