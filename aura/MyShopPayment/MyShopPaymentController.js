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
        
        component.set("v.pay", 0);
        helper.doInit(component, user);

    },

    backHandler : function(component, event, helper) {
        window.history.back();
    },

    totalPay : function(component, event, helper) {
        console.log("total pay event catch");
        var sum = event.getParam("count");
        console.log(sum);
        var pay = component.get("v.pay");
        console.log(pay);
        var total = pay + sum;
        component.set("v.pay", total);
        console.log("end event");
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
    changeHandler : function(component, event, helper) {
        var mobileForm = component.find("form1");
        var addressForm = component.find("form2");        
        var button =event.getSource();
        var flag = mobileForm.get("v.disabled");

        if(flag)
        {
            mobileForm.set("v.disabled", false);
            addressForm.set("v.disabled", false);
            button.set("v.label", "Save data");
        }
        else
        {
            mobileForm.set("v.disabled", true);
            addressForm.set("v.disabled", true);
            button.set("v.label", "Change data");
            helper.changeData(component);
        }

        
    },

    payHandler : function(component, event, helper) {
        var validForm1 = component.find('form1').get("v.value");
        var validForm2 = component.find('form2').get("v.value");
        var validForm3 = component.get("v.selectedCard.Id");
        console.log("JSController2");
        var flag = true;
        
        if(validForm1==''||validForm2==''||validForm3=='')
        {
            flag = false;
        }

        if(flag){
            helper.pay(component);
        }
        else{
            alert("Input data is not correct");
        }

        
    },

})