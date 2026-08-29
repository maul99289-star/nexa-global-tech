import urllib.request
import time
import os

URL = "http://10.22.101.90:8081/shot.jpg"

print("[INFO] Memulai sistem pemantauan gerakan...")
print("[INFO] Tekan Ctrl + C untuk berhenti.")

try:
    last_size = 0
    count = 0
    while True:
        with urllib.request.urlopen(URL, timeout=3) as response:
            image_data = response.read()
            current_size = len(image_data)
            
            # Mendeteksi perubahan ukuran file sebagai indikasi adanya gerakan/objek berubah
            if abs(current_size - last_size) > 2000:
                count += 1
                filename = f"gerakan_{count}.jpg"
                with open(filename, "wb") as f:
                    f.write(image_data)
                print(f"[ALERT] Perubahan terdeteksi! Disimpan: {filename} ({current_size} bytes)")
            
            last_size = current_size
            
        time.sleep(1)
        
except KeyboardInterrupt:
    print("\n[INFO] Pemantauan dihentikan.")

