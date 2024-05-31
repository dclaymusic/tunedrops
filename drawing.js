const renderVertices = body => {

    //draw the overlay shape
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    if(body.isTransparent)
    { ctx.setLineDash([3, 3]);/*dashes are 5px and spaces are 3px*/ }
    else { ctx.setLineDash([3, 0]);/*dashes are 5px and spaces are 3px*/ }
    ctx.beginPath();
    body.vertices.forEach(({x, y}) => ctx.lineTo(x, y));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    //if it's not a ball
    if(body.label != 'Circle Body')
    {
        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.translate(-body.position.x, -body.position.y);
        if(body.tag[0] == 't') { ctx.fillStyle = 'white'; }
        else { ctx.fillStyle = 'black'; }        
        ctx.textBaseline = 'middle';
        ctx.font = font;
        ctx.textAlign = 'center'
        ctx.fillText(text[body.tag],body.position.x,body.position.y);
        // ctx.strokeText(text[body.tag],body.position.x,body.position.y);
        // let thisImg = images[body.tag];
        // ctx.drawImage(thisImg, body.position.x-(boxW/2), body.position.y-(boxH/2), boxW, boxH);
        ctx.restore();
    }


};

function frameRate()
{
    ////////////frame rate check
    ctx.fillStyle = "#ff0000";
    ctx.font = "10px Andale Mono";
    ctx.textAlign = "start";
    ctx.fillText("FPS: " + framesLastSecond, 10, 20);
}


function arrowInstructions()
{
    ////////////frame rate check
    ctx.fillStyle = "#000000";
    ctx.font = "12px Andale Mono";
    //instructions
    ctx.textAlign = "right";
    ctx.fillText("UP and DOWN arrow keys change the width of platform.",document.getElementById('canvas').width-20,document.getElementById('canvas').height-60);
    ctx.fillText("RIGHT and LEFT arrow keys adjust the angle of platform.",document.getElementById('canvas').width-20,document.getElementById('canvas').height-40);
    ctx.fillText("Hold SHIFT while pressing arrow key for faster adjustments.",document.getElementById('canvas').width-20,document.getElementById('canvas').height-20);

    //instructions
    ctx.textAlign = "left";
    ctx.fillText("Width: "+boxW,20,document.getElementById('canvas').height-40);
    ctx.fillText("Angle: "+activeDeg,20,document.getElementById('canvas').height-20);
    
}

function drawGridlines()
{
    ctx.setLineDash([3, 0]);
    for(let x = 0; x < document.getElementById('canvas').width; x += gridSize)
    {
        ctx.lineWidth = 0.1;
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x, document.getElementById('canvas').height);

        // Draw the Path
        ctx.stroke();
    }
    for(let y = 0; y < document.getElementById('canvas').height; y += gridSize)
    {
        ctx.lineWidth = 0.1;
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(document.getElementById('canvas').width,y);

        // Draw the Path
        ctx.stroke();
    }
}


function findColor(input)
{
    let c = [];

    if(input.tag == 'w1' || input.tag == 'w8') { c = colors[0]; }
    if(input.tag == 'w2' || input.tag == 'w9') { c = colors[1]; }
    if(input.tag == 'w3' || input.tag == 'w10') { c = colors[2]; }
    if(input.tag == 'w4' || input.tag == 'w11') { c = colors[3]; }
    if(input.tag == 'w5' || input.tag == 'w12') { c = colors[4]; }
    if(input.tag == 'w6' || input.tag == 'w13') { c = colors[5]; }
    if(input.tag == 'w7' || input.tag == 'w14') { c = colors[6]; }

    if(input.tag == 'm1' || input.tag == 'm8') { c = colors[0]; }
    if(input.tag == 'm2' || input.tag == 'm9') { c = colors[1]; }
    if(input.tag == 'm3' || input.tag == 'm10') { c = colors[2]; }
    if(input.tag == 'm4' || input.tag == 'm11') { c = colors[3]; }
    if(input.tag == 'm5' || input.tag == 'm12') { c = colors[4]; }
    if(input.tag == 'm6' || input.tag == 'm13') { c = colors[5]; }
    if(input.tag == 'm7' || input.tag == 'm14') { c = colors[6]; }

    if(input.tag == 'p1' || input.tag == 'p8') { c = colors[0]; }
    if(input.tag == 'p2' || input.tag == 'p9') { c = colors[1]; }
    if(input.tag == 'p3' || input.tag == 'p10') { c = colors[2]; }
    if(input.tag == 'p4' || input.tag == 'p11') { c = colors[3]; }
    if(input.tag == 'p5' || input.tag == 'p12') { c = colors[4]; }
    if(input.tag == 'p6' || input.tag == 'p13') { c = colors[5]; }
    if(input.tag == 'p7' || input.tag == 'p14') { c = colors[6]; }

    return c;
}

function drawCheckerboard() {

    let checkSize = 5;
    let startX = 100;
    let startY = 100;

    for (let i = startX; i < startX+boxW; i+=checkSize) {
        for (let j = startY; j < startY+boxH; j+=checkSize) 
        {
            if((i%2 == 0 && j%2 == 0) || (i%2 == 1 && j%2 == 1))
                { ctx.fillStyle = 'rgba(0,0,0,0.5)'; }
            else { ctx.fillStyle = 'rgba(255,255,255,0.5'; }
            ctx.fillRect(i,j,checkSize,checkSize);
        }
    }
}

function buttonColors()
{
    let prefixes = ['w','m','p'];
    for(let i = 1; i < 15; i++)
    {
        for(let j = 0; j < prefixes.length; j++)
        {
            let el = document.getElementById(`${prefixes[j]}${i}`);
            let mod;
            if(i > 7) { mod = 8; } else { mod = 1; }
            let r = colors[i-mod][1][0];
            let g = colors[i-mod][1][1];
            let b = colors[i-mod][1][2];
            el.style.backgroundColor = `rgb(${r},${g},${b})`;
        }
    }
}

// function loadImages()
// {

//     let prefixes = ['w','m','p'];
//     for(let i = 1; i < 15; i++)
//     {
//         for(let j = 0; j < prefixes.length; j++)
//         {
//             images[`${prefixes[j]}${i}`] = new Image(100,20);
//             images[`${prefixes[j]}${i}`].src = `img/${prefixes[j]}${i}.png`
//         }
//     }
// }