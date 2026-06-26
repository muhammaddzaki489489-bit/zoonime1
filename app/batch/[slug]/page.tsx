import OtakudesuScraper from '@/lib/scraper';

export default async function BatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scraper = new OtakudesuScraper();
  const data = await scraper.batch(slug);

  return (
    <>
      <h1>📦 Batch: {data.title}</h1>

      {data.downloads.map((group: any, gi: number) => (
        <div key={gi} className="mb-6 bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-bold text-blue-400 mb-3">{group.group}</h2>
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
    </>
  );
}