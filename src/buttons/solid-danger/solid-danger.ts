class SolidDanger extends HTMLElement
{
	connectedCallback()
	{
		console.log('solid-danger component has been connected.');
	}
}
customElements.define('solid-danger', SolidDanger);