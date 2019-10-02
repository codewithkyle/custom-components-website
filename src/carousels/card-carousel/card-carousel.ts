interface Mouse{
    x: number;
    y: number;
}

class CardCarouselComponent extends HTMLElement
{
    private _cards : Array<HTMLElement>;
    private _mouse : Mouse;
    private _dragging : boolean;
	private _dragDistance : number;
	
	constructor()
	{
		super();
        this._cards = Array.from(this.querySelectorAll('cta-card'));
        this._mouse = null;
        this._dragging = false;
        this._dragDistance = 0;
    }
    
    private handleDragStart:EventListener = this.startDragging.bind(this);
    private handleDragStop:EventListener = this.stopDragging.bind(this);
    private handleDrag:EventListener = this.dragging.bind(this);
    private handleMouseDown:EventListener = this.preventScrollSnapping.bind(this);
    private handleScroll:EventListener = this.addScrollSnapping.bind(this);

    private preventScrollSnapping() : void
    {
        this.classList.add('is-pointer-device');
        this.classList.add('is-dragging');
    }

    private addScrollSnapping() : void
    {
        this.classList.remove('is-pointer-device');
    }

    private startDragging(e:DragEvent) : void
    {
        e.preventDefault();
        this.classList.add('is-dragging');
        this._mouse = { x: e.x, y: e.y };
        this._dragging = true;
        this._dragDistance = 0;
    }

    private stopDragging(e:MouseEvent) : void
    {
        this.classList.remove('is-dragging');
        
        if(this._dragging)
        {
            this._dragging = false;
            this._mouse = null;

            const currentScrollLeft = this.scrollLeft;
            const totalScrollLeft = this.scrollWidth;
            const widthPerSlide = totalScrollLeft / this._cards.length;
            const triggerDistance = widthPerSlide / 4;
            const cardIndex = Math.floor(currentScrollLeft / widthPerSlide);
            const direction = (this._dragDistance > 0) ? 1 : -1;
            const slideBounds = this._cards[cardIndex].getBoundingClientRect();
            const difference = (direction === 1) ? slideBounds.left : slideBounds.right;

            if(Math.abs(difference) >= triggerDistance)
            {
                const slideOffset = (direction === 1) ? cardIndex + 1 : cardIndex;

                this.scrollTo({
                    left: widthPerSlide * slideOffset,
                    top: 0,
                    behavior: 'smooth'
                });
            }
            else
            {
                this.scrollTo({
                    left: currentScrollLeft + difference,
                    top: 0,
                    behavior: 'smooth'
                });   
            }
        }
    }

    private dragging(e:MouseEvent) : void
    {
        if(this._dragging)
        {
            const newMouse = { x: e.x, y: e.y };
            const newOffset = (newMouse.x - this._mouse.x) * -1;
            this._dragDistance += newOffset;
            this._mouse = newMouse;
            this.scrollBy({
                left: newOffset,
                top: 0,
                behavior: 'auto'
            });
        }
    }

	connectedCallback()
	{
		for(let i = 0; i < this._cards.length; i++)
        {
            this._cards[i].addEventListener('dragstart', this.handleDragStart);
            this._cards[i].addEventListener('mouseup', this.handleDragStop);
            this._cards[i].setAttribute('draggable', 'true');
        }

        this.addEventListener('mousemove', this.handleDrag, { passive: true });
        this.addEventListener('mousedown', this.handleMouseDown, { passive: true });
        this.addEventListener('scroll', this.handleScroll, { passive: true });
	}
}

customElements.define('card-carousel-component', CardCarouselComponent);
