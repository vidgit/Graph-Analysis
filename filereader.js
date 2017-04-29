var file={
    "Name":"Title",
    "latS": "58 N",
    "latE": "58.5 N",
    "lonS": "83 E",
    "lonE": "83.5 E",
    "points":{
        "1":{
            "name":"a",
            "lat":12,
            "long":12,
            "isClustered":false,
            "isClusterhead":false,
            "clusterNo":-1,
             "edges":[]
        },
        "2":{
            "name":"b",
            "lat":168,
            "long":1,
            "isClustered":false,
            "isClusterhead":false,
            "clusterNo":-1,
             "edges":[]
        },
        "3":{
            "name":"c",
            "lat":69,
            "long":41,
            "isClustered":false,
            "isClusterhead":false,
            "clusterNo":-1,
             "edges":[]
        },
        "4":{
            "name":"d",
            "lat":43,
            "long":32,
            "isClustered":false,
            "isClusterhead":false,
            "clusterNo":-1,
             "edges":[]
        },
        "5":{
            "name":"e",
            "lat":44,
            "long":21,
            "isClustered":false,
            "isClusterhead":false,
            "clusterNo":-1,
             "edges":[]
        },
        "6":{
            "name":"f",
            "lat":84,
            "long":69,
            "isClustered":false,
            "isClusterhead":false,
            "clusterNo":-1,
             "edges":[]
        }
    }
}

function getName(){
    console.log(file.Name);
    return file.Name;
}

function getlatS(){
    console.log(file.latS);
    return file.latS;
}
function getlatE(){
    console.log(file.latE);
    return file.latE;
}
function getlonS(){
    console.log(file.lonS);
    return file.lonS;
}
function getlonE(){
    console.log(file.lonE);
    return file.lonE;
}

function getpoints(){
    console.log(file.points);
    return file.points;
}

function getpointDetails(){
    var s="";
    for (let [key, value] of Object.entries(file.points)) { 
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




function getEdges(p1){
    var s="";
    for (let [key, value] of Object.entries(file.points)) {
        if(key==p1){
            for (let [k, v] of Object.entries(value.edges)) {
                s+=k+":"+v+",\n";
                }
            }
        }
    return s;
}
//alert(getpointDetails());



//console.log(getEdges("1"));

