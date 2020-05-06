({
    addCard : function(component, card) {
        console.log("JSHelper");
        var action = component.get("c.saveCard");
        console.log("JSHelper2");
        var user = component.get("v.user");
        action.setParams({
            "card": card,
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
})