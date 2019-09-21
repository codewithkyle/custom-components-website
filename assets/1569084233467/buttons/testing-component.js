class TestingComponent extends HTMLElement {
    connectedCallback() {
        console.log('testing-component component has been connected.');
    }
}
customElements.define('testing-component', TestingComponent);
