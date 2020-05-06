({
    createUser : function(component, user) {
        console.log("JSHelper");
        var action = component.get("c.saveUser");

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
                    {                      
                        //event.preventDefault();                        
                        window.history.back();
                    }                
            }
            else{
                console.log("NOT Success");
                console.log(state);
                alert(action.getReturnValue());
                result = action.getReturnValue();                         
            }
        });
        
        $A.enqueueAction(action);
        console.log("EndOfHelper");
    }
})