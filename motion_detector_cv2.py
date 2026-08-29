import cv2
import time

URL = "http://10.22.101.90:8081/video"
cap = cv2.VideoCapture(URL)

if not cap.isOpened():
    print("[ERROR] Tidak dapat terhubung ke kamera!")
    exit()

print("[INFO] Deteksi gerakan berbasis OpenCV aktif. Tekan Ctrl + C untuk berhenti.")

# Membaca frame pertama sebagai referensi awal
ret, frame1 = cap.read()
if not ret:
    print("[ERROR] Gagal membaca frame awal.")
    exit()

gray1 = cv2.cvtColor(frame1, cv2.COLOR_BGR2GRAY)
gray1 = cv2.GaussianBlur(gray1, (21, 21), 0)

count = 0

try:
    while True:
        ret, frame2 = cap.read()
        if not ret:
            break

        gray2 = cv2.cvtColor(frame2, cv2.COLOR_BGR2GRAY)
        gray2 = cv2.GaussianBlur(gray2, (21, 21), 0)

        # Menghitung selisih antara frame sebelumnya dan frame saat ini
        diff = cv2.absdiff(gray1, gray2)
        thresh = cv2.threshold(diff, 25, 255, cv2.THRESH_BINARY)[1]
        thresh = cv2.dilate(thresh, None, iterations=2)

        # Cek apakah ada perubahan piksel yang signifikan (gerakan)
        non_zero_count = cv2.countNonZero(thresh)
        if non_zero_count > 5000: # Batas sensitivitas gerakan
            count += 1
            filename = f"gerakan_cv_{count}.jpg"
            cv2.imwrite(filename, frame2)
            print(f"[ALERT] Gerakan terdeteksi! Disimpan: {filename} (Skor: {non_zero_count})")

        # Perbarui frame referensi
        gray1 = gray2
        time.sleep(0.5)

except KeyboardInterrupt:
    print("\n[INFO] Pemantauan dihentikan.")
    cap.release()

