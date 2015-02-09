#pragma strict

function Start () {
	Debug.Log("localScale = " + this.transform.localScale.ToString());
}

function Update () {

}

function handleInput (type) {
	Debug.Log("Object hit ! " + this.name);
	var scaleContainer:Transform = this.transform.FindChild("ScaleContainer") as Transform;
	scaleContainer.localScale = new Vector3(0.5,0.5,1);
	Debug.Log("localScale = " + this.transform.localScale.ToString());
}