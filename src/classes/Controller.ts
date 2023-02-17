export default class Controller {
    direction: string='right';
    gameShutDown: Function;
    snake: Object;
    constructor(gameShutDown,snake) {
        this.snake=snake
        this.gameShutDown = gameShutDown
        document.addEventListener('keydown', this.handleKeyDown.bind(this))
    }

    handleKeyDown(e) {
        if(e.key.toLowerCase().endsWith(this.direction)){
            // 与当前行进方向相同
            return
        }
        if (e.key.endsWith(' ')) {
            // 暂停游戏
            this.gameShutDown()
            return;
        }


        if (e.key.endsWith('Right')) {
            // 掉头
            if(Array.from(this.snake['SnakeEle']).length>1&&this.direction==='left'){
                return;
            }
            this.direction = "right"
        }
        if (e.key.endsWith('Left')) {
            if(Array.from(this.snake['SnakeEle']).length>1&&this.direction==='right'){
                return;
            }
            this.direction = "left"
        }
        if (e.key.endsWith('Down')) {
            if(Array.from(this.snake['SnakeEle']).length>1&&this.direction==='up'){
                return;
            }
            this.direction = "down"
        }
        if (e.key.endsWith('Up')) {
            if(Array.from(this.snake['SnakeEle']).length>1&&this.direction==='down'){
                return;
            }
            this.direction = "up"
        }

    }
}