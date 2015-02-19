#pragma strict

function Start () {
}

function Update () {
	UpdateMove();
}


private var startPoint:Vector3;
private var destinationPoint:Vector3;
private var moving = false;
// Movement speed in units/sec.
private var speed = 1.0;
// Time when the movement started.
private var startTime: float;
private var endTime: float;	
// Total distance between the markers.
private var journeyLength: float;
	
private var smooth = 5.0;
	
public function MoveTo(targetX:float, targetY:float, moveSpeed:float) {
	// Keep a note of the time the movement started.
	startTime = Time.time;
	speed = moveSpeed;
	startPoint = new Vector3(this.transform.position.x, this.transform.position.y, this.transform.position.z);
	destinationPoint = new Vector3(targetX, targetY, this.transform.position.z);
	// Calculate the journey length.
	journeyLength = Vector3.Distance(startPoint, destinationPoint);
	moving = true;
	endTime = startTime + (journeyLength / speed);	
}

// Follows the target position like with a spring
private function UpdateMove () {
	if (moving) {
		var now = Time.time;
		if (now > endTime) {
			transform.position = new Vector3(destinationPoint.x, destinationPoint.y, destinationPoint.z);
		} else {
			// Distance moved = time * speed.
			var distCovered = (Time.time - startTime) * speed;
			
			// Fraction of journey completed = current distance divided by total distance.
			var fracJourney = distCovered / journeyLength;
			
			// Set our position as a fraction of the distance between the markers.
			transform.position = Vector3.Lerp(startPoint, destinationPoint, fracJourney);
		}
	}
}
