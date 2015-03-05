#pragma strict

private var scoreText:UI.Text;
private var displayedScore:Number = 0;
private var currentScore:Number = 0;
private var scoreVelocity:float = 1;
private var scoreVelocityStart:float = 0;

function Start () {
	var textTrans:Transform = this.transform.FindChild("Canvas/Text");
	scoreText = textTrans.GetComponent(UI.Text) as UI.Text;
	scoreText.text = "" + currentScore;
}

function Update () {
	if (currentScore != displayedScore) {
		var now = Time.time;
		if (currentScore < displayedScore) {
			displayedScore -= (now -  scoreVelocityStart) * scoreVelocity;
			if (currentScore > displayedScore) {
				displayedScore = currentScore;
			}
		}
		if (currentScore > displayedScore) {
			Debug.Log("Adding " + (now -  scoreVelocityStart) * scoreVelocity);
			displayedScore += (now -  scoreVelocityStart) * scoreVelocity;
			if (currentScore < displayedScore) {
				displayedScore = currentScore;
			}
		}
		scoreVelocityStart = now;
		var displayText:String = "" + displayedScore;;
		var commaCount = (Mathf.Ceil((displayText.length) / 3) - 1);
		for( var i = 0; i < commaCount; ++i) {
			displayText = displayText.Insert((displayText.length - ((4 * (i+1)) - 1)), ",");
		}
		scoreText.text = displayText;
	}
}

public function addBlocksToScore(blocks:Array) {
	var scoreToAdd:int = 0;
	for( var i = 0; i < blocks.length; ++i ) {
		var block:GameBlock = blocks[i];
		var digitCounter = block.numberValue;
		while (digitCounter >= 10) {
			scoreToAdd *= 10;
			digitCounter /= 10;
		}
		scoreToAdd *= 10;
		scoreToAdd = scoreToAdd + block.numberValue;
	}
	this.addValueToScore(scoreToAdd);
}

public function addValueToScore(value:int) {
	currentScore += value;
	scoreVelocityStart = Time.time;
	var difference:int = displayedScore - currentScore;
	scoreVelocity = Mathf.Abs(difference) * 1;
}