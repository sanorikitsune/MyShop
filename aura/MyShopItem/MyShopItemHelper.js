({
    addToBasketHelper : function(component, value) {
        console.log("Add to basket helper");
        var action = component.get("c.addToBasket");
        var item = component.get("v.item");
        var user = component.get("v.user");
        action.setParams({
            "value": value,
            "item": item,
            "user": user,
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("Failed with state: " + response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
                console.log("Failed with state: " + response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
        console.log("Add to basket end of helper");
    }
})