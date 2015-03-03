function setCanvas(obj, className){
    var canvas = document.createElement('canvas');
    canvas.width = obj.width;
    canvas.height = obj.height;
    if (obj.typeCanvas === 0){ 
        canvas.style['left'] = (obj.x - obj.width/2)+ 'px';
        canvas.style['top'] = (obj.y - obj.height/2) + 'px';
    } else if (obj.typeCanvas === 1) {
        canvas.style['left'] = (obj.x - obj.width/2)+ 'px';
        canvas.style['top'] = (obj.y - obj.height) + 'px';
    }
    //canvas.style['border'] = 'solid';
    canvas.setAttribute('class', className);
    document.getElementById('container').appendChild(canvas);
    obj.canvas = canvas;
}

function doScale(obj, scaleX, scaleY, ori){
    obj.canvas.style['-ms-transform'] = 'scale(' + scaleX + ',' + scaleY + ')';
    obj.canvas.style['-webkit-transform'] = 'scale(' + scaleX + ',' + scaleY + ')';
    obj.canvas.style['transform'] = 'scale(' + scaleX + ',' + scaleY + ')';
    var origin = ori || '50% 50% 0';
    obj.canvas.style["transform-origin"] = origin;
    obj.canvas.style["-ms-transform-origin"] = origin;
    obj.canvas.style["-webkit-transform-origin"] = origin;
}

function doTranslate(obj, dX, dY, ori){
    obj.canvas.style['-ms-transform'] = 'translate(' + dX + 'px,' + dY + 'px)';
    obj.canvas.style['-webkit-transform'] = 'translate(' + dX + 'px,' + dY + 'px)';
    obj.canvas.style['transform'] = 'translate(' + dX + 'px,' + dY + 'px)';
    var origin = ori || '50% 50% 0';
    obj.canvas.style["transform-origin"] = origin;
    obj.canvas.style["-ms-transform-origin"] = origin;
    obj.canvas.style["-webkit-transform-origin"] = origin;
}

function doRotate(obj, rad, ori){
    obj.canvas.style["transform"] = 'rotate(' + rad + 'rad)';
    obj.canvas.style["-ms-transform"] = 'rotate(' + rad + 'rad)';
    obj.canvas.style["-webkit-transform"] = 'rotate(' + rad + 'rad)';
    var origin = ori || '50% 50% 0';
    obj.canvas.style["transform-origin"] = origin;
    obj.canvas.style["-ms-transform-origin"] = origin;
    obj.canvas.style["-webkit-transform-origin"] = origin;
}

function randomEqualOrBetween(n1, n2){
    var lesser = n1; var bigger = n2;
    if (n1 > n2){
        lesser = n2; bigger = n1;
    }
    return Math.floor((Math.random() * (bigger + 1 - lesser)) + lesser);
}

function refreshAllContext(objs){
    for (var a = 0; a < objs.length; a++){
        var ctx = objs[a].canvas.getContext('2d');
        ctx.clearRect(0, 0, objs[a].canvas.width, objs[a].canvas.height);
    }
}

function randomBoolean(){
    if (Math.random() < 0.5) {
        return true;
    } else {
        return false;
    }
}

function getAbsoluteCanvasPos(pos, obj){
    var offsetCanvasX, offsetCanvasY;
    if (obj.typeCanvas === 0){
        offsetCanvasX = obj.x - obj.canvas.width/2;
        offsetCanvasY = obj.y - obj.canvas.height/2;
    } else if (obj.typeCanvas === 1){
        offsetCanvasX = obj.x - obj.canvas.width/2;
        offsetCanvasY = obj.y - obj.canvas.height;
    }
    var x = pos.x + offsetCanvasX; 
    var y = pos.y + offsetCanvasY;
    return {x: x, y: y};
}

function updateCanvas(obj){
    if (obj.old_angle !== null){
        var da = obj.angle - obj.old_angle;
        if (da !== 0){
            if (obj.typeCanvas === 0){ 
                doRotate(obj, obj.angle, '50% 50% 0');
            } else if (obj.typeCanvas === 1){
                doRotate(obj, obj.angle, '50% 100% 0');
            }
        }
    }
//    if (obj.old_x !== null && obj.old_y !== null){
//        var dx = obj.x - obj.old_x;
//        var dy = obj.y - obj.old_y;
//        if (dx !== 0 || dy !== 0){
//            if (obj.typeCanvas === 0){ 
//                doTranslate(obj, dx, dy, '50% 50% 0');
//            } else if (obj.typeCanvas === 1){
//                doTranslate(obj, dx, dy, '50% 100% 0');
//            }
//        }
//    }
    if (obj.typeCanvas === 0){ 
        obj.canvas.style['left'] = (obj.x - obj.width/2)+ 'px';
        obj.canvas.style['top'] = (obj.y - obj.height/2) + 'px';
        
    } else if (obj.typeCanvas === 1) {
        obj.canvas.style['left'] = (obj.x - obj.width/2)+ 'px';
        obj.canvas.style['top'] = (obj.y - obj.height) + 'px';
    }
}

function removeAllClass(className){
    var container = document.getElementById('container');
    var classes = container.getElementsByClassName(className);
    for(var i = 0; i < classes.length; i++){
        container.removeChild(classes[i]);
    }
    
}