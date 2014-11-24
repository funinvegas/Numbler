#pragma strict

function Start () {
	Screen.autorotateToLandscapeLeft = false;
	Screen.autorotateToPortrait = true;
	Screen.autorotateToLandscapeRight = false;
	Screen.autorotateToPortraitUpsideDown = true;
	Screen.orientation = ScreenOrientation.Portrait;
	Screen.SetResolution(320,640, true);
	Camera.main.orthographicSize = 320;
	Camera.main.transform.position = new Vector3(320/2, -640/2, -10);

}

function Update () {

}