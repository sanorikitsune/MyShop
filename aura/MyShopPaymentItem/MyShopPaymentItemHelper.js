({
    doInitHelper : function(component) {
        console.log("Begin do init");    
        var item = component.get("v.item");         
        var action = component.get("c.getBasketItem");

        
            action.setParams({
                "item": item
            });
    
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.goods", response.getReturnValue());

                    var quantity = component.get("v.item.Quantity__c");
                    var price = component.get("v.goods.Price__c");
                    var sum = quantity * price;
                    console.log(quantity);
                    console.log(price);
                    var updateEvent = component.getEvent("total");
                    updateEvent.setParams({ "count": sum });
                    updateEvent.fire();
                    console.log("End of do init helper event");
                }
                else {
                    console.log("Failed with state: " + state);
                }
            });
            $A.enqueueAction(action);
            console.log("End of do init helper");

            
        
        
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