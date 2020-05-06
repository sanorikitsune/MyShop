({
    backAction : function(component, event, helper) {
        window.history.back();
    },

    addAction : function(component, event, helper) {
        console.log("JSController");
        var validForm = component.find('form').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);

        if(validForm){
            var newItem = component.get("v.hack");
            helper.createItem(component, newItem);    
        }
        else{
            alert("Form is not sent");
        }
    },

    delAction : function(component, event, helper) {
        console.log("JSController");
       
            var newItem = component.get("v.hack.Name");
            helper.deleteItem(component, newItem);    
    
    }
})