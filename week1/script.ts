// Get a reference to the various HTML objects
const canvas = <HTMLCanvasElement> document.getElementById("DrawingCanvas");
const ctx = canvas.getContext("2d");
const colorInput = <HTMLInputElement> document.getElementById("colorInput"); 
const sizeInput = <HTMLInputElement> document.getElementById("sizeInput");

// Making a function to get the mouse position on the canvas
var getLocalMousePos = function(mouseEvent: MouseEvent){
    const canvasRect = canvas.getBoundingClientRect();
    return {x: mouseEvent.clientX - canvasRect.left, y: mouseEvent.clientY - canvasRect.top}
}

// Object for the tool variable
var brush = {
    position: {
        x: canvas.width/2,  
        y: canvas.height/2
    },                              // Starts in the center of the canvas for simplicity's sake
    lastPosition: {
        x: 0, 
        y: 0
    },                              // Last position to remove blank areas from moving the mouse too fast
    s: parseInt(sizeInput.value),   // Brush size
    c: "#000000",                   // Brush color
    down: false,                    // Bool for if the brush is drawing or not
    start: function(event: MouseEvent){
        // Drawing a circle in case the user just clicks without moving the mouse
        ctx!.beginPath();
        ctx!.fillStyle = brush.c;
        ctx!.arc(brush.position.x, brush.position.y, brush.s/2, 0, Math.PI*2)
        ctx!.fill();
        ctx!.closePath();

        // Setup the draw function to actually draw lines
        brush.down = true
        brush.lastPosition = getLocalMousePos(event); // <- used for drawing lines
    },
    stop: function(event: MouseEvent){brush.down = false},
    draw: function(event: MouseEvent){
        // Get the current x y position
        brush.position = getLocalMousePos(event);

        // Brush preview
        ctx!.beginPath();
        ctx!.strokeStyle = "black";
        ctx!.lineWidth = 2;
        ctx!.arc(brush.position.x, brush.position.y, brush.s/2, 0, Math.PI*2);
        ctx!.stroke();
        ctx!.closePath();

        // Draw a line from the last mouse position to the new one. Update lastPosition
        if (brush.down){
            ctx!.beginPath();
            ctx!.strokeStyle = brush.c;
            ctx!.lineWidth = brush.s;
            ctx!.moveTo(brush.lastPosition.x, brush.lastPosition.y);
            ctx!.lineTo(brush.position.x, brush.position.y);
            ctx!.stroke();
            ctx!.closePath();
            brush.lastPosition = brush.position;
        }

        // The line will reduce breaks when the mouse moves quickly across the canvas.
        // Now, circles will be drawn to keep up the line at large brush values
        if (brush.down){
            ctx!.beginPath();
            ctx!.fillStyle = brush.c;
            ctx!.arc(brush.position.x, brush.position.y, brush.s/2, 0, Math.PI*2)
            ctx!.fill();
            ctx!.closePath();
        }
    },
    // Change the color of the brush if the selector has been changed
    setColor: function(){
        var newColor = colorInput.value;
        if (newColor != brush.c){
            brush.c = newColor
        }
    },
    // Change the size of the brush if the selector has been changed
    setSize: function(){
        var newSize = parseInt(sizeInput.value);
        if (newSize != brush.s){
            brush.s = newSize;
        }
    }
};

// Canvas listeners
canvas.addEventListener("mousedown", brush.start);
canvas.addEventListener("mouseup", brush.stop);
canvas.addEventListener("mousemove", brush.draw);

// Listener for the color picker
document.addEventListener("click", () => {
    brush.setColor();
    brush.setSize();
});