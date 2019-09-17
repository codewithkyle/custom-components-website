class NavigationManager {
    loadComponent(href) {
        fetch(href)
            .then(request => request.text())
            .then(response => {
            const tempDocument = document.implementation.createHTMLDocument('temp-document');
            tempDocument.body.innerHTML = response;
            const newDemoView = tempDocument.body.querySelector('demo-view');
            const oldDemoView = document.body.querySelector('demo-view');
            oldDemoView.innerHTML = newDemoView.innerHTML;
            window.history.pushState({}, null, href);
            const scripts = Array.from(newDemoView.querySelectorAll('script'));
            for (let i = 0; i < scripts.length; i++) {
                const newScript = document.createElement('script');
                newScript.innerHTML = scripts[i].innerHTML;
                oldDemoView.appendChild(newScript);
            }
            const pageLoadEvent = new CustomEvent('page-load', {
                detail: {
                    href: href
                }
            });
            window.dispatchEvent(pageLoadEvent);
        })
            .catch(error => {
            console.error(error);
        });
    }
}
// @ts-ignore
window.navigationManager = new NavigationManager();
