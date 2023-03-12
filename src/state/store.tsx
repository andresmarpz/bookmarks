import { create } from 'zustand'
import { Collection } from '~/types'

export interface State {
  currentCollection?: Collection
}

interface Setters {
  setCurrentCollection: (collection: State['currentCollection']) => void
}

export type StoreType = State & Setters

const useStore = create<StoreType>((set) => ({
  currentCollection: undefined,
  setCurrentCollection: (collection) => set({ currentCollection: collection })
}))

export default useStore
