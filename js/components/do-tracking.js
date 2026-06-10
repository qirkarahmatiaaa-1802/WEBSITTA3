Vue.component('do-tracking', {
    template: '#tpl-tracking',
    props: ['dataTracking'],
    data() { return { keyword: '', results: [], searched: false, newLogs: {} }; },
    filters: {
        currency(val) { return 'Rp ' + (val || 0).toLocaleString('id-ID'); },
        formatTanggal(val) { return val ? new Date(val).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : ''; }
    },
    methods: {
        search() {
            this.searched = true;
            if (!this.keyword.trim()) { this.results = []; return; }
            const searchKey = this.keyword.toLowerCase().trim();
            const filtered = [];
            if (this.dataTracking) {
                this.dataTracking.forEach(obj => {
                    Object.keys(obj).forEach(doNum => {
                        const detail = obj[doNum];
                        if (doNum.toLowerCase().includes(searchKey) || detail.nim.toLowerCase().includes(searchKey)) {
                            filtered.push({ doNumber: doNum, ...detail });
                        }
                    });
                });
            }
            this.results = filtered;
        },
        clearSearch() { this.keyword = ''; this.results = []; this.searched = false; },
        addLogStatus(doNumber) {
            const textInput = this.newLogs[doNumber];
            if (!textInput || !textInput.trim()) { alert('Isi catatan progress!'); return; }
            const targetDo = this.dataTracking.find(obj => obj[doNumber]);
            if (targetDo) {
                const now = new Date();
                const formatWaktu = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0') + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0');
                targetDo[doNumber].perjalanan.push({ waktu: formatWaktu, keterangan: textInput });
                this.$set(this.newLogs, doNumber, '');
                this.search();
            }
        }
    }
});
