import { QueryClient } from "@tanstack/react-query"

const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }
)

export default client;