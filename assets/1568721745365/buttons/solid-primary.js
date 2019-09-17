class SolidPrimary extends HTMLElement {
    connectedCallback() {
        console.log('solid-primary component has been connected.');
    }
}
customElements.define('solid-primary', SolidPrimary);
