class NavigationManager
{
    public loadComponent(href:string) : void
    {
        fetch(href)
        .then(request => request.text())
        .then(response => {
            const tempDocument = document.implementation.createHTMLDocument('temp-document');
            tempDocument.body.innerHTML = response;
            const newDemoView = tempDocument.body.querySelector('demo-view');
            const oldDemoView = document.body.querySelector('demo-view');
            oldDemoView.innerHTML = newDemoView.innerHTML;
            window.history.pushState({}, null, href);
            
            const pageLoadEvent = new CustomEvent('page-load', { 
                detail: {
                    href: href
                }
            });
            window.dispatchEvent(pageLoadEvent);
        })
        .catch(error => {
            console.error(error);
        })
    }
}

// @ts-ignore
window.navigationManager = new NavigationManager();