import * as z from "zod";

export const loginSchema = z.object({
  username: z.string(),
  loginPassword: z.string(),
});
