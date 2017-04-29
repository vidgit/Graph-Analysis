var radius = 30;
var size = Object.keys(file.points).length;
var edges=[];
var clusterHeads=[];
var clusters=[];
var ring=[];
var adj=[];
var once=[];
var twice=[];
function cluster(){
    //addPriority()
    _cluster();
}

function _cluster(){
    //sortByPriority();
    //pick highest
    //start adding edges if distance between the points is less than radius.
    //and skip the points which have been clustered.
    var clusterNumber=0;
    var keys = Object.keys(file.points);
    for (let [key, value] of Object.entries(file.points)) {
        if(value.isClustered){
            continue;
        }
        value.isClustered=true;
        value.isClusterhead=true;
        clusterHeads.push(value);
        var newClus=[];
        newClus.push(value);
        value.clusterNo=++clusterNumber;
        for(var i=size-1;i>=0;i--){
            var curr=file.points[keys[i]];
            if(curr.isClustered)
                continue;
            var dis=distance(curr,value);
            //alert(dis<=radius);
            if(dis<=radius)
            {
                pushEdge(value,curr,dis);
                file.points[keys[i]].isClustered=true;
                file.points[keys[i]].clusterNo=clusterNumber;
                newClus.push(curr);
            }
        }
        clusters.push(newClus);

    }
    
}

function overlay(){
    buildAdj();
    var ka= Object.keys()
}

function buildAdj(){
    var keys = Object.keys(clusterHeads);
    var a=[];
    for(var i=0;i<keys.length;i++){
        a=[];
        for(var k=0;keys.length;j++){
            a.push(distance(clusterHeads[keys[i]],clusterHeads[keys[k]]));
        }
        adj.push(a);        
    }
}
function pushEdge(p1,p2,dis){
    
    //alert(dis);
    var edge={
        "from":p1,
        "to":p2,
        "length":dis
    }
    edges.push(edge);
    console.log("[Edge added]");
    for (let [key, value] of Object.entries(edges)) {
        console.log(key+":"+value.from.name+":"+value.to.name+":"+value.length+",\n");
    }
    //console.log(edges);
}

function distance(p1,p2){
    //alert(file.points);
    var x1,x2,y1,y2;
    for (let [key, value] of Object.entries(file.points)) {
    
        if(value==p1){
            x1=value.lat;
            y1=value.long;
        }
         if(value==p2){
            x2=value.lat;
            y2=value.long;
        }
    }

    return Math.sqrt(Math.pow((x1-x2),2)-Math.pow((y1-y2),2));

}

function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function addPriority(){
    var list = [];
    for (var i = 0; i <= size; i++) {
        list.push(i);
    }
    //shuffle(list);
    var i=size-1;
    for (let [key, value] of Object.entries(file.points)) {
        value.priority=list[i--];
    }
}
function sortByPriority(){

}

function printClusters(){
    for(let [key, value] of Object.entries(clusters)){
        console.log(key+"\n");
        for(let [k,v] of Object.entries(value)){
            console.log(v.name);
        }
    }
}
function tester(){
    var p1 = file.points["1"];
    p1.name="changed";
}
//addPriority();
cluster();
//tester();
printClusters();
//console.log(getpointDetails());