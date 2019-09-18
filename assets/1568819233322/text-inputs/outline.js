class OutlineComponent extends HTMLElement {
    connectedCallback() {
        console.log('outline component has been connected.');
    }
}
customElements.define('outline-component', OutlineComponent);
