import { httpBatchLink } from "@trpc/client";
import { appRouter } from "./routers/app";
import superjson from "superjson";

{
  /* export const rsc = createTRPCNextLayout({
  router: appRouter,
  transformer: superjson,
  createContext: () => ({}),
}); */
}

export const rsc = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
});
