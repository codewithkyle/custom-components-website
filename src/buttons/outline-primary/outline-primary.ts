class OutlinePrimary extends HTMLElement
{
	connectedCallback()
	{
		console.log('outline-primary component has been connected.');
	}
}
customElements.define('outline-primary', OutlinePrimary);