import { ArrayElement } from '~/types'

import { RouterOutputs } from '~/lib/api'

export type Collection = ArrayElement<
  RouterOutputs['collection']['getCollections']
>
