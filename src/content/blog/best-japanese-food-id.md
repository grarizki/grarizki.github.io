---
draft: false
title: "Makanan Jepang Terbaik: 3.482 Restoran Berperingkat Tabelog sebagai Aplikasi Vue Statis"
snippet: "Bagaimana lima aplikasi Vue tanpa fetch — restoran, makanan hemat, toko roti, top-100 — mengirim dataset 480 kB dengan validasi Effect Schema, prerender SSR, dan service worker, semuanya di GitHub Pages."
publishDate: "2026-08-10 05:00"
image:
  {
    src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    alt: "Sushi platter dengan sumpit",
  }
category: "Rekayasa Data"
author: "Raka Grarizki"
tags: [effect, vue, vite, monorepo, pwa, data-engineering]
lang: id
---

Menemukan restoran yang benar-benar enak di Jepang adalah permainan orang lokal: sebuah tempat bisa berjarak sepelemparan batu dari pusat wisata dan tetap tidak pernah muncul di panduan berbahasa Inggris. [best-japanese-food](https://github.com/grarizki/best-japanese-food) menaruh dataset yang benar-benar dipakai orang lokal — peringkat Tabelog — di depan para pelancong, sebagai lima aplikasi Vue statis yang dideploy ke GitHub Pages.

## Lima aplikasi, satu dataset

Setiap aplikasi menyajikan irisan [japan-food-dataset](https://github.com/grarizki/japan-food-dataset), dibundel saat build:

| Aplikasi | Path | Records |
|---|---|---|
| Restoran | `/restaurants/` | 3.482 |
| Makanan Hemat | `/budget/` | 2.991 |
| Daging Hemat (tanpa babi) | `/budget-meat/` | 2.847 |
| Toko Roti | `/bakeries/` | 19 |
| Paling Direkomendasikan | `/top-100/` | 166 seksi |

Setiap restoran membawa skor Tabelog, dan teksnya membuat skalanya terbaca: di Jepang 3,5 sudah sangat bagus, 4,0 adalah legenda.

## BFF, dibangun saat build

Backend-for-frontend biasanya berarti satu API khusus per klien. Kelima aplikasi ini menjalankan pola yang sama tanpa server: masing-masing membundel irisan terkurasi dari dataset yang sama — 3.482, 2.991, 2.847, 19, dan 166 seksi — dibentuk saat build oleh `build-data.ts`. Satu dataset, lima "backend" yang dibuat khusus, dibakar menjadi file statis alih-alih disajikan. Komprominya: nol fetch saat runtime sebagai ganti tidak ada data live.

## Pipeline Effect: validasi atau gagalkan build

Daftar restoran dengan field harga yang korup lebih buruk daripada tidak ada daftar sama sekali, jadi jalur datanya adalah gerbang build bertipe. `scripts/build-data.ts` membaca JSON `japan-food-dataset` mentah secara live, mendekode setiap record dengan Effect Schema, memangkas field khusus crawler, dan mengeluarkan satu file JSON bertipe per aplikasi. Ketidakcocokan schema menggagalkan build — data buruk tidak pernah terkirim.

```ts
const restaurants = readJson('japan_restaurants.json').pipe(
  Effect.map((raw: unknown) => (Array.isArray(raw) ? raw : []).map((r) => normalizeRecord(r as Record<string, unknown>))),
  Effect.map(decodeRecords),
)
```

Filosofi Effect yang sama meluas ke frontend: state aplikasi hidup di `SubscriptionRef` Effect (ref observabel dengan stream perubahan) yang dicerminkan komponen Vue. Tanpa Redux, tanpa Pinia.

## Performa tanpa backend

GitHub Pages tidak bisa menjalankan kode server, dan itu ternyata kendala yang tepat:

- **Nol fetch runtime** — data dibundel saat build; dataset gzip ~480 kB adalah harga untuk tidak pernah menyentuh jaringan.
- **Halaman pertama diprerender** — `@vue/server-renderer` merender halaman pertama kartu ke HTML selama build.
- **CSS inline** — build menghapus link stylesheet dan menyuntikkan CSS ke tag `<style>`, membunuh request render-blocking.
- **Service worker** — GitHub Pages memaksa header cache 10 menit, jadi service worker per aplikasi yang menyajikan aset ber-hash konten yang membuat kunjungan berulang instan. Saat hash aset baru terkirim, `CACHE_NAME` di setiap `sw.js` dinaikkan untuk membersihkan cache basi.

## Selanjutnya

Situs statis adalah keputusan yang tepat hari ini — API runtime hanya akan memperlambat frontend. Roadmap di `TODO.md` mengingat hal itu: API Hono + Effect terpisah di Cloudflare Workers — BFF yang sama, sebagai layanan runtime — untuk mengekspos dataset sebagai endpoint JSON, dan pipeline re-crawl untuk penyegaran live.

Jelajahi lima aplikasi secara live di [grarizki.github.io/best-japanese-food](https://grarizki.github.io/best-japanese-food/), atau sumbernya di [GitHub](https://github.com/grarizki/best-japanese-food).
