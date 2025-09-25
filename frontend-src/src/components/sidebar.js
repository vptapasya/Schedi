import { Calendar, User, FileText } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
    return (
        <aside className="w-24 bg-[#18453B] flex flex-col items-center p-4 space-y-12">
        {/* Logo */}
        <div className="relative flex items-center justify-center w-16 h-16 mt-4">
          <div className="absolute w-full h-full border border-dashed border-white rounded-full"></div>
          <span className="text-white text-lg font-bold">Schedi</span>
        </div>
        {/* Icons */}
        <nav className="flex flex-col items-center space-y-6">
          <Link href="/dashboard" aria-label="Dashboard" className="p-2 rounded hover:bg-white/10">
            <Calendar className="w-8 h-8 text-white" />
          </Link>
          <Link href="/profile" aria-label="Profile" className="p-2 rounded hover:bg-white/10">
            <User className="w-8 h-8 text-white" />
          </Link>
          <Link href="/catalog" aria-label="Catalog" className="p-2 rounded hover:bg-white/10">
            <FileText className="w-8 h-8 text-white" />
          </Link>
        </nav>
      </aside>
    )
}