import OtakudesuScraper from '@/lib/scraper';
import Link from 'next/link';

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scraper = new OtakudesuScraper();
  const data = await scraper.episode(slug);

  return (
    <>
      <h1>{data.title}</h1>

      {/* Streams */}
      {Object.keys(data.streams).length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">🎬 Nonton Streaming</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(data.streams).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm font-medium transition"
              >
                {key.replace(/_/g, ' - ')}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Downloads */}
      {data.downloads.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">⬇️ Download</h2>
          {data.downloads.map((group: any, gi: number) => (
            <div key={gi} className="mb-4 bg-gray-800 rounded-lg p-4">
              <h3 className="font-bold text-blue-400 mb-2">{group.group}</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {group.items.map((item: any, ii: number) => (
                  <div key={ii} className="bg-gray-700 p-3 rounded">
                    <div className="text-sm font-medium">
                      {item.resolution} {item.size && `(${item.size})`}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.links.map((link: any, li: number) => (
                        <a
                          key={li}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-xs transition"
                        >
                          {link.host}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Navigasi */}
      <div className="flex flex-wrap justify-between gap-2 mt-6 border-t border-gray-700 pt-4">
        {data.nav.prev && (
          <Link href={data.nav.prev} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition">
            ⬅ Episode Sebelumnya
          </Link>
        )}
        {data.nav.all && (
          <Link href={data.nav.all} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition">
            📋 Lihat Semua
          </Link>
        )}
        {data.nav.next && (
          <Link href={data.nav.next} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition">
            Episode Selanjutnya ➡
          </Link>
        )}
      </div>

      {/* Episode Lainnya */}
      {data.otherEpisodes && data.otherEpisodes.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">📺 Episode Lainnya</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {data.otherEpisodes.slice(0, 12).map((ep: any, i: number) => (
              <Link
                key={i}
                href={`/episode/${ep.episodeId || ep.url.split('/').filter(Boolean).pop()}`}
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded text-center text-sm transition"
              >
                {ep.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}