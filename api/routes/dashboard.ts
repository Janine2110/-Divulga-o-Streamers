import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/gerais", async (req, res) => {
  try {
    const patrocinadores = await prisma.patrocinador.count()
    const streamers = await prisma.streamer.count()
    const propostas = await prisma.proposta.count()
    res.status(200).json({ patrocinadores, streamers, propostas })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/plataformas", async (req, res) => {
  try {
    const result = await prisma.streamer.groupBy({
      by: ["plataforms"],
      _count: {
        plataforms: true
      }
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar estatísticas de plataformas" });
  }
});




type PatrocinadorGroupByCidade = {
  cidade: string
  _count: {
    cidade: number
  }
}

router.get("/patrocinadoresCidade", async (req, res) => {
  try {
    const patrocinadores = await prisma.patrocinador.groupBy({
      by: ['cidade'],
      _count: {
        cidade: true,
      },
    })

    const patrocinadores2 = patrocinadores.map((patrocinador: PatrocinadorGroupByCidade) => ({
      cidade: patrocinador.cidade,
      num: patrocinador._count.cidade
    }))

    res.status(200).json(patrocinadores2)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
