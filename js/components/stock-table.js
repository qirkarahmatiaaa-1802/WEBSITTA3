Vue.component('ba-stock-table', {
    template: '#tpl-stock',
    props: ['items', 'upbjjList', 'kategoriList'],
    data() {
        return {
            filterUpbjj: '', filterKategori: '', filterKondisi: 'all', sortBy: 'judul',
            isEdit: false, form: this.clearForm()
        };
    },
    watch: {
        filterUpbjj(newVal) { if (!newVal) this.filterKategori = ''; }
    },
    filters: {
        currency(value) { return 'Rp ' + (value || 0).toLocaleString('id-ID'); },
        satuan(value) { return (value || 0) + ' buah'; }
    },
    computed: {
        filteredAndSortedItems() {
            let result = this.items ? [...this.items] : [];
            if (this.filterUpbjj) result = result.filter(item => item.upbjj === this.filterUpbjj);
            if (this.filterKategori && this.filterUpbjj) result = result.filter(item => item.kategori === this.filterKategori);
            if (this.filterKondisi === 'critical') result = result.filter(item => item.qty <= item.safety || item.qty === 0);
            result.sort((a, b) => {
                if (this.sortBy === 'judul') return a.judul.localeCompare(b.judul);
                return a[this.sortBy] - b[this.sortBy];
            });
            return result;
        }
    },
    methods: {
        clearForm() { return { kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', harga: 0, qty: 0, safety: 0, catatanHTML: '' }; },
        resetFilter() { this.filterUpbjj = ''; this.filterKategori = ''; this.filterKondisi = 'all'; this.sortBy = 'judul'; },
        saveStock() {
            if (!this.form.kode || !this.form.judul || !this.form.upbjj || !this.form.kategori) { alert('Lengkapi field formulir!'); return; }
            if (this.isEdit) {
                const idx = this.items.findIndex(i => i.kode === this.form.kode);
                if (idx !== -1) Vue.set(this.items, idx, { ...this.form });
                this.isEdit = false;
            } else {
                if (this.items.some(i => i.kode === this.form.kode)) { alert('Kode MK sudah terdaftar!'); return; }
                this.items.push({ ...this.form, catatanHTML: '<em>Data Baru</em>' });
            }
            this.form = this.clearForm();
        },
        editStock(item) { this.isEdit = true; this.form = { ...item }; },
        cancelEdit() { this.isEdit = false; this.form = this.clearForm(); },
        deleteStock(kode) {
            this.$emit('open-modal', {
                title: 'Konfirmasi Hapus Data', message: `Yakin ingin menghapus kode ${kode}?`,
                onConfirm: () => {
                    const idx = this.items.findIndex(i => i.kode === kode);
                    if (idx !== -1) this.items.splice(idx, 1);
                }
            });
        }
    }
});Vue.component('ba-stock-table', {
    template: '#tpl-stock',
    props: ['items', 'upbjjList', 'kategoriList'],
    data() {
        return {
            filterUpbjj: '', filterKategori: '', filterKondisi: 'all', sortBy: 'judul',
            isEdit: false, form: this.clearForm()
        };
    },
    watch: {
        filterUpbjj(newVal) { if (!newVal) this.filterKategori = ''; }
    },
    filters: {
        currency(value) { return 'Rp ' + (value || 0).toLocaleString('id-ID'); },
        satuan(value) { return (value || 0) + ' buah'; }
    },
    computed: {
        filteredAndSortedItems() {
            let result = this.items ? [...this.items] : [];
            if (this.filterUpbjj) result = result.filter(item => item.upbjj === this.filterUpbjj);
            if (this.filterKategori && this.filterUpbjj) result = result.filter(item => item.kategori === this.filterKategori);
            if (this.filterKondisi === 'critical') result = result.filter(item => item.qty <= item.safety || item.qty === 0);
            result.sort((a, b) => {
                if (this.sortBy === 'judul') return a.judul.localeCompare(b.judul);
                return a[this.sortBy] - b[this.sortBy];
            });
            return result;
        }
    },
    methods: {
        clearForm() { return { kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', harga: 0, qty: 0, safety: 0, catatanHTML: '' }; },
        resetFilter() { this.filterUpbjj = ''; this.filterKategori = ''; this.filterKondisi = 'all'; this.sortBy = 'judul'; },
        saveStock() {
            if (!this.form.kode || !this.form.judul || !this.form.upbjj || !this.form.kategori) { alert('Lengkapi field formulir!'); return; }
            if (this.isEdit) {
                const idx = this.items.findIndex(i => i.kode === this.form.kode);
                if (idx !== -1) Vue.set(this.items, idx, { ...this.form });
                this.isEdit = false;
            } else {
                if (this.items.some(i => i.kode === this.form.kode)) { alert('Kode MK sudah terdaftar!'); return; }
                this.items.push({ ...this.form, catatanHTML: '<em>Data Baru</em>' });
            }
            this.form = this.clearForm();
        },
        editStock(item) { this.isEdit = true; this.form = { ...item }; },
        cancelEdit() { this.isEdit = false; this.form = this.clearForm(); },
        deleteStock(kode) {
            this.$emit('open-modal', {
                title: 'Konfirmasi Hapus Data', message: `Yakin ingin menghapus kode ${kode}?`,
                onConfirm: () => {
                    const idx = this.items.findIndex(i => i.kode === kode);
                    if (idx !== -1) this.items.splice(idx, 1);
                }
            });
        }
    }
});
