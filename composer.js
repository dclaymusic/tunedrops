//MODE == 1
function composerHandler(x,y,w,h)
{
    if(x > 0 && y > 0 && y < w && y < h)
    {
        if(type == 'ball')
        {
            Matter.Composite.add(engine.world, [addBall(x,y)]);
            
        }
        else if(type == 'eraser')
        {
            logState();
            let b = mouseConstraint.body;
            if(b != null)
            { 
                Matter.Composite.remove(engine.world, b);
                if(b.tag[0] == 't') 
                {
                    for(let i = 0; i < timers.length; i++)
                    {
                        //clear timer here
                        
                        if( timers[i][0] != null && 
                            (mousePos[0] >= timers[i][1]-(timerW/2) &&
                            mousePos[0] <= timers[i][1]+(timerW/2)) &&
                            (mousePos[1] >= timers[i][2]-(timerH/2) &&
                            mousePos[1] <= timers[i][2]+(timerH/2)))
                        {
                            clearInterval(timers[i][0]);
                            timers[i][0] = null;
                        }
                    }
                }
            }



        }
        else if(type[0] == 't')
        {
            logState();
            Matter.Composite.add(engine.world, [addTimer(x,y,type)]); 
        }
        else
        {
            logState();
            Matter.Composite.add(engine.world, [addBox(x,y,type)]);
            selectSnd(type);
        }

    }
}