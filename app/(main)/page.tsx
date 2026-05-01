import SearchBar from "@/components/home/SearchBar";
import { SERVER_URL } from "@/env";
import { BookOut } from "@/types/api.types";
export default async function HomePage() {
  const books: BookOut[] = await fetch(`${SERVER_URL}/books/`)
    .then((res) =>
      res.json(),
    )
    .catch(() => [])
    ;


  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Library</h1>
      <p className="text-muted-foreground mb-6">Browse and search books</p>
      {books.length > 0 ? (
        <SearchBar initialBooks={books} />
      ) : (
        <p className="text-muted-foreground">No books found</p>
      )}
    </main>
  );
}
