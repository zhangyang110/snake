export default class Food {
    // foodEle: HTMLElement;
    foodX: Number;
    foodY: Number;

    constructor(snake) {
        this.createFood(snake)
    }

    createFood(snake) {
        let foodX = Math.floor((Math.random() * 59)) * 10
        let foodY = Math.floor((Math.random() * 49)) * 10
        // this.checkFoodInSnake(snake)
        if (this.checkFoodInSnake(snake,foodX,foodY)) {
            this.createFood(snake)
        } else {
            this.foodX =foodX
            this.foodY =foodY
            let snakeMoveArea:HTMLElement=document.querySelector('.snakeMoveArea')
            let oldFoodEle=document.querySelector('#food')
            oldFoodEle&&snakeMoveArea.removeChild( oldFoodEle)
            let foodEle=document.createElement('div')
            foodEle.setAttribute("id", "food");
            foodEle.style.left= this.foodX+'px'
            foodEle.style.top=this.foodY+'px'
            snakeMoveArea.appendChild(foodEle)
        }
    }

    checkFoodInSnake(snake,foodX,foodY) {
        console.log(snake);
        return Array.from(snake.SnakeEle).some(t=>{
            return (t as HTMLElement).offsetLeft===foodX&&(t as HTMLElement).offsetTop===foodY
        })
    }
}