var myMap = L.map('mapid').setView([37,-25],2);

mapboxgl.accessToken = 'pk.eyJ1IjoiYmVzdGpvaG4iLCJhIjoiY2piam85endhMGc1bTMxbzE1ZmR1YTdwMSJ9.S1JhI9dyOX_ayoh9Vb0yhw';

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.dark',
    accessToken: mapboxgl.accessToken
}).addTo(myMap);

function onEachFeature(feature,layer){
    
    layer.on({
        mouseover:highlight,
        mouseout:resetHighlight,
        click:zoomToFeature
    });
    
}



function style(){
    return{
        weight:1,
        opacity:1,
        color:'#666'
    };
}

function highlight(e) {
    
    var layer = e.target;
    
    layer.setStyle({
        weight:2,
        color:'white',
        fillOpacity:0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e){
    statesLayer.resetStyle(e.target);
}

function zoomToFeature(e){
    myMap.fitBounds(e.target.getBounds());
}

var statesLayer = L.geoJSON(statesData,{style:style,onEachFeature:onEachFeature}).addTo(myMap);
