({
    createItem : function(component, newItem) {
        console.log("JSHelper");
        var action = component.get("c.addItem");

        action.setParams({
            "item": newItem
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("Success"); 
                alert(action.getReturnValue());               
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
    deleteItem : function(component, newItem) {
        console.log("JSHelper");
        var action = component.get("c.deleteItem");

        action.setParams({
            "item": newItem
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("Success"); 
                alert(action.getReturnValue());               
            }
            else{
                console.log("NOT Success");
                console.log(state);
                alert(action.getReturnValue());                      
            }
        });
        
        $A.enqueueAction(action);
        console.log("EndOfHelper");
    }
})