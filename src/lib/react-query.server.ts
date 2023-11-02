import { cache } from "react"
import { QueryClient } from "@tanstack/react-query"

export const getQueryClientServer = cache(() => new QueryClient())
