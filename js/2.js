function Stem(x, y){
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 300;
    this.canvas;
    this.tweens = [];
    this.curTween;
    this.rTip = 20;
    this.xTip = this.width/2;
    this.yTip = this.rTip + 20;
    this.angle = 0;
    this.seedsAttached = 0;
    this.typeCanvas = 2;
    this.offsetX = -50;
    this.offsetY = 20;
    this.old_x = null;
    this.old_y = null;
    this.old_angle = null;
    this.active = true;
    this.terrain;
    
    this.addTween = function(tween){
        if (this.tweens.length > 0){
            this.tweens.push(tween);
        } else {
            this.tweens.push(tween);
            this.curTween = this.createTween(this.tweens[0].prop, this.tweens[0].duration, this.tweens[0].interpolation, this.tweens[0].easing, this.tweens[0].delay);
            this.curTween.start();
        }
    };
    
    this.createTween = function(prop, duration, interpolation, easing, delay){
        return new TWEEN.Tween( this ).
            to( prop, duration).
            onUpdate( function() {
            }).
            onComplete( function() {
                this.popSignal = true;
            }).
            interpolation(interpolation || TWEEN.Interpolation.Linear ).
            easing(easing || TWEEN.Easing.Linear.None).
            delay(delay || 0);
    };
    
    this.checkTween = function(){
        if (this.popSignal && this.tweens.length > 0){
            this.popSignal = false;
            var lastTween = this.tweens.shift();
            this.tweens.push(lastTween);
            if (this.tweens.length > 0){
                this.curTween = this.createTween(this.tweens[0].prop, this.tweens[0].duration, this.tweens[0].interpolation, this.tweens[0].easing, this.tweens[0].delay);
                this.curTween.start();
            }
        }
    };
    
    this.init = function(){
        this.terrain = {x: this.x, y: this.y, width: window.innerWidth, height: 500, typeCanvas: 1, canvas:null};
        setCanvas(this.terrain, 'terrain');
        var tctx = this.terrain.canvas.getContext('2d');
        tctx.beginPath();
        tctx.arc(this.x, 8450, 8000, Math.PI, 2 * Math.PI, false);
        tctx.fillStyle = '#004225';
        tctx.fill();
        
        setCanvas(this, 'stem');
        this.canvas.addEventListener('mouseover', this.mouseOver.bind(this), false);
        this.canvas.addEventListener('mouseout', this.mouseOut.bind(this), false);
        this.canvas.addEventListener('click', this.click.bind(this), false);
        if (randomBoolean()){
            this.addTween({prop:{angle: Math.PI/12}, duration: 4000, easing: TWEEN.Easing.Cubic.Out});
            this.addTween({prop:{angle: -Math.PI/12}, duration: 4000, easing: TWEEN.Easing.Cubic.Out});
        } else {
            this.addTween({prop:{angle: Math.PI/12, xTip: this.rTip}, duration: 4000, easing: TWEEN.Easing.Cubic.Out});
            this.addTween({prop:{angle: -Math.PI/12, xTip: (this.width - this.rTip)}, duration: 4000, easing: TWEEN.Easing.Cubic.Out});
        }
    };
    
    this.drawStem = function(){
        var ctx = this.canvas.getContext('2d');
        ctx.clearRect(0,0,this.width, this.height);
        ctx.beginPath();
        ctx.moveTo(this.width/2, this.height);
        ctx.quadraticCurveTo(this.xTip - 0.3 * (this.height * 0.5 * Math.sin(this.angle)), this.height/2, this.xTip, this.yTip);
        ctx.strokeStyle = '#00755E';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(this.xTip, this.yTip, this.rTip-5, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(0,117,94,1)';
        ctx.fill();
    };
    
    this.updateStem = function(){
        if (nbr_seeds === 0){
            this.deleteAllSeeds();
            this.resetMasking();
            createSeeds();
        }
        this.checkTween();
        updateCanvas(this);
        this.old_x = this.x;
        this.old_y = this.y;
        this.old_angle = this.angle;
    };
    
    this.mouseOver = function(){
        if (this.active){
            this.canvas.style['cursor'] = 'pointer';
            var ctx = this.canvas.getContext('2d');
            ctx.save();
            ctx.shadowColor = 'white';
            ctx.shadowBlur  = 20;
        } else {
            this.canvas.style['cursor'] = 'default';
        }
    };
    
    this.mouseOut = function(){
        this.canvas.style['cursor'] = 'default';
        var ctx = this.canvas.getContext('2d');
        ctx.restore();
    };
    
    this.click = function(e){
        this.disperseAll();
    };
    
    this.disperseAll = function(){
        if (this.seedsAttached !== 0){
            for (var a = 0; a < seeds.length; a++){
                if (seeds[a].attached){
                    seeds[a].disperseSeed();
                }
            }
            this.canvas.style['cursor'] = 'default';
        }
        this.active = false;
    };
    
    this.blowAll = function(){
        for (var a = 0; a < seeds.length; a++){
            if (seeds[a].manipulable){
                seeds[a].blow();
            }
        }
        this.active = false;
    };
    
    this.deleteAllSeeds = function(){
        removeAllClass('container', 'seed');
        removeAllClass('tooltip', 'param');
        seeds = [];
    };
    
    this.respawnAllSeeds = function(){
        for (var a = 0; a < seeds.length; a++){
            if (!seeds[a].attached){
                seeds[a].goTo();
            }
        }
    };
    
    this.resetMasking = function(){
        var actives = document.getElementsByClassName('menu-ms-elm-active');
        var textbox = document.getElementsByClassName('textbox')[0];
        textbox.value = "";
        
        for (var a = actives.length-1; a >= 0; a--){
            actives[a].setAttribute('class', 'menu-ms-elm');
        }
    };
    
    this.init();
}