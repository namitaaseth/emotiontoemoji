var prediction1 = ""
var prediction2 = ""
Webcam.set({
    width: 350,
    height: 300,
    image_format:'jpg',
    jpg_quality:800
});
Webcam.attach('#camera')
function captureimg(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='capturedimg' src="+data_uri+">"
    });
}
console.log("ml5 version:", ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/SKdyukP6K/model.json", modelloaded);
function modelloaded(){
    console.log("model is loaded")
}
function speak(){
    var synth= window.speechSynthesis;
    speak_data1="The first prediction is "+prediction1
    speak_data2="And the second prediction is "+prediction2
    var utterthis= new SpeechSynthesisUtterance(speak_data1+speak_data2)
    synth.speak(utterthis)
}
function predict(){
    img = document.getElementById("capturedimg")
    classifier.classify(img, gotresult)
}
function gotresult(error,result){
    if (error){
        console.log(error)
    }
    else {
        console.log(result)
        document.getElementById("result_emotion_name").innerHTML=result[0].label;
        document.getElementById("result_emotion_name2").innerHTML=result[1].label;
        prediction1= result[0].label
        prediction2= result[1].label
        console.log(prediction1)
        if (result[0].label=="Happy"){
            document.getElementById("update_emoji").innerHTML="&#128512;"
        }
        if (result[0].label=="Surprised"){
            document.getElementById("update_emoji").innerHTML="&#x1F62E;"
        }
        if (result[0].label=="Angry"){
            document.getElementById("update_emoji").innerHTML="&#128545;"
        }
        if (result[1].label=="Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128512;"
        }
        if (result[1].label=="Surprised"){
            document.getElementById("update_emoji2").innerHTML="&#x1F62E;"
        }
        if (result[1].label=="Angry"){
            document.getElementById("update_emoji2").innerHTML="&#128545;"
        }
        speak()
    }
}