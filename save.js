
function undo()
{
  
    if(pastState.length > 0)
    {

        timersOn = true;
        syncTimers(); 

        //remove current state
        let oldBodies = Matter.Composite.allBodies(engine.world);
        for(let i = 0; i < oldBodies.length; i++)
        {
            Matter.Composite.remove(
                engine.world, [oldBodies[i]]
            ); 
        }

        if(timers.length != 0)
        {
            for(let ti = 0; ti < timers.length; ti++)
            {
                clearInterval(timers[ti][0]);
                timers[ti][0] = null;
            }   
        } 
        timers = [];

        let pastActiveDeg = activeDeg; //for cursor hoverover to stay same
        let pastBoxW = boxW;
        let pastBoxH = boxH;

        //re-write past state
        let newBodies = pastState[pastState.length-1];
        for(let i = 0; i < newBodies.length; i++)
        {
            if(newBodies[i].label != 'Circle Body')
            {
                if(newBodies[i].tag[0] == 't')
                {
                    activeDeg = newBodies[i].angle * 180 / Math.PI;
                    Matter.Composite.add(engine.world, [addTimer(newBodies[i].position.x,newBodies[i].position.y,newBodies[i].tag)]); 
                }
                else
                {
                    boxW = newBodies[i].width;
                    boxH = newBodies[i].height;
                    if(newBodies[i].isSensor == true) { transparency = true; }
                    else { transparency = false; }
                    activeDeg = newBodies[i].angle * 180 / Math.PI;
                    Matter.Composite.add(engine.world, [addBox(newBodies[i].position.x,newBodies[i].position.y,newBodies[i].tag)]);
                }  
            }
        }  
        
        activeDeg = pastActiveDeg; //for cursor hoverover to stay same
        boxW = pastBoxW;
        boxH = pastBoxH;

        pastState.pop();

    }
}

function logState()
{
    let allBodies = Matter.Composite.allBodies(engine.world);
    pastState.push(allBodies);
}

function saveState(name)
{
        let allBodies = Matter.Composite.allBodies(engine.world);
        savedStates[name] = {};
        savedStates[name].bodies = allBodies;
        savedStates[name].tempo = tempo;

        // navigator.clipboard.writeText(saveFile);
        // savedStates[name].timers = timers;
        // console.log(savedStates[name]);
}

function loadState(name)
{
    if(savedStates[name] != undefined)
    {

        timersOn = true;
        syncTimers(); 

        //remove current state
        let oldBodies = Matter.Composite.allBodies(engine.world);
        if(oldBodies.length > 0)
        {
            for(let i = 0; i < oldBodies.length; i++)
                {
                    Matter.Composite.remove(
                        engine.world, [oldBodies[i]]
                    ); 
                }
        
                if(timers.length != 0)
                {
                    for(let ti = 0; ti < timers.length; ti++)
                    {
                        clearInterval(timers[ti][0]);
                        timers[ti][0] = null;
                    }   
                } 
                timers = [];
        }

        //re-write past state
        let newBodies = savedStates[name].bodies;
        tempo = newBodies.tempo;
        changeTempo();
        for(let i = 0; i < newBodies.length; i++)
        {
            if(newBodies[i].label != 'Circle Body')
            {
                if(newBodies[i].tag[0] == 't')
                {
                    activeDeg = newBodies[i].angle * 180 / Math.PI;
                    Matter.Composite.add(engine.world, [addTimer(newBodies[i].position.x,newBodies[i].position.y,newBodies[i].tag)]); 
                }
                else
                {
                    boxW = newBodies[i].width;
                    boxH = newBodies[i].height;
                    if(newBodies[i].isSensor == true) { transparency = true; }
                    else { transparency = false; }
                    activeDeg = newBodies[i].angle * 180 / Math.PI;
                    Matter.Composite.add(engine.world, [addBox(newBodies[i].position.x,newBodies[i].position.y,newBodies[i].tag)]);
                }  
            }
        }  

    }

}