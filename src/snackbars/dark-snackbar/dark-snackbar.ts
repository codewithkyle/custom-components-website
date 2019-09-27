class DarkSnackbar extends HTMLElement
{
	connectedCallback()
	{
		console.log('dark-snackbar component has been connected.');
	}
}

customElements.define('dark-snackbar', DarkSnackbar);
