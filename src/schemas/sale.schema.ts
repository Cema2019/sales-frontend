import { z } from "zod";

export const saleSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  price: z.coerce.number(),
  delivery: z.coerce.number(),
  total: z.coerce.number(),
});

export const salesSchema = z.array(saleSchema);

export type Sale = z.infer<typeof saleSchema>;
