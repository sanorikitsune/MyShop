({
    doInit : function(component) {
        var action = component.get("c.getGoods");

        action.setParams({
            "type": "nonFilter"
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.goods", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
        console.log("doInit complete");
        //----------------------------
        var action = component.get("c.getUsers");


        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.users", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
        console.log("doInit complete");
    },

    filter : function(component, type) {
        var action = component.get("c.getGoods");

        action.setParams({
            "type": type
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.goods", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
        console.log("filter complete");
    },


})