import { useCallback } from 'react'
import { Bookmark } from '@prisma/client'
import { InfiniteData } from '@tanstack/react-query'

import { RouterOutputs, api } from '~/lib/api'
import { useBookmarks } from './use-bookmarks'

export function useDeleteBookmark() {
	const context = api.useContext()
	const { queryInput } = useBookmarks()

	const onDelete = useCallback(
		(id: Bookmark['id']) => {
			context.bookmark.getBookmarks.cancel()

			const previousData = context.bookmark.getBookmarks.getInfiniteData()
			context.bookmark.getBookmarks.setInfiniteData(queryInput, (old) => {
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
		[context.bookmark.getBookmarks, queryInput]
	)
	const onMutationError = (
		previousData?: InfiniteData<RouterOutputs['bookmark']['getBookmarks']>
	) => context.bookmark.getBookmarks.setInfiniteData(queryInput, previousData)

	const onMutationSettled = () => context.bookmark.getBookmarks.refetch()

	return api.bookmark.deleteBookmark.useMutation({
		onMutate: async (deletedBookmark) => onDelete(deletedBookmark.id),
		onError: (error, deletedBookmark, ctx) => onMutationError(ctx),
		onSettled: () => onMutationSettled()
	})
}
