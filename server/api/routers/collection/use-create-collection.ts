import useCollections from '~/server/api/routers/collection/use-collections'

import { api } from '~/lib/api'

export function useCreateCollection() {
	const context = api.useContext()

	const { queryInput } = useCollections()
	return api.collection.createCollection.useMutation({
		onSettled: (newCollection) => {
			context.collection.getCollections.setInfiniteData(queryInput, (old) => {
				if (!old || !newCollection) return old

				return {
					...old,
					pages: old.pages.map((page, index) =>
						index === old.pages.length - 1
							? {
								...page,
								items: [newCollection, ...page.items]
							}
							: page
					)
				}
			})
		}
	})
}
