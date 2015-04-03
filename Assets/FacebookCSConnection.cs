using UnityEngine;
using System.Collections;

public class FacebookCSConnection : MonoBehaviour {

	// Use this for initialization
	void Start () {
		// Initialize FB SDK              
		enabled = false;                  
		FB.Init(SetInit, OnHideUnity);  
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	private void SetInit()                                                                       
	{                                                                                            
		Debug.Log("SetInit");                                                                  
		Debug.Log("SetInit"); 
		enabled = true; // "enabled" is a property inherited from MonoBehaviour                  
		if (FB.IsLoggedIn) {                                                                                        
			Debug.Log ("Already logged in");                                                    
			OnLoggedIn ();                                                                        
		} else {
			FB.Login ("email,publish_actions", LoginCallback); 
		}
	}                                                                                            
	
	private void OnHideUnity(bool isGameShown)                                                   
	{                                                                                            
		Debug.Log("OnHideUnity");                                                              
		if (!isGameShown)                                                                        
		{                                                                                        
			// pause the game - we will need to hide                                             
			Time.timeScale = 0;                                                                  
		}                                                                                        
		else                                                                                     
		{                                                                                        
			// start the game back up - we're getting focus again                                
			Time.timeScale = 1;                                                                  
		}                                                                                        
	}
	void LoginCallback(FBResult result)                                                        
	{                                                                                          
		Debug.Log("LoginCallback");                                                          
		
		if (FB.IsLoggedIn)                                                                     
		{                                                                                      
			OnLoggedIn();                                                                      
		}                                                                                      
	}                                                                                          
	
	void OnLoggedIn()                                                                          
	{                                                                                          
		Debug.Log("Logged in. ID: " + FB.UserId);  
		Debug.Log("Logged in. ID: " + FB.UserId); 
		Debug.Log("Logged in. ID: " + FB.UserId); 
		Debug.Log("Logged in. ID: " + FB.UserId); 
		Debug.Log("Logged in. ID: " + FB.UserId); 
		Debug.Log("Logged in. ID: " + FB.UserId); 
		Debug.Log("Logged in. ID: " + FB.UserId); 
	}         
}
