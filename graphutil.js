var radius = 15000;
var points=[];
var size = Object.keys(points).length;
var edges=[];
var clusterHeads=[];
var clusters=[];
var ring=[];
var adj={};
var once=[];
var twice=[];
function cluster(){
    //addPriority()
    //alert(Object.keys(points));
    _cluster();
}

function _cluster(){
    //sortByPriority();
    //pick highest
    //start adding edges if distance between the points is less than radius.
    //and skip the points which have been clustered.
    var clusterNumber=0;
    var keys = Object.keys(points);
    for (let [key, value] of Object.entries(points)) {
        //alert(value.isClustered);
        if(value.isClustered){
            continue;
        }
        value.isClustered=true;
        //alert(value.isClustered);
        value.isClusterhead=true;
        value.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
        clusterHeads.push(value);
        var newClus=[];
        newClus.push(value);
        value.clusterNo=value.name;
        for(var i=Object.keys(points).length-1;i>=0;i--){
            var curr=points[keys[i]];
            if(curr.isClustered)
                continue;
            var dis=getDistance(curr,value);
            //alert(dis);
            if(dis<=radius)
            {
                pushEdge(value,curr,dis);
                points[keys[i]].isClustered=true;
                points[keys[i]].clusterNo=value.name;
                newClus.push(curr);
            }
        }
        clusters.push(newClus);
        console.log(getpointDetails());
        printClusters();
    }
    
}

function overlay(){
    var cls=clusterHeads.slice(0);
    cls=shuffle(cls);
    cls.push(cls[0]);
    var s="Path:  ";
    for(var i=0;i<cls.length;i++){
        s+=cls[i].name+"  ";
    }
    console.log(s);
    buildAdj();
    var queue=[];
    var keys = Object.keys(clusterHeads);
    //graph = new Graph(adj);
    //console.log(graph.findShortestPath("1", "2"));
    var visited=[];
    //alert("!!"+clusterHeads[keys[0]].name);
    queue.push({"point":clusterHeads[keys[0]].name,"path":[],"dis":0});
    var pathMode=1;
    if(pathMode==1){
        //var path=[];
        console.log("Path Finder");
        while(queue.length>0){
            queue.sort(function(p,q){
                return p.dis-q.dis;
            })
            for(let [k,v] of Object.entries(queue)){
                console.log(k+":"+"point"+v.point+" path"+v.path+" dis:"+ v.dis);
            }

            var curr=queue[0].point;
            var path=queue[0].path;
            var dis=queue[0].dis;
            console.log("Current Node"+ curr+" Path"+ path+" distance:" +dis);
            if(curr==clusterHeads[keys[keys.length-1]].name){
                console.log("GOAL FOUND");
                console.log("Path cost:"+dis);
                path.push(curr);
                printPath(path);
                break;
            }
            visited.push(curr);
            queue.splice(0,1);
            //alert(Object.keys(adj));
            //alert(curr);
            //alert(Object.keys(adj)[0]);
            var a=adj[String(curr)];
            for(let [k,v] of Object.entries(a)){
                console.log(k+" : "+v);
                if(visited.indexOf(k)==-1){
                    var pth=path.slice(0);
                    pth.push(curr);
                    queue.push({"point":k,"path":pth,"dis":dis+parseFloat(v)});
                    console.log("Point Loaded");
                    console.log({"point":k,"path":pth,"dis":dis+parseFloat(v)});
                }

            }
        }
    }
    else{
        console.log("Path Finder");
        while(queue.length>0){
            for(let [k,v] of Object.entries(queue)){
                console.log(k+":"+"point"+v.point+" path"+v.path+" dis:"+ v.dis);
            }

            var curr=queue[0].point;
            var path=queue[0].path;
            var dis=queue[0].dis;
            console.log("Current Node"+ curr+" Path"+ path+" distance:" +dis);
            if(curr==clusterHeads[keys[keys.length-1]].name){
                console.log("GOAL FOUND");
                console.log("Path cost:"+dis);
                path.push(curr);
                printPath(path);
                break;
            }
            visited.push(curr);
            queue.splice(0,1);
            //alert(Object.keys(adj));
            //alert(curr);
            //alert(Object.keys(adj)[0]);
            var a=adj[String(curr)];
            for(let [k,v] of Object.entries(a)){
                console.log(k+" : "+v);
                if(visited.indexOf(k)==-1){
                    var pth=path.slice(0);
                    pth.push(curr);
                    queue.push({"point":k,"path":pth,"dis":dis+parseFloat(v)});
                    console.log("Point Loaded");
                    console.log({"point":k,"path":pth,"dis":dis+parseFloat(v)});
                }

            }
        }
    }
}
function printPath(path){
    console.log("Path");
    for(var i=0;i<path.length;i++){
        console.log(path[i]);
    }
}

function buildAdj(){
    var keys = Object.keys(clusterHeads);
    var a={};
    for(var i=0;i<keys.length;i++){
        a={};
        var x=0;
        if(i==0){
            x=1;
        }
        for(var k=0;k<keys.length-x;k++){
            //alert(clusterHeads[keys[k]].name);
            var name=clusterHeads[keys[k]].name;
            a[name] = getDistance(clusterHeads[keys[i]],clusterHeads[keys[k]]);
        }
        var nm=clusterHeads[keys[i]].name;
        adj[nm]=a;        
    }
    //console.log(adj);
    /*var c=1;
    for(let [key, value] of Object.entries(adj)){
        var s=c++ + "Line\n";
        for(let [k,v] of Object.entries(value)){
            s+=v+"  ";
        }
        console.log(s);
    }
    */
   for(let [k,v] of Object.entries(adj)){
        console.log(k+": ADJ\n");
        for(let [k1,v1] of Object.entries(v)){
            console.log(k1+":"+v1);
        }
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
    createLine(p1,p2);
    //calculateAndDisplayRoute(p1,p2);
    //console.log(edges);
}

function distance(p1,p2){
    //alert(file.points);
    var x1,x2,y1,y2;
    for (let [key, value] of Object.entries(points)) {
    
        if(value==p1){
            x1=value.lat;
            y1=value.long;
        }
         if(value==p2){
            x2=value.lat;
            y2=value.long;
        }
    }

    return Math.sqrt(Math.pow((x1-x2)*111,2)-Math.pow((y1-y2),2));

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
    for (let [key, value] of Object.entries(points)) {
        value.priority=list[i--];
    }
}
function sortByPriority(){

}

function printClusters(){
    for(let [key, value] of Object.entries(clusters)){
        console.log("Cluster No:"+key+"\n");
        for(let [k,v] of Object.entries(value)){
            console.log(v.name);
        }
    }
}
function tester(){
    var p1 = points["1"];
    p1.name="changed";
}
//addPriority();
//cluster();
//tester();
//printClusters();
function getpointDetails(){
    var s="";
    //alert("here");
    for (let [key, value] of Object.entries(points)) { 
        s+=key+": {\n";
        for(let [k,v] of Object.entries(value)){
            if(k=="edges"){
                s+="edges:{\n";
                for(let [k1,v1] of Object.entries(value.edges)){
                    s+=k1+":"+v1+",\n";
                }
                s+="}\n";
            }
            else
            s+=k+" : "+v+",\n";
        }
        s+="}\n";
    }
    return s;
}
//console.log(getpointDetails());
function rad(x) {
  //alert(x+":" +(x * Math.PI / 180));
  return x * Math.PI / 180;
};

function getDistance(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.long - p1.long);
  //alert(Math.sin(dLat / 2)+"*"+ Math.sin(dLat / 2) +" + "+Math.cos(rad(p1.lat))+" * "+Math.cos(rad(p2.lat))+" * "+Math.sin(dLong / 2)+"*"+Math.sin(dLong / 2));
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};