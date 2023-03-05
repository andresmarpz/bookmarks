import { api } from '~/lib/api'

export default function useCollections() {
  const { data, isLoading, isError } = api.collection.getCollections.useQuery()

  return {
    collections: data,
    isLoading: isLoading || !data,
    isError
  }
}
