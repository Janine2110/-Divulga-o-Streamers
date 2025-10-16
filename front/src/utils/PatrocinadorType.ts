import type { PropostaType } from "./PropostaType"
import type { StreamerType } from "./StreamerType"

export type PatrocinadorType = {
  id: number
  nome: string
  idade: number
  email: string
  streamerId: number
  streamer?: StreamerType
  Proposta?: PropostaType[]
  createdAt: Date
  updatedAt: Date
}