new Vue({
    el: '#app',
    data() {
        return {
            tab: 'stok', // State navigasi default ke halaman stok
            state: {
                upbjjList: [],
                kategoriList: [],
                pengirimanList: [],
                paket: [],
                stok: [],
                tracking: []
            }
        };
    },
    async created() {
        // Memanggil api service untuk menarik dummy data JSON
        const dataDummy = await ApiService.fetchData();
        if (dataDummy) {
            this.state = dataDummy;
        }
    },
    methods: {
        openModal(options) {
            this.$refs.modal.show(options);
        },
        handleNewDO(payload) {
            const targetFormat = {};
            const doNum = payload.doNumber;
            
            targetFormat[doNum] = {
                nim: payload.nim,
                nama: payload.nama,
                status: payload.status,
                ekspedisi: payload.ekspedisi,
                tanggalKirim: payload.tanggalKirim,
                paket: payload.paket,
                total: payload.total,
                perjalanan: payload.perjalanan
            };

            this.state.tracking.unshift(targetFormat);
        }
    }
});
