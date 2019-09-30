class LazyImageComponent extends HTMLElement {
    constructor() {
        super();
        this.handleResizeEvent = this.windowResized.bind(this);
        this.onIntersection = this.manageIntersection.bind(this);
        this.loadEvent = this.imageHasLoaded.bind(this);
        this._io = null;
        this._img = this.querySelector('img');
        this._sources = [];
        this._hasLoaded = false;
    }
    imageHasLoaded() {
        this.setAttribute('state', 'loaded');
        this._img.removeEventListener('load', this.loadEvent);
        this._hasLoaded = true;
    }
    lazyLoadImage() {
        this.setAttribute('state', 'loading');
        const image = this.querySelector('img');
        if (image) {
            let container = null;
            switch (this.dataset.container) {
                case 'parent':
                    container = image.parentElement;
                    break;
                default:
                    container = image;
                    break;
            }
            const containerWidth = container.scrollWidth;
            let bestFit = null;
            let diffToBeat = null;
            for (let i = 0; i < this._sources.length; i++) {
                const diff = Math.abs(containerWidth - this._sources[i].width);
                if (diffToBeat === null) {
                    bestFit = this._sources[i];
                    diffToBeat = diff;
                }
                else {
                    if (diff < diffToBeat) {
                        bestFit = this._sources[i];
                        diffToBeat = diff;
                    }
                }
            }
            let newImageSrc = null;
            if (bestFit.src.match(/(https\:\/\/)|(http\:\/\/)/)) {
                newImageSrc = bestFit.src;
            }
            else {
                newImageSrc = window.location.origin + bestFit.src;
            }
            if (this._img.src !== newImageSrc) {
                this._img.addEventListener('load', this.loadEvent);
                this._img.src = newImageSrc;
            }
        }
    }
    manageIntersection(entires) {
        for (let i = 0; i < entires.length; i++) {
            if (entires[i].isIntersecting) {
                this.lazyLoadImage();
            }
        }
    }
    windowResized() {
        if (this._hasLoaded) {
            this.lazyLoadImage();
        }
    }
    getSources() {
        const sources = this._img.dataset.srcset.replace(/,(\s?)/g, '&&');
        const sourceSets = sources.split('&&');
        for (let i = 0; i < sourceSets.length; i++) {
            const values = sourceSets[i].split(/(\s.*)/);
            const newSource = {
                width: parseInt(values[1]),
                src: values[0]
            };
            this._sources.push(newSource);
        }
    }
    connectedCallback() {
        if (!this._img) {
            console.error('Missing image element');
            return;
        }
        this.setAttribute('state', 'unseen');
        this.getSources();
        if ('IntersectionObserver' in window) {
            this._io = new IntersectionObserver(this.onIntersection, { rootMargin: '0px', threshold: 0.01 });
            this._io.observe(this);
        }
        else {
            this.lazyLoadImage();
        }
        window.addEventListener('resize', this.handleResizeEvent, { passive: true });
    }
}
customElements.define('lazy-image-component', LazyImageComponent);
