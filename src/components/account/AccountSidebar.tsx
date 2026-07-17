"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/cuenta", label: "Mi perfil" },
  { href: "/cuenta/direcciones", label: "Mis direcciones" },
  { href: "/cuenta/compras", label: "Mis compras" },
  { href: "/cuenta/puntos", label: "Arela Points" },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const { user, userData, signOut } = useAuth();

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-arela-ink text-arela-cream">
          {user?.photoURL ? (
            <Image src={user.photoURL} alt="" width={44} height={44} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm">
              {(userData?.displayName || user?.email || "U").charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-arela-ink">
            {userData?.displayName || user?.displayName || "Sin nombre"}
          </p>
          <p className="truncate text-xs text-arela-ink/45">{user?.email}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-3 text-sm">
        {LINKS.map((link) => {
          const active = link.href === "/cuenta" ? pathname === "/cuenta" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "border-l-2 py-1.5 pl-5 transition-colors",
                active
                  ? "border-arela-rust font-medium text-arela-ink"
                  : "border-transparent text-arela-ink/50 hover:text-arela-ink"
              )}
            >
              {link.label}
            </Link>
          );
        })}
        <button
          onClick={() => signOut()}
          className="mt-3 cursor-pointer border-l-2 border-transparent py-1.5 pl-5 text-left text-arela-rust transition-colors hover:text-arela-ink"
        >
          Cerrar sesión
        </button>
      </nav>
    </div>
  );
}
