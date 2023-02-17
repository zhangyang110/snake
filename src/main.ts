import "./style/index.less"
import Snake from "./classes/Snake"
import Food from "./classes/Food"
import Controller from "./classes/Controller"
import ScorePanel from "./classes/ScorePanel"


let gameOver = function (value) {
    console.log(value);
    clearInterval(interval)
    interval = null
    alert('你是笨蛋吗？Game  Over')
}
let gameShutDown = function () {
    if (gameState === 'ing') {
        let gameStateEle=document.getElementById('gameState')
        gameStateEle.innerText='暂停中'
        gameState = 'suspend'
        clearInterval(interval)
    } else {
        let gameStateEle=document.getElementById('gameState')
        gameStateEle.innerText='进行中'
        gameState = 'ing'
        clearInterval(interval)
        beginGame()
    }
}
let beginGame = function () {
    clearInterval(interval)
    let gameStateEle=document.getElementById('gameState')
    gameStateEle.innerText='进行中'
    interval = setInterval(() => {
        snake.run(controller.direction)
        checkEatFood()
    }, 500/(scorePanel.level+1))
}
let checkEatFood=function (){
    let { HeadX,HeadY }=snake;
    let { foodX,foodY }=food;
    if((HeadX===foodX)&&(HeadY===foodY)){
        console.log('eatFood')
        food.createFood(snake);// 吃完创建食物
        // 记分板 加分
        scorePanel.addScore()
        snake.addBody()
    }

}

// 运行开始
let interval = null
let gameState = 'ing' //ing suspend
let snake = new Snake(gameOver, gameShutDown);
let food = new Food(snake);
let controller = new Controller(gameShutDown,snake);
let scorePanel = new ScorePanel(beginGame);
beginGame()


