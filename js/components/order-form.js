Vue.component('order-form', {
    template: '#tpl-order',
    props: ['paketList', 'ekspedisiList'],
    data() {
        return {
            form: { nim: '', nama: '', ekspedisi: '', selectedPaketKode: '', tanggalKirim: new Date().toISOString().split('T')[0] }
        };
    },
    filters: { currency(val) { return 'Rp ' + (val || 0).toLocaleString('id-ID'); } },
    computed: {
        generatedDoNumber() { return `DO${new Date().getFullYear()}-0002`; },
        selectedPaketDetail() { return this.paketList ? this.paketList.find(p => p.kode === this.form.selectedPaketKode) : null; }
    },
    methods: {
        submitOrder() {
            if (!this.form.nim || !this.form.nama || !this.form.ekspedisi || !this.form.selectedPaketKode) { alert('Lengkapi isian formulir!'); return; }
            const payload = {
                doNumber: this.generatedDoNumber, nim: this.form.nim, nama: this.form.nama, status: 'Dalam Perjalanan',
                ekspedisi: this.form.ekspedisi, tanggalKirim: this.form.tanggalKirim, paket: this.selectedPaketDetail.nama,
                total: this.selectedPaketDetail.harga, perjalanan: [{ waktu: new Date().toLocaleString('id-ID'), keterangan: 'Pemesanan DO Baru Berhasil Dibuat.' }]
            };
            this.$emit('add-tracking', payload);
            alert('Sukses menyimpan DO baru!');
            this.form.nim = ''; this.form.nama = ''; this.form.ekspedisi = ''; this.form.selectedPaketKode = '';
        }
    }
});
