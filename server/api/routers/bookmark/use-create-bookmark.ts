import { useBookmarks } from '~/server/api/routers/bookmark/use-bookmarks'

import { api } from '~/lib/api'

export function useCreateBookmark() {
	const context = api.useContext()

	const { queryInput } = useBookmarks()
	return api.bookmark.createBookmark.useMutation({
		onSettled: (newBookmark) =>
			context.bookmark.getBookmarks.setInfiniteData(queryInput, (old) => {
				if (!old || !newBookmark) return old

				return {
					...old,
					pages: old.pages.map((page, index) =>
						index === old.pages.length - 1
							? {
								...page,
								items: [newBookmark, ...page.items]
							}
							: page
					)
				}
			})
	})
}
