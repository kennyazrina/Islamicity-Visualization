function Field(){
    this.x = window.innerWidth/2;
    this.y = window.innerHeight;
    this.width = window.innerWidth;
    this.height = 80;
    this.canvas;
    this.typeCanvas = 1;
    
    
    this.init = function(){
        var nbr_flowers = 30;
        var maxRad = 30;
        var minRad = 10;
        
        setCanvas(this, 'field');
        var ctx = this.canvas.getContext('2d');
        for (var a = 0; a < nbr_flowers; a++){
            var x = this.width/ randomEqualOrBetween(maxRad, this.width-maxRad);
            var y = randomEqualOrBetween(this.height-maxRad, this.height-50);
            var rad = randomEqualOrBetween(minRad, maxRad);
            ctx.beginPath();
            ctx.arc(x, y, rad, 2 * Math.PI, false);
            var hsl = seedColor.split(",");
            var grd=ctx.createRadialGradient(x,y,rad/2,x,y,rad);
            grd.addColorStop(0,'rgba(0,0,0,0)');
            grd.addColorStop(1,'hsl('+hsl[0]+','+hsl[1]+'%,'+hsl[2]+'%)');
            ctx.fillStyle = grd;
            ctx.fill();
        }
    };
    
    this.init();
}