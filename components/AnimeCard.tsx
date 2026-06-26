import Link from 'next/link';
import Image from 'next/image';

interface AnimeCardProps {
  title: string;
  url: string;
  poster: string | null;
  episode?: string | null;
  day?: string | null;
  date?: string | null;
}

export default function AnimeCard({ title, url, poster, episode, day, date }: AnimeCardProps) {
  const slug = url.split('/').filter(Boolean).pop() || '';

  return (
    <Link href={`/anime/${slug}`} className="group block bg-gray-800 rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-200">
      <div className="relative aspect-[3/4] bg-gray-700">
        {poster ? (
          <Image
            src={poster}
            alt={title}
            fill
            className="object-cover group-hover:opacity-80 transition-opacity"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
        {episode && (
          <span className="absolute bottom-2 right-2 bg-blue-600 px-2 py-1 rounded text-xs font-semibold">
            Episode {episode}
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        {day && <p className="text-xs text-gray-400 mt-1">{day} • {date}</p>}
      </div>
    </Link>
  );
}