import OtakudesuScraper from '@/lib/scraper';
import AnimeCard from '@/components/AnimeCard';
import Pagination from '@/components/Pagination';

export default async function GenreDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || '1');
  const scraper = new OtakudesuScraper();
  const { items, pagination } = await scraper.genre(slug, currentPage);

  return (
    <>
      <h1>🎭 Genre: {slug.replace('-', ' ').toUpperCase()}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item: any, i: number) => (
          <AnimeCard key={i} {...item} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={pagination.total}
        basePath={`/genres/${slug}`}
      />
    </>
  );
}