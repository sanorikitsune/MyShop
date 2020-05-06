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
        this.doInitCard(component, user);
    },

    doInitCard : function(component, user) {
        console.log("doInit helper start");
        var action = component.get("c.getCard");
        console.log("doInit helper start 2");
        action.setParams({
            "user": user
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.cards", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
        console.log("doInit complete");
        
    },

    
    changeData : function(component) {
        var user = component.get("v.user");
        var action = component.get("c.changeUser");
        action.setParams({
            "user": user
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                alert(response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
        console.log("doInit complete");
        
    },


    pay : function(component) {
        console.log("pay start");
        var user = component.get("v.user");
        var card = component.get("v.selectedCard");
        var total = component.get("v.pay");
        var action = component.get("c.payController");
        console.log("pay start2");
        action.setParams({
            "user": user,
            "card": card,
            "total": total
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                alert(response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
        console.log("pay complete");
        
    },
})