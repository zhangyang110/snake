export default class Snake {
    SnakeEle: HTMLCollection;// 包含身体
    HeadEle: HTMLElement;
    snakeMoveAreaEle: HTMLElement;
    gameOver: Function;
    gameShutDown: Function;

    constructor(gameOver, gameShutDown) {
        this.SnakeEle = document.getElementById('snake').getElementsByTagName('div')
        this.HeadEle = document.getElementById('snake').getElementsByTagName('div')[0]
        this.snakeMoveAreaEle = document.querySelector('.snakeMoveArea')
        this.gameOver = gameOver
        this.gameShutDown = gameShutDown
    }

    get HeadX() {
        return this.HeadEle.offsetLeft
    };

    set HeadX(value: number) {
        if (value < 0 || value > this.snakeMoveAreaEle.clientWidth - 10) {
            // alert('游戏结束')
            this.gameOver(1)
            return
        }

        this.moveBody()

        this.HeadEle.style.left = value + 'px'
        if (this.checkBiteSelf()) {
            // alert('游戏结束')
            this.gameOver(2)
            return
        }
    }

    get HeadY() {
        return this.HeadEle.offsetTop
    };

    set HeadY(value: number) {
        // 边界碰撞 检测
        if (value < 0 || value > this.snakeMoveAreaEle.clientHeight - 10) {
            // alert('游戏结束')
            this.gameOver(3)
            return
        }
        this.moveBody()
        this.HeadEle.style.top = value + 'px'
        if (this.checkBiteSelf()) {
            // alert('游戏结束')
            this.gameOver(4)
            return
        }
    }

    run(direction: string = "right") {
        if (direction === 'left') {
            this.HeadX -= 10
        }
        if (direction === 'right') {
            this.HeadX += 10

        }
        if (direction === 'up') {
            this.HeadY -= 10
        }
        if (direction === 'down') {
            this.HeadY += 10
        }
    }

    moveBody() {
        let {SnakeEle} = this;
        for (let i = SnakeEle.length - 1; i > 0; i--) {
            let curBodyEle = SnakeEle[i] as HTMLElement; // 倒数第一个
            let preBodyEle = SnakeEle[i - 1] as HTMLElement; // 倒数第二个
            curBodyEle.style.left = preBodyEle.offsetLeft + 'px'
            curBodyEle.style.top = preBodyEle.offsetTop + 'px'
        }
    }

    checkBiteSelf() {
        let flag = Array.from(this.SnakeEle).some((t, index) => {
            return index > 3 && ((t as HTMLElement).style.left === (this.HeadX + 'px') && (t as HTMLElement).style.top === (this.HeadY + 'px'))
        })
        return flag
    }

    addBody() {
        let weiba = document.createElement('div')
        let theLast = this.SnakeEle[this.SnakeEle.length - 1]
        weiba.style.left = (theLast as HTMLElement).offsetLeft + 'px'
        weiba.style.top = (theLast as HTMLElement).offsetTop + 'px'
        document.getElementById('snake').appendChild(weiba)
    }

}