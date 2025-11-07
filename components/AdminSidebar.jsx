'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Projects', href: '/admin/projects' },
    { name: 'Certifications', href: '/admin/certificate-skills' },
    { name: 'Skills', href: '/admin/certificate-skills' },
    { name: 'Contacts', href: '/admin/contacts' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-indigo-800 text-white p-6 shadow-2xl">
      <h2 className="text-2xl font-bold mb-8 border-b border-indigo-600 pb-4">Admin Panel</h2>
      <nav className="space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block px-4 py-2 rounded-lg transition-colors duration-200 
              ${pathname === item.href 
                ? 'bg-indigo-600 font-semibold shadow-md' 
                : 'hover:bg-indigo-700'
              }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="mt-12 pt-4 border-t border-indigo-600">
          <Link href="/" className="text-sm text-indigo-200 hover:text-white transition">← Back to Portfolio</Link>
      </div>
    </aside>
  );
}