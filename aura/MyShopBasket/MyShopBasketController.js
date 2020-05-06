({
    doInit : function(component, event, helper){
        var myPageRef = component.get("v.pageReference");
        var user = myPageRef.state.c__user;
        //alert(user.Email);
        component.set("v.user", user);

        helper.doInit(component, user);
    },

    refresh : function(component, event, helper){
        
        console.log("refresh!");
        var user = component.get("v.user");
        helper.doInit(component, user);

    },

    backHandler : function(component, event, helper) {
        window.history.back();
    },

    paymentHandler : function(component, event, helper) {
        console.log("doInit helper start");
        var action = component.get("c.checkBasket");
        console.log("doInit helper start 2");
        var user = component.get("v.user");
        action.setParams({
            "user": user
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue());
                if(response.getReturnValue()=='Success'){
                            var navService = component.find("navService");
                var pageReference = {
                    type: 'standard__component',
                    attributes: {
                        componentName: 'c__MyShopPayment',
                    },
                    
                    state: {
                        "c__user": user   
                    }
                };
                //event.preventDefault();
                navService.navigate(pageReference);
                }
                else{
                    alert('Basket is empty');
                }
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
        console.log("doInit complete");
        
        
    },

    cardHandler : function(component, event, helper){
        var navService = component.find("navService");
        var user = component.get("v.user");
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__MyShopCard',
            },
            state: {
                "c__user": user   
            }
        };
        //event.preventDefault();
        navService.navigate(pageReference);

    },
})