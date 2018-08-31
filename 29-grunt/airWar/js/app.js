/**************************************
********** 游戏中的全局变量 ***********
**************************************/
var canvasWidth = 480;	//画布的宽
var canvasHeight = 680;	//画布的高

var score = 0;	//当前积分
var lives = 2;	//玩家剩余的命数

var canvas = document.getElementById('gameCanvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext('2d');

const PHASE_DOWNLOADING = 1;	//图片下载阶段
const PHASE_READY = 2;			//就绪阶段
const PHASE_STARTING = 3;		//启动中阶段
const PHASE_PLAY = 4;			//游戏阶段
const PHASE_PAUSE = 5;			//游戏暂停阶段
const PHASE_GAMEOVER = 6;		//游戏结束阶段
var cur_phase = 1;				//游戏当前所处的阶段

/*************************************
****** 阶段1：PHASE_downLoading ******
**************************************/
	var progress = 0;	//当前已加载的进度
	var imgEnemy1 = new Image();
	imgEnemy1.src = 'img/enemy1.png';
	imgEnemy1.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgEnemy1_down1 = new Image();
	imgEnemy1_down1.src = 'img/enemy1_down1.png';
	imgEnemy1_down1.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgEnemy1_down2 = new Image();
	imgEnemy1_down2.src = 'img/enemy1_down2.png';
	imgEnemy1_down2.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgEnemy1_down3 = new Image();
	imgEnemy1_down3.src = 'img/enemy1_down3.png';
	imgEnemy1_down3.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgEnemy1_down4 = new Image();
	imgEnemy1_down4.src = 'img/enemy1_down4.png';
	imgEnemy1_down4.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgEnemy2 = new Image();
	imgEnemy2.src = 'img/enemy2.png';
	imgEnemy2.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgEnemy2_down1 = new Image();
	imgEnemy2_down1.src = 'img/enemy2_down1.png';
	imgEnemy2_down1.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgEnemy2_down2 = new Image();
	imgEnemy2_down2.src = 'img/enemy2_down2.png';
	imgEnemy2_down2.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgEnemy2_down3 = new Image();
	imgEnemy2_down3.src = 'img/enemy2_down3.png';
	imgEnemy2_down3.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgEnemy2_down4 = new Image();
	imgEnemy2_down4.src = 'img/enemy2_down4.png';
	imgEnemy2_down4.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgEnemy3_down1 = new Image();
	imgEnemy3_down1.src = 'img/enemy3_down1.png';
	imgEnemy3_down1.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgEnemy3_down2 = new Image();
	imgEnemy3_down2.src = 'img/enemy3_down2.png';
	imgEnemy3_down2.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgEnemy3_down3 = new Image();
	imgEnemy3_down3.src = 'img/enemy3_down3.png';
	imgEnemy3_down3.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgEnemy3_down4 = new Image();
	imgEnemy3_down4.src = 'img/enemy3_down4.png';
	imgEnemy3_down4.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgEnemy3_down5 = new Image();
	imgEnemy3_down5.src = 'img/enemy3_down5.png';
	imgEnemy3_down5.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgEnemy3_down6 = new Image();
	imgEnemy3_down6.src = 'img/enemy3_down6.png';
	imgEnemy3_down6.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgEnemy3_hit = new Image();
	imgEnemy3_hit.src = 'img/enemy3_hit.png';
	imgEnemy3_hit.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgEnemy3_n1 = new Image();
	imgEnemy3_n1.src = 'img/enemy3_n1.png';
	imgEnemy3_n1.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgEnemy3_n2 = new Image();
	imgEnemy3_n2.src = 'img/enemy3_n2.png';
	imgEnemy3_n2.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgGame_loading1 = new Image();
	imgGame_loading1.src = 'img/game_loading1.png';
	imgGame_loading1.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgGame_loading2 = new Image();
	imgGame_loading2.src = 'img/game_loading2.png';
	imgGame_loading2.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgGame_loading3 = new Image();
	imgGame_loading3.src = 'img/game_loading3.png';
	imgGame_loading3.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgGame_loading4 = new Image();
	imgGame_loading4.src = 'img/game_loading4.png';
	imgGame_loading4.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgHero_blowup_n1 = new Image();
	imgHero_blowup_n1.src = 'img/hero_blowup_n1.png';
	imgHero_blowup_n1.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgHero_blowup_n2 = new Image();
	imgHero_blowup_n2.src = 'img/hero_blowup_n2.png';
	imgHero_blowup_n2.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgHero_blowup_n3 = new Image();
	imgHero_blowup_n3.src = 'img/hero_blowup_n3.png';
	imgHero_blowup_n3.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgHero_blowup_n4 = new Image();
	imgHero_blowup_n4.src = 'img/hero_blowup_n4.png';
	imgHero_blowup_n4.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgHero1 = new Image();
	imgHero1.src = 'img/hero1.png';
	imgHero1.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgHero2 = new Image();
	imgHero2.src = 'img/hero2.png';
	imgHero2.onload = function(){
		progress += 3;
		drawProgress();
	}
	var imgStart = new Image();
	imgStart.src = 'img/start.png';
	imgStart.onload = function(){
		progress += 3;
		drawProgress();
	}
	/*将敌机3的所有状态放入敌机3数组*/

	var imgsEnemy1 = [imgEnemy1,imgEnemy1_down1,imgEnemy1_down2,imgEnemy1_down3,imgEnemy1_down4];
	var imgsEnemy2 = [imgEnemy2,imgEnemy2_down1,imgEnemy2_down2,imgEnemy2_down3,imgEnemy2_down4];
	var imgsEnemy3 = [imgEnemy3_n1,imgEnemy3_n2,imgEnemy3_hit,imgEnemy3_down1,imgEnemy3_down2,imgEnemy3_down3,imgEnemy3_down4,imgEnemy3_down5,imgEnemy3_down6];

	/*将英雄的状态放入一个数组*/
	var imgsHero = [imgHero1,imgHero2,imgHero_blowup_n1,imgHero_blowup_n2,imgHero_blowup_n3,imgHero_blowup_n4];

	/*将下载时的所有状态放入数组*/
	var imgsGameLoading = [imgGame_loading1,imgGame_loading2,imgGame_loading3,imgGame_loading4];

	//背景图片加载
	var imgBackground = new Image();
	imgBackground.src = 'img/background.png';
	imgBackground.onload = function(){
		progress += 4;
		drawProgress();
	}
	//暂停图片加载
	var imgGame_pause_nor = new Image();
	imgGame_pause_nor.src = 'img/game_pause_nor.png';
	imgGame_pause_nor.onload = function(){
		progress += 3;
		drawProgress();
	}
	//子弹图片加载
	var imgBullet1 = new Image();
	imgBullet1.src = 'img/bullet1.png';
	imgBullet1.onload = function(){
		progress += 3;
		drawProgress();
	}

	//绘制进度条程序
	ctx.lineWidth = 20;
	ctx.strokeStyle = '#aaa';
	ctx.fillStyle = '#666';
	ctx.font = '72px Simhei';
	function drawProgress(){
		ctx.clearRect(0,0,canvasWidth,canvasHeight);
		ctx.beginPath();
		var startAngle = -0.5*Math.PI;	//开始角度
		var endAngle = startAngle+progress/50*Math.PI;	//当前角度
		ctx.arc(canvasWidth/2,canvasHeight/2,100,startAngle,endAngle);
		ctx.stroke();
		var txt = progress+'%';
		var txtWidth = ctx.measureText(txt).width;
		ctx.fillText(txt,canvasWidth/2-txtWidth/2,canvasHeight/2+30);
		if(progress >= 100){
			cur_phase = PHASE_READY;	//进入就绪阶段
			startEngine();	//启动动画引擎
			sky = new Sky(imgBackground);
		}
	}
//资源加载完成
/*************************************
********* 阶段2：PHASE_Ready *********
**************************************/
//天空的构造方法
var sky = null;
function Sky(img){
	this.x1 = 0;
	this.y1 = 0;
	this.x2 = 0;
	this.y2 = -img.height;
	this.draw = function(){	//绘制一遍天空
		ctx.drawImage(img,this.x1,this.y1);
		ctx.drawImage(img,this.x2,this.y2);
	}
	this.move = function(){	//移动一次天空
		this.y1++;
		this.y2++;
		this.y1>=canvasHeight && (this.y1=this.y2-img.height);
		this.y2>=canvasHeight && (this.y2=this.y1-img.height);
	}
}
//绘制LOGO.
function drawLogo(){
	ctx.drawImage(imgStart,canvasWidth/2-imgStart.width/2,canvasHeight/2-imgStart.height/2);
}
//为画布添加单击事件监听函数
canvas.addEventListener('click',function(){
	if(cur_phase == PHASE_READY){
		cur_phase = PHASE_STARTING;
		runningPlane = new RuningPlane(imgsGameLoading);	//创建奔跑的小飞机
	}
},false);
/*************************************
******** 阶段3：PHASE_Starting *******
**************************************/
var runningPlane = null;
function RuningPlane(imgs){
	this.x = 0;
	this.y = canvasHeight-imgs[0].height;
	this.index = 0;	//当前要绘制的图片的下标
	this.draw = function(){		//绘制奔跑的小飞机
		ctx.drawImage(imgs[this.index],this.x,this.y);
	}
	this.moveCount = 0;
	this.move = function(){
		this.moveCount++;
		if(this.moveCount % 3 == 0){
			this.index++;
			if(this.index == imgs.length){
				cur_phase = PHASE_PLAY;
				hero = new Hero(imgsHero);
				bulletList = new BulletList();
				enemyList = new EnemyList();
				this.index = 0;
			}
		}
	}
}
/*************************************
********** 阶段4：PHASE_Play *********
**************************************/

/******我方飞机和子弹列表*****/
var hero = null;
var bulletList = null;
function Hero(imgs){	//我方飞机的构造函数
	this.width = imgs[0].width;
	this.height = imgs[0].height;
	this.idx = 0;
	this.x = canvasWidth/2-this.width/2;
	this.y = canvasHeight-this.height;
	this.crashed = false;	//当前是否被撞毁？
	this.moveCount = 0;
	this.removable = false;
	this.draw = function(){
		if(!this.removable){
			this.moveCount++;
			ctx.drawImage(imgs[this.idx],this.x,this.y);
			if(this.moveCount % 10 == 0){
				if(cur_phase == PHASE_PLAY){	//修复bug，防止在暂停状态我机仍然发射子弹
					var bullet = new Bullet(imgBullet1);	//添加子弹
					bulletList.add(bullet);		//将子弹加入子弹列表
				}
			}
		}
	}
	this.move = function(){
		if(!this.crashed){
			this.idx==0 ? this.idx=1 : this.idx=0;
			hero.crashed=isCrashed(hero,enemyList.list);	
		}else{
			if(this.moveCount%3==0){
				this.idx++;
				/************判断我机是否被撞击***************/
				if(this.idx>=imgs.length){
					//this.removable=true;
					lives--;
					if(lives>=0){
						this.idx = 0;
						this.crashed = false;
						this.x = canvasWidth/2-this.width/2;
						this.y = canvasHeight-this.height;
					}else{
						cur_phase = PHASE_GAMEOVER;	//生命数小于0后进入gameover阶段
					}
				}
			}
		}
	}
	// canvas.addEventListener('touchmove',function(e){	//为画布绑定鼠标事件,既不是属性，也不是方法，是对象的初始化代码
	canvas.addEventListener('mousemove',function(e){	//为画布绑定鼠标事件,既不是属性，也不是方法，是对象的初始化代码
		e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
		// var touch = e.touches[0]; //获取第一个触点
		// var x = Number(touch.pageX) - imgs[0].width/2; //页面触点X坐标
		// var y = Number(touch.pageY) - imgs[0].height/2; //页面触点Y坐标
		var x = e.offsetX - imgs[0].width/2;
		var y = e.offsetY - imgs[0].height/2;
		hero.x = x;
		hero.y = y;
	},false);
} 
function Bullet(img){
	this.width = img.width;
	this.height = img.height;
	this.x = hero.x + imgsHero[0].width/2 - img.width/2;
	this.y = hero.y - img.height;
	this.removable = false;
	this.draw = function(){
		ctx.drawImage(img,this.x,this.y);
	}
	this.move = function(){
		this.y -= 10;	//子弹的飞行速度
		this.y <= -img.heihgt && (this.removable = true);
	}
}
function BulletList(){	//创建子弹列表构造函数
	this.list = [];
	this.add = function(bullet){
		this.list.push(bullet);
	}
	this.draw = function(){
		for(var i=0;i<this.list.length;i++){
			this.list[i].draw();
		}
	}
	this.move = function(){
		for(var i = this.list.length-1;i>=0;i--){
			this.list[i].move();
			if(this.list[i].removable){
				this.list.splice(i,1);
			}
		}
	}
}
/******敌机列表******/
var enemyList = null;
function Enemy1(imgs){
	this.width = imgs[0].width;
	this.height = imgs[0].height;
	this.x = Math.floor(Math.random()*(canvasWidth-this.width));
	this.y = -this.height;
	this.idx = 0;	//当前绘制的图片的下标
	this.blood = 1;	//敌机的血量
	this.removable = false;
	this.score = 100;	//击落后我方得分
	this.crashed = false;	//是否被撞毁？
	this.idx = 0;
	this.moveCount = 0;

	this.draw = function(){
		ctx.drawImage(imgs[this.idx],this.x,this.y);
	}
	this.move = function(){
		if(!this.crashed){
			this.y += 8;
			this.y >= canvasHeight && (this.removable = true);	//如果敌机飞出画布，删除
		}else{
			if(this.moveCount%3==0){
				this.idx++;
				this.idx >= imgs.length && (this.removable = true);	//如果敌机被摧毁，当画面切换成最后一幅图片后删除
			}
		}
	}
}
function Enemy2(imgs){
	this.width = imgs[0].width;
	this.height = imgs[0].height;
	this.x = Math.floor(Math.random()*(canvasWidth-this.width));
	this.y = -this.height;
	this.idx = 0;	//当前绘制的图片的下标
	this.blood = 3;	//敌机的血量
	this.removable = false;
	this.score = 500;	//击落后我方得分
	this.crashed = false;	//是否被撞毁？
	this.moveCount = 0;

	this.draw = function(){
		ctx.drawImage(imgs[this.idx],this.x,this.y);
	}
	this.move = function(){
		if(!this.crashed){
			this.y += 5;
			this.y >= canvasHeight && (this.removable = true);	//如果敌机飞出画布，删除
		}else{
			if(this.moveCount%3==0){
				this.idx++;
				this.idx >= imgs.length && (this.removable = true);	//如果敌机被摧毁，当画面切换成最后一幅图片后删除
			}
		}
	}
}
function Enemy3(imgs){
	this.width = imgs[0].width;
	this.height = imgs[0].height;
	this.x = Math.floor(Math.random()*(canvasWidth-this.width));
	this.y = -this.height;
	this.idx = 0;	//当前绘制的图片的下标
	this.blood = 6;	//敌机的血量
	this.removable = false;	//是否可删除
	this.score = 2000;	//击落后我方得分
	this.crashed = false;	//是否被撞毁？
	this.moveCount = 0;
	this.draw = function(){
		ctx.drawImage(imgs[this.idx],this.x,this.y);
	}
	this.move = function(){
		this.moveCount++;
		if(!this.crashed){	//未被撞毁，需切换状态
			this.y+=3;
			this.y>=canvasHeight&&(this.removable=true);
			this.idx==0?this.idx=1:this.idx=0;
		}else{
			if(this.moveCount%3==0){
				this.idx++;
				this.idx>=imgs.length&&(this.removable=true);
			}
		}
	}
}
function EnemyList(){
	this.list = [];
	this.add = function(enemy){
		this.list.push(enemy);
	}
	this.draw = function(){
		for(var i=this.list.length-1;i>=0;i--){
			this.list[i].draw();
		}
		/*******随机生成敌机*********/	
		/*
		if(this.list.length == 0){
			this.add(new Enemy3(imgsEnemy3)); 
		}
		*/
		
		if(cur_phase == PHASE_PLAY){
			var num = Math.floor(Math.random()*200);
			if(num<6){	//创建小号敌机
				this.add(new Enemy1(imgsEnemy1)); 
			}else if(num<9){	//创建中号敌机
				this.add(new Enemy2(imgsEnemy2)); 
			}else if(num<10){	//创建大号敌机
				this.add(new Enemy3(imgsEnemy3)); 
			}
		}
	}
	this.move = function(){
		//移动每一个敌机
		for(var i=this.list.length-1;i>=0;i--){
			this.list[i].move();
			if(this.list[i].removable){
				this.list.splice(i,1);
			}
			/******************************************/
			/*********判断子弹是否击中敌机*************/
			/******************************************/
			if(this.list[i] && !this.list[i].crashed){
				if(isCrashed(this.list[i],bulletList.list)){
					this.list[i].blood--;	//敌机被击中后blood-1
					if(this.list[i].blood == 0){
						this.list[i].crashed = true;
						score += this.list[i].score;
					}
				}
			}

		}
		
	}
}
/*********核心算法：碰撞检验**********/
function isCrashed(objTarget,arr){
	var x2 = objTarget.x;
	var y2 = objTarget.y;
	var w2 = objTarget.width;
	var h2 = objTarget.height;
	for(var i=0;i<arr.length;i++){
		var x1 = arr[i].x;
		var y1 = arr[i].y;
		var w1 = arr[i].width;
		var h1 = arr[i].height;
		if(x1-x2<=w2&&x2-x1<=w1&&y1-y2<=h2&&y2-y1<=h1){
			arr[i].removable = true;	//撞击后子弹消失
			return true;
		}
	}
	return false;
}
//绘制lives
function drawState(){
	var txtScore = 'SCORE:'+score;
	ctx.font = '20px Simhei';
	ctx.fillText(txtScore,5,25);
	ctx.fillStyle = '#666';
	var txtLive = 'LIVES:'+lives;
	var txtLenghth = ctx.measureText(txtLive).width;
	ctx.fillText(txtLive,canvasWidth-txtLenghth-5,25);
}
//鼠标移出后游戏暂停
canvas.addEventListener('mouseout',function(){
	cur_phase == PHASE_PLAY &&	(cur_phase = PHASE_PAUSE);
},false);
/*************************************
********** 阶段5：PHASE_Pause ********
**************************************/
//暂停状态鼠标移入游戏继续
canvas.addEventListener('mouseover',function(){
	cur_phase == PHASE_PAUSE &&	(cur_phase = PHASE_PLAY);
},false);
//把暂停图片放上
function drawPause(){
	ctx.drawImage(imgGame_pause_nor,canvasWidth/2-imgGame_pause_nor.width/2,canvasHeight/2-imgGame_pause_nor.height/2);
}
/*************************************
******** 阶段6：PHASE_Gameover *******
**************************************/
function drawGameOver(){
	lives = 0;
	ctx.font = '96px Simhei';
	var txt = 'GAME OVER';
	var txtWidth = ctx.measureText(txt).width;
	ctx.fillText(txt,canvasWidth/2-txtWidth/2,canvasHeight/2);
	canvas.addEventListener('click',function(){
		lives = 2;
		cur_phase == PHASE_GAMEOVER && (cur_phase = PHASE_STARTING);
	},false);
}
/*************************************
****游戏的主引擎--周期固定的定时器****
*************************************/
//主引擎的速度，每秒钟绘制24次
function startEngine(){
	var timer = setInterval(function(){
		sky.draw();
		sky.move();
		switch(cur_phase){
			case PHASE_READY:
				drawLogo();
				break;
			case PHASE_STARTING:
				runningPlane.draw();
				runningPlane.move();
				break;
			case PHASE_PLAY:
				hero.draw();
				hero.move();
				bulletList.draw();
				bulletList.move();
				enemyList.draw();
				enemyList.move();
				drawState();
				break;
			case PHASE_PAUSE:
				enemyList.draw();
				hero.draw();
				drawPause();
				drawState();
				break;
			case PHASE_GAMEOVER:
				drawGameOver();
				drawState();
				break;
		}
	},42);
}