from flask import Flask, send_from_directory
import cv2
import time
import os

URL = "http://10.22.101.90:8081/video"

def main_menu():
    print("\n==============================")
    print("   KAMERA BERFITUR PYTHON & OPENCV")
    print("==============================")
    print("1. Hubungkan & Cek Kamera")
    print("2. Deteksi Gerakan Otomatis")
    print("3. Keluar")
    pilihan = input("Pilih menu (1/2/3): ")
    return pilihan

def cek_kamera():
    print("[INFO] Menghubungkan ke IP Webcam...")
    cap = cv2.VideoCapture(URL)
    if not cap.isOpened():
        print("[ERROR] Tidak dapat terhubung ke kamera!")
        return
    
    print("[INFO] Berhasil terhubung! Mengambil 3 sampel frame...")
    for i in range(1, 4):
        ret, frame = cap.read()
        if ret:
            print(f" - Frame {i} ukuran: {frame.shape}")
        time.sleep(1)
    cap.release()
    print("[INFO] Tes kamera selesai.")

def deteksi_gerakan():
    print("[INFO] Memulai Deteksi Gerakan. Tekan Ctrl + C untuk berhenti.")
    cap = cv2.VideoCapture(URL)
    if not cap.isOpened():
        print("[ERROR] Tidak dapat terhubung ke kamera!")
        return

    ret, frame1 = cap.read()
    if not ret:
        print("[ERROR] Gagal membaca frame awal.")
        cap.release()
        return
    gray1 = cv2.cvtColor(frame1, cv2.COLOR_BGR2GRAY)
    count = 0
    gray1 = cv2.GaussianBlur(gray1, (21, 21), 0)



    try:
        while True:
            ret, frame2 = cap.read()
            if not ret:
                break

            gray2 = cv2.cvtColor(frame2, cv2.COLOR_BGR2GRAY)
            gray2 = cv2.GaussianBlur(gray2, (21, 21), 0)

            diff = cv2.absdiff(gray1, gray2)
            thresh = cv2.threshold(diff, 25, 255, cv2.THRESH_BINARY)[1]
            thresh = cv2.dilate(thresh, None, iterations=2)

            non_zero_count = cv2.countNonZero(thresh)
            if non_zero_count > 5000:
                count += 1
                filename = f"hasil_deteksi/gerakan_{count}.jpg"
                cv2.imwrite(filename, frame2)
                print(f"[ALERT] Gerakan tertangkap! Disimpan ke {filename} (Skor: {non_zero_count})")

            gray1 = gray2
            time.sleep(0.5)
    except KeyboardInterrupt:
        print("\n[INFO] Deteksi gerakan dihentikan.")
        cap.release()

if __name__ == "__main__":
    while True:
        pilihan = main_menu()
        if pilihan == '1':
            cek_kamera()
        elif pilihan == '2':
            deteksi_gerakan()
        elif pilihan == '3':
            print("[INFO] Keluar dari program. Terima kasih!")
            break
        else:
            print("[WARNING] Pilihan tidak valid, coba lagi.")

app = Flask(__name__)

@app.route('/hasil/<filename>')
def tampilkan_gambar(filename):
    return send_from_directory('hasil_deteksi', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

app = Flask(__name__)

@app.route('/hasil/<filename>')
def tampilkan_gambar(filename):
    return send_from_directory('hasil_deteksi', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

