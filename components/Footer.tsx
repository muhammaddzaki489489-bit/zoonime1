export default function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-6 mt-8">
      <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Zoonime — Data dari Otakudesu
      </div>
    </footer>
  );
}