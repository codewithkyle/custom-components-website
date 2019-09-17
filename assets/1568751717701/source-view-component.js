var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class SourceViewComponent extends HTMLElement {
    constructor() {
        super();
        this.handlePageLoadEvent = this.load.bind(this);
        this._tabComponentTemplate = this.querySelector('template[tag="tab-component"]');
        this._tabsContainer = this.querySelector('tabs-container');
        this._sourceViews = this.querySelector('source-views');
    }
    loadRaw(category, component, extension) {
        return new Promise((resolve, reject) => {
            fetch(`https://raw.githubusercontent.com/codewithkyle/custom-components-website/master/src/${category}/${component}/${(extension === 'html') ? 'index' : component}.${extension}`)
                .then(request => request.text())
                .then(response => {
                resolve(response);
            })
                .catch(error => {
                reject(error);
            });
        });
    }
    load(e) {
        return __awaiter(this, void 0, void 0, function* () {
            this._tabsContainer.innerHTML = '';
            this._sourceViews.innerHTML = '';
            yield this.loadRaw(e.detail.category, e.detail.component, 'html')
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
            yield this.loadRaw(e.detail.category, e.detail.component, 'scss')
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
        });
    }
    connectedCallback() {
        window.addEventListener('page-load', this.handlePageLoadEvent);
    }
}
customElements.define('source-view-component', SourceViewComponent);
