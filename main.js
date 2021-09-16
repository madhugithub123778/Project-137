status = "";
objects = [];

function setup(){
c1 = createCanvas(550, 470);
c1.center();
v1 = createCapture(VIDEO);
v1.hide();
}

function draw(){
image (v1, 0, 0, 550, 470);

if (status != ""){
model.detect(v1, gotResult);

for (i=0;i<objects.length;i++){
document.getElementById("status_val").innerHTML = "Objects Detected";
acc = floor(objects[i].confidence * 100);
fill ("navy");
text (objects[i].label + " "+ acc + "%", objects[i].x, objects[i].y);
noFill();
stroke ("navy");
rect (objects[i].x, objects[i].y, objects[i].width, objects[i].height);
if (objects[i].label == obj_name){
v1.pause();
model.detect(gotResult);
document.getElementById("detec_status").innerHTML = obj_name + " is detected";
sound = window.speechSynthesis;
say = new SpeechSynthesisUtterance(obj_name + "is found");
sound.speak(say);
obj_name = "is found";
}

else if ((objects[i].label != obj_name)&& (obj_name != "is found")&& (obj_name == "is not found")&& (objects.length == 0)){
document.getElementById("detec_status").innerHTML = obj_name + " is NOT FOUND";

sound = window.speechSynthesis;
say = new SpeechSynthesisUtterance(obj_name + "is not found");
sound.speak(say);
obj_name = "is not found";
}





}
}
}

function gotResult(error, results){
if (error){
console.error(error);  
}
else{
console.log(results);
objects = results;}}

function start(){
model = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status_val").innerHTML = "Detecting Objects";
obj_name = document.getElementById("object_name").value;
}

function modelLoaded(){
console.log("Model has Loaded!!");
status = true;



}