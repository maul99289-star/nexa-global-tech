import urllib.request
import time


URL = "http://10.22.101.90:8081/shot.jpg"

print("[INFO] Memulai penyimpanan foto otomatis...")
print("[INFO] Tekan Ctrl + C untuk berhenti.")

try:
    count = 0
    while True:
        with urllib.request.urlopen(URL, timeout=3) as response:
            image_data = response.read()
            count += 1
            filename = f"foto_{count}.jpg"
            
            # Menyimpan data gambar ke file lokal
            with open(filename, "wb") as f:
                f.write(image_data)
                
            print(f"[SUCCESS] Disimpan: {filename} ({len(image_data)} bytes)")
        
        # Jeda 2 detik sebelum mengambil foto berikutnya
        time.sleep(2)
        
except KeyboardInterrupt:
    print("\n[INFO] Program dihentikan.")

