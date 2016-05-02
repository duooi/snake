/* create by Duooi  2016-5-2*/

var cellWidth = 30;             //网格宽度
var cellHeight = 30;      		//网格高度
var score = 0;					//当前分数
var timer = null;				//动画定时器
var dir = "up";					//控制贪吃蛇的方向，默认方向向上
var currentPos = [];			//记录贪吃蛇当前的位置
var tag = false;				//表示是否点击了开始按钮，默认为否

var snake = [					//存储蛇的路径
	{
		x:30,
		y:330
	},{
		x:30,
		y:360
	},{
		x:30,
		y:390
	}
];

var food = {								//存储食物坐标
	x : Math.ceil(Math.random()*12)*30,		//食物出现的x坐标
	y : Math.ceil(Math.random()*12)*30		//食物出现的y坐标
}

window.onload = function(){
	var container = document.getElementById("container");
	var startBtn = document.getElementById("start-btn");
	var continueBtn = document.getElementById("continue-btn");
	var stopBtn = document.getElementById("stop-btn");

	//判断有无getContext
	if(container.getContext){
		var context = container.getContext("2d");

		//绘制背景图
		drawBgImage(context);

		//绘制文字
		fillText(context);

		//为开始按钮绑定点击事件
		startBtn.onclick = function(){
			if(tag == true){
				window.location.href = window.location.href;
			}

			timer = setInterval(function(){
				//绘制贪吃蛇
				drawSnake(context);
				//绘制食物
				drawFood(context);
				//绘制文字
				fillText(context);
			},300);

			tag = true;
		}

		//为继续按钮绑定点击事件
		continueBtn.onclick = function(){
			if(tag == true){
				clearInterval(timer);

				timer = setInterval(function(){
					//绘制贪吃蛇
					drawSnake(context);
					//绘制食物
					drawFood(context);
					//绘制文字
					fillText(context);
				},300);
			}
		}

		//为停止按钮绑定点击事件
		stopBtn.onclick = function(){
			clearInterval(timer);
		}
	}else{
		alert("Your browser do not support canvas!");
	}
}

//控制贪吃蛇的方向
function controlDir(){
	document.onkeyup = function(e){
		switch(e.keyCode){
			case 37:dir = "left";break;
			case 38:dir = "up";break;
			case 39:dir = "right";break;
			case 40:dir = "down";break;
		}
	}
}

//碰撞检测
function checkSafe(context){
	//判断有无撞墙
	if(snake[0].y < 0 || snake[0].x < 0 || snake[0].y > 360 || snake[0].x >360){
		if(snake[0].x > 360){
			context.fillStyle = '#ccc';
			context.fillRect(snake[0].x,snake[0].y,30,30);
		}
		alert("Game over!");
		clearInterval(timer);
		return;
	}

	//通过比较存储贪吃蛇的位置数组的元素坐标有无相同来判断贪吃蛇有无碰撞自身
	for(var i=0;i<currentPos.length-1;i++){
		for(var j=i+1;j<currentPos.length;j++){
			if(currentPos[i].x == currentPos[j].x && currentPos[i].y == currentPos[j].y){
				alert("Game over");
				clearInterval(timer);
				return;
			}
		}
	}
	
	//当比较完一轮后清空数组进行位置更新
	currentPos = [];
}

//更新贪吃蛇的位置
function updateSnake(context){
	//控制方向
	controlDir();
	//碰撞检测
	checkSafe(context);
	//每次执行保存最后一节
	var snakelast = snake[snake.length-1];

	if(dir == "up"){
		for(var i=snake.length-1;i>=0;i--){
			if(snake[i] !== snake[0]){
				snake[i].x = snake[i-1].x;
				snake[i].y = snake[i-1].y;
			}else{
				snake[i].y -= 30;
			}
			currentPos.push(snake[i]);
		}

	}else if(dir == "left"){
		for(var i=snake.length-1;i>=0;i--){
			if(snake[i] !== snake[0]){
				snake[i].x = snake[i-1].x;
				snake[i].y = snake[i-1].y;
			}else{
				snake[i].x -= 30;
			}
			currentPos.push(snake[i]);
		}
	}else if(dir == "right"){
		for(var i=snake.length-1;i>=0;i--){
			if(snake[i] !== snake[0]){
				snake[i].x = snake[i-1].x;
				snake[i].y = snake[i-1].y;
			}else{
				snake[i].x += 30;
			}
			currentPos.push(snake[i]);
		}
	}else if(dir == "down"){
		for(var i=snake.length-1;i>=0;i--){
			if(snake[i] !== snake[0]){
				snake[i].x = snake[i-1].x;
				snake[i].y = snake[i-1].y;
			}else{
				snake[i].y += 30;
			}
			currentPos.push(snake[i]);
		}
	}

	//如果蛇吃到食物则使它的length+1
	if(checkFood() == true){
		var snakepart = {
			x:snakelast.x,
			y:snakelast.y
		};
		snake.push(snakepart);
	}
}

//判断贪吃蛇是否吃到食物
function checkFood(){
	if(snake[0].x == food.x && snake[0].y == food.y){
		return true;
	}
	return false;
}

//绘制背景图
function drawBgImage(context){
	var container = document.getElementById("container");

	//填充背景色
	context.fillStyle = "#ccc";
	context.fillRect(0,0,container.width,container.height);

	//绘制网格
	context.strokeStyle = "#fff";

	for(var i=0;i<13;i++){
		for(var j=0;j<13;j++){
			context.strokeRect(i*cellWidth,j*cellHeight,cellWidth,cellHeight);
		}
	}
}

//绘制文字
function fillText(context){
	if(checkFood() == true){
		score += 10;
		if(score == 100){
			alert("You Win!");
			clearInterval(timer);
		}
	}
	context.fillStyle = "#fff";
	context.font = "18px 微软雅黑";
	context.fillText("score : "+score,453,100);
}

//绘制食物
function drawFood(context){
	if(checkFood() == true){
		setTimeout(function(){
			food.x = Math.ceil(Math.random()*12)*30;
			food.y = Math.ceil(Math.random()*12)*30;
			context.clearRect(0,0,container.width,container.height);
			drawBgImage(context);
		},50);
	}
	context.fillStyle = "#999";
	context.fillRect(food.x+1,food.y+1,cellWidth-2,cellHeight-2);
}

//绘制贪吃蛇
function drawSnake(context){
	context.clearRect(0,0,container.width,container.height);
	drawBgImage(context);
	context.fillStyle = "#999";
	for(var i=0;i<snake.length;i++){
		context.fillRect(snake[i].x,snake[i].y,cellWidth-2,cellHeight-2);
	}
	updateSnake(context);
}