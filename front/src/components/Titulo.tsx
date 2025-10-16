import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { usePatrocinadorStore } from "../context/Patrocinador.Context"
    
export default function Titulo() {
    const { patrocinador, deslogaPatrocinador } = usePatrocinadorStore()
    const navigate = useNavigate()

    function patrocinadorSair() {
        if (confirm("Confirma saída do sistema?")) {
            deslogaPatrocinador()
            if (localStorage.getItem("patrocinadorKey")) {
                localStorage.removeItem("patrocinadorKey")
            }
            navigate("/login")
        }
    }

    return (
        <nav className="dark:bg-purple-500 dark:border-purple-600 border-b">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">

                    <img src="./sorriso.png" className="h-12" alt="Logo Herbie" />
                    <span className="self-center text-3xl font-mono text-center whitespace-nowrap dark:text-white">
                        Divulgação Streamers
                    </span>
                </Link>
                <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                    <ul className="flex flex-col font-mono mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                    <li>
                            {patrocinador.id ?
                                <>
                                    <span className="text-black font-mono bg-slate-300 rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center dark:bg-purple-600 dark:text-white">
                                        {patrocinador.nome}
                                    </span>&nbsp;&nbsp;
                                    <Link to="/minhaspropostas" className="text-white font-bold bg-purple-700 hover:bg-purple-700 focus:ring-2 focus:outline-none focus:ring-purple-600 rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center dark:bg-purple-600 dark:hover:bg-purple-600 dark:focus:ring-purple-600 dark:hover:bg-purple-900 dark:focus:ring-purple-900">
                                        Minhas Propostas
                                    </Link>&nbsp;&nbsp;
                                    <span className="cursor-pointer font-bold font-mono dark:hover:bg-purple-900 dark:focus:ring-purple-900 text-white"
                                        onClick={patrocinadorSair}>
                                        Sair
                                    </span>
                                </>
                                :
                                <Link to="/login" className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-900 dark:text-white md:dark:hover:text-purple-900 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    Identifique-se
                                </Link>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}