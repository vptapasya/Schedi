import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="w-[96px] bg-forest-dark text-white flex flex-col items-center py-8 gap-8">
      <div className="logo mb-2">
        <Image src="/window.svg" alt="Schedi" width={56} height={56} />
      </div>
      <nav className="flex flex-col gap-6">
        <Link href="/dashboard" className="sidebar-link"> 
          <div className="icon">📅</div>
        </Link>
        <Link href="/builder" className="sidebar-link"> 
          <div className="icon">🧩</div>
        </Link>
        <Link href="/profile" className="sidebar-link"> 
          <div className="icon">👤</div>
        </Link>
        <Link href="/catalog" className="sidebar-link"> 
          <div className="icon">📚</div>
        </Link>
      </nav>
    </aside>
  );
}
