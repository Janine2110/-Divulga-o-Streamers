import type { PropostaType } from "./PropostaType"
import type { AdminType } from "./AdminType"
import type { PatrocinadorType } from "./PatrocinadorType"


export type Plataforms =
  | "YOUTUBE"
  | "TWITCH"
  | "FACEBOOK"
  | "INSTAGRAM"
  | "TIKTOK"
  | "KICK";


export type StreamerType = {
  id: number
  nome: string
  idade: number
  seguidores: number
  foto: string
  destaque: boolean
  plataforms: Plataforms
  adminId?: number
  admin?: AdminType
  Patrocinador: PatrocinadorType[]
  Proposta: PropostaType[]
  createdAt: Date
  updatedAt: Date
}