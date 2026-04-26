import { createFileRoute } from "@tanstack/react-router";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import editorial1 from "@/assets/editorial-1.jpg";

export const Route = createFileRoute("/tentang")({
  head: () => ({
    meta: [
      { title: "Tentang — Zaheedna" },
      { name: "description", content: "Cerita di balik Zaheedna, brand busana muslim modern." },
      { property: "og:title", content: "Tentang — Zaheedna" },
      { property: "og:description", content: "Cerita di balik brand Zaheedna." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-10 md:pt-16">
      <section className="grid grid-cols-12 gap-6 md:gap-12 items-end">
        <div className="col-span-12 md:col-span-7">
          <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-5">Tentang Kami</p>
          <h1 className="font-display text-5xl md:text-8xl leading-[0.95] tracking-[-0.02em] text-foreground text-balance">
            Modesty bukan batasan, melainkan pilihan.
          </h1>
        </div>
        <div className="col-span-12 md:col-span-5 md:pb-4">
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Lahir dari kecintaan pada keanggunan klasik dan keberanian modern, Zaheedna hadir
            untuk menemani perempuan dalam menjalani hari dengan penuh percaya diri.
          </p>
        </div>
      </section>

      <section className="mt-16 md:mt-24 grid grid-cols-12 gap-6 md:gap-10">
        <div className="col-span-12 md:col-span-7">
          <div className="aspect-[5/4] overflow-hidden bg-muted">
            <img
              src={lifestyle1}
              alt=""
              loading="lazy"
              width={1280}
              height={1600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 flex flex-col gap-6 md:pt-10">
          <h2 className="font-display text-3xl md:text-4xl text-foreground">Filosofi</h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Setiap koleksi Zaheedna lahir dari tiga prinsip: bahan yang nyaman dipakai sepanjang hari,
            siluet yang menghormati tubuh, dan detail yang dibuat dengan tangan terampil pengrajin lokal.
          </p>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Kami memproduksi dalam jumlah terbatas — bukan karena tren, melainkan karena kami percaya
            bahwa setiap helai berhak mendapat perhatian penuh dari pembuatnya.
          </p>
        </div>
      </section>

      <section className="mt-20 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-y border-border py-12 md:py-16">
        {[
          { v: "2021", l: "Berdiri" },
          { v: "120+", l: "Koleksi" },
          { v: "15K", l: "Pelanggan" },
          { v: "100%", l: "Made in ID" },
        ].map((s) => (
          <div key={s.l}>
            <p className="font-display text-4xl md:text-6xl text-foreground">{s.v}</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </section>

      <section className="mt-20 md:mt-32 grid grid-cols-12 gap-6 md:gap-10 items-center">
        <div className="col-span-12 md:col-span-5 md:order-1 order-2">
          <h2 className="font-display text-3xl md:text-4xl text-foreground">Pengrajin</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Kami bekerja sama dengan komunitas penjahit perempuan di Bandung dan Yogyakarta. Setiap
            pesanan Anda berarti dukungan langsung untuk keberlanjutan profesi mereka.
          </p>
        </div>
        <div className="col-span-12 md:col-span-7 md:order-2 order-1">
          <div className="aspect-[5/4] overflow-hidden bg-muted">
            <img
              src={editorial1}
              alt=""
              loading="lazy"
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
