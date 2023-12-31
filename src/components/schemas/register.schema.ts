import * as z from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2).max(50),
  loginPassword: z.string(),
  ktpId: z.string().min(16).max(16),
  phoneNumber: z.string(),
  birthDate: z.string(),
  gender: z.string(),
});
