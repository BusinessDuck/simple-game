import {getRandomInt} from './utils';

export default class HomeController {
    constructor() {
        this.defaultState = {
            moreThan: 0,
            lessThan: 999,
            historyGuess: [],
            attempts: 1,
            timeStart: null,
            timeEnd: null,
        };
        this._element = null;
    }

    getTargetInput() {
        return this._element || (this._element = angular.element('#guess-value'));
    }

    displayWon() {
        this.state.timeEnd = performance.now();
        this.showStatistics = true;
        this.prevSate = Object.assign({}, this.state);
        delete this.state;
    };

    getPrevGameTime() {
        return parseInt(this.prevSate.timeEnd - this.prevSate.timeStart)/1000;
    }
    publishHistroyEvent(number) {
        this.state.historyGuess.unshift({
            badgeClass: number > this.state._secretNumber ? 'danger' : 'success',
            badgeIconClass: this.state._secretNumber !== number ? 'glyphicon-question-sign' : 'glyphicon-ok',
            title: 'Guess #' + this.state.attempts,
            content: 'It is ' + number,
            id: this.state.attempts
        });
        if(this.state.historyGuess.length > 5) {
            this.state.historyGuess.length = 5;
        }
    }

    startGameHandler(e) {
        this.showStatistics = false;
        this.state = Object.assign({}, this.defaultState);
        this.state._secretNumber = getRandomInt(0, 999);
        this.state.timeStart = performance.now();
    }

    submitHandler(e) {
        let currentNumber = parseInt(this.getTargetInput().val());
        console.log(this.getTargetInput().val());
        if (!currentNumber) {
            return;
        }
        if (this.state._secretNumber === currentNumber) {
            this.displayWon();
        } else {
            if (currentNumber < this.state._secretNumber) {
                this.state.moreThan = currentNumber;
            } else {
                this.state.lessThan = currentNumber;
            }
        }
        this.publishHistroyEvent(currentNumber);
        this.state.attempts++;
    }
}
