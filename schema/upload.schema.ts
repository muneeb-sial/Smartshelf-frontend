import { z } from "zod";

export const UploadSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  author: z
    .string()
    .min(1, "Author is required")
    .max(100, "Author must be less than 100 characters"),
  cover_image: z
    .custom<FileList>()
    .refine((file) => {
      const singleFile = file?.[0];
      console.log({ cover_img: singleFile })
      return !singleFile || (singleFile instanceof File && singleFile.type.startsWith('image/'))
    }, {
      message: "Cover image must be a valid image file"
    })
    .optional(),
  file: z
    .custom<FileList>()
    .refine((file) => {
      const singleFile = file?.[0];
      console.log({ file: singleFile })
      return !singleFile || (singleFile instanceof File && (
        singleFile.type === "application/pdf" ||
        singleFile.type === "application/msword" ||
        singleFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        singleFile.type === "text/markdown" ||
        singleFile.name?.endsWith(".md")
      ))
    }, {
      message: "File must be a PDF or Markdown"
    })
    .optional(),
});

export type UploadSchemaType = z.infer<typeof UploadSchema>;