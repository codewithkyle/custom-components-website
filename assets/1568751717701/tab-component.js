class TabComponent extends HTMLElement {
    constructor() {
        super(...arguments);
        this.handleClickEvent = this.activate.bind(this);
    }
    activate() {
        this._view.classList.remove('is-hidden');
    }
    connectedCallback() {
        this._view = document.body.querySelector(`code[data-view="${this.dataset.view}"]`);
        this.addEventListener('click', this.handleClickEvent);
    }
}
customElements.define('tab-component', TabComponent);
