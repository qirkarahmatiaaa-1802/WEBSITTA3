Vue.component('status-badge', {
    template: '#tpl-badge',
    props: {
        qty: { type: Number, required: true },
        safety: { type: Number, required: true }
    },
    computed: {
        badgeClass() {
            if (this.qty <= 0) return 'badge-kosong'; // Diubah jadi <= 0 agar aman jika minus
            if (this.qty <= this.safety) return 'badge-menipis'; // Menggunakan <=
            return 'badge-aman';
        },
        badgeText() {
            if (this.qty <= 0) return '❌ Kosong';
            if (this.qty <= this.safety) return '⚠️ Menipis';
            return '✅ Aman';
        }
    }
});
