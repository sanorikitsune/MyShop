({
    login : function(component, user) {
        console.log("JSHelper");
        var action = component.get("c.loginUser");
        console.log("JSHelper2");
        action.setParams({
            "user": user
        });
        var result;
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("Success"); 
                alert(action.getReturnValue());
                result = action.getReturnValue();
                    if(result=='Success')
                    {   this.loginProvide(component, user);
                        //event.preventDefault();                        
                        //window.history.back();
                    }                
            }
            else{
                console.log("NOT Success");
                console.log(state);
                alert(action.getReturnValue());                       
            }
        });
        
        $A.enqueueAction(action);
        console.log("EndOfHelper");
    },
    
    loginProvide : function(component, user) {
        var action = component.get("c.getUser");
        action.setParams({
            "user": user
        });
        var myUser;
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                  myUser = action.getReturnValue(); 
                //-----------
                var navService = component.find("navService");
                var pageReference = {
                    type: 'standard__component',
                    attributes: {
                        componentName: 'c__MyShopList'                                 
                    },
                    state: {
                    "c__user": myUser   
                     }
                                };
                //event.preventDefault();
                    navService.navigate(pageReference);                         



            }
            else{
                console.log("NOT Success");
                console.log(state);                       
            }
        });
        
        $A.enqueueAction(action);
        console.log("EndOfHelper");        
    }
})