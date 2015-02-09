#pragma strict

public var GameTileType:GameObject;

private var edge = 32;
private var top = -(96+edge);
private var left = 32+edge;
private var bottom = -(450+edge);
private var right = (353+edge);
private var rows = 5;
private var columns = 5;

private var spawnPoints: Array = new Array();
private var spawnPointsLine: Array = new Array();
private function buildSpawnPoints () {
	var rowInterval = Mathf.Abs((right - left) / rows);
	var colInterval = Mathf.Abs((bottom - top) / columns);
	for( var i = 0; i < rows; ++i ) {
		spawnPoints.Push(new Array());
		for (var k = 0; k < columns; ++k) {
			var point = new Vector3(left + rowInterval * i, top - colInterval * k, -2);
			var a:Array = spawnPoints[i] as Array;
			a.Push(point);
			spawnPointsLine.Push(point);
		}
	}
}

private function spawnNewSet() {
	for (var i = 0; i < spawnPointsLine.length; ++i ) {
		var point:Vector3 = spawnPointsLine[i];
		var copy:GameObject = GameObject.Instantiate(GameTileType, point, Quaternion.identity);
		var textTrans:Transform = copy.transform.FindChild("ScaleContainer/Canvas/Text");
 		var text:UI.Text = textTrans.GetComponent(UI.Text) as UI.Text;
		text.text = "" + Mathf.Round(Random.value * 10);
	}
}
function Start () {
	Random.seed = 100;
	buildSpawnPoints();
	spawnNewSet();	
}

function Update () {
	CheckInput();
}

var platform : RuntimePlatform = Application.platform;
var mouseOneDown:boolean = false;
function CheckInput() {
	//if (platform == RuntimePlatform.Android || platform == RuntimePlatform.IPhonePlayer){
		if (Input.touchCount > 0) {
			var phase = Input.GetTouch(0).phase;
			if ( phase == TouchPhase.Began){
				checkTouch(Input.GetTouch(0).position, "begin");
			} else if ( phase == TouchPhase.Ended ) {
				checkTouch(Input.GetTouch(0).position, "end");
			} else if ( phase == TouchPhase.Moved ) {
				checkTouch(Input.GetTouch(0).position, "drag");
			}
		}
	//} else if (platform == RuntimePlatform.WindowsEditor){
	//	Debug.Log("mouse input");
		if (Input.GetMouseButton(0)) {
			if (!mouseOneDown) {
				Debug.Log("mouse input down");
				checkTouch(Input.mousePosition, "begin");
			} else {
				if (Input.GetAxis("Mouse X") || Input.GetAxis("Mouse Y")) {
					Debug.Log("mouse moved Y");
					checkTouch(Input.mousePosition, "drag");
				}
			}
			mouseOneDown = true;
		} else {
			mouseOneDown = false;
		}
	//} else {
	//RuntimePlatform.
	//	Debug.Log("platform = " + platform);
	//}
}
function checkTouch(pos, type) {
	var wp : Vector3 = Camera.main.ScreenToWorldPoint(pos);
	var touchPos : Vector2 = new Vector2(wp.x, wp.y);
	var hit = Physics2D.OverlapPoint(touchPos);
	if (hit) {
		Debug.Log(hit.transform.gameObject.name);
		hit.transform.gameObject.SendMessage('handleInput',type,SendMessageOptions.DontRequireReceiver);
	}
}