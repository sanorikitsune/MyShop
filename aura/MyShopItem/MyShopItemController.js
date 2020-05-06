({
    onchangeNumber : function(component, event, helper){
        var valuesource = event.getSource();
        var value = valuesource.get("v.value");
        var quantity = component.get("v.item.Quantity__c");
        if (value>quantity)
        {
            valuesource.set("v.value", quantity);
        }
    },

    addToBasketHandler : function(component, event, helper){
        console.log("Add to basket controller");
        var valuesource = component.find("count");
        var value = valuesource.get("v.value");
        helper.addToBasketHelper(component, value);
    },

})