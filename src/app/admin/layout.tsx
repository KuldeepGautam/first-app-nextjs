import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Users, FolderTree } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r bg-muted/20">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin/dashboard" className="font-bold text-lg">
            Admin Panel
          </Link>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            <ShoppingBag className="h-4 w-4" />
            Products
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            <FolderTree className="h-4 w-4" />
            Categories
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            <Users className="h-4 w-4" />
            Users
          </Link>
        </nav>
      </aside>

      {/* Admin Content */}
      <main className="flex-1 overflow-y-auto bg-background p-8">
        {children}
      </main>
    </div>
  );
}
