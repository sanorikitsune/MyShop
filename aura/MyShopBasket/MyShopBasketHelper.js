({
    doInit : function(component, user) {
        console.log("doInit helper start");
        var action = component.get("c.getBasket");
        console.log("doInit helper start 2");
        action.setParams({
            "user": user
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.items", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
        console.log("doInit complete");
    },

})