---
draft: false
title: "Membangun Japan Phrasebook: PWA Offline-First di React 19"
snippet: "Selami arsitektur PWA frase bahasa Jepang offline — favorit berbasis IndexedDB, komponen lazy-loaded, dan pipeline data frase dengan perkakas review native."
publishDate: "2026-08-08 10:00"
image:
  {
    src: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    alt: "Gerbang torii Fushimi Inari di Kyoto",
  }
category: "Pengembangan Web"
author: "Raka Grarizki"
tags: [react, pwa, offline-first, typescript, vite]
lang: id
---

Saat Anda mendarat di Jepang dengan paket data mati, buku frase yang butuh koneksi jaringan tidak ada gunanya. Kendala itu mendorong setiap keputusan arsitektural di [Japan Phrasebook](https://github.com/grarizki/japan-phrasebook) — PWA mobile-first yang menyimpan semuanya secara lokal dan bekerja sepenuhnya offline.

## Mengapa PWA

Aplikasi native butuh review app store dan menghabiskan ruang disk untuk segelintir frase. Aplikasi web berbasis server gagal tepat saat Anda membutuhkannya — di kereta tanpa sinyal. PWA berada di tengah: bisa diinstal di Android dan iOS, berjalan dari aset yang di-cache, dan menyimpan seluruh dataset di browser. Tanpa backend, tanpa login, tanpa data yang meninggalkan perangkat.

## Tumpukan

| Layer | Alat | Mengapa |
|-------|------|-----|
| Framework | React 19 | Komponen untuk kartu, form, modal |
| Bahasa | TypeScript | Frase punya bentuk; tegakkan itu |
| Bundler | Vite 8 | HMR cepat, plugin PWA mudah |
| Styling | Tailwind CSS 4 | Kelas utilitas mobile-first |
| Animasi | Framer Motion | Transisi spring antar tab |
| Penyimpanan | localforage (IndexedDB) | Persistensi asinkron berbasis promise |
| PWA | vite-plugin-pwa | Service worker + manifest dalam satu plugin |

## Model data: tiga tabel terhubung

Buku frase sebenarnya adalah tiga array: `categories` (Minimarket, Restoran, Toko), `conversations` (setiap frase), dan `translations` (kanji/kana plus pelafalan romaji). Normalisasi ini berarti sebuah frase bisa punya banyak terjemahan dan setiap terjemahan mendapat panduan pelafalan — hal yang sebenarnya dibaca keras oleh pelancong.

```ts
{ id: "conv9", category_id: "cat4", context: "At a train station",
  content: "Where is platform 3?", timestamp: "..." }

{ conversation_id: "conv9",
  translation: "3番ホームはどこですか？",
  pronunciation: "San-ban hoomu wa doko desu ka?" }
```

## Penyimpanan: lapisan layanan asinkron polos

Tanpa pustaka manajemen state — lapisan persistensi adalah tiga modul kecil yang membungkus `localforage`:

- `storage.ts` — primitif `get`, `set`, `remove`
- `favorites.ts` — mengelola `Set<string>` dari ID frase yang difavoritkan
- `userPhrases.ts` — CRUD untuk frase buatan pengguna dengan ID yang digenerate otomatis

Hook (`useFavorites`, `useUserPhrases`) membungkus layanan ini dan mengeksposnya ke komponen. Seluruh state aplikasi muat di dua store lokal; menarik Redux atau Zustand hanyalah overhead murni.

## Performa: lazy loading dan pemecahan kode

Dua bagian interaktif terberat — form tambah frase dan modal edit frase — hanya dibutuhkan saat pengguna membukanya, jadi keduanya dimuat lewat `React.lazy`. Pustaka vendor dipecah menjadi chunk cacheable terpisah. Hasilnya: bundle awal tetap kecil, dan karena aplikasinya PWA, chunk itu di-cache service worker setelah penggunaan pertama.

## Integritas data: skrip pemeriksaan sebagai gerbang build

Buku frase dengan terjemahan Jepang yang salah lebih buruk daripada tidak ada. Alih-alih mengandalkan mata, build menjalankan `scripts/check-data.mjs` yang:

- memverifikasi setiap percakapan punya terjemahan dan kategori yang cocok (pemeriksaan `parity`)
- menandai karakter Jepang yang salah bentuk dan sintaks romaji yang tidak konsisten

Setiap terjemahan juga membawa flag `verified` dengan metadata `verified_by`/`verified_at`. Frase terverifikasi menampilkan badge ✓; yang belum terverifikasi tetap tersembunyi. Skrip bisa meregenerasi `docs/japanese-review.md`, daftar periksa review native yang dipakai untuk meninjau semua 310 frase dengan tangan.

## Hasilnya

Instal, cache sekali, dan seluruh buku frase — favorit, frase pengguna, setiap terjemahan — hidup di perangkat. Itulah intinya: offline bukan mode fallback, tapi pengalaman utama.

Coba live di [grarizki.github.io/japan-phrasebook](https://grarizki.github.io/japan-phrasebook/), atau lihat sumbernya di [GitHub](https://github.com/grarizki/japan-phrasebook).
