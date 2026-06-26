import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number | null;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-8">
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
        >
          Prev
        </Link>
      )}
      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        let pageNum: number;
        if (totalPages <= 5) pageNum = i + 1;
        else if (currentPage <= 3) pageNum = i + 1;
        else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
        else pageNum = currentPage - 2 + i;
        return (
          <Link
            key={pageNum}
            href={`${basePath}?page=${pageNum}`}
            className={`px-4 py-2 rounded transition ${
              currentPage === pageNum
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {pageNum}
          </Link>
        );
      })}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
        >
          Next
        </Link>
      )}
    </div>
  );
}