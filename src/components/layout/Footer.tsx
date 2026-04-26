import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-24 pb-24 md:pb-0">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-2">
            <h3 className="font-display text-3xl text-foreground">Zaheedna</h3>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              Busana muslim modern untuk perempuan yang menghargai keanggunan dalam kesederhanaan.
              Dibuat dengan cermat di Indonesia.
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/60 mb-4">Belanja</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/katalog" className="text-foreground/80 hover:text-accent">Semua Produk</Link></li>
              <li><Link to="/koleksi-terbaru" className="text-foreground/80 hover:text-accent">Koleksi Terbaru</Link></li>
              <li><Link to="/katalog" className="text-foreground/80 hover:text-accent">Gamis</Link></li>
              <li><Link to="/katalog" className="text-foreground/80 hover:text-accent">Hijab</Link></li>
              <li><a href="https://shopee.co.id/zaheedna.id" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-accent">Shopee Store</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/60 mb-4">Bantuan</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/tentang" className="text-foreground/80 hover:text-accent">Tentang Kami</Link></li>
              <li><span className="text-foreground/80">Panduan Ukuran</span></li>
              <li><span className="text-foreground/80">Pengiriman</span></li>
              <li><span className="text-foreground/80">Pengembalian</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Zaheedna. All rights reserved.</p>
          <p className="tracking-wider uppercase">Crafted with care · Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
