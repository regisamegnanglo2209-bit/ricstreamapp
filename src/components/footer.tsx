import Link from 'next/link';
import Logo from './logo';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-card">
      <div className="container grid items-center gap-8 pb-8 pt-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <Link href="/faq" className="transition-colors hover:text-primary">FAQ</Link>
            <Link href="/contact" className="transition-colors hover:text-primary">Contact</Link>
            <Link href="/#" className="transition-colors hover:text-primary">Terms of Service</Link>
            <Link href="/#" className="transition-colors hover:text-primary">Privacy Policy</Link>
          </nav>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} RicStreaming. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
