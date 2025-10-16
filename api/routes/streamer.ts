import { Plataforms, PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()
const router = Router()

// Schema de validação
const StreamerSchema = z.object({
  idade: z.coerce.number().int().positive(),
  seguidores: z.coerce.number().int().nonnegative(),
  foto: z.string(),
  nome: z.string().min(3, { message: "Nome deve possuir, no mínimo, 3 caracteres" }),
  plataforms: z.nativeEnum(Plataforms).default("YOUTUBE"),
  destaque: z.boolean().default(true),
  adminId: z.string().optional()
})

router.get("/", async (req, res) => {
  try {
    const streamers = await prisma.streamer.findMany({
      where: {
        destaque: true
      },
      include: {
        Patrocinador: true,
      },
      orderBy: {
        id: 'desc'
      }
    })
    res.status(200).json(streamers)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})
router.get("/destaques", async (req, res) => {
  try {
    const streamers = await prisma.streamer.findMany({
      where: { destaque: true },
    })
    res.status(200).json(streamers)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id) {
    res.status(400).json({ erro: "ID é obrigatório" })
    return
  }
  try {
    const streamer = await prisma.streamer.findFirst({
      where: { id: Number(id) },
      include: {        
        Patrocinador: true,  
        Proposta: true       
      }
    })
    res.status(200).json(streamer)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.post("/", async (req, res) => {
  const valida = StreamerSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { idade, seguidores, foto, nome, destaque, plataforms, adminId } = valida.data

  try {
    const streamer = await prisma.streamer.create({
      data: { idade, seguidores, foto, nome, destaque, plataforms, adminId }
    })
    res.status(201).json(streamer)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const streamer = await prisma.streamer.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(streamer)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const valida = StreamerSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { idade, seguidores, foto, nome, destaque, plataforms, adminId } = valida.data

  try {
    const streamer = await prisma.streamer.update({
      where: { id: Number(id) },
      data: { idade, seguidores, foto, nome, destaque, plataforms, adminId }
    })
    res.status(200).json(streamer)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.get("/pesquisa/:termo", async (req, res) => {
  const { termo } = req.params  

  try {
    const streamers = await prisma.streamer.findMany({
      where: {
        nome: {
          contains: termo,
          mode: 'insensitive'
        }
      },
      include: {         
        Patrocinador: true,  
        Proposta: true       
      }
    })
    res.status(200).json(streamers)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})
router.patch("/destacar/:id", async (req, res) => {
  const { id } = req.params
  try {
    const streamerAtual = await prisma.streamer.findUnique({
      where: { id: Number(id) }
    })
    if (!streamerAtual) {
      res.status(404).json({ erro: "Streamer não encontrado" })
      return
    }
    const streamer = await prisma.streamer.update({
      where: { id: Number(id) },
      data: { destaque: !streamerAtual.destaque }
    })
    res.status(200).json(streamer)
  } catch (error) {
    res.status(400).json({ error })
  }
})
export default router
