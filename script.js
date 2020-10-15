// tools.js
(function () {
    let Tools = {
        getRandom: function (min, max) {
           return Math.floor(Math.random() * (max -min + 1)) + min;
        }
    }

    window.Tools = Tools;
})();

 // food.js

(function () {
    let position = 'absolute';
    let elements = [];
    
    function Food(options) {
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
    
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.color = options.color || 'black';
    
    }
    
   Food.prototype.render = function (map) {
        remove();
    
        this.x = Tools.getRandom(0, map.offsetWidth/this.width - 1) * this.width;
        this.y = Tools.getRandom(0, map.offsetHeight/this.height - 1) * this.height;
    
        let div = document.createElement('div');
        map.appendChild(div);
        elements.push(div);
    
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.position = position;
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.backgroundColor = this.color;;
    
    }
    
    function remove() {
      for(let i = elements.length - 1; i >= 0; i--) {
          elements[i].parentNode.removeChild(elements[i]);
          elements.splice(i, 1);
      }
    }
    
    window.Food = Food;

})();


// snake.js

(function () {

    let position = 'absolute';
    let elements = [];

  function Snake(options) {
      options = options || {};
      this.width = options.width || 20;
      this.height = options.height || 20;
      this.direction = options.direction || 'right';
      this.body = [
          {x: 3, y: 2, color: 'red' },
          {x: 2, y: 2, color: 'blue'},
          {x: 1, y: 2, color: 'blue'}
    ]
          
      }

      Snake.prototype.render = function (map) {

        remove();

          for(let i = 0; i < this.body.length; i++) {
              let object = this.body[i];
              let div = document.createElement('div');
              map.appendChild(div);

              elements.push(div);


              div.style.position = position;

              div.style.width = this.width + 'px';
              div.style.height = this.height + 'px';
              div.style.left = object.x * this.width + 'px';
              div.style.top = object.y * this.height + 'px';
              div.style.backgroundColor = object.color;
          }
         
      }

    function remove () {
        for(let i = elements.length - 1; i >= 0; i--) {
            elements[i].parentNode.removeChild(elements[i]);
            elements.splice(i, 1);
        }
    }

    
      Snake.prototype.move = function (food, map) {
          for(let i = this.body.length - 1; i > 0; i--) {
              this.body[i].x = this.body[i-1].x;
              this.body[i].y = this.body[i-1].y;
          }
          let head = this.body[0];
          switch(this.direction) {
            case 'right':
                  head.x += 1;
                  break;
            case 'left':
                  head.x -= 1;
                  break; 
            case 'top':
                  head.y -= 1;
                  break;
            case 'bottom':
                  head.y += 1;
                  break;   

          }

           let headX = head.x * this.width;
           let headY = head.y * this.height;
           if(headX === food.x && headY === food.y) {

            let last = this.body[this.body.length - 1];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            food.render(map);
           }
      }
      window.Snake = Snake;

})();

// game.js
(function () {
    let that;
  function Game() {
      this.food = new Food();
      this.snake = new Snake();
      this.map = map;
      that = this;
  }

Game.prototype.start = function () {
   this.food.render(this.map);
   this.snake.render(this.map); 

   runSnake();
   bindKey();

}

function bindKey() {
  document.addEventListener('keydown', function(e) {
     switch(e.code) {
        case 'ArrowLeft':
           that.snake.direction = 'left';
           break;
        case 'ArrowUp':
           that.snake.direction = 'top';
           break;
        case 'ArrowRight':
           that.snake.direction = 'right';
           break;
        case 'ArrowDown':
           that.snake.direction = 'bottom';
           break;
     }   
  }, false)
}

function runSnake() {
    let timerId = setInterval(function () {
      that.snake.move(that.food, that.map);
      that.snake.render(that.map);

let maxX = that.map.offsetWidth / that.snake.width;
let maxY = that.map.offsetHeight / that.snake.height;


let headX = that.snake.body[0].x;
let headY = that.snake.body[0].y;

      if(headX < 0 || headX >= maxX) {
        alert('game over');
        clearInterval(timerId);
      }

      
      if(headY < 0  || headY >= maxY) {
        alert('game over');
        clearInterval(timerId);
      }

    }, 160);
}


window.Game = Game;

})();

// main.js

(function () {
    let map = document.getElementById('map');
    let game = new Game(map);
    game.start();
    })()






