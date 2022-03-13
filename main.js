song = "";
songg2 = "";

torf = "";
torf2 = "";

function preload()
{
	song = loadSound("music.mp3");
	songg2 = loadSound("t.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function draw() {
	image(video, 0, 0, 600, 500);

    turf = song.isPlaying();
	turf2 = songg2.isPlaying();


	fill("#FF0000");
	stroke("#FF0000");

	if(scoreRightWrist > 0.2){

      circle(rightWristX,rightWristY,30);

      songg2.stop();

	  if(turf == false){

		song.play();
		document.getElementById("volume").innerHTML = "THE NOISE'S NAME IS HARRY"

	  }

	}
	if(scoreLeftWrist > 0.2){

		circle(leftWristX,leftWristY,30);
  
		song.stop();
  
		if(turf2 == false){
  
		  songg2.play();
		  document.getElementById("volume").innerHTML = "THE NOISE'S NAME IS believer"
  
		}
  
	  }
}

function play()
{
	song.play()
	song.setVolume(1);
	song.rate(1);


	
}