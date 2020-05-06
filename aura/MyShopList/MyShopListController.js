({  
    doInit : function(component, event, helper){
        var myPageRef = component.get("v.pageReference");
        var user = myPageRef.state.c__user;
        component.set("v.user", user);

        helper.doInit(component);
    },
    hackHandler : function(component, event, helper){
        var navService = component.find("navService");
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__MyShopHack',
            }
        };
        //event.preventDefault();
        navService.navigate(pageReference);
    },

    basketHandler : function(component, event, helper){

        
        

        var navService = component.find("navService");
        var user = component.get("v.user");
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__MyShopBasket',
            },
            state: {
                "c__user": user   
            }
        };
        //event.preventDefault();
        navService.navigate(pageReference);
    },

    filterA : function(component, event, helper){
        var type = "Alphabetical"
        helper.filter(component, type);
    },
    filterZ : function(component, event, helper){
        var type = "NotAlphabetical"
        helper.filter(component, type);
    },
    codeFilterAsc : function(component, event, helper){
        var type = "codeFilterAsc"
        helper.filter(component, type);
    },
    codeFilterDesc : function(component, event, helper){
        var type = "codeFilterDesc"
        helper.filter(component, type);
    },
    priceFilterAsc : function(component, event, helper){
        var type = "priceFilterAsc"
        helper.filter(component, type);
    },
    priceFilterDesc : function(component, event, helper){
        var type = "priceFilterDesc"
        helper.filter(component, type);
    },

    foodFilter : function(component, event, helper){
        var type = "foodFilter"
        helper.filter(component, type);
    },
    remedyFilter : function(component, event, helper){
        var type = "remedyFilter"
        helper.filter(component, type);
    },
    houseFilter : function(component, event, helper){
        var type = "houseFilter"
        helper.filter(component, type);
    }

})