function Cloud(seq){
    this.seq = seq;
    this.x = 50 + (window.innerWidth - 100) * (seq + 0.5) / categories.length;
    this.y = window.innerHeight * 0.8 - (seq % Math.ceil(categories.length/3)) * 50;
    this.width = randomEqualOrBetween(8, 12) * 50;
    this.height = this.width * 0.2;
    this.canvas;
    this.tweens = [];
    this.typeCanvas = 1;
    this.loopTween = true;
    this.color = 'hsl(0,0%,'+randomEqualOrBetween(80, 100)+'%)';
    this.old_color = this.color;
    this.clickable = true;
    
    this.old_x;
    this.old_y;
    
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
            if (this.loopTween){
                var randDur = randomEqualOrBetween(3, 6) * 10000;
                lastTween.duration = randDur;
                this.tweens.push(lastTween);
            }
            if (this.tweens.length > 0){
                this.curTween = this.createTween(this.tweens[0].prop, this.tweens[0].duration, this.tweens[0].interpolation, this.tweens[0].easing, this.tweens[0].delay);
                this.curTween.start();
            }
        }
    };
    
    this.init = function(){
        setCanvas(this, 'cloud');
        this.canvas.addEventListener('mouseover', this.mouseOver.bind(this), false);
        this.canvas.addEventListener('mouseout', this.mouseOut.bind(this), false);
        this.canvas.addEventListener('click', this.click.bind(this), false);
        var moveRight = randomBoolean();
        var randDur;
        if (moveRight){
            randDur = randomEqualOrBetween(3, 6) * 10000;
            var firstDur = (1 - this.x / window.innerWidth) * randDur;
            this.addTween({prop: {x: window.innerWidth}, duration: firstDur});
            randDur = randomEqualOrBetween(3, 6) * 10000;
            this.addTween({prop: {x: 0}, duration: randDur});
        } else {
            randDur = randomEqualOrBetween(3, 6) * 10000;
            var firstDur = (this.x / window.innerWidth) * randDur;
            this.addTween({prop: {x: 0}, duration: firstDur});
            randDur = randomEqualOrBetween(3, 6) * 10000;
            this.addTween({prop: {x: window.innerWidth}, duration: randDur});
        }
    };
    
    this.drawCloud = function(){
        var ctx = this.canvas.getContext('2d');
        
        ctx.beginPath();
        ctx.arc(this.width * 0.25, this.height, this.height * 0.25, 0, 2 * Math.PI, false);
        ctx.arc(this.width * 0.35, this.height, this.height * 0.5, 0, 2 * Math.PI, false);
        ctx.arc(this.width * 0.5, this.height, this.height * 0.75, 0, 2 * Math.PI, false);
        ctx.arc(this.width * 0.65, this.height, this.height * 0.5, 0, 2 * Math.PI, false);
        ctx.arc(this.width * 0.75, this.height, this.height * 0.25, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        
    };
    
    this.updateCloud = function(){
        this.checkTween();
        updateCanvas(this);
        this.old_x = this.x;
        this.oldvalue = this.y;
    };
    
    this.mouseOver = function(){
        var ctx = this.canvas.getContext('2d');
        ctx.save();
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 30;
    };
    
    this.mouseOut = function(){
        var ctx = this.canvas.getContext('2d');
        ctx.restore();
    };
    
    this.click = function(){
        activeCategory = this.seq;
        for (var a = 0; a < seeds.length; a++){
            seeds[a].blow();
        }
    };
    
    this.init();
}