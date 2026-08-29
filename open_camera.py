import cv2

# Ganti URL di bawah ini sesuai dengan IP Webcam HP kamu
URL = "http://10.22.101.90:8081/video"

print("[INFO] Menghubungkan ke IP Webcam...")
cap = cv2.VideoCapture(URL)

if not cap.isOpened():
    print("[ERROR] Tidak dapat terhubung ke kamera!")
    exit()

print("[INFO] Kamera berhasil terhubung. Tekan 'q' di keyboard untuk keluar.")

while True:
    ret, frame = cap.read()
    if not ret:
        print("[ERROR] Gagal mengambil frame dari kamera.")
        break

    # Menampilkan frame video (karena di Termux tanpa GUI layar, ini untuk persiapan jika pakai VNC/opsi lain)
    # Sebagai gantinya, kita bisa memproses ukuran frame atau menyimpannya langsung
    print(f"[INFO] Berhasil membaca frame ukuran: {frame.shape}")

    # Berhenti jika ditekan 'q' atau jeda sebentar
    cv2.waitKey(1000) # Cek setiap 1 detik

cap.release()
print("[INFO] Program selesai.")

