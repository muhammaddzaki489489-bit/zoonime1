import OtakudesuScraper from '@/lib/scraper';
import Link from 'next/link';

export default async function GenresPage() {
  const scraper = new OtakudesuScraper();
  const { genres } = await scraper.genreList();

  return (
    <>
      <h1>📂 Daftar Genre</h1>
      <div className="flex flex-wrap gap-3">
        {genres.map((g: any) => (
          <Link
            key={g.slug}
            href={`/genres/${g.slug}`}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-full text-sm transition"
          >
            {g.name}
          </Link>
        ))}
      </div>
    </>
  );
}