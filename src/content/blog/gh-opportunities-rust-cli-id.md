---
draft: false
title: "gh-opportunities: Alat Rust yang Menemukan PR Open-Source Berikutnya"
snippet: "Saya membangun gh-opportunities, CLI + TUI Rust yang memberi peringkat repo GitHub berdasarkan peluang kontribusi — menilai good-first issues, kebasuan, kesehatan README, dan kualitas kode — sehingga PR open-source pertama Anda butuh hitungan menit, bukan sore yang dihabiskan untuk berburu."
publishDate: "2026-08-02 10:00"
image:
  {
    src: "https://images.unsplash.com/photo-1561470508-fd4df1ed90b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    alt: "Kode Rust di terminal",
  }
category: "Rust"
author: "Raka Grarizki"
tags: [rust, open-source, cli, ratatui, github]
lang: id
---

Menemukan kontribusi open-source yang bagus adalah pekerjaan manual yang lambat. Anda membuka repo, berburu label `good first issue`, menebak apakah sebuah PR sudah diabaikan berminggu-minggu, dan membaca README untuk menilai apakah maintainer akan membalas. Kebanyakan orang menyerah sebelum mengklik "New pull request".

Saya menulis **gh-opportunities** untuk mengotomatisasi riset itu persis. Ini adalah CLI Rust yang memindai repositori GitHub, memberi skor pada beberapa sinyal, dan mengembalikan daftar berperingkat yang bisa Anda tindak dalam hitungan menit — dari terminal, skrip, atau agen AI.

## Melampaui "temukan issue mudah"

Pendekatan naif mencari label `good first issue` dan berhenti di situ. Label mudah tidak ada artinya jika issue basi, README kosong, atau tidak ada yang mengelola proyek itu yang akan mereview diff Anda.

Jadi `gh-opportunities` memberi skor repo pada empat sinyal:

- **Kualitas good-first-issue** — berlabel, terdeskripsi baik, tidak ber-assign
- **Kebasuan** — issue dan PR yang menunggu terlalu lama untuk diperhatikan
- **Kesehatan README & komunitas** — `CONTRIBUTING.md`, code of conduct, lisensi, template issue
- **Kualitas kode** — kepadatan TODO/FIXME, CI, konfigurasi lint, cakupan tes

Skor gabungan memberi tahu Anda *di mana Anda akan membuat perbedaan terbesar*, bukan hanya di mana sesuatu ditandai mudah. Repo dengan komunitas kuat tetapi beberapa celah yang bisa ditemukan menempati peringkat lebih tinggi daripada repo panas tempat issue membusuk tak terbaca.

## Set fitur

```bash
# Nilai good first issues di sebuah repo
gh-opportunities scan serde-rs/serde

# Temukan repo Rust berpeluang tinggi
gh-opportunities discover --lang rust --min-stars 100

# Temukan issue yang tidak disentuh 30+ hari
gh-opportunities stale tokio-rs/tokio

# Saksikan semuanya di TUI interaktif
gh-opportunities tui rust-lang/rust tokio-rs/tokio denoland/deno
```

Di luar dasar-dasarnya, ia membawa beberapa mainan menyenangkan:

- **Cache SQLite** — memotong panggilan API redundan dan menjauh dari batas rate
- **Analisis AI** — OpenAI/Anthropic meringkas, merekomendasikan, dan menilai tingkat kesulitan per issue
- **Gerbang keamanan** — pemeriksaan CVE, secret, lisensi, dan kualitas yang terpasang sebagai hook pre-push
- **Server HTTP** — mengekspos seluruh alat ke agen AI melalui server `axum` ber-autentikasi bearer

## Yang saya pelajari saat membangunnya

Ini UI Rust serius pertama saya, dan tumpukannya adalah latihan hebat untuk ekosistem:

| Layer | Crate |
|-------|-------|
| CLI | `clap` (derive) |
| TUI | `ratatui` + `crossterm` |
| Async | `tokio` |
| HTTP client/server | `reqwest` + `axum` |
| Cache | `rusqlite` |

Dua pelajaran menonjol. Pertama, modul sebagai seam yang bersih: layer `ai/` adalah trait yang bisa Anda ganti provider-nya, dan `security/` bersifat aditif tanpa menyentuh pemanggil. Kedua, tes lebih dulu — codebase membawa 112 tes yang lulus, dan setiap modul memiliki tesnya sendiri.

Efek yang benar-benar berguna: proyek itu sendiri adalah alat rekrutmen terbaik untuk kontributor. Ia membangun peringkat issue, jadi loop kontribusi yang dicarinya adalah loop tempat ia hidup — pilih issue, jalankan `cargo test`, dan buka PR pertama Anda.

Coba — `cargo install --path .`, lalu `gh-opportunities scan` dependensi favorit Anda.
