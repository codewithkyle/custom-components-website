class TabsComponent extends HTMLElement {
    constructor() {
        super();
        this.handleButtonClickEvent = this.switchTab.bind(this);
        this._tabs = Array.from(this.querySelectorAll('button'));
        this._views = Array.from(this.querySelectorAll('tab-view'));
    }
    switchTab(e) {
        const tab = e.currentTarget;
        let index = tab.dataset.index;
        if (!index) {
            console.error('Tab buttons require a data-index value');
            return;
        }
        index = parseInt(index);
        this._tabs[index].classList.add('is-active');
        this._views[index].classList.add('is-active');
        for (let i = 0; i < this._tabs.length; i++) {
            if (i !== index) {
                this._tabs[i].classList.remove('is-active');
            }
        }
        for (let i = 0; i < this._views.length; i++) {
            if (i !== index) {
                this._views[i].classList.remove('is-active');
            }
        }
    }
    connectedCallback() {
        for (let i = 0; i < this._tabs.length; i++) {
            this._tabs[i].addEventListener('click', this.handleButtonClickEvent);
        }
    }
}
customElements.define('tabs-component', TabsComponent);
