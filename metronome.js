function addTimer(x,y,timerType)
{
    let body = Matter.Bodies.rectangle(x,y,timerW,timerH,{
        isStatic: true,
        isSensor: true
    });

    body.tag = timerType;

    let mod;
    if(timerType[1] == 1) { mod = 1; }
    if(timerType[1] == 2) { mod = 2; }
    if(timerType[1] == 3) { mod = 3; }
    if(timerType[1] == 4) { mod = 4; }

    if(timersOn) { Matter.Composite.add(engine.world, [addBall(x,y)]); }
    thisTimer = setInterval(function () {   
        Matter.Composite.add(engine.world, [addBall(x,y)]);
    }, tempo*mod);
    if(!timersOn) { clearInterval(thisTimer); }
    timers.push([thisTimer,x,y,mod]);


    Matter.Body.rotate(body, activeDeg * Math.PI / 180);
    return body;

}


function syncTimers() {
    timersOn = !timersOn
    
    if(timersOn)
    {
        document.getElementById('sync').innerHTML = 'Pause';
        if(timers.length != 0)
        {
            for(let ti = 0; ti < timers.length; ti++)
            {
                clearInterval(timers[ti][0]);
                if(timers[ti][0] != null)
                {
                    Matter.Composite.add(engine.world, [addBall(timers[ti][1],timers[ti][2])]);
                    t = setInterval(function () {   
                        Matter.Composite.add(engine.world, [addBall(timers[ti][1],timers[ti][2])]);
                    }, tempo*timers[ti][3]);
                    timers[ti][0] = t;
                }
            }   
        }       
    }
    else
    {
        document.getElementById('sync').innerHTML = 'Play';
        if(timers.length != 0)
            {
                for(let ti = 0; ti < timers.length; ti++)
                {
                    clearInterval(timers[ti][0]);
                    // t = setInterval(function () {   
                    //     Matter.Composite.add(engine.world, [addBall(timers[ti][1],timers[ti][2])]);
                    // }, tempo);
                    // timers[ti][0] = t;
                }   
            }  
    }

    //add a ball every X seconds in the given spot
}


function changeTempo()
{  
    
    timersOn = true;
    syncTimers();
    if(document.getElementById('tempo').value <= 400)
    {
        tempo = (60/document.getElementById('tempo').value)*1000;
    }
    else
    {
        document.getElementById('tempo').value = 400;
        tempo = (60/document.getElementById('tempo').value)*1000;
    }

}