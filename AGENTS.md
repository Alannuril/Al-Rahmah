<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Aturan Konfirmasi Perubahan Kode & Eksekusi Diff Antigravity
1. **Interactive Plan**: Sajikan ringkasan/rencana perubahan dengan tombol interaktif (Artifact `RequestFeedback: true`) sebelum eksekusi besar.
2. **CRITICAL - Jangan Menjalankan Perintah Terminal Setelah Edit File**:
   - Setelah memanggil `replace_file_content` atau `write_to_file`, asisten **DILARANG KERAS** menjalankan tool lain (seperti `run_command`, `tsc`, `lint`, atau `git diff`) dalam giliran yang sama.
   - Menjalankan perintah terminal setelah edit file akan menginterupsi sesi diff IDE Antigravity, menyebabkan tombol "Accept All" di kanan bawah menghilang seketika dan perubahan kode di-revert.
   - Pemanggilan edit file **HARUS selalu menjadi tindakan TERAKHIR** dalam sebuah giliran, sehingga tombol "Accept All" tetap muncul stabil di layar pengguna.
