#pragma strict

function Start () {
	Debug.Log("localScale = " + this.transform.localScale.ToString());
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
}

function handleInput (type) {
	Debug.Log("Object hit ! " + this.name);
	if (type === "done") {
	} else {
		this.select();
	}
	Debug.Log("localScale = " + this.transform.localScale.ToString());
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
	}
}

public function deselect() {
	selected = false;
	var animation:Animation = this.transform.GetComponent(Animation);
	animation.Rewind("GameBlockSelectedAnimation");
	animation.Sample();
	animation.Stop();
	animation.Play("GameBlockDestroyAnimation");
	var scaleContainer:Transform = null;
	scaleContainer = this.transform.FindChild("ScaleContainer") as Transform;
	scaleContainer.localScale = new Vector3(1,1,1);
}

public function finishDestroyAnimation() {
	animation.Rewind("GameBlockDestroyAnimation");
	animation.Sample();
	animation.Stop();
	gameMain.destroyBlock(this);

}