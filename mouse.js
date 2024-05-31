window.addEventListener('click', function(e) { clickHandler(e) });
window.addEventListener('mousemove', function(e) { mousePos = getHoverOver(e); });

//TILE-BASED VERSION: divide X and Y by tileW/tileH if needed, then multiply by tileW/tileH at "draw rect" function
    //PIXEL-BASED VERSION: x and y are not divided by tileW/tileH, and "draw rect" function has no tileW/tileH multiplier
    function clickHandler(event) 
    {
        // if(!soundInit)
        // {
        //     initSnd();
        // }
        // else if(!hasStarted && soundInit && allBuffersLoaded)
        // { 
        //     startGame();
        // }
        // else if(!hasStarted && !allBuffersLoaded && soundInit)
        // { }
        // else
        // {
        if(hasStarted && mouseOn)
        {
            
            let c = document.getElementById('canvas');
            const rect = c.getBoundingClientRect();
            var x = Math.floor(event.clientX - rect.left); // divide by a tileW if needed
            var y = Math.floor(event.clientY - rect.top); // divide by a tileH if needed
            // var x = Math.floor(((event.clientX - rect.left)) / tileW);
            // var y = Math.floor(((event.clientY - rect.top)) / tileH);
            // console.log(x,y);
            var w = c.width;
            var h = c.height;

            if(mode == 0) { challengeHandler(x,y,w,h); }
            if(mode == 1) { composerHandler(x,y,w,h); }

        }


            // if(x < 0) { x = 0; }
            // if(x > width / tileW) { x = width - tileW; }
            // if(y < 0) { y = 0; }
            // if(y > height / tileW) { y = height - tileH; }
            //console.log(x,y);
            //change bottom row
            // if(x >= 0 && x < mapW && y >= 0 && y < mapH)
            // {
            //     gameMap[toIndex(x,y)] = loadedSnd;
            // }
            
        // }
    }

    function addBox(x,y,tag) {

        let solidState;
        if(transparency) { solidState = true; }
        else { solidState = false; }

        let body = Matter.Bodies.rectangle(x,y,boxW,boxH,{
            isStatic: true,
            isSensor: solidState,
            // render: {
            //     sprite: {
            //       texture: `img/${tag}.png`,
            //       xScale: 2,
            //       yScale: 2
            //     }
            // }
        });
        // collisionRecord[body.id][0] = tag; //instrument tag here
        collisionRecord[body.id] = [];
        body.tag = tag;
        body.width = boxW;
        body.height = boxH;
        body.isTransparent = solidState;

        let thisColor = findColor(body);
        
        // console.log(body);
        collisionRecord[body.id][1] = thisColor[1]; //impact gradient


        Matter.Body.rotate(body, activeDeg * Math.PI / 180);
        return body;
    }

   

    function addBall(x,y) {
        return Matter.Bodies.circle(x,y,circleR);
    }

    function clearAll()
    {
        logState();
        let allBodies = Matter.Composite.allBodies(engine.world);
        for(let i = 0; i < allBodies.length; i++)
        {
            Matter.Composite.remove(engine.world, allBodies[i]);
        }
        if(timers.length != 0)
        {
            for(let ti = 0; ti < timers.length; ti++)
            {
                clearInterval(timers[ti][0]);
                timers[ti][0] = null;
                // t = setInterval(function () {   
                //     Matter.Composite.add(engine.world, [addBall(timers[ti][1],timers[ti][2])]);
                // }, tempo);
                // timers[ti][0] = t;
            }   
        } 
    }

    function toggleType(i)
    {
        type = i;
        selectSnd(type);

        if(type[0] == 't') { 
            activeDeg = 0; 
            highlightToggle(['t1','t2','t3','t4']);
        }
        else
        { 
            // console.log(type);
            highlightToggle(['w1','w2','w3','w4','w5','w6','w7','w8','w9','w10','w11','w12','w13','w14','eraser','ball']);
            highlightToggle(['m1','m2','m3','m4','m5','m6','m7','m8','m9','m10','m11','m12','m13','m14','eraser','ball']);
            highlightToggle(['p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12','p13','p14','eraser','ball']);
        }

        



        if(type == 'eraser' || type == 'ball')
        {
            // document.getElementById('angle').style.visibility = 'hidden';
            // document.getElementById('width').style.visibility = 'hidden';
        }
        else
        {
                // document.getElementById('angle').style.visibility = 'visible';
                // document.getElementById('width').style.visibility = 'visible';
        }
    }

    function toggleTransparency(v) { 

        transparency = v; 
        if(transparency) {
            document.querySelector('#transparent').style.border ='2px solid rgba(0,0,0,0.7)';;
            document.querySelector('#solid').style.border = '2px solid transparent';
        } 
        else
        {
            document.querySelector('#solid').style.border = '2px solid rgba(0,0,0,0.7)';
            document.querySelector('#transparent').style.border = '2px solid transparent';  
        }
       

    }


    function toggleMode(m) {
        mode = m;
        document.querySelector('#startbutton').style.textAlign = 'center';
        if(mode == 0) { 
            document.querySelector('#challengebutton').style.border = '2px solid rgba(0,0,0,0.7)';;
            document.querySelector('#composerbutton').style.border = '2px solid transparent';
            document.querySelector('#modetext').innerHTML = 'Sorry, this mode does not exist yet. Soon!';
            document.querySelector('#startbutton').style.display = 'none';
        }
        if(mode == 1) { 
            document.querySelector('#challengebutton').style.border = '2px solid transparent';
            document.querySelector('#composerbutton').style.border = '2px solid rgba(0,0,0,0.7)';;
            document.querySelector('#modetext').innerHTML = 'Create your own musical tracks.';
            document.querySelector('#startbutton').style.display = 'inline-block';
        }

    }

    function toggleInstrument(i)
    {
        instPrefix = i;
        if(type != 'ball' && type != 'eraser' && type[0] != 't')
        {
            let firstDigit = type[1];
            let secondDigit = type[2];
            if(secondDigit == undefined && firstDigit == undefined) { toggleType(instPrefix + '1') }
            else if(secondDigit == undefined) { toggleType(instPrefix + firstDigit); }
            else { toggleType(instPrefix + firstDigit + secondDigit); }
            

            
        }

        let w = document.getElementById('woodbuttons');
        let m = document.getElementById('metalbuttons');
        let p = document.getElementById('percussionbuttons');
        if(i == 'w') { 
            w.style.display = 'flex';
            m.style.display = 'none';
            p.style.display = 'none';
        }
        if(i == 'm') { 
            w.style.display = 'none';
            m.style.display = 'flex';
            p.style.display = 'none';
        }
        if(i == 'p') { 
            w.style.display = 'none';
            m.style.display = 'none';
            p.style.display = 'flex';
        }

        //toggle
        let insts = ['w','m','p'];
        for(let i = 0; i < insts.length; i++)
        {
            if(insts[i] == instPrefix)
            {
                document.getElementById(insts[i]).style.border = '2px solid rgba(0,0,0,0.7)';
            }
            else
            {
                document.getElementById(insts[i]).style.border = '2px solid transparent';
            }
        }
    }


    function getHoverOver(event) {
        let c = document.getElementById('canvas');
        const rect = c.getBoundingClientRect();
        var x = Math.floor(event.clientX - rect.left); // divide by a tileW if needed
        var y = Math.floor(event.clientY - rect.top); // divide by a tileH if needed
        // var x = Math.floor(((event.clientX - rect.left)) / tileW);
        // var y = Math.floor(((event.clientY - rect.top)) / tileH);
        // document.getElementById('mouse').innerHTML = "Mouse: " + [x,y];
        return([x,y]);
    }

    function drawHoverOver(x,y) {

        ctx.fillStyle = 'rgba(0,0,0,0.3)'

        if(type != 'ball' && type != 'eraser')
        {
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            if(transparency && type[0] != 't')
            { ctx.setLineDash([3, 3]); }
            else { ctx.setLineDash([4, 0]); }
        
            ctx.save();

            // draw your object
            let bW = boxW; bH = boxH
            if(type[0] == 't') { bW = timerW; bH = timerH; }
            ctx.translate(mousePos[0], mousePos[1]);
            ctx.rotate(activeDeg * Math.PI / 180);
            ctx.translate(-mousePos[0], -mousePos[1]);
            ctx.fillRect(x-(bW/2),y-(bH/2),bW,bH);
            ctx.strokeRect(x-(bW/2),y-(bH/2),bW,bH);
            // draw text
            if(type[0]=='t') { ctx.fillStyle = 'white'; }
            else { ctx.fillStyle = 'black'; }
            ctx.textBaseline = 'middle';
            ctx.font = font;
            ctx.textAlign = 'center'
            ctx.fillText(text[type],mousePos[0],mousePos[1]);

            ctx.restore();           
        }
        else if(type == 'ball')
        {
            //draw the overlay shape
            ctx.beginPath();
            ctx.arc(mousePos[0], mousePos[1], circleR, 0, 2 * Math.PI);
            ctx.fill();
        }

    }
