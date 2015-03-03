var question = [
    'Anda mendapatkan <em>insight</em> mengenai topik visualisasi',
    'Anda dapat melihat rincian yang menarik mengenai informasi tertentu',
    'Anda dapat melihat <em>overview</em> dari semua informasi',
    'Anda dapat mencari informasi yang saling berhubungan dengan mudah',
    'Anda dapat melihat informasi lebih rinci mengenai objek tertentu (misalnya dandelion)',
    'Informasi dapat dihilangkan ketika tidak dibutuhkan',
    'Informasi muncul ketika dibutuhkan',
    'Menu yang diberikan membuat Anda mendapatkan informasi baru mengenai keislaman negara-negara di dunia',
    'Anda menemukan hubungan menarik antara populasi muslim suatu negara dengan tingkat keislamannya',
    'Visualisasi interaktifnya menarik sehingga Anda tertarik untuk mengeksplorasi lebih jauh',
    'Informasi yang ditampilkan jelas',
    'Response visualisasi sesuai dengan aksi yang dilakukan'
];

var weedColor = [
    '#967117',
    '#DAA520',
    '#FFDB58',
    '#D1E231',
    '#77DD77'
];

var legendTxt = [
    'Sangat tidak setuju',
    'Tidak setuju',
    'Netral',
    'Setuju',
    'Sangat setuju'
];

function Weed(x, y, seq, score){
    this.x = x;
    this.y = y;
    this.seq = seq;
    this.width = 50;
    this.height = 150;
    this.typeCanvas = 1;
    this.soilRad = 0;
    this.score = score;
    this.rootOne = 0;
    this.rootTwo = 0;
    this.rootThree = 0;
    this.rootFour = 0;
    this.rootFive = 0;
    this.canvas;
    this.tooltip;
    this.tweens = [];
    this.isGrowing = false;
    
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
                toggleable = true;
                if (!this.isGrowing){
                    this.isGrowing = true;
                } else {
                    this.isGrowing = false;
                    this.canvas.style['display'] = 'none';
                }
                this.popSignal = true;
            }).
            interpolation(interpolation || TWEEN.Interpolation.Linear ).
            easing(easing || TWEEN.Easing.Linear.None).
            delay(delay || 0);
    };
    
    this.checkTween = function(){
        if (this.popSignal){
            this.popSignal = false;
            var lastTween = this.tweens.shift();
            if (this.tweens.length > 0){
                this.curTween = this.createTween(this.tweens[0].prop, this.tweens[0].duration, this.tweens[0].interpolation, this.tweens[0].easing, this.tweens[0].delay);
                this.curTween.start();
            }
        }
    };
    
    this.init = function(){
        var rating = document.getElementById('rating');
    
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style['position'] = 'absolute';
        this.canvas.style['display'] = 'none';
        //this.canvas.style['border'] = 'solid white 1px';
        this.canvas.style['left'] = (this.x - this.canvas.width * 0.5) + 'px';
        this.canvas.style['top'] = (this.y - this.canvas.height) + 'px';
        rating.appendChild(this.canvas);
        
        this.tooltip = document.createElement('div');
        this.tooltip.style['position'] = 'absolute';
        this.tooltip.style['display'] = 'none';
        this.tooltip.style['z-index'] = '1';
        this.tooltip.style['text-shadow'] = 'none';
        this.tooltip.style['opacity'] = '0.8';
        this.tooltip.style['width'] = '300px';
        this.tooltip.style['padding'] = '5px 10px';
        this.tooltip.style['color'] = 'Black';
        this.tooltip.style['font-family'] = 'Calibri';
        this.tooltip.style['font-size'] = '10pt';
        this.tooltip.innerHTML = question[this.seq] + '<br></br>';
        this.tooltip.style['background-color'] = '#F5F5DC';
        var  a = 0;
        for (var prop in this.score){
            var legend = document.createElement('div');
            var box = document.createElement('div');
            var txt = document.createElement('span');
            box.style['display'] = 'inline-block';
            box.style['width'] = '10px';
            box.style['height'] = '10px';
            box.style['margin-right'] = '10px';
            box.style['border'] = 'solid black 1px';
            box.style['background-color'] = weedColor[a];
            txt.innerHTML = legendTxt[a] + ' <b>(' + this.score[prop] + ' orang)</b>';
            legend.appendChild(box);
            legend.appendChild(txt);
            this.tooltip.appendChild(legend);
            a++;
        }
        rating.appendChild(this.tooltip);
        
        this.canvas.addEventListener('mouseover', this.mouseOver.bind(this), false);
        this.canvas.addEventListener('mouseout', this.mouseOut.bind(this), false);
        this.canvas.addEventListener('click', this.click.bind(this), false);
        document.getElementById('toggle-button').addEventListener('click', toggleClick, false);
    };
    
    this.toggleGrow = function(){
        if (this.isGrowing){
            this.addTween({prop: {
                    rootOne: 0, 
                    rootTwo: 0, 
                    rootThree: 0, 
                    rootFour: 0, 
                    rootFive: 0
                }, duration: 500});
        } else {
            this.addTween({prop: {
                soilRad: this.width * 0.25,
                rootOne: this.score.one * 10,
                rootTwo: this.score.two * 10,
                rootThree: this.score.three * 10,
                rootFour: this.score.four * 10,
                rootFive: this.score.five * 10
            }, duration: 2000});
        }
    };
    
    this.updateWeed = function(){
        this.checkTween();
    };
    
    this.drawWeed = function(){
        var ctx = this.canvas.getContext('2d');
        
        var xpos = 0.5 * this.canvas.width / 5;
        ctx.beginPath();
        ctx.moveTo(xpos, this.height);
        ctx.lineTo(xpos, this.height - this.rootOne);
        ctx.strokeStyle = '#967117';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        xpos = 1.5 * this.canvas.width / 5;
        ctx.beginPath();
        ctx.moveTo(xpos, this.height);
        ctx.lineTo(xpos, this.height - this.rootTwo);
        ctx.strokeStyle = '#DAA520';
        ctx.stroke();
        
        xpos = 2.5 * this.canvas.width / 5;
        ctx.beginPath();
        ctx.moveTo(xpos, this.height);
        ctx.lineTo(xpos, this.height - this.rootThree);
        ctx.strokeStyle = '#FFDB58';
        ctx.stroke();
        
        xpos = 3.5 * this.canvas.width / 5;
        ctx.beginPath();
        ctx.moveTo(xpos, this.height);
        ctx.lineTo(xpos, this.height - this.rootFour);
        ctx.strokeStyle = '#D1E231';
        ctx.stroke();
        
        xpos = 4.5 * this.canvas.width / 5;
        ctx.beginPath();
        ctx.moveTo(xpos, this.height);
        ctx.lineTo(xpos, this.height - this.rootFive);
        ctx.strokeStyle = '#77DD77';
        ctx.stroke();
    };
    
    this.mouseOver = function(e){
        var x = e.clientX;
        var y = e.clientY;
        
        this.canvas.style['cursor'] = 'pointer';
        var ctx = this.canvas.getContext('2d');
        ctx.save();
        ctx.shadowColor = 'white';
        ctx.shadowBlur  = 20;
        
        x -= 150;
        if (x < 0){
            x += 50;
        } else if (x + 300 > window.innerWidth){
            x -= 50;
        }
        this.tooltip.style['display'] = '';
        this.tooltip.style['left'] = x + 'px';
        this.tooltip.style['top'] = (this.y - 300) + 'px';
    };
    
    this.mouseOut = function(){
        this.canvas.style['cursor'] = 'default';
        var ctx = this.canvas.getContext('2d');
        ctx.restore();
        
        this.tooltip.style['display'] = 'none';
    };
    
    this.click = function(){
        
    };
    
    this.init();
}

var toggleable = true;

function toggleClick(e){
    if (toggleable){
        toggleable = false;
        if (e.target.innerHTML === 'hide this visualization rating'){
            e.target.innerHTML = 'show this visualization rating';
        } else {
            e.target.innerHTML = 'hide this visualization rating';
        }
        for (var a = 0; a < weeds.length; a++){
            if (!weeds[a].isGrowing){
                weeds[a].canvas.style['display'] = '';
            }
            weeds[a].toggleGrow();
        }
    }
}