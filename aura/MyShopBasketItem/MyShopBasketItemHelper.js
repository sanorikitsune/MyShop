({
    doInitHelper : function(component) {    
        var item = component.get("v.item");         
        var action = component.get("c.getBasketItem");

        
            action.setParams({
                "item": item
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
    
        
    },
    addToBasketHelper : function(component) {     
        var item = component.get("v.item");         
        var action = component.get("c.BasketItemPlus");
        var goods = component.get("v.goods");
        var valuesource = component.find("count");
        var value = valuesource.get("v.value");

            action.setParams({
                "item": item,
                "value": value,
                "goods": goods
            });
    
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.item", response.getReturnValue());
                }
                else {
                    console.log("Failed with state: " + state);
                }
            });
            $A.enqueueAction(action);
    
        
    },

    removefromBasketHelper : function(component) {     
        var item = component.get("v.item");         
        var action = component.get("c.BasketItemMinus");
        var goods = component.get("v.goods");
        var valuesource = component.find("count");
        var value = valuesource.get("v.value");
        
            action.setParams({
                "item": item,
                "value": value,
                "goods": goods
            });
    
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    if(response.getReturnValue()=='Null'){
                        console.log("Component destroyed!");                        
                        component.destroy();
                    }
                    else{
                        var outvalue = item.Quantity__c - value;
                        var outitem = item;
                        console.log(outvalue); 
                        outitem.Quantity__c =outvalue;
                        component.set("v.item", outitem);
                    }
                }
                else {
                    console.log("Failed with state: " + state);
                }
            });
            $A.enqueueAction(action);
        
    },

    deleteItemFromBasketHelper : function(component) {    
        var item = component.get("v.item");         
        var action = component.get("c.BasketItemDelete");
        
            action.setParams({
                "item": item
            });
    
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.destroy();
                }
                else {
                    console.log("Failed with state: " + state);
                }
            });
            $A.enqueueAction(action);
    
        
    },
})