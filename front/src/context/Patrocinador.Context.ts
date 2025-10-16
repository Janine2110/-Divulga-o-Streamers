import type { PatrocinadorType } from '../utils/PatrocinadorType'
import { create } from 'zustand'

type PatrocinadorStore = {
    patrocinador: PatrocinadorType
    logaPatrocinador: (PatrocinadorLogado: PatrocinadorType) => void
    deslogaPatrocinador: () => void
}

export const usePatrocinadorStore = create<PatrocinadorStore>((set) => ({
    patrocinador: {} as PatrocinadorType,
    logaPatrocinador: (patrocinadorLogado) => set({patrocinador: patrocinadorLogado}),
    deslogaPatrocinador: () => set({patrocinador: {} as PatrocinadorType})
}))