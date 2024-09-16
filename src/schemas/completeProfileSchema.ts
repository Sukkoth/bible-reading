import { z } from "zod";

export const CompleteProfileSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
    })
    .min(3, "First name should be atleast 3 characters")
    .max(20),
  lastName: z.string().max(20).optional(),
  gender: z.string({
    required_error: "Gender field is required",
  }),
  avatar: z
    .string({
      required_error: "Cover image is required",
    })
    .startsWith("https://"),
});

export type CompleteProfileSchemaType = z.infer<typeof CompleteProfileSchema>;
