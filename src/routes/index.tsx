import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import heroMain from "@/assets/hero-main.jpg";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import editorial1 from "@/assets/editorial-1.jpg";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zaheedna — Busana Muslim Modern & Elegan" },
      {
        name: "description",
        content:
          "Koleksi gamis, hijab, dan tunik dengan estetika nude & gold. Belanja langsung di Zaheedna.",
      },
      { property: "og:title", content: "Zaheedna — Busana Muslim Modern & Elegan" },
      {
        property: "og:description",
        content: "Koleksi gamis, hijab, dan tunik dengan estetika nude & gold.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const bestSellers = products.filter((p) => p.badge === "Best Seller");
  const featured = products.slice(0, 6);

  return (
    <div>
      {/* HERO — Middle Eastern Nuance */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden pattern-islamic"
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-12 md:pt-36 pb-16 md:pb-32">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 md:col-span-6 order-2 md:order-1 animate-fade-up">
              <h1 className="font-display text-[44px] leading-[1.1] md:text-[96px] md:leading-[0.9] tracking-[-0.03em] text-foreground text-balance mb-8">
                Keagungan dalam <br className="hidden md:block" />
                <span className="text-accent italic">Kesederhanaan</span>
              </h1>

              <p className="text-[16px] leading-relaxed text-muted-foreground max-w-lg mb-10">
                Menghadirkan harmoni antara tradisi dan modernitas. Koleksi Zaheedna dirancang dengan
                sentuhan estetika Timur Tengah yang mewah, menggunakan material premium pilihan
                untuk kenyamanan ibadah dan momen istimewa Anda.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Link
                  to="/katalog"
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto px-10 h-14 md:h-16 bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.25em] transition-all hover:bg-foreground overflow-hidden"
                >
                  <span className="relative z-10">Jelajahi Koleksi</span>
                  <div className="absolute inset-0 bg-accent translate-y-full transition-transform group-hover:translate-y-0" />
                </Link>
                <Link
                  to="/koleksi-terbaru"
                  className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.22em] text-foreground hover:text-accent transition-all group"
                >
                  Lihat Katalog
                  <span className="transition-transform group-hover:translate-x-2">→</span>
                </Link>
              </div>
            </div>

            <div className="col-span-12 md:col-span-6 order-1 md:order-2">
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 border border-accent/20 rounded-full animate-pulse" />
                <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-accent/5 rounded-full blur-3xl" />

                <div className="relative arch-frame aspect-[4/5] shadow-2xl">
                  <img
                    src={heroMain}
                    alt="Zaheedna Middle Eastern Collection"
                    className="h-full w-full object-cover object-top transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>

                <div className="absolute bottom-2 right-2 md:bottom-12 md:-right-12 glass-gold p-4 md:p-8 max-w-[180px] md:max-w-[240px] shadow-xl">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-accent mb-1 md:mb-2">Featured Piece</p>
                  <p className="font-display text-lg md:text-2xl text-foreground leading-tight">Zuleika Gold Embroidery Gamis</p>
                  <div className="mt-3 md:mt-4 h-px w-10 md:w-12 bg-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-16 md:mt-24 border-y border-border bg-card overflow-hidden">
          <div className="flex marquee whitespace-nowrap py-5">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex items-center gap-12 px-6">
                {["Modest Modernity", "Nude & Gold", "Made in Indonesia", "Free Shipping > 500K", "Premium Crepe", "Elegan Setiap Hari"].map(
                  (t) => (
                    <span key={t} className="font-display italic text-2xl md:text-4xl text-foreground/70">
                      {t} <span className="text-accent mx-6">✦</span>
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FEATURED — magazine grid */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-[1400px] px-5 md:px-10 pt-20 md:pt-28"
      >
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">01 — Pilihan Kami</p>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight text-foreground">
              Koleksi unggulan
            </h2>
          </div>
          <Link
            to="/katalog"
            className="hidden md:inline-flex text-[11px] uppercase tracking-[0.22em] text-foreground hover:text-accent gold-underline"
          >
            Lihat semua →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-6 gap-y-12 md:gap-y-16">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 3} />
          ))}
        </div>
      </motion.section>

      {/* EDITORIAL split */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-[1400px] px-5 md:px-10 pt-24 md:pt-36"
      >
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
          <div className="col-span-12 md:col-span-7 relative">
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img
                src={lifestyle1}
                alt="Lifestyle editorial"
                loading="lazy"
                width={1280}
                height={1600}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 md:pl-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-4">02 — Filosofi</p>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-foreground text-balance">
              Keanggunan yang lahir dari kesederhanaan.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
              Setiap helai dirancang dengan rasa hormat — pada bahan, pada perempuan yang memakainya,
              dan pada nilai modesty yang menjadi inti brand kami. Kami percaya keindahan tidak perlu
              berteriak; cukup hadir dengan tenang dan tulus.
            </p>
            <Link
              to="/tentang"
              className="mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-foreground hover:text-accent group"
            >
              Cerita Zaheedna <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* BEST SELLERS */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-[1400px] px-5 md:px-10 pt-24 md:pt-36"
      >
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">03 — Best Sellers</p>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight text-foreground">
              Yang paling dicintai
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 md:gap-x-6 gap-y-12 md:gap-y-14">
          {Array.from(
            new Map(
              [...bestSellers, ...products].map((p) => [p.id, p]),
            ).values(),
          )
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </motion.section>

      {/* EDITORIAL banner */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-24 md:mt-36 relative overflow-hidden bg-card"
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-32 grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-4">04 — Newsletter</p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-foreground text-balance">
              Jadilah yang pertama tahu.
            </h2>
            <p className="mt-5 text-[15px] text-muted-foreground max-w-md">
              Dapatkan akses eksklusif ke koleksi terbaru, lookbook editorial, dan promo terbatas.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-10 flex border-b border-foreground/30 focus-within:border-accent transition"
            >
              <input
                type="email"
                placeholder="Alamat email Anda"
                className="flex-1 bg-transparent py-3 text-sm placeholder:text-muted-foreground/70 focus:outline-none"
              />
              <button
                type="submit"
                className="text-[11px] uppercase tracking-[0.22em] px-4 py-3 text-foreground hover:text-accent"
              >
                Daftar →
              </button>
            </form>
          </div>
          <div className="col-span-12 md:col-span-6 relative">
            <div className="aspect-[4/5] md:aspect-[5/4] overflow-hidden">
              <img
                src={editorial1}
                alt="Editorial fabric"
                loading="lazy"
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
