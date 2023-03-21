import { useMemo } from 'react'

import { RouterInputs, api } from '~/lib/api'

export default function useCollections() {
	const queryInput: RouterInputs['collection']['getCollections'] = useMemo(
		() => ({
			limit: 20
		}),
		[]
	)

	const query = api.collection.getCollections.useInfiniteQuery(queryInput, {
		getNextPageParam: (lastPage) => lastPage.nextCursor
	})

	return {
		...query,
		queryInput
	}
}
