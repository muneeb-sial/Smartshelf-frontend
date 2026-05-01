"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookDetailsDialog } from "./dialogs/BookDetailsDialog";
import { Download } from "lucide-react";
import { BookOut } from "@/types/api.types";
import { SERVER_URL } from "@/env";

type Book = {
  id: string;
  title: string;
  file_name: string;
  author: string;
  cover_image_path: string;
};

export default function BookCard({ book }: { book: BookOut }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `${SERVER_URL}/${book.file_name}`;
    link.download = book.file_name!.split("/").pop() || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <article className={cn("rounded-lg border p-4 shadow-sm bg-background")}> 
      <div className="flex gap-4 flex-col">
         {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${SERVER_URL}/${book.cover_image_path}`}
          alt={book.title}
          className="w-full h-48 object-cover rounded-md flex-none"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{book.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">by {book.author}</p>
          <div className="mt-4 flex gap-2">
            {/* <BookDetailsDialog/> */}
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
