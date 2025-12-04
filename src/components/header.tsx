"use client";

import { Button } from "@/components/ui/button";
import { LogOut, User, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../../public/logo.png";
interface HeaderProps {
  isLoggedIn: boolean;
  userEmail: string;
  userFullName?: string;
  onLogin: () => void;
  onLogout: () => void;
}

export function Header({
  isLoggedIn,
  userEmail,
  userFullName,
  onLogin,
  onLogout,
}: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/sobre-nosotros", label: "Sobre UNTELS" },
    { href: "/carreras", label: "Carreras" },
    { href: "/sostenibilidad", label: "Sostenibilidad" },
    { href: "/noticias", label: "Noticias" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative h-14 w-14 flex-shrink-0">
              <Image
                src={logo}
                alt="Logo UNTELS"
                fill
                className="object-contain object-center"
                style={{
                  objectPosition: "center top",
                  clipPath: "inset(0 0 15% 0)",
                }}
                priority
              />
            </div>
            <div>
              <h1 className="text-xl font-black leading-tight text-foreground">
                UNTELS Participa
              </h1>
              <p className="text-xs font-semibold text-primary">
                Villa El Salvador
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  pathname === link.href
                    ? "bg-gradient-to-r from-primary to-accent text-white"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <div className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2.5 sm:flex border border-primary/20">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    {userFullName || userEmail}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="gap-2 font-semibold hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Salir</span>
                </Button>
              </>
            ) : (
              <Button
                onClick={onLogin}
                className="gap-2 gradient-primary font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Iniciar Sesión</span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border/40">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                    pathname === link.href
                      ? "bg-gradient-to-r from-primary to-accent text-white"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
