
// Create new wheel object specifying the parameters at creation time.
theWheel = new Winwheel({
'numSegments'  : 10,     // Specify number of segments.
'outerRadius'  : 212,   // Set outer radius so wheel fits inside the background.
'textFontSize' : 25,    // Set font size as desired.
'segments'     :        // Define segments including colour and text.
// ["Entertainment", "Geography", "Mathematics", "Sports", "Technology", "Ruby", "HTML", "jQuery", "CSS", "JavaScript"]
[
   {'fillStyle' : '#eae56f', 'text' : "Entertainment"},
   {'fillStyle' : '#89f26e', 'text' : "Geography"},
   {'fillStyle' : '#7de6ef', 'text' : "Mathematics"},
   {'fillStyle' : '#e7706f', 'text' : "Sports"},
   {'fillStyle' : '#eae56f', 'text' : "Technology"},
   {'fillStyle' : '#89f26e', 'text' : "Ruby"},
   {'fillStyle' : '#7de6ef', 'text' : "HTML"},
   {'fillStyle' : '#e7706f', 'text' : "jQuery"},
   {'fillStyle' : '#7de6ef', 'text' : "CSS"},
   {'fillStyle' : '#e7706f', 'text' : "JavaScript"}
],
'animation' :         // Specify the animation to use.
{
    'type'     : 'spinToStop',
    'duration' : 5,     // Duration in seconds.
    'spins'    : 8,     // Number of complete spins.
    'callbackFinished' : 'alertTopic()'
}
});

// Vars used by the code in this page to do power controls.
var wheelPower    = 0;
var wheelSpinning = false;

// -------------------------------------------------------
// Function to handle the onClick on the power buttons.
// -------------------------------------------------------
function powerSelected(powerLevel)
{
// Ensure that power can't be changed while wheel is spinning.
if (wheelSpinning == false)
{
    // Reset all to grey incase this is not the first time the user has selected the power.
    document.getElementById('pw1').className = "";
    document.getElementById('pw2').className = "";
    document.getElementById('pw3').className = "";

    // Now light up all cells below-and-including the one selected by changing the class.
    if (powerLevel >= 1)
    {
        document.getElementById('pw1').className = "pw1";
    }

    if (powerLevel >= 2)
    {
        document.getElementById('pw2').className = "pw2";
    }

    if (powerLevel >= 3)
    {
        document.getElementById('pw3').className = "pw3";
    }

    // Set wheelPower var used when spin button is clicked.
    wheelPower = powerLevel;

    // Light up the spin button by changing it's source image and adding a clickable class to it.
    // document.getElementById('spin_button').src = "spin_on.png";
    document.getElementById('spin_button').className = "clickable";
}
}

// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin()
{
// Ensure that spinning can't be clicked again while already running.
if (wheelSpinning == false)
{
    // Based on the power level selected adjust the number of spins for the wheel, the more times is has
    // to rotate with the duration of the animation the quicker the wheel spins.
    if (wheelPower == 1)
    {
        theWheel.animation.spins = 3;
    }
    else if (wheelPower == 2)
    {
        theWheel.animation.spins = 8;
    }
    else if (wheelPower == 3)
    {
        theWheel.animation.spins = 15;
    }

    // Disable the spin button so can't click again while wheel is spinning.
    // document.getElementById('spin_button').src       = "spin_off.png";
    document.getElementById('spin_button').className = "";

    // Begin the spin animation by calling startAnimation on the wheel object.
    theWheel.startAnimation();

    // Set to true so that power can't be changed and spin button re-enabled during
    // the current animation. The user will have to reset before spinning again.
    wheelSpinning = true;
}
}

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
function resetWheel()
{
theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
theWheel.draw();                // Call draw to render changes to the wheel.

document.getElementById('pw1').className = "";  // Remove all colours from the power level indicators.
document.getElementById('pw2').className = "";
document.getElementById('pw3').className = "";

wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
}

// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
// -------------------------------------------------------
Winwheel.prototype.alertTopic = function ()
{
    var winningSegment = theWheel.getIndicatedSegment().text;
    return winningSegment;
}

