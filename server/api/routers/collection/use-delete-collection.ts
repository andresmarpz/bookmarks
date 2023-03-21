import { useCallback } from 'react'
import { InfiniteData } from '@tanstack/react-query'
import useCollections from '~/server/api/routers/collection/use-collections'
import { Collection } from '~/types'

import { RouterOutputs, api } from '~/lib/api'

export function useDeleteCollection() {
	const context = api.useContext()
	const { queryInput } = useCollections()

	const onDelete = useCallback(
		(id: Collection['id']) => {
			context.collection.getCollections.cancel()

			const previousData = context.collection.getCollections.getInfiniteData()
			context.collection.getCollections.setInfiniteData(queryInput, (old) => {
				return {
					pages: (old?.pages ?? []).map((page) => ({
						...page,
						items: page.items.filter((bookmark) => bookmark.id !== id)
					})),
					pageParams: old?.pageParams.filter((cursor) => cursor !== id) ?? []
				}
			})

			return previousData
		},
		[context.collection.getCollections, queryInput]
	)
	const onMutationError = (
		previousData?: InfiniteData<RouterOutputs['collection']['getCollections']>
	) =>
		context.collection.getCollections.setInfiniteData(queryInput, previousData)

	const onMutationSettled = () => context.bookmark.getBookmarks.refetch()

	return api.collection.deleteCollection.useMutation({
		onMutate: async (deletedCollection) => onDelete(deletedCollection.id),
		onError: (error, deletedCollection, ctx) => onMutationError(ctx),
		onSettled: () => onMutationSettled()
	})
}
