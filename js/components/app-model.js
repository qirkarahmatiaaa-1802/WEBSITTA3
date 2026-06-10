Vue.component('app-modal', {
    template: fetchTemplate('templates/app-modal.html'),
    data() {
        return { visible: false, title: '', message: '', onConfirm: null };
    },
    methods: {
        show(options) {
            this.title = options.title;
            this.message = options.message;
            this.onConfirm = options.onConfirm;
            this.visible = true;
        },
        confirm() {
            if (this.onConfirm) this.onConfirm();
            this.visible = false;
        },
        cancel() {Vue.component('app-modal', {
    template: '#tpl-modal',
    data() { return { visible: false, title: '', message: '', onConfirm: null }; },
    methods: {
        show(options) { this.title = options.title; this.message = options.message; this.onConfirm = options.onConfirm; this.visible = true; },
        confirm() { if (this.onConfirm) this.onConfirm(); this.visible = false; },
        cancel() { this.visible = false; }
    }
});
            this.visible = false;
        }
    }
});
