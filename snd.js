let buffers = [];
let sounds = [];

for(let i = 1; i < 15; i++)
{
	sounds.push(`m${i}`);
	sounds.push(`p${i}`);
	sounds.push(`w${i}`);
	// sounds.push(`pp${i}`);
	
}

var numberOfSounds = sounds.length;
var soundInit = false;

function initSnd() 
{
	if(!soundInit)
	{
		// document.getElementById('loadtext').innerHTML = 'Sounds are loading...'
		soundInit = true;
		var AudioContext = window.AudioContext || window.webkitAudioContext;   
		audioCtx = new AudioContext();
	
		for(let i = 0; i < sounds.length; i++)
		{
			buffers[i] = null;
			loadSnd(i);
		}
		loading = setInterval(checkBuffers,10);
	}
}

function loadSnd(index) {
	const request = new XMLHttpRequest();
	request.open("GET", `./snd/${sounds[index]}.mp3`);
	request.responseType = "arraybuffer";
	request.onload = function() {
	let undecodedAudio = request.response;
	audioCtx.decodeAudioData(undecodedAudio, (data) => buffers[index] = data);
	};
	request.send();
};

function playSnd(index) {
	const source = audioCtx.createBufferSource();
	source.buffer = buffers[index];
	// const panNode = audioCtx.createStereoPanner();
	// panNode.pan.setValueAtTime(pan, audioCtx.currentTime);
	source.connect(audioCtx.destination);
	// panNode.connect(audioCtx.destination);
	source.start(audioCtx.currentTime); // play the source immediately
};

function selectSnd(i)
{
	for(let n = 0; n < sounds.length; n++)
	{
		if(sounds[n] == i)
		{
			loadSnd(n);
			playSnd(n);
		}
	}
	//random pan
	// let r = (Math.random() * 2) - 1;
}