"use client"

import { Button } from "@/components/ui/button";
import { useUpload } from "@/hooks/useUpload";

export default function UploadBookPage() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    submitted,
    onSubmit,
    imagePreview,
  } = useUpload();


  return (
    <div className="min-h-screen flex items-center justify-center px-4 w-full">
      <div className="w-full max-w-2xl bg-primary-foreground rounded-lg p-8 shadow">
        <h1 className="text-2xl font-semibold mb-4">Upload Book</h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Book Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              className="w-full rounded border px-3 py-2 text-sm"
              placeholder="Enter a descriptive title"
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            {errors.title && (
              <p id="title-error" className="text-xs text-destructive mt-1">
                {errors.title?.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="author">
              Author
            </label>
            <input
              id="author"
              type="text"
              {...register("author")}
              className="w-full rounded border px-3 py-2 text-sm"
              placeholder="Author name"
              aria-describedby={errors.author ? "author-error" : undefined}
            />
            {errors.author && (
              <p id="author-error" className="text-xs text-destructive mt-1">
                {errors.author?.message}
              </p>
            )}
          </div>

          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="image">
                Cover Image
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                {...register("cover_image")}
                className="w-full text-sm"
                aria-describedby={errors.cover_image ? "cover_image-error" : undefined}
              />
              {errors.cover_image && (
                <p id="cover_image-error" className="text-xs text-destructive mt-1">
                  {errors.cover_image?.message}
                </p>
              )}
              {imagePreview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview || ''}
                  alt="Cover image preview"
                  className="mt-2 w-40 h-56 object-cover rounded-md"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 mt-4" htmlFor="pdf">
                Supplementary PDF
              </label>
              <input
                id="pdf"
                type="file"
                accept="application/pdf"
                {...register("file")}
                className="w-full text-sm"
                aria-describedby={errors.file ? "file-error" : undefined}
              />
              {errors.file && (
                <p id="file-error" className="text-xs text-destructive mt-1">
                  {errors.file?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Uploading..." : "Upload Book"}
            </Button>
          </div>
        </form>

        {submitted && (
          <p className="mt-4 text-sm text-green-600">Uploaded (demo only) — check console</p>
        )}
      </div>
    </div>
  );
}
