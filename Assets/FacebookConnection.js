#pragma strict
/*
private function SetInit()                                                                       
{                                                                                            
    Debug.Log("SetInit");                                                                  
    enabled = true; // "enabled" is a property inherited from MonoBehaviour                  
    if (FB.IsLoggedIn)                                                                       
    {                                                                                        
        Debug.Log("Already logged in");                                                    
        OnLoggedIn();                                                                        
    }                                                                                        
}                                                                                            

private function OnHideUnity(isGameShown:boolean)                                                   
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

private function LoginCallback(result:FBResult)                                                        
{                                                                                          
    Debug.Log("LoginCallback");                                                          

    if (FB.IsLoggedIn)                                                                     
    {                                                                                      
        OnLoggedIn();                                                                      
    }                                                                                      
}                                                                                          

private function OnLoggedIn()                                                                          
{                                                                                          
    Debug.Log("Logged in. ID: " + FB.UserId);                                            
}  */
function Start () {
	//FB.Init(SetInit, OnHideUnity);
}

function Update () {

}