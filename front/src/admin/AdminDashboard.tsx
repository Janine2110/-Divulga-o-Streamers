import './AdminDashboard.css'
import { useEffect, useState } from "react";
import { VictoryPie, VictoryLabel, VictoryTheme } from "victory";

const apiUrl = import.meta.env.VITE_API_URL

type graficoPlataformaType = {
  plataforms: string;         
  _count: { plataforms: number } 
}

type graficoPatrocinadorType = {
  cidade: string
  num: number
}

type geralDadosType = {
  patrocinadores: number
  streamers: number
  propostas: number
}

export default function AdminDashboard() {
  const [plataformas, setPlataformas] = useState<graficoPlataformaType[]>([])
  const [patrocinadoresCidade, setPatrocinadoresCidade] = useState<graficoPatrocinadorType[]>([])
  const [dados, setDados] = useState<geralDadosType>({} as geralDadosType)

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch(`${apiUrl}/dashboard/gerais`)
      const dados = await response.json()
      setDados(dados)
    }
    getDadosGerais()

    // async function getDadosGraficoMarca() {
    //   const response = await fetch(`${apiUrl}/dashboard/carrosMarca`)
    //   const dados = await response.json()
    //   setCarrosMarca(dados)
    // }
    // getDadosGraficoMarca()

    async function getDadosGraficoPlataforma() {
      const response = await fetch(`${apiUrl}/dashboard/plataformas`)
      const dados = await response.json()
      setPlataformas(dados)
    }
    getDadosGraficoPlataforma()

    async function getDadosGraficoPatrocinador() {
      const response = await fetch(`${apiUrl}/dashboard/patrocinadoresCidade`)
      const dados = await response.json()
      setPatrocinadoresCidade(dados)
    }
    getDadosGraficoPatrocinador()

  }, [])

const listaPlataformas = plataformas.map(item => ({
  x: item.plataforms,               
  y: item._count.plataforms          
}));

  const listaPatrocinadoresCidade = patrocinadoresCidade.map(item => (
    { x: item.cidade, y: item.num }
  ))

  return (
    <div className="container mt-24">
      <h2 className="self-center text-3xl font-mono whitespace-nowrap dark:text-purple-500">Visão Geral do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5 mt-8">
        <div className="border-purple-500 border rounded p-6 w-1/3 me-3">
          <span className="bg-purple-500 text-purple-500 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-purple-500 dark:text-white">
            {dados.patrocinadores}</span>
          <p className="font-bold mt-2 text-center font-mono">Nº Patrocinadores</p>
        </div>
        <div className="border-red-400 border rounded p-6 w-1/3 me-3">
          <span className="bg-red-100 text-red-500 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-400 text-white">
            {dados.patrocinadores}</span>
          <p className="font-bold mt-2 text-center font-mono">Nº Streamers</p>
        </div>
        <div className="border-green-500 border rounded p-6 w-1/3">
          <span className="bg-green-500 text-green-400 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-500 text-white">
            {dados.propostas}</span>
          <p className="font-bold mt-2 text-center font-mono">Nº Propostas</p>
        </div>
      </div>

      <div className="div-graficos mt-20">
        <svg viewBox="30 55 400 400">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={listaPlataformas}
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.clean}
            colorScale={["oklch(72.3% 0.219 149.579)","oklch(62.7% 0.265 303.9)", "oklch(70.4% 0.191 22.216)","oklch(70.4% 0.04 256.788)", "oklch(82.8% 0.111 230.318)"]}
            style={{
              labels: {
                fontSize: 10,
                fill: "#fff",
                fontFamily: "Monospace",
                fontWeight: "bold"
              }
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: "rgba(153, 32, 184, 0.77)",
              fontFamily: "monospace",
              fontWeight: "bold"
            }}
            x={200}
            y={200}
            text={["Streamers", "por Plataforma"]}
          />
        </svg>

        <svg viewBox="30 55 400 400">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={listaPatrocinadoresCidade}
            innerRadius={50}
            labelRadius={60}
            theme={VictoryTheme.clean}
            colorScale={["oklch(62.7% 0.265 303.9)", "oklch(70.4% 0.191 22.216)", "oklch(72.3% 0.219 149.579)", "oklch(70.4% 0.04 256.788)", "oklch(82.8% 0.111 230.318)"]}
            style={{
              labels: {
                fontSize: 9,
                fill: "#fff",
                fontFamily: "monospace",
                fontWeight: "bold"
              }
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: "rgba(153, 32, 184, 0.77)",
              fontFamily: "monospace",
              fontWeight: "bold"
            }}
            x={200}
            y={200}
            text={["Patrocinadores", "por Cidade"]}
          />
        </svg>

      </div>
    </div>
  )
}