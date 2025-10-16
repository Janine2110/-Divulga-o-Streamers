import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()
const router = Router()

const propostaSchema = z.object({
  titulo: z.string().min(3, { message: "Título deve possuir, no mínimo, 3 caracteres" }),
  descricao: z.string().min(10, { message: "Descrição deve possuir, no mínimo, 10 caracteres" }),
})
async function enviaEmail(nome: string, email: string,
  descricao: string, resposta: string) {

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILTRAP_EMAIL,
    pass: process.env.MAILTRAP_SENHA,
  },
});

  const info = await transporter.sendMail({
    from: 'miguelvencato.cupim@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Re: Proposta Revenda Herbie", // Subject line
    text: resposta, // plain text body
    html: `<h3>Estimado Cliente: ${nome}</h3>
           <h3>Proposta: ${descricao}</h3>
           <h3>Resposta da Revenda: ${resposta}</h3>
           <p>Muito obrigado pelo seu contato</p>
           <p>Revenda Herbie</p>`
  });

  console.log("Message sent: %s", info.messageId);
}

router.get("/", async (req, res) => {
  try {
    const propostas = await prisma.proposta.findMany({
      include: {
        streamer: true,
        patrocinador: true,
        admin: true
      }
    })
    res.status(200).json(propostas)
  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: "Erro ao buscar propostas" })
  }
})

router.get("/:patrocinadorId", async (req, res) => {
  const { patrocinadorId } = req.params

  try {
    const propostas = await prisma.proposta.findMany({
      where: {
      patrocinadorId: Number(patrocinadorId) },
      include: {
        streamer: true
      }
    })

    res.status(200).json(propostas)
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar propostas do patrocinador" })
  }
})


router.post("/", async (req, res) => {
  const { descricao, streamerId, patrocinadorId, adminId } = req.body

  
  if (!descricao || !streamerId || !patrocinadorId) {
    res.status(400).json({ erro: "Campos obrigatórios faltando" })
    return
  }

  try {
    const proposta = await prisma.proposta.create({
      data: { 
        titulo: "Patrocínio", 
        descricao,
        streamerId: Number(streamerId),
        patrocinadorId: Number(patrocinadorId),
        ...(adminId ? { adminId: String(adminId) } : {})
      } 
    })
    res.status(201).json(proposta)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const proposta = await prisma.proposta.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(proposta)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const valida = propostaSchema.safeParse(req.body)

  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { titulo, descricao } = valida.data

  try {
    const proposta = await prisma.proposta.update({
      where: { id: Number(id) },
      data: { titulo, descricao }
    })
    res.status(200).json(proposta)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.patch("/:id", async (req, res) => {
  const { id } = req.params
  const { resposta } = req.body

  if (!resposta || resposta.trim() === "") {
    return res.status(400).json({ erro: "Resposta é obrigatória" })
  }

  try {
    const proposta = await prisma.proposta.update({
      where: { id: Number(id) },
      data: { resposta }
    })
    res.status(200).json(proposta)
  } catch (error) {
    console.error(error)
    res.status(400).json({ erro: "Erro ao atualizar a proposta" })
  }
})

export default router
