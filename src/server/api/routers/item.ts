import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import doc from "~/utils/doc";

const itemSchema = z.object({
  timestamp: z.string(),
  name: z.string(),
  class: z.string(),
  phone: z.string(),
  book: z.string(),
  image: z.string(),
  condition: z.string(),
  price: z.string(),
  sold: z.boolean(),
});

export const itemRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet?.getRows({
      offset: 1,
    });
    return {
      items: rows?.map((row) => itemSchema.parse(row)),
    };
  }),
});
