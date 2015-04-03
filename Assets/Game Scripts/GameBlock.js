#pragma strict

function Start () {
}

function Update () {
}
private var gameMain:NumberMain = null;
public var gridPointX:int = 0;
public var gridPointY:int = 0;
public var numberValue:int = 0;
function Initialize(_gameMain, x, y, n) {
	gameMain = _gameMain;
	gridPointX = x;
	gridPointY = y;
	numberValue = n;
	var textTrans:Transform = this.transform.FindChild("ScaleContainer/Canvas/Text");
	var text:UI.Text = textTrans.GetComponent(UI.Text) as UI.Text;
	text.text = "" + numberValue;
	this.GetComponent.<Animation>().Play("GameBlockSpawnAnimation");
}

function handleInput (type) {
	if (type === "done") {
	} else {
		this.select();
	}
}

private var selected = false;

private function select () {
	if (!selected) {
		selected = gameMain.addBlock(this);
		if (selected) {
			var scaleContainer:Transform = null;
			scaleContainer = this.transform.FindChild("ScaleContainer") as Transform;
			scaleContainer.localScale = new Vector3(0.5,0.5,1);
			var animation:Animation = this.GetComponent(Animation);
			animation.Play("GameBlockSelectedAnimation"	);
		}
	} else {
		gameMain.checkForReverse(this);
	}
}

public function deselect(destroy) {
	selected = false;
	var animation:Animation = this.transform.GetComponent(Animation);
	animation.Rewind("GameBlockSelectedAnimation");
	animation.Sample();
	animation.Stop();
	if (destroy) {
		animation.Play("GameBlockDestroyAnimation");
		var scaleContainer:Transform = null;
		scaleContainer = this.transform.FindChild("ScaleContainer") as Transform;
		scaleContainer.localScale = new Vector3(1,1,1);
	}
}

public function finishDestroyAnimation() {
	GetComponent.<Animation>().Rewind("GameBlockDestroyAnimation");
	GetComponent.<Animation>().Sample();
	GetComponent.<Animation>().Stop();
	gameMain.destroyBlock(this);

}