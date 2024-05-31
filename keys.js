window.addEventListener("keydown", (event) => {

    // if(event.key === '+') { } //SAVE

    if(event.key === 's' || event.key === 'S') { toggleTransparency(false); }
    if(event.key === 't' || event.key === 'T') { toggleTransparency(true); }


    if(event.key === 'w' || event.key === 'W') { toggleInstrument('w'); }
    if(event.key === 'm' || event.key === 'M') { toggleInstrument('m'); }
    if(event.key === 'p' || event.key === 'P') { toggleInstrument('p'); }
    if(event.key === 'C') { toggleType(instPrefix + '1')}
    if(event.key === 'D') { toggleType(instPrefix + '2')}
    if(event.key === 'E') { toggleType(instPrefix + '3')}
    if(event.key === 'F') { toggleType(instPrefix + '4')}
    if(event.key === 'G') { toggleType(instPrefix + '5')}
    if(event.key === 'A') { toggleType(instPrefix + '6')}
    if(event.key === 'B') { toggleType(instPrefix + '7')}
    if(event.key === 'c') { toggleType(instPrefix + '8')}
    if(event.key === 'd') { toggleType(instPrefix + '9')}
    if(event.key === 'e') { toggleType(instPrefix + '10')}
    if(event.key === 'f') { toggleType(instPrefix + '11')}
    if(event.key === 'g') { toggleType(instPrefix + '12')}
    if(event.key === 'a') { toggleType(instPrefix + '13')}
    if(event.key === 'b') { toggleType(instPrefix + '14')}
    if(event.code === 'Digit1') { toggleType('t1'); }
    if(event.code === 'Digit2') { toggleType('t2'); }
    if(event.code === 'Digit3') { toggleType('t3'); }
    if(event.code === 'Digit4') { toggleType('t4'); }

    if(event.key === 'z') { 
        undo();
    }

    if(event.code === 'Space') { 
        ballToggle = !ballToggle;
        if(ballToggle) { toggleType('ball'); }
        else { toggleType('eraser'); }
    }
    if(event.key === 'Backspace') { clearAll(); }
    if(event.key === 'Enter') { syncTimers(); }
    
    if(type[0] != 't' && type != 'eraser' && type != 'ball')
    {
        //left key pressed rotates box left
        if (event.key === 'ArrowLeft') { 
            if(activeDeg <= -90) 
            {
                activeDeg = -90; 
            }
            else { 
                if(event.shiftKey)
                { activeDeg -= 6; }
                else
                { activeDeg -= 1; }

            }
        }
        //right key pressed rotates box right
        else if (event.key === 'ArrowRight') {
            if(activeDeg >= 90) 
                {
                    activeDeg = 90; 
                }
                else { 
                    if(event.shiftKey)
                        { activeDeg += 6; }
                        else
                        { activeDeg += 1; }
                };
        }

        //up key makes box wider
        else if (event.key === 'ArrowUp')
        {
            if(boxW >= 100) 
            {
                boxW = 100; 
            }
            else { 
                if(event.shiftKey)
                    { boxW += 6; }
                    else
                    { boxW += 1; }
            }; 
        }
        //down key makes box narrower
        else if (event.key === 'ArrowDown')
            {
                if(boxW <= 10) 
                {
                    boxW = 10; 
                }
                else { 
                    if(event.shiftKey)
                        { boxW -= 6; }
                        else
                        { boxW -= 1; }
                }; 
            }

    }

    // document.getElementById('angle').innerHTML = 'Angle: ' + activeDeg;
    // document.getElementById('width').innerHTML = 'Width: ' + boxW;
  });