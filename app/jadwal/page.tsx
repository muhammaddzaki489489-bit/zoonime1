import OtakudesuScraper from '@/lib/scraper';
import Link from 'next/link';

export default async function JadwalPage() {
  const scraper = new OtakudesuScraper();
  const { schedule } = await scraper.jadwalRilis();

  const dayOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  return (
    <>
      <h1>📅 Jadwal Rilis</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dayOrder.map(day => {
          const items = schedule[day] || [];
          return (
            <div key={day} className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold text-blue-400 border-b border-gray-700 pb-2 mb-3">
                {day}
              </h2>
              {items.length === 0 ? (
                <p className="text-gray-400 text-sm">Tidak ada jadwal</p>
              ) : (
                <ul className="space-y-2">
                  {items.map((item: any, i: number) => {
                    const slug = item.url.split('/').filter(Boolean).pop() || '';
                    return (
                      <li key={i}>
                        <Link href={`/anime/${slug}`} className="text-sm hover:underline">
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}