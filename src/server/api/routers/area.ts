import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const areaRouter = createTRPCRouter({
    listarAreasView: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.$queryRaw`
      SELECT * FROM vw_area_esp
    `;
  })

})