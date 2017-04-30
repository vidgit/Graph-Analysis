
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

