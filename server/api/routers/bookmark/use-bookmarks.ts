import { useMemo } from 'react'
import useStore from '~/state/store'

import { RouterInputs, api } from '~/lib/api'

export function useBookmarks() {
	const currentCollection = useStore((state) => state.currentCollection)

	const queryInput: RouterInputs['bookmark']['getBookmarks'] = useMemo(
		() => ({
			collectionId: currentCollection?.id,
			limit: 20
		}),
		[currentCollection?.id]
	)

	const query = api.bookmark.getBookmarks.useInfiniteQuery(queryInput, {
		getNextPageParam: (lastPage) => lastPage.nextCursor
	})

	// queryInput is used to mutate queries cache
	return {
		...query,
		queryInput
	}
}
