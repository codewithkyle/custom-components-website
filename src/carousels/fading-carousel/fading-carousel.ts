class FadingCarousel extends HTMLElement
{
    private _slides : Array<HTMLElement>;
    private _controls : Array<HTMLElement>;
    private _index : number;
    private _isDirty : boolean;
    private _time : number;
    private _callback: Function;
    private _timer : number;

    /** Carousel Config */
    private _transitionDuration:number;
    private _slideDuration:number;

    constructor()
    {
        super();
        this._index = 0;
        this._isDirty = false;
        this._slides = Array.from(this.querySelectorAll('carousel-slide'));
        this._controls = Array.from(this.querySelectorAll('carousel-control'));
        this._callback = () => {};

        /** Carousel Config */
        this._transitionDuration = 300; // milliseconds
        this._slideDuration = 5; // seconds
    }

    private handleControlClickEvent:EventListener = this.triggerSlideSwitch.bind(this);

    private triggerSlideSwitch(e:Event) : void
    {
        const control = e.currentTarget as HTMLElement;
        const index = control.dataset.index;

        if (!index)
        {
            console.error(control, 'is missing the data-index attribute');
        }

        this.switchSlide(parseInt(index));
    }
    
    private updateControls(newIndex:number) : void
    {
        for (let i = 0; i < this._controls.length; i++)
        {
            if (i === newIndex)
            {
                this._controls[i].classList.add('is-active');
            }
            else
            {
                this._controls[i].classList.remove('is-active');
            }
        }
    }

    private switchSlide(requestedIndex:number = null) : void
    {
        if (this._isDirty)
        {
            return;
        }

        this._isDirty = true;

        let newIndex = this._index + 1;
        if (requestedIndex !== null && typeof requestedIndex === "number") 
        {
            newIndex = requestedIndex;
        }

        if (newIndex < 0)
        {
            newIndex = this._slides.length - 1;
        }
        else if (newIndex >= this._slides.length)
        {
            newIndex = 0;
        }

        this.updateControls(newIndex);

        this._slides[this._index].style.zIndex = '1';
        this._slides[this._index].style.opacity = '0';
        this._slides[this._index].style.transition = `all ${ this._transitionDuration }ms ease-in-out`;
        this._slides[newIndex].style.zIndex = '5';
        this._slides[newIndex].style.opacity = '1';
        this._slides[newIndex].style.transition = `all ${ this._transitionDuration }ms ease-in-out`;

        setTimeout(() => {
            this._slides[this._index].classList.remove('is-active');
            this._index = newIndex;
            this._slides[this._index].classList.add('is-active');
            this._timer = this._slideDuration;
            this._isDirty = false;
        }, this._transitionDuration);
    }

    private loop() : void
    {
        const newTime = performance.now();
        const deltaTime = (newTime - this._time) / 1000;
        this._time = newTime;

        if (document.hasFocus())
        {
            this._timer -= deltaTime;

            if (this._timer <= 0 && !this._isDirty)
            {
                this.switchSlide();
            }
        }

        window.requestAnimationFrame(() => { this._callback(); });
    }

    connectedCallback()
    {
        if (this._controls.length)
        {
            for (let i = 0; i < this._controls.length; i++)
            {
                this._controls[i].addEventListener('click', this.handleControlClickEvent);
            }
        }

        if (this._slides.length > 1)
        {
            this._time = performance.now();
            this._callback = this.loop;
            this._timer = this._slideDuration;
            this._callback();
        }
    }
}

customElements.define('fading-carousel', FadingCarousel);
