import { Collection } from '@prisma/client'
import { create } from 'zustand'

interface State {
  currentCollection: Collection | undefined
}

interface Setters {
  setCurrentCollection: (collection: Collection) => void
}

export type StoreType = State & Setters

const useStore = create<StoreType>((set) => ({
  currentCollection: undefined,
  setCurrentCollection: (collection) => set({ currentCollection: collection })
}))

export default useStore
