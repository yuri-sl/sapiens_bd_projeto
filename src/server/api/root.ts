import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { departamentoRouter } from "./routers/departamento";
import { usuarioRouter } from "./routers/usuario";
import { authRouter } from "./routers/auth";
import { areaRouter } from "./routers/area";
import { pesquisaRouter } from "./routers/pesquisa";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  departamento: departamentoRouter,
  usuario: usuarioRouter,
  auth: authRouter,
  area: areaRouter,
  pesquisa: pesquisaRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
