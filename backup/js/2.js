function Stem(x, y){
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 200;
    this.canvas;
    this.tweens = [];
    this.rTip = 20;
    this.xTip = randomEqualOrBetween(this.rTip, (this.width - this.rTip));;
    this.yTip = this.rTip;
    this.seedsAttached = 0;
    this.typeCanvas = 1;
    
    this.old_x = null;
    this.old_y = null;
    this.old_angle = null;
    
    this.active = false;
    
    this.addTween = function(tween){
        if (this.tweens.length > 0){
            this.tweens.push(tween);
        } else {
            this.tweens.push(tween);
            var curTween = this.createTween(this.tweens[0].prop, this.tweens[0].duration, this.tweens[0].interpolation, this.tweens[0].easing, this.tweens[0].delay);
            curTween.start();
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
                var curTween = this.createTween(this.tweens[0].prop, this.tweens[0].duration, this.tweens[0].interpolation, this.tweens[0].easing, this.tweens[0].delay);
                curTween.start();
            }
        }
    };
    
    this.init = function(){
        setCanvas(this, 'stem');
        this.canvas.addEventListener('mouseover', this.mouseOver.bind(this), false);
        this.canvas.addEventListener('mouseout', this.mouseOut.bind(this), false);
        this.canvas.addEventListener('click', this.click.bind(this), false);
        if (randomBoolean()){
            this.addTween({prop:{xTip: (this.width - this.rTip)}, duration: 2000, easing: TWEEN.Easing.Cubic.Out});
            this.addTween({prop:{xTip: this.rTip}, duration: 2000, easing: TWEEN.Easing.Cubic.Out});
        } else {
            this.addTween({prop:{xTip: this.rTip}, duration: 2000, easing: TWEEN.Easing.Cubic.Out});
            this.addTween({prop:{xTip: (this.width - this.rTip)}, duration: 2000, easing: TWEEN.Easing.Cubic.Out});
        }
    };
    
    this.drawStem = function(){
        var ctx = this.canvas.getContext('2d');
        ctx.clearRect(0,0,this.width, this.height);
        ctx.beginPath();
        ctx.moveTo(this.width/2, this.height);
        ctx.quadraticCurveTo(this.width/2, this.height/2, this.xTip, this.yTip);
        ctx.strokeStyle = '#00755E';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(this.xTip, this.yTip, this.rTip-10, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(0,117,94,0.8)';
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
        } else {
            this.canvas.style['cursor'] = 'default';
        }
    };
    
    this.mouseOut = function(){
        this.canvas.style['cursor'] = 'default';
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
        removeAllClass('seed');
        seeds = [];
    };
    
    this.respawnAllSeeds = function(){
        for (var a = 0; a < seeds.length; a++){
            if (!seeds[a].attached){
                seeds[a].goTo();
            }
        }
    };
    
    this.maskByPappus = function(code, status){
        for (var a = 0; a < seeds.length; a++){
            if (Math.ceil(seeds[a].hair / 2) == code){
                if (status){
                    seeds[a].canvas.style['visibility'] = 'hidden';
                } else {
                    seeds[a].canvas.style['visibility'] = 'visible';
                }
            }
        }
    };
    
    this.maskByFloret = function(code, status){
        for (var a = 0; a < seeds.length; a++){
            if (Math.ceil(seeds[a].body/5) == code){
                if (status){
                    seeds[a].canvas.style['visibility'] = 'hidden';
                } else {
                    seeds[a].canvas.style['visibility'] = 'visible';
                }
            }
        }
    };
    
    this.resetMasking = function(){
        var actives = document.getElementsByClassName('menu-sld-active');
        console.log('length='+actives.length);
        for (var a = actives.length-1; a >= 0; a--){
            actives[a].setAttribute('class', 'menu-sld');
        }
    };
    
    this.init();
}