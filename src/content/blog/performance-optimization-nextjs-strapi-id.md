---
title: "Cara Saya Meningkatkan Muat Halaman 97% dengan Next.js dan Strapi CMS"
snippet: "Panduan praktis mengoptimalkan aplikasi Next.js dengan backend Strapi CMS. Pelajari cara saya mencapai peningkatan LCP 97% dan pengurangan 50-60% request API."
publishDate: "2026-07-27"
image:
  src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=75"
  alt: "Dashboard optimasi performa"
category: "Performa"
tags:
  - performance
  - nextjs
  - strapi
  - web-development
author: "Raka Grarizki"
draft: false
lang: id
---

Setelah memigrasi situs pemasaran BFI Finance Indonesia ke Next.js dengan Strapi CMS, kami menghadapi masalah kritis: waktu muat halaman 13-21 detik di halaman-halaman kunci. Ini bukan sekadar masalah teknis — ini langsung berdampak pada perolehan lead dan tingkat konversi.

Di pos ini, saya akan berbagi langkah praktis yang saya ambil untuk mencapai peningkatan 97% pada Largest Contentful Paint (LCP) dan mengurangi request API CMS sebesar 50-60%.

## Masalahnya

Migrasi awal kami tampak hebat di atas kertas: tumpukan modern, server-side rendering, CMS headless. Namun kenyataannya berbeda:

- **LCP:** 13-21 detik di halaman kritis
- **Request CMS:** ~10 per muat halaman
- **Memori Server:** SSR force-dynamic menyebabkan risiko OOM
- **Pengalaman Pengguna:** Halaman lambat = lead hilang

Akar masalahnya? Kami membuat terlalu banyak request ke Strapi, mengambil terlalu banyak data, dan merender semuanya di setiap request.

## Solusi 1: Deduplikasi Request dengan React.cache()

Terobosan pertama datang dari memahami cara Next.js menangani pengambilan data. Saat `page.tsx` dan `generateMetadata()` memanggil fungsi yang sama, keduanya membuat request HTTP terpisah.

```typescript
// Sebelum: Setiap panggilan = request HTTP terpisah
export const getArticles = async ({ ... }) => { ... }

// Sesudah: Dimemoisasi per render tree
export const getArticles = cache(async ({ ... }) => { ... })
```

Dengan membungkus pengambil data CMS kita dengan `React.cache()`, kami mengurangi request duplikat dari ~10 menjadi ~2 per halaman. Perubahan tunggal ini memotong beban CMS sebesar 50-60%.

## Solusi 2: Ekstraksi Pola Populate

Parameter populate Strapi bertele-tele dan tersebar di seluruh codebase. Kami mengekstraknya menjadi modul bersama yang bisa dikomposisi:

```typescript
// src/lib/cms/populate.ts
export const getHomepagePopulate = () => ({
  seo: { populate: "*" },
  hero: { populate: { image: { populate: "*" } } },
  // ... field lainnya
});

// Penggunaan: 21 baris → 3 baris
const query = qs.stringify({
  locale,
  populate: getHomepagePopulate(),
}, { encodeValuesOnly: true });
```

Ini membuat kode kami lebih mudah dipelihara dan mengurangi ukuran payload API sebesar ~40%.

## Solusi 3: Adopsi ISR

Kami mengganti SSR force-dynamic dengan Incremental Static Regeneration (ISR):

```typescript
// Sebelum: SSR di setiap request
export const dynamic = "force-dynamic";

// Sesudah: ISR dengan revalidasi 60 detik
export const revalidate = 60;
export function generateStaticParams() {
  return [{ language: "id" }, { language: "en" }];
}
```

Ini menghilangkan risiko OOM dan menyajikan respons cache alih-alih membangun ulang di setiap request. Tekanan memori server turun signifikan.

## Solusi 4: Optimasi Gambar

Kami mengoptimalkan konfigurasi gambar Next.js:

```typescript
// next.config.js
images: {
  formats: ["webp"], // Hapus AVIF untuk pemrosesan lebih cepat
  minimumCacheTTL: 60 * 60 * 24 * 365, // cache 1 tahun
  remotePatterns: [
    { hostname: "**.bfi.co.id" },
    { hostname: "**.strapiapp.com" },
  ],
}
```

Ini mengurangi penggunaan CPU/memori Sharp dan mempersempit permukaan serangan kami.

## Hasil

Dampaknya dramatis:

| Metrik | Sebelum | Sesudah | Peningkatan |
|--------|---------|---------|-------------|
| LCP (Blog) | 13,0s | 0,4s | 97% |
| Request CMS/Halaman | ~10 | ~2 | 50-60% |
| Baris Populate Homepage | 21 | 3 | 86% |
| Memori Server | Risiko OOM | Stabil | Tereliminasi |

## Kesimpulan Utama

1. **Ukur dulu.** Gunakan Lighthouse, Core Web Vitals, dan pemantauan pengguna nyata untuk mengidentifikasi hambatan.

2. **React.cache() itu kuat.** Mudah diabaikan tetapi membuat perbedaan besar saat Anda punya banyak pengambil data per halaman.

3. **Modularisasi query populate Anda.** Sintaks populate Strapi kuat tetapi bertele-tele. Buat modul yang bisa dikomposisi agar mudah dipelihara.

4. **ISR > SSR untuk kebanyakan halaman.** Kecuali Anda butuh data real-time, ISR dengan revalidasi memberi yang terbaik dari dua dunia.

5. **Optimalkan gambar secara agresif.** WebP saja, domain terbatas, dan TTL cache panjang mengurangi beban server dan meningkatkan performa.

6. **Performa adalah fitur.** Setiap milidetik berarti. Halaman lebih cepat = lebih banyak konversi = lebih banyak pendapatan.

## Kesimpulan

Optimasi performa bukan tentang satu trik sulap. Ini tentang mengidentifikasi dan menghilangkan hambatan secara sistematis. Dalam kasus kami, kombinasi deduplikasi request, modularisasi populate, adopsi ISR, dan optimasi gambar mengubah aplikasi yang lambat dan rakus memori menjadi mesin perolehan lead yang cepat dan andal.

Bagian terbaiknya? Perubahan ini sebagian besar berupa konfigurasi dan refactoring — tanpa perubahan arsitektur besar. Terkadang kemenangan terbesar datang dari optimasi paling sederhana.

---

*Pos ini berdasarkan pekerjaan saya di PT. BFI Finance Indonesia, tempat saya memimpin optimasi performa untuk situs pemasaran perusahaan multifinance terbesar di Indonesia.*
