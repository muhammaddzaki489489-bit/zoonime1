import OtakudesuScraper from '@/lib/scraper';
import AnimeCard from '@/components/AnimeCard';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  let items: any[] = [];
  let query = '';

  if (q) {
    query = q;
    const scraper = new OtakudesuScraper();
    const result = await scraper.search(q);
    items = result.items;
  }

  return (
    <>
      <h1>🔍 Cari Anime</h1>
      <form action="/search" method="GET" className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Masukkan judul anime..."
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500 text-white"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded font-semibold transition"
          >
            Cari
          </button>
        </div>
      </form>

      {query && (
        <>
          <p className="text-gray-400 mb-4">Hasil untuk: <strong>{query}</strong></p>
          {items.length === 0 ? (
            <p className="text-gray-400">Tidak ada hasil ditemukan.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {items.map((item: any, i: number) => (
                <AnimeCard key={i} {...item} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}