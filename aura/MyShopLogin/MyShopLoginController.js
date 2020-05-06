({
    loginToSignup : function(component, event, helper) {
        var navService = component.find("navService");
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__MyShopSignup',
            }
        };
        event.preventDefault();
        navService.navigate(pageReference);
    },

    loginAction : function(component, event, helper) {
        console.log("JSController");
        var validForm = component.find('loginForm').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        console.log("JSController2");
        if(validForm){
            var user = component.get("v.login");
            helper.login(component,user);    
        }
        else{
            alert("Input data is not correct");
        }
    }
})