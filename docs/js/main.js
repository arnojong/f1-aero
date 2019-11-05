"use strict";
var Car = (function () {
    function Car() {
        this.x = -300;
        this.done = false;
        this.drawn = false;
        this._element = document.createElement('div');
        this._element.classList.add('car');
        document.body.appendChild(this._element);
    }
    Car.prototype.enter = function () {
        if (this.x < 600) {
            this.x += 25;
            this._element.style.left = this.x + 'px';
            this._element.style.transform = 'rotate(' + (this.x * 0.45) + 'deg)';
        }
        else {
            this.checkDrawn();
        }
    };
    Car.prototype.checkDrawn = function () {
        if (!this.drawn) {
            console.log('joe');
            this._element = document.createElement('div');
            this._element.classList.add('lines');
            document.body.appendChild(this._element);
        }
        this.drawn = true;
    };
    Car.prototype.leave = function () {
        if (this.x < 1200) {
            this.x += 50;
            this._element.style.top = this.x + 'px';
        }
        else {
            this._element.remove();
            this.done = true;
        }
    };
    Car.prototype.update = function () {
        this.enter();
    };
    return Car;
}());
var Dialog = (function () {
    function Dialog() {
        this.overlay = document.createElement('div');
        this.overlay.classList.add('overlay');
        document.body.appendChild(this.overlay);
        this.element = document.createElement('div');
        this.element.classList.add('dialog');
        this.element.classList.add('dialog-start');
        document.body.appendChild(this.element);
    }
    Dialog.getInstance = function () {
        if (!this._instance) {
            this._instance = new Dialog();
        }
        return this._instance;
    };
    Dialog.prototype.setHTML = function (html) {
        this.element.innerHTML = html;
    };
    Dialog.prototype.addButton = function () {
        this.button = document.createElement('button');
        this.button.innerText = 'START';
        this.button.onclick = function () { Dialog.getInstance().startGame(); };
        this.element.appendChild(this.button);
    };
    Dialog.prototype.startGame = function () {
        Game.getInstance().startGame();
        this.element.remove();
        this.overlay.remove();
    };
    return Dialog;
}());
var Game = (function () {
    function Game() {
        this._fps = 30;
        this._carTime = 0;
        this.running = false;
        this._fpsInterval = 1000 / this._fps;
        this._then = Date.now();
        this.gameLoop();
    }
    Game.getInstance = function () {
        if (!this._instance) {
            this._instance = new Game();
        }
        return this._instance;
    };
    Game.prototype.startGame = function () {
        this.running = true;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.gameLoop(); });
        var now = Date.now();
        var elapsed = now - this._then;
        if (this.running) {
            if (elapsed > this._fpsInterval) {
                this.checkCar();
                this._then = now - (elapsed % this._fpsInterval);
            }
        }
        else {
            if (!this.dialog) {
                this.dialog = Dialog.getInstance();
                this.dialog.setHTML('<h1>KMar F1 - Aerodynamica</h1>' +
                    '<p>Jij bent verantwoordelijk voor de pitstop. Probeer de snelste tijd neer te zetten.</p>' +
                    '<p>Beweeg met de pijltjestoetsen en pak spullen vast met de spatiebalk.</p>' +
                    '<p>Zet de banden op de auto en vul de auto met benzine.</p>');
                this.dialog.addButton();
            }
        }
    };
    Game.prototype.checkCar = function () {
        if (this._carTime > this._fps * 5) {
            if (!this._car) {
                this._car = new Car();
            }
            this._carTime = 0;
        }
        this._carTime++;
        if (this._car) {
            this._car.update();
            if (this._car.done) {
                this._car = null;
            }
        }
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
//# sourceMappingURL=main.js.map