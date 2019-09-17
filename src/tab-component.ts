class TabComponent extends HTMLElement
{
    private _view : HTMLElement;
    
    private handleClickEvent:EventListener = this.activate.bind(this);

    private activate() : void
    {
        this._view.classList.remove('is-hidden');
    }

    connectedCallback()
    {
        this._view = document.body.querySelector(`code[data-view="${ this.dataset.view }"]`);
        this.addEventListener('click', this.handleClickEvent);
    }
}

customElements.define('tab-component', TabComponent);