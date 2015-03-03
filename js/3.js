function Seed(stem, param, seq) {
    var maxRank = 208;
    var minRank = 1;
    
    var maxPercentage = 99.9;
    var minPercentage = 0.05;
    
    var minLat = -69.0394;
    var maxLat = 72;
    var minLong = -175;
    var maxLong = 178; 

    this.stem = stem;
    var destPoint = getAbsoluteCanvasPos({x: stem.xTip, y: stem.yTip}, stem);
    this.x = destPoint.x;
    this.y = destPoint.y;
    this.angle = seq * 2 * Math.PI / nbr_seeds;
    this.seq = seq;
    this.canvas;
    this.tweens = [];
    this.loopTween = false;
    this.typeCanvas = 1;
    
    this.tooltip;
    this.param = param;
    this.attached = true;
    this.body = 50 * (maxRank - param.islrank + 1)/maxRank;
    this.hair = Math.ceil(param.mosper) * 20 / 100;
    this.width = 50;
    this.height = this.body + 35;
    this.alpha = 1;
    this.scale = 0;
    this.idxArrHair = -1;
    this.idxArrBody = -1;
    
    this.old_x = null;
    this.old_y = null;
    this.old_angle = null;
    
    this.manipulable = true;
    
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
                this.tweens.push(lastTween);
            }
            if (lastTween.name === 'disperse'){
                this.loopTween = true;
            } else if (lastTween.name === 'blow'){
                nbr_seeds--;
            }
            if (this.tweens.length > 0){
                this.curTween = this.createTween(this.tweens[0].prop, this.tweens[0].duration, this.tweens[0].interpolation, this.tweens[0].easing, this.tweens[0].delay);
                this.curTween.start();
            }
        }
    };
    
    this.overwriteTweenWith = function(tween, toggleLoop){
        for ( var i = this.tweens.length - 1; i >= 0; i--) {
            this.curTween.stop();
            this.tweens.shift();
        }
        if (toggleLoop){
            this.loopTween = !this.loopTween;
        }
        this.addTween(tween);
    };
    
    this.init = function(){
        setCanvas(this, 'seed');
        doRotate(this, this.angle, '50% 100% 0');
        this.canvas.addEventListener('mouseover', this.mouseOver.bind(this), false);
        this.canvas.addEventListener('mouseout', this.mouseOut.bind(this), false);
        appendTooltip(this);
    };
    
    this.drawSeed = function(){
        var ctx = this.canvas.getContext('2d');
        ctx.globalAlpha = this.alpha;
        ctx.save();
        
        ctx.beginPath();
        ctx.moveTo(this.width/2, this.height - 10);
        ctx.lineTo(this.width/2, this.height - 10 - this.body);
        var grd=ctx.createLinearGradient(this.width/2,0,this.width/2,this.height);
        var hsl = seedColor.split(",");
        grd.addColorStop(0.5,'hsl('+hsl[0]+','+hsl[1]+'%,'+hsl[2]+'%)');
        grd.addColorStop(1,'hsl('+hsl[0]+','+hsl[1]+'%,'+(hsl[2] - 20)+'%)');
        ctx.strokeStyle = grd;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        for (var a = 0; a < this.hair; a++){
            ctx.beginPath();
            var startPoint = {x:this.width/2, y:this.height - 10 - this.body};
            ctx.moveTo(startPoint.x, startPoint.y);
            var arc = Math.PI * 3 / 2;
            var arcEach = arc / 20;
//            var arcOffset = (Math.PI - arc)/2;
            var arcOffset = (Math.PI - arcEach * this.hair)/2;
            if (a % 2 === 1){
                var hairLong = this.width/2;
            } else {
                var hairLong = this.width/4;
            }
//            ctx.lineTo(startPoint.x + hairLong * Math.cos(arcOffset + ((a + 0.5) * arc)/this.hair), startPoint.y - hairLong * Math.sin(arcOffset + ((a + 0.5) * arc)/this.hair));
            ctx.lineTo(startPoint.x + hairLong * Math.cos(arcOffset + (a + 0.5) * arcEach), startPoint.y - hairLong * Math.sin(arcOffset + (a + 0.5) * arcEach));
            ctx.strokeStyle = 'hsl('+hsl[0]+','+hsl[1]+'%,'+hsl[2]+'%)';
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
        
        ctx.save();
        ctx.scale(1, 2);
        ctx.beginPath();
        ctx.arc(this.width/2, this.height/2 - 5, 2.5, 0, 2 * Math.PI, false);
        ctx.restore();
        ctx.fillStyle = '#964B00';
        ctx.fill();
    
        ctx.restore();
    };
    
    this.updateSeed = function(){
        if (this.attached){
            var newPos = getAbsoluteCanvasPos({x: this.stem.xTip, y: this.stem.yTip}, this.stem);
            this.x = newPos.x + Math.sin(this.stem.angle) * this.stem.canvas.height * (1 + this.stem.offsetY/100); 
            this.y = newPos.y + (1 - Math.cos(this.stem.angle)) * this.stem.canvas.height * (1 + this.stem.offsetY/100);
        }
        this.checkTween();
        updateCanvas(this);
        this.old_x = this.x;
        this.oldvalue = this.y;
        this.old_angle = this.angle;
    };
    
    this.getLingerPosNormal = function(){
        var w = 1200;
        var h = 400;
        var columnMax = 10;
        var rowMax = Math.ceil(nbr_seeds / columnMax);
        var left = (window.innerWidth - w)/2;
        var bottom = 1000;
        
        var boxWidth = w / columnMax;
        var boxHeight = h / rowMax;
        
        if (Math.floor(this.seq / columnMax) === Math.floor(nbr_seeds / columnMax)){
            var _w = (nbr_seeds % columnMax) * boxWidth;
            left = (window.innerWidth - _w)/2;
        }
        var idxHor = this.seq % columnMax;
        var idxVer = Math.floor(this.seq / columnMax);
        var newX = left + (idxHor + (idxVer % 4) * 0.25) * boxWidth;
        var newY = bottom - (rowMax - idxVer - 0.5) * boxHeight;
        
        return {x: newX, y: newY};
    };
    
    this.getLingerPosCoord = function(){
        var w = 1200;
        var h = 400;
        var left = (window.innerWidth - w)/2;
        var bottom = 1000;
        
        var newX = left + (this.param.long - minLong) * w / (maxLong - minLong);
        var newY = bottom - (minLat - this.param.lat) * h / (minLat - maxLat);
        
        return {x: newX, y: newY};
    };
    
    this.disperseSeed = function(){
        if (scatter === 'alphabet'){
            var newPos = this.getLingerPosNormal();
        } else if (scatter === 'coord'){
            var newPos = this.getLingerPosCoord();
        }
        var newX = newPos.x;
        var newY = newPos.y;
        
        this.attached = false;
        this.stem.seedsAttached--;
        if (this.stem.seedsAttached === 0){
            this.stem.active = false;
        }
        
        this.addTween({prop:{x: newX, y: newY}, duration: 1000, easing: TWEEN.Easing.Quadratic.Out});
        var value = (1 + -Math.cos(this.angle)) * Math.abs(this.height * Math.sin(this.angle));
        if (this.angle > Math.PI){
            this.addTween({name:'disperse', prop:{y: newY + value, angle: 2 * Math.PI}, duration: 800 -value, easing: TWEEN.Easing.Circular.In});
        } else {
            this.addTween({name:'disperse', prop:{y: newY + value, angle: 0}, duration: 800 - value, easing: TWEEN.Easing.Circular.In});
        }
        var rndX, rndY;
        rndX = randomEqualOrBetween(0, 5);
        rndY = randomEqualOrBetween(20, 50);
        this.addTween({prop:{x: newX + rndX, y: newY + rndY}, duration: 2000 * (rndY / 50)});
        rndX = randomEqualOrBetween(0, 5);
        rndY = randomEqualOrBetween(20, 50);
        this.addTween({prop:{x: newX - rndX, y: newY - rndY}, duration: 2000 * (rndY / 50)});
    };
    
    this.goTo = function(){
        var newPos;
        if (scatter === 'alphabet'){
            newPos = this.getLingerPosNormal();
        } else if (scatter === 'coord'){
            newPos = this.getLingerPosCoord();
        }
        var newX = newPos.x;
        var newY = newPos.y;
        this.overwriteTweenWith({name: 'disperse', prop: {x: newX, y: newY}, duration: 2000}, true);
        
        var rndX, rndY;
        rndX = randomEqualOrBetween(0, 5);
        rndY = randomEqualOrBetween(20, 50);
        this.addTween({prop:{x: newX + rndX, y: newY + rndY}, duration: 2000 * (rndY / 50)});
        rndX = randomEqualOrBetween(0, 5);
        rndY = randomEqualOrBetween(20, 50);
        this.addTween({prop:{x: newX - rndX, y: newY - rndY}, duration: 2000 * (rndY / 50)});
        
    };
    
    this.blow = function(){
        var windDirection;
        var time = 2000;
        if (this.stem.xTip > this.stem.width/2){
            windDirection = 1;
        } else {
            windDirection = -1;
        }
        var newX, newY;
        if (this.attached){
            var lingerPos;
            if (scatter === 'alphabet'){
                lingerPos = this.getLingerPosNormal();
            } else if (scatter === 'coord'){
                lingerPos = this.getLingerPosCoord();
            }
            var lingerX = lingerPos.x;
            var lingerY = lingerPos.y;
            newX = lingerX + (window.innerHeight * windDirection);
            newY = randomEqualOrBetween(lingerY - 300, lingerY - 600);
        
            this.attached = false;
            this.stem.seedsAttached--;
        
            var newAngle = Math.atan((this.y - newY) / (newX - this.x));
            var diffAngle = newAngle - this.angle;
            if (diffAngle < -Math.PI){
                newAngle += Math.PI * 2;
            }
            diffAngle += (diffAngle > Math.PI) ? -2 * Math.PI : (diffAngle < -Math.PI) ? 2 * Math.PI : 0;
            
            this.addTween({name: 'blow', prop: {x: newX, y: newY, angle: newAngle, alpha: 0}, duration: time, easing: TWEEN.Easing.Back.In});
        
        } else {
            newX = this.x + (window.innerHeight * windDirection);
            newY = randomEqualOrBetween(this.y - 300, this.y - 600);
            
            var newAngle = Math.atan((this.y - newY) / (newX - this.x));
            var diffAngle = newAngle - this.angle;
            if (diffAngle < -Math.PI){
                newAngle += Math.PI * 2;
            }
            diffAngle += (diffAngle > Math.PI) ? -2 * Math.PI : (diffAngle < -Math.PI) ? 2 * Math.PI : 0;
            
            this.overwriteTweenWith({name: 'blow', prop: {x: newX, y: newY, angle: newAngle, alpha: 0}, duration: time, easing: TWEEN.Easing.Back.In}, true);
        }
        this.manipulable = false;
    };
    
    this.mouseOver = function(){
        if (this.attached){
            this.disperseSeed();
        } else {
            this.curTween.stop();
            
            this.tooltip.style['display'] = '';
            var osX = 10;
            if (this.x + 350 > window.innerWidth){
                osX = -360;
            }
            this.tooltip.style['left'] = (this.x + osX) + 'px';
            this.tooltip.style['top'] = (this.y + 10) + 'px';
        }
        var ctx = this.canvas.getContext('2d');
        ctx.save();
        ctx.shadowColor = 'white';
        ctx.shadowBlur  = 10;
   };
    
    this.mouseOut = function(){
        if (!this.attached){
            this.curTween.start();
        }
        this.tooltip.style['display'] = 'none';
        var ctx = this.canvas.getContext('2d');
        ctx.restore();
    };
    
    this.init();
}