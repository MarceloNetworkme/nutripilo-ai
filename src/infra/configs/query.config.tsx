import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "./cache.config";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 1000 * 30,
    },
  },
});

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.altKey && e.key === "k") {
    queryClient.clear();
  }
});

persistQueryClient({
  queryClient,
  persister: createSyncStoragePersister({ storage: window.localStorage }),
});
