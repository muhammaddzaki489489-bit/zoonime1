import OtakudesuScraper from '@/lib/scraper';
import Image from 'next/image';
import Link from 'next/link';

export default async function DetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scraper = new OtakudesuScraper();
  const data = await scraper.detail(slug);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="md:w-1/3 lg:w-1/4">
          {data.poster ? (
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-700">
              <Image
                src={data.poster}
                alt={data.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          ) : (
            <div className="aspect-[3/4] bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Info */}
        <div className="md:w-2/3 lg:w-3/4">
          <h1 className="text-3xl font-bold">{data.title}</h1>

          <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
            {Object.entries(data.info).map(([key, value]) => (
              <div key={key} className="flex">
                <span className="text-gray-400 w-28 capitalize">{key.replace(/_/g, ' ')}</span>
                <span className="text-gray-200">: {value || '-'}</span>
              </div>
            ))}
          </div>

          {data.sinopsis && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Sinopsis</h2>
              <p className="text-gray-300 text-sm leading-relaxed mt-1">{data.sinopsis}</p>
            </div>
          )}
        </div>
      </div>

      {/* Episode List */}
      {data.episodes.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">📺 Daftar Episode</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {data.episodes.map((ep: any, i: number) => (
              <Link
                key={i}
                href={`/episode/${ep.episodeId || ep.url.split('/').filter(Boolean).pop()}`}
                className="bg-gray-800 hover:bg-gray-700 p-3 rounded text-center text-sm transition"
              >
                <div className="font-medium">{ep.title}</div>
                {ep.releaseDate && (
                  <div className="text-xs text-gray-400 mt-1">{ep.releaseDate}</div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Rekomendasi */}
      {data.recommendations.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">🎯 Rekomendasi</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data.recommendations.map((rec: any, i: number) => {
              const slug = rec.url.split('/').filter(Boolean).pop() || '';
              return (
                <Link
                  key={i}
                  href={`/anime/${slug}`}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:scale-[1.02] transition"
                >
                  {rec.poster && (
                    <div className="relative aspect-[3/4] bg-gray-700">
                      <Image
                        src={rec.poster}
                        alt={rec.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 20vw"
                      />
                    </div>
                  )}
                  <div className="p-2 text-center text-sm truncate">{rec.title}</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}