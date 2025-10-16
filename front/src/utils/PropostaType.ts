import type { StreamerType } from "./StreamerType"
import type { PatrocinadorType } from "./PatrocinadorType"
import type { AdminType } from "./AdminType"

export type PropostaType = {
  id: number
  titulo: string
  descricao: string
  streamerId: number
  streamer: StreamerType
  patrocinadorId: number
  patrocinador?: PatrocinadorType
  adminId: number
  admin?: AdminType
  resposta: string | null
  createdAt: string
  updatedAt: string | null
}
