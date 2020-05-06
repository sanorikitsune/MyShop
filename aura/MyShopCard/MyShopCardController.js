({
    doInit : function(component, event, helper){
        var myPageRef = component.get("v.pageReference");
        var user = myPageRef.state.c__user;
        component.set("v.user", user);
    },

    backHandler : function(component, event, helper){
        window.history.back();
    },

    addCard : function(component, event, helper){
        console.log("JSController");
        var validForm = component.find('loginForm').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        console.log("JSController2");
        if(validForm){
            var card = component.get("v.card");
            helper.addCard(component,card);    
        }
        else{
            alert("Input data is not correct");
        }
    },

})