export default class ScorePanel {
    scoreEle: HTMLElement;
    gameStateEle: HTMLElement;
    levelEle: HTMLElement;
    beginGame: Function;
    constructor(beginGame) {
        this.scoreEle = document.getElementById('score')
        this.gameStateEle = document.getElementById('gameState')
        this.levelEle = document.getElementById('level')
        this.beginGame=beginGame
    }

    get score(): number {
        return Number(this.scoreEle.innerText)
    }

    set score(value) {
        console.log(value);
        console.log(this.scoreEle);
        this.scoreEle.innerText = value + ''
        this.level = Math.floor(Number(value) / 2)
    }

    get level(): number {
        return Number(this.levelEle.innerText)
    }

    set level(value) {
        if (this.level !== value) {
            this.levelEle.innerText = value + ''
            this.beginGame()
        }
    }

    addScore() {
        console.log("addScore");
        this.score += 1
    }
}