class RaisedSolidPrimary extends HTMLElement
{
	connectedCallback()
	{
		console.log('raised-solid-primary component has been connected.');
	}
}
customElements.define('raised-solid-primary', RaisedSolidPrimary);