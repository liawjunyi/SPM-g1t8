import * as z from "zod";

export const applicationSchema = z.object({
  type: z.enum(["AM", "PM", "full"]),
  reason: z.string().min(1, "Reason is required"),

  // Add check to see if FileList exists to avoid ReferenceError
  file:
    typeof window !== "undefined" && typeof FileList !== "undefined"
      ? z
          .instanceof(FileList)
          .optional()
          .or(z.array(z.instanceof(File)).optional())
      : z.array(z.instanceof(File)).optional(),

  date: z.array(z.date()).nonempty(),
});
