import OtakudesuScraper from '@/lib/scraper';
import AnimeCard from '@/components/AnimeCard';

export default async function HomePage() {
  const scraper = new OtakudesuScraper();
  const { items } = await scraper.home();

  return (
    <>
      <h1>🔥 Episode Terbaru</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items.map((item: any, i: number) => (
          <AnimeCard key={i} {...item} />
        ))}
      </div>
    </>
  );
}