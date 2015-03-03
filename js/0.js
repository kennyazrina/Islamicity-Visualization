function selectOptionHandler(el){
    if (el.className === 'menu-opt-active'){
        return;
    } else {
        var c = el.parentNode.childNodes;
        for (var a = 0; a < c.length; a++){
            if (c[a].className === 'menu-opt-active'){
                c[a].setAttribute('class', 'menu-opt');
            }
        }
        el.setAttribute('class', 'menu-opt-active');
    }
}

function selectOSHandler(el){
    if (el.className === 'menu-os-elm-active'){
        return;
    } else {
        var c = el.parentNode.childNodes;
        for (var a = 0; a < c.length; a++){
            if (c[a].className === 'menu-os-elm-active'){
                c[a].setAttribute('class', 'menu-os-elm');
            }
        }
        el.setAttribute('class', 'menu-os-elm-active');
    }
}

function selectMSHandler(el){
    if (el.className === 'menu-ms-elm-active'){
        el.setAttribute('class', 'menu-ms-elm');
        return false;
    } else {
        el.setAttribute('class', 'menu-ms-elm-active');
        return true;
    }
}

function addOptionMenu(title, opt, handler){
    var info = document.getElementsByClassName('info')[0];
    var menuTitle = document.createElement('nav');
    menuTitle.setAttribute('id', title.id);
    menuTitle.setAttribute('class', 'more');
    menuTitle.innerHTML = title.name;
    menuTitle.addEventListener("click", function(e){
        if (menuTitle !== e.target) return;
        var c = this.childNodes;
        for (var a = 1; a < c.length; a++){
            if (c[a].style['display'] === 'none'){
                c[a].style['display'] = '';
            } else {
                c[a].style['display'] = 'none';
            }
        }
    }, false);
    info.appendChild(menuTitle);
    for (var a = 0; a < opt.length; a++){
        var menuOpt = document.createElement('h3');
        menuOpt.setAttribute('id', opt[a].id);
        menuOpt.setAttribute('class', opt[a].active ? 'menu-opt-active' : 'menu-opt');
        menuOpt.style['display'] = 'none';
        menuOpt.innerHTML = '> ' + opt[a].name;
        menuOpt.addEventListener("click", handler, false); 
        menuTitle.appendChild(menuOpt);
    }
}

function addMultipleSelectionMenu(title, opt, handler){
    var info = document.getElementsByClassName('info')[0];
    var menuTitle = document.createElement('nav');
    menuTitle.setAttribute('id', title.id);
    menuTitle.setAttribute('class', 'more');
    menuTitle.innerHTML = title.name;
    menuTitle.addEventListener("click", function(e){
        if (menuTitle !== e.target) return;
        var c = this.childNodes;
        for (var a = 1; a < c.length; a++){
            if (c[a].style['display'] === 'none'){
                c[a].style['display'] = '';
            } else {
                c[a].style['display'] = 'none';
            }
        }
    }, false);
    info.appendChild(menuTitle);
    for (var b = 0; b < opt.length; b++){
        var menuOpt = document.createElement('h3');
        menuOpt.setAttribute('class', 'menu-ms');
        menuOpt.style['display'] = 'none';
        var spanKey = document.createElement('div');
        spanKey.setAttribute('class', 'menu-ms-key');
        spanKey.innerHTML = opt[b].name;
        var spanValue = document.createElement('div');
        spanValue.setAttribute('class', 'menu-ms-value');
        for (var a = opt[b].min; a <= opt[b].max; a += opt[b].step){
            var menuElm = document.createElement('span');
            menuElm.setAttribute('id', a);
            menuElm.setAttribute('class', 'menu-ms-elm');
            menuElm.innerHTML = a;
            menuElm.addEventListener("click", handler[b], false); 
            spanValue.appendChild(menuElm);
        }
        menuOpt.appendChild(spanKey);
        menuOpt.appendChild(spanValue);
        menuTitle.appendChild(menuOpt);
    }
}

function addOneSelectionMenu(title, opt, handler){
    var info = document.getElementsByClassName('info')[0];
    var menuTitle = document.createElement('nav');
    menuTitle.setAttribute('id', title.id);
    menuTitle.setAttribute('class', 'more');
    menuTitle.innerHTML = title.name;
    menuTitle.addEventListener("click", function(e){
        if (menuTitle !== e.target) return;
        var c = this.childNodes;
        for (var a = 1; a < c.length; a++){
            if (c[a].style['display'] === 'none'){
                c[a].style['display'] = '';
            } else {
                c[a].style['display'] = 'none';
            }
        }
    }, false);
    info.appendChild(menuTitle);
    for (var b = 0; b < opt.length; b++){
        var menuOpt = document.createElement('h3');
        menuOpt.setAttribute('id', opt[b].id);
        menuOpt.setAttribute('class', 'menu-os');
        menuOpt.style['display'] = 'none';
        var spanKey = document.createElement('div');
        spanKey.setAttribute('class', 'menu-os-key');
        spanKey.innerHTML = opt[b].name;
        var spanValue = document.createElement('div');
        spanValue.setAttribute('class', 'menu-os-value');
        for (var a = 0; a < opt[b].values.length; a++){
            var menuElm = document.createElement('span');
            menuElm.setAttribute('id', opt[b].values[a].id);
            menuElm.setAttribute('class', opt[b].values[a].active? 'menu-os-elm-active' : 'menu-os-elm');
            menuElm.setAttribute('style',opt[b].values[a].key+':'+opt[b].values[a].value);
            menuElm.addEventListener("click", handler[b], false); 
            spanValue.appendChild(menuElm);
        }
        menuOpt.appendChild(spanKey);
        menuOpt.appendChild(spanValue);
        menuTitle.appendChild(menuOpt);
    }
}

function drawSpecialSeed(){
    var width = 50;
    var height = 120;
    var pappus = 20;
    var stalk = 80; 
    
    var scontainer = document.getElementById('special-seed');
    var scanvas = scontainer.getElementsByTagName('canvas')[0];
    scanvas.width = width;
    scanvas.height = height;
    var ctx = scanvas.getContext('2d');
    ctx.globalAlpha = 1;
    ctx.save();
        
    ctx.beginPath();
    ctx.moveTo(width/2, height - 10);
    ctx.lineTo(width/2, height - 10 - stalk);
    var grd=ctx.createLinearGradient(width/2,0,width/2,height);
    var scolor = '45,35,100,1';
    var hsl = scolor.split(",");
    grd.addColorStop(0.5,'hsl('+hsl[0]+','+hsl[1]+'%,'+hsl[2]+'%)');
    grd.addColorStop(1,'hsl('+hsl[0]+','+hsl[1]+'%,'+(hsl[2] - 20)+'%)');
    ctx.strokeStyle = grd;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();

    for (var a = 0; a < pappus; a++){
        ctx.beginPath();
        var startPoint = {x:width/2, y:height - 10 - stalk};
        ctx.moveTo(startPoint.x, startPoint.y);
        var arc = Math.PI * 3 / 2;
        var arcEach = arc / 20;
        var arcOffset = (Math.PI - arcEach * pappus)/2;
        if (a % 2 === 1){
            var hairLong = width/2;
        } else {
            var hairLong = width/4;
        }
        ctx.lineTo(startPoint.x + hairLong * Math.cos(arcOffset + (a + 0.5) * arcEach), startPoint.y - hairLong * Math.sin(arcOffset + (a + 0.5) * arcEach));
        ctx.strokeStyle = 'hsl('+hsl[0]+','+hsl[1]+'%,'+hsl[2]+'%)';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        ctx.stroke();
    }

    ctx.save();
    ctx.scale(1, 2);
    ctx.beginPath();
    ctx.arc(width/2, height/2 - 5, 2.5, 0, 2 * Math.PI, false);
    ctx.restore();
    ctx.fillStyle = '#964B00';
    ctx.fill();

    ctx.restore();
    scontainer.appendChild(scanvas);
    
}

function addFilterMenu(title, handler){
    var info = document.getElementsByClassName('info')[0];
    var menuTitle = document.createElement('nav');
    menuTitle.setAttribute('id', title.id);
    menuTitle.setAttribute('class', 'more');
    menuTitle.innerHTML = title.name;
    menuTitle.addEventListener("click", function(e){
        if (menuTitle !== e.target) return;
        var c = this.childNodes;
        for (var a = 1; a < c.length; a++){
            if (c[a].style['display'] === 'none'){
                c[a].style['display'] = '';
            } else {
                c[a].style['display'] = 'none';
            }
        }
    }, false);
    info.appendChild(menuTitle);
    var menuOpt = document.createElement('h3');
    menuOpt.style['display'] = 'none';
    
    var textbox = document.createElement('input');
    textbox.setAttribute('type', 'text');
    textbox.setAttribute('class', 'textbox');
    textbox.setAttribute('placeholder', 'Country name');
    textbox.addEventListener("keyup", handler, false);
    menuOpt.appendChild(textbox);
    menuTitle.appendChild(menuOpt);
}

function filterCountry(e){
    var txt = e.target.value;
    for (var a = 0; a < seeds.length; a++){
        var seedName = seeds[a].param.countryname.toLowerCase();
        if (seedName.indexOf(txt.toLowerCase()) !== 0){
            seeds[a].canvas.style['display'] = 'none';
        } else {
            seeds[a].canvas.style['display'] = '';
        }
    }
}

function appendTooltip(obj){
    var tooltip = document.getElementById('tooltip');
    
    var param = document.createElement('div');
    param.setAttribute('class', 'param');
    param.style['display'] = 'none';
    tooltip.appendChild(param);
    
    var img = document.createElement('img');
    img.setAttribute('src', obj.param.flag);
    img.setAttribute('class', 'param-flag');
    param.appendChild(img);
            
    var span = document.createElement('span');
    span.setAttribute('class', 'param-name');
    span.innerHTML = obj.param.countryname;
    param.appendChild(span);

    var div = document.createElement('div');
    div.setAttribute('class', 'param-info');
    var spanKey = document.createElement('span');
    var spanValue = document.createElement('span');
    spanKey.setAttribute('class', 'param-info-key');
    spanValue.setAttribute('class', 'param-info-value');
    spanKey.innerHTML = 'Islamicity Rank (out of 208)';
    spanValue.innerHTML = obj.param.islrank;
    div.appendChild(spanKey);
    div.appendChild(spanValue);
    param.appendChild(div);
    
    var div = document.createElement('div');
    div.setAttribute('class', 'param-info');
    var spanKey = document.createElement('span');
    var spanValue = document.createElement('span');
    spanKey.setAttribute('class', 'param-info-key');
    spanValue.setAttribute('class', 'param-info-value');
    spanKey.innerHTML = 'Moslem Population';
    spanValue.innerHTML = obj.param.mosper + '%';
    div.appendChild(spanKey);
    div.appendChild(spanValue);
    param.appendChild(div);
    
    /*var div = document.createElement('div');
    div.setAttribute('class', 'param-info');
    var spanKey = document.createElement('span');
    var spanValue = document.createElement('span');
    spanKey.setAttribute('class', 'param-info-key');
    spanValue.setAttribute('class', 'param-info-value');
    spanKey.innerHTML = 'Lat,Long';
    spanValue.innerHTML = obj.param.lat + ',' + obj.param.long;
    div.appendChild(spanKey);
    div.appendChild(spanValue);
    param.appendChild(div);
    */
    obj.tooltip = param;
}

function createSeeds(){
    var used = [];
    var maxLat  = -500;
    var minLat  = 500;
    var maxLong  = -500;
    var minLong  = 500;
    if (category === 'all'){
        for (var a = 0; a < allcountries.length; a++){
            var param = 
                    {
                countryname: allcountries[a].CountryName,
                islrank: allcountries[a].Rank,
                mospop: allcountries[a].MoslemPopulation,
                mosper: allcountries[a].Percentage,
                oic: allcountries[a].OIC,
                continent: allcountries[a].Developed,
                developed: allcountries[a].Continent,
                flag: allcountries[a].Flag,
                lat: centroid[a].lat,
                long: centroid[a].long
                    };
            used.push(param);
            if (param.lat > maxLat){
                maxLat = param.lat;
            }
            if (param.lat < minLat){
                minLat = param.lat;
            }
            if (param.long > maxLong){
                maxLong = param.long;
            }
            if (param.long < minLong){
                minLong = param.long;
            }
            
        }
    } else if (category === 'oic'){
        for (var a = 0; a < allcountries.length; a++){
            var param = 
                    {
                countryname: allcountries[a].CountryName,
                islrank: allcountries[a].Rank,
                mospop: allcountries[a].MoslemPopulation,
                mosper: allcountries[a].Percentage,
                oic: allcountries[a].OIC,
                continent: allcountries[a].Continent,
                developed: allcountries[a].Developed,
                flag: allcountries[a].Flag,
                lat: centroid[a].lat,
                long: centroid[a].long
                    };
            if (param.oic === 'Yes'){
                used.push(param);
            }
        }
    } else if (category === 'noic'){
        for (var a = 0; a < allcountries.length; a++){
            var param = 
                    {
                countryname: allcountries[a].CountryName,
                islrank: allcountries[a].Rank,
                mospop: allcountries[a].MoslemPopulation,
                mosper: allcountries[a].Percentage,
                oic: allcountries[a].OIC,
                continent: allcountries[a].Continent,
                developed: allcountries[a].Developed,
                flag: allcountries[a].Flag,
                lat: centroid[a].lat,
                long: centroid[a].long
                    };
            if (param.oic === 'No'){
                used.push(param);
            }
        }
    } else if (category === 'dev'){
        for (var a = 0; a < allcountries.length; a++){
            var param = 
                    {
                countryname: allcountries[a].CountryName,
                islrank: allcountries[a].Rank,
                mospop: allcountries[a].MoslemPopulation,
                mosper: allcountries[a].Percentage,
                oic: allcountries[a].OIC,
                continent: allcountries[a].Continent,
                developed: allcountries[a].Developed,
                flag: allcountries[a].Flag,
                lat: centroid[a].lat,
                long: centroid[a].long
                    };
            if (param.developed === 'Yes'){
                used.push(param);
            }
        }
    } else if (category === 'udev'){
        for (var a = 0; a < allcountries.length; a++){
            var param = 
                    {
                countryname: allcountries[a].CountryName,
                islrank: allcountries[a].Rank,
                mospop: allcountries[a].MoslemPopulation,
                mosper: allcountries[a].Percentage,
                oic: allcountries[a].OIC,
                continent: allcountries[a].Continent,
                developed: allcountries[a].Developed,
                flag: allcountries[a].Flag,
                lat: centroid[a].lat,
                long: centroid[a].long
                    };
            if (param.developed === 'No'){
                used.push(param);
            }
        }
    }
    nbr_seeds = used.length;
    for (var a = 0; a < nbr_seeds; a++){
        var seed = new Seed(stem, used[a], a);
        seeds.push(seed);
        stem.seedsAttached++;
    }
    stem.active = true;
}

function maskByPappus(code, status){
    for (var a = 0; a < seeds.length; a++){
        if (Math.ceil(seeds[a].hair / 2) == code){
            if (status){
                seeds[a].canvas.style['visibility'] = 'hidden';
            } else {
                var bodyCode = Math.ceil(seeds[a].body/5);
                var florets = document.querySelectorAll('.menu-ms:nth-child(2) .menu-ms-value span');
                for (var b = 0; b < florets.length; b++){
                    //console.log('bodyCode='+bodyCode+', floret id&class='+florets[b].id+'&'+florets[b].className);
                    if (florets[b].id == bodyCode && florets[b].className !== 'menu-ms-elm-active'){
                        seeds[a].canvas.style['visibility'] = 'visible';
                    }
                }    
                
            }
        }
    }
}

function maskByFloret(code, status){
    for (var a = 0; a < seeds.length; a++){
        if (Math.ceil(seeds[a].body/5) == code){
            if (status){
                seeds[a].canvas.style['visibility'] = 'hidden';
            } else {
                var hairCode = Math.ceil(seeds[a].hair / 2);
                var pappus = document.querySelectorAll('.menu-ms:nth-child(1) .menu-ms-value span');
                for (var b = 0; b < pappus.length; b++){
                    //console.log('hairCode='+hairCode+', pappus id&class='+pappus[b].id+'&'+pappus[b].className);
                    if (pappus[b].id == hairCode && pappus[b].className !== 'menu-ms-elm-active'){
                        seeds[a].canvas.style['visibility'] = 'visible';
                    }
                }
            }
        }
    }
}

function getVisResult(){
    var visResult = [];
    for (var a = 0; a < 12; a++){
        var obj = {one:0, two:0, three:0, four:0, five:0};
        visResult.push(obj);
    }
    for (var a = 0; a < score.length; a++){
        var idx = 0;
        for (var property in score[a]) {
            if (score[a][property] === 1){
                visResult[idx].one += 1;
            } else if (score[a][property] === 2){
                visResult[idx].two += 1;
            } else if (score[a][property] === 3){
                visResult[idx].three += 1;
            } else if (score[a][property] === 4){
                visResult[idx].four += 1;
            } else if (score[a][property] === 5){
                visResult[idx].five += 1;
            } 
            idx++;
        }
    }
    return visResult;
}

function createWeeds(arr){
    for (var a = 0; a < arr.length; a++){
        var midX = window.innerWidth * 0.5;
        if (a < arr.length/2){
            var x = midX - 150 - (arr.length/2 - (a+0.5)) * window.innerWidth * 0.7 / arr.length;
        } else {
            var x = midX + 150 + ((a+0.5) - arr.length/2) * window.innerWidth * 0.7 / arr.length;
        }
        var y = 1250;
        var weed = new Weed(x, y);
        weed.score = arr[a];
        weeds.push(weed);
    }
}

function initRating(){
    var result = getVisResult();
    for (var a = 0; a  < result.length; a++){
        var x = 50 + (a + 0.5) * (window.innerWidth - 100) / result.length;
        var y = 0;
        var weed = new Weed(x, y, a, result[a]);
        weeds.push(weed);
    }
}