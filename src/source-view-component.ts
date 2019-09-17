class SourceViewComponent extends HTMLElement
{
    private _tabComponentTemplate : HTMLTemplateElement;
    private _tabsContainer : HTMLElement;
    private _sourceViews : HTMLElement;

    constructor()
    {
        super();
        this._tabComponentTemplate = this.querySelector('template[tag="tab-component"]');
        this._tabsContainer = this.querySelector('tabs-container');
        this._sourceViews = this.querySelector('source-views');
    }

    private handlePageLoadEvent:EventListener = this.load.bind(this);

    private loadRaw(category, component, extension) : Promise<string>
    {
        return new Promise((resolve, reject) => {
            fetch(`https://raw.githubusercontent.com/codewithkyle/custom-components-website/master/src/${ category }/${ component }/${ (extension === 'html') ? 'index' : component }.${ extension }`)
            .then(request => request.text())
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    private async load(e:CustomEvent)
    {
        this._tabsContainer.innerHTML = '';
        this._sourceViews.innerHTML = '';

        await this.loadRaw(e.detail.category, e.detail.component, 'html')
        .then(html => {
            const tab = document.createElement('tab-component');
            tab.innerText = 'HTML';
            tab.classList.add('is-active');
            tab.dataset.view = 'HTML';

            const sourceCode = document.createElement('code');
            sourceCode.innerText = html;
            sourceCode.dataset.view = 'HTML';

            this._sourceViews.appendChild(sourceCode);
            this._tabsContainer.appendChild(tab);
        })
        .catch(error => {
            console.error(error);
        });

        await this.loadRaw(e.detail.category, e.detail.component, 'scss')
        .then(sass => {
            const tab = document.createElement('tab-component');
            tab.innerText = 'SASS';
            tab.dataset.view = 'SASS';

            const sourceCode = document.createElement('code');
            sourceCode.innerHTML = sass;
            sourceCode.dataset.view = 'SASS';
            sourceCode.classList.add('is-hidden');
            
            this._sourceViews.appendChild(sourceCode);
            this._tabsContainer.appendChild(tab);
        })
        .catch(error => {
            console.error(error);
        });
    }

    connectedCallback()
    {
        window.addEventListener('page-load', this.handlePageLoadEvent);
    }
}

customElements.define('source-view-component', SourceViewComponent);