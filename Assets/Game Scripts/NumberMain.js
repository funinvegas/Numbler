#pragma strict

// Unity scene input
public var GameTileType:GameObject;

// Grid layout
private var edge = 32;
private var top = -(96+edge);
private var left = 32+edge;
private var bottom = -(450+edge);
private var right = (353+edge);
private var rows = 5;
private var columns = 5;
private var rowInterval = Mathf.Abs((right - left) / rows);
private var colInterval = Mathf.Abs((bottom - top) / columns);

private var spawnPoints: Array = new Array();
private var spawnPointsLine: Array = new Array();
private function buildSpawnPoints () {
	for( var i = 0; i < rows; ++i ) {
		spawnPoints.Push(new Array());
		for (var k = 0; k < columns; ++k) {
			var a:Array = spawnPoints[i] as Array;
			var point = new Vector3(i,k,-2);
			a.Push(point);
			spawnPointsLine.Push(point);
		}
	}
}
private function spawnBlock(gridX, gridY) {
		var gridPoint = new Vector3(gridX, gridY, 1);
		var point = new Vector3(left + rowInterval * gridPoint.x, top - colInterval * gridPoint.y, -2);
		var copy:GameObject = GameObject.Instantiate(GameTileType, point, Quaternion.identity);
		(copy.GetComponent(GameBlock) as GameBlock).Initialize(this, gridPoint.x, gridPoint.y,  Mathf.Floor(1 + Random.value * 10));
}
private function spawnNewSet() {
	for (var i = 0; i < spawnPointsLine.length; ++i ) {
		var gridPoint:Vector3 = spawnPointsLine[i];
		spawnBlock(gridPoint.x, gridPoint.y);
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

private var platform : RuntimePlatform = Application.platform;
private var mouseOneDown:boolean = false;
private var lastHitObject:GameObject = null;

private function CheckInput() {
	var hitObject:GameObject = null;
	//if (platform == RuntimePlatform.Android || platform == RuntimePlatform.IPhonePlayer){
		if (Input.touchCount > 0 && !hitObject) {
			var phase = Input.GetTouch(0).phase;
			if ( phase == TouchPhase.Began){
				hitObject = checkTouch(Input.GetTouch(0).position, "begin");
			} else if ( phase == TouchPhase.Ended ) {
				hitObject = checkTouch(Input.GetTouch(0).position, "end");
			} else if ( phase == TouchPhase.Moved ) {
				hitObject = checkTouch(Input.GetTouch(0).position, "drag");
			}
		}
	//} else if (platform == RuntimePlatform.WindowsEditor){
	//	Debug.Log("mouse input");
		if (Input.GetMouseButton(0) && !hitObject) {
			if (!mouseOneDown) {
				hitObject = checkTouch(Input.mousePosition, "begin");
			} else {
				hitObject = lastHitObject;
				if (Input.GetAxis("Mouse X") || Input.GetAxis("Mouse Y")) {
					hitObject = checkTouch(Input.mousePosition, "drag");
				}
			}
			mouseOneDown = true;
		} else {
			if (mouseOneDown) {
				this.touchFinish();
			}
			mouseOneDown = false;
		}
		if (hitObject !== lastHitObject) {
			if (lastHitObject) {
				lastHitObject.SendMessage("handleInput", "done", SendMessageOptions.DontRequireReceiver);
			}
			lastHitObject = hitObject;
		}
	//} else {
	//RuntimePlatform.
	//	Debug.Log("platform = " + platform);
	//}
}
private function checkTouch(pos, type) {
	var wp : Vector3 = Camera.main.ScreenToWorldPoint(pos);
	var touchPos : Vector2 = new Vector2(wp.x, wp.y);
	var hit = Physics2D.OverlapPoint(touchPos);
	if (hit) {
		Debug.Log(hit.transform.gameObject.name);
		hit.transform.gameObject.SendMessage('handleInput',type,SendMessageOptions.DontRequireReceiver);
		return hit.gameObject;
	}
	return null;
}

private var selectedBlocks:Array = new Array();
private var expectedBlockDestroys = 0;
private function touchFinish () {
	expectedBlockDestroys = selectedBlocks.length;
	for (var i = 0; i < selectedBlocks.length; ++i) {
		(selectedBlocks[i] as GameBlock).deselect();
	}
	selectedBlocks = new Array();
}

public function addBlock (block:GameBlock):boolean {
	if (selectedBlocks.length > 0 ) {
		var lastBlock:GameBlock = selectedBlocks[selectedBlocks.length-1] as GameBlock;
		if ((Mathf.Abs(lastBlock.gridPointX - block.gridPointX) +
			Mathf.Abs(lastBlock.gridPointY - block.gridPointY) > 1)) {
			return false;
		}
		if (lastBlock.numberValue > block.numberValue) {
			return false;
		}
	}
	selectedBlocks.Push(block);
	return true;
}

public function destroyBlock (block:GameBlock) {
	spawnBlock(block.gridPointX, block.gridPointY);
	//Destroy(block.gameObject);	
	block.GetComponent(MoveOnDemand).MoveTo(0,0, 400);
}
