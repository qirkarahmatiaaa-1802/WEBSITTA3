const ApiService = {
    async fetchData() {
        try {
            // Membaca dummy data dari folder data/dataBahanAjar.json
            const response = await fetch('data/dataBahanAjar.json');
            
            if (!response.ok) {
                throw new Error(`Gagal memuat berkas JSON. Status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Terjadi kesalahan pada ApiService:", error);
            alert("⚠️ Gagal memuat data! Pastikan folder 'data/dataBahanAjar.json' sudah ada dan format JSON-nya sudah benar.");
            return null;
        }
    }
};
