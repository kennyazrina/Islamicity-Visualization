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

function selectSliderHandler(el){
    if (el.className === 'menu-sld-active'){
        el.setAttribute('class', 'menu-sld');
        return false;
    } else {
        el.setAttribute('class', 'menu-sld-active');
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

function addSliderMenu(title, opt, handler){
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
    for (var a = 0; a < opt.length; a++){
        var menuElm = document.createElement('span');
        menuElm.setAttribute('id', opt[a].id);
        menuElm.setAttribute('class', opt[a].active ? 'menu-sld-active' : 'menu-sld');
        menuElm.innerHTML = opt[a].name;
        menuElm.addEventListener("click", handler, false); 
        menuOpt.appendChild(menuElm);
    }
    menuTitle.appendChild(menuOpt);
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
    spanKey.innerHTML = 'Islamicity Rank (of 208)';
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
    
    var div = document.createElement('div');
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