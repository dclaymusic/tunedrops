function startGame() { 

    if(!soundInit && !allBuffersLoaded && mode == null) { 
        initSnd(); 
        document.querySelector('#loadtext').innerHTML = 'Sounds are loading...';
    }
    else if(soundInit && !allBuffersLoaded && mode == null) {}
    else if(soundInit && allBuffersLoaded && mode != null) {

    }
}

function checkBuffers()
{
    let buffCount = 0;
    for(let i = 0; i < sounds.length; i++)
    {
        if(buffers[i] != null) { buffCount++; }
    }
    if(buffCount == numberOfSounds) {  
        allBuffersLoaded = true; 
        if(allBuffersLoaded) { 
			document.getElementById('modeselect').style.display = 'block';
            document.getElementById('loadtext').innerHTML = 'Select a mode to begin.'
			clearInterval(loading);
        }
    }
}

function toPlayScreen() {
    document.querySelector('#loadscreen').style.display = 'none';
    document.querySelector('#left').style.display = 'flex';
    document.querySelector('#canvas').style.display = 'flex';
    hasStarted = true;
    setTimeout(() => {
        mouseOn = true;
    }, 100);
    if(mode == 0) { 
        //puzzle mode - hide necessary buttons
    }
    if(mode == 1) { 
        //free play - show all buttons
    }
}

function highlightToggle(arr)
{
    for(let i = 0; i < arr.length; i++)
    {
        if(type == arr[i])
        {
            document.getElementById(arr[i]).style.border = '2px solid rgba(0,0,0,0.7)';;
        }
        else
        {
            document.getElementById(arr[i]).style.border = '2px solid transparent';
        }
    }
}