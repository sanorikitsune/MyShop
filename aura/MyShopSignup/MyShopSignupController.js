({
    signupAction : function(component, event, helper) {
        console.log("JSController");
        var validForm = component.find('signupForm').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);

        if(validForm){
            var newUser = component.get("v.signup");
            helper.createUser(component,newUser);    
        }
        else{
            alert("Form is not sent");
        }
    },

    backAction : function(component, event, helper) {
        window.history.back();
    }
})