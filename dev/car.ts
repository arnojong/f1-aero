class Car {

    public _element:HTMLElement;
    private x:number = -300;  
    public done:boolean = false;
    public drawn:boolean = false;
  
    public constructor() {
      // Create car element.
      this._element = document.createElement('div');
      this._element.classList.add('car');
      document.body.appendChild(this._element);
    }
  
    /**
     * Move the car into place.
     */
    public enter() {
      if (this.x < 600) {
        this.x += 25;
        this._element.style.left = this.x + 'px';
        this._element.style.transform = 'rotate(' + (this.x * 0.45) + 'deg)';
      } else {
        this.checkDrawn()
      }
    }

    private checkDrawn() {
        if(!this.drawn) {
            console.log('joe');
            this._element = document.createElement('div');
            this._element.classList.add('lines');
            document.body.appendChild(this._element);
        }
        this.drawn = true;
    }
  
    /**
     * Remove the car from the view and set car as DONE.
     */
    private leave() {
      if (this.x < 1200) {
        this.x += 50;
        this._element.style.top = this.x + 'px';
      }
      else {
        this._element.remove();
        this.done = true;
      }
    }
  
    /**
     * Runs every game tick.
     */
    public update() {
        this.enter();
    //   if (this.tires.length !== 4 || this.gas <= 50) {
    //     this.enter();
    //   }
    //   else {
    //     this.leave();
    //   }
  
    }
  
}