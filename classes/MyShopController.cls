public with sharing class MyShopController {
    @AuraEnabled
    public static string saveUser(Contact user) {
        List<Contact> checkUserEmail = [SELECT Email FROM Contact WHERE Email =:user.Email];
        if (!checkUserEmail.isEmpty()){
            string message = 'This email is already exists';
            return message;
        }
        List<Contact> checkUserMobile = [SELECT MobilePhone FROM Contact WHERE MobilePhone =:user.MobilePhone];
        if (!checkUserMobile.isEmpty()){
            string message = 'This mobile is already exists';
            return message;
        }


        System.debug(user);
       
        string err;
        try{
            insert user;
        }
        catch(DmlException e)
        {
            System.debug('A DML exception has occurred: ' +
                e.getMessage());
            err =    'A DML exception has occurred: ' +
            e.getMessage();    
            return err;     
        }
        err='Success';
        return err;
    }

    @AuraEnabled
    public static Contact getUser(Contact user) {
        Contact[] myUser = [SELECT Id, Email, Name, MobilePhone, Department,Password__c FROM Contact WHERE Email=:user.Email];
        return myUser[0];
    }

    @AuraEnabled
    public static List<Basket__c> getBasket(Contact user) {
        Contact[] myUser = [SELECT Id, Email, Name FROM Contact WHERE Email=: user.Email];
        
        return [SELECT Quantity__c, Goods__c, Contact__c FROM Basket__c WHERE Contact__c=: myUser[0].id];
        //return [SELECT Id, Quantity__c, Goods__c, Contact__c FROM Basket__c ];
    }

    @AuraEnabled
    public static List<Goods__c> getGoods(string type) {
        switch on type {
            when 'Alphabetical' {
                return [SELECT Id,Name, ID__c, Description__c, Category__c, Price__c, Quantity__c FROM Goods__c ORDER BY Name];
            }
            when 'NotAlphabetical' {
                return [SELECT Id,Name, ID__c, Description__c, Category__c, Price__c, Quantity__c FROM Goods__c ORDER BY Name DESC];
            }
            when 'codeFilterAsc' {
                return [SELECT Id,Name, ID__c, Description__c, Category__c, Price__c, Quantity__c FROM Goods__c ORDER BY ID__c ASC];
            }
            when 'codeFilterDesc' {
                return [SELECT Id,Name, ID__c, Description__c, Category__c, Price__c, Quantity__c FROM Goods__c ORDER BY ID__c DESC];
            }
            when 'priceFilterAsc' {
                return [SELECT Id,Name, ID__c, Description__c, Category__c, Price__c, Quantity__c FROM Goods__c ORDER BY Price__c ASC];
            }
            when 'priceFilterDesc' {
                return [SELECT Id,Name, ID__c, Description__c, Category__c, Price__c, Quantity__c FROM Goods__c ORDER BY Price__c DESC];
            }
            when 'foodFilter' {
                return [SELECT Id,Name, ID__c, Description__c, Category__c, Price__c, Quantity__c FROM Goods__c WHERE Category__c= 'Food'];
            }
            when 'remedyFilter' {
                return [SELECT Id,Name, ID__c, Description__c, Category__c, Price__c, Quantity__c FROM Goods__c WHERE Category__c='Remedy'];
            }
            when 'houseFilter' {
                return [SELECT Id,Name, ID__c, Description__c, Category__c, Price__c, Quantity__c FROM Goods__c WHERE Category__c='Household goods'];
            }
            when else {
                return [SELECT Id, Name, ID__c, Description__c, Category__c, Price__c, Quantity__c FROM Goods__c];
            }
        }
        
    }

    @AuraEnabled
    public static String loginUser(Contact user) {
        Contact[] userEmail = [SELECT Email, Password__c FROM Contact WHERE Email =:user.Email LIMIT 1];
        if (userEmail.isEmpty()){
            string message = 'This email is not exists';
            return message;
        }
        
        if (userEmail[0].Password__c==user.Password__c){
            string message ='Success';
            return message;
        }

        string message = 'Password is wrong';
        return message;
        
    }


    @AuraEnabled
    public static String addItem(Goods__c item) {
        string err;
        try{
        insert item;
        }
        catch(DmlException e)
        {
            System.debug('A DML exception has occurred: ' +
                e.getMessage());
            err =    'A DML exception has occurred: ' +
            e.getMessage();    
            return err;     
        }
        err='Success';
        return err;
        
    }

    @AuraEnabled
    public static String deleteItem(string item) {
        string err;
        Goods__c[] delItem =[SELECT ID__c FROM Goods__c WHERE Name=:item];
        try{
        delete delItem;
        }
        catch(DmlException e)
        {
            System.debug('A DML exception has occurred: ' +
                e.getMessage());
            err =    'A DML exception has occurred: ' +
            e.getMessage();    
            return err;     
        }
        err='Success';
        return err;
        
    }

    @AuraEnabled
    public static String addToBasket(integer value, Goods__c item, Contact user) {
        Contact[] myUser = [SELECT Id, Email, Name FROM Contact WHERE Email=: user.Email];
        string err;
        if(myUser.isEmpty())
        {
            err='Please, relogin';
            return err;
        }
        
        
        
        
        Basket__c[] basketObj = [SELECT Id, Goods__c, Quantity__c, Contact__c FROM Basket__c WHERE Goods__c =:item.id AND Contact__c =:MyUser[0].id LIMIT 1];
        
        Basket__c newObj = new Basket__c();
        Boolean flag;

       
        try{
        if(basketObj.isEmpty())
        {
            newObj.Quantity__c = value;
            newObj.Goods__c = item.id;
            newObj.Contact__c = myUser[0].Id;
            basketObj.add(newObj);
            flag = true;       

        }
        else {
            basketObj[0].Quantity__c += value;
            if(basketObj[0].Quantity__c>item.Quantity__c)
            {
                basketObj[0].Quantity__c = item.Quantity__c;
            }
            flag = false;
        }
        }
        catch(Exception e){
            System.debug('An exception has occurred: ' +
                e.getMessage());
            err =    'An exception has occurred: ' +
            e.getMessage();    
            return err;   
        }

        try{
            if(flag){
            insert basketObj;
            }
            else{
            update basketObj;
            }
        }


        catch(DmlException e)
        {
            System.debug('A DML exception has occurred: ' +
                e.getMessage());
            err =    'A DML exception has occurred: ' +
            e.getMessage();    
            return err;     
        }
        err='Success';
        return err;

        
    }
    @AuraEnabled
    public static Goods__c getBasketItem (Basket__c item) {
        Goods__c[] goods = [SELECT Id, Name, Category__c, Description__c, Price__c, Quantity__c  FROM Goods__c WHERE Id=:item.Goods__c LIMIT 1];
        if (goods.isEmpty()) {
            return NULL;            
        }
        Goods__c out = goods[0];
        return out;
    }

    @AuraEnabled
    public static Basket__c BasketItemPlus (Basket__c item, integer value, Goods__c goods) {
        item.Quantity__c += value;
        if(item.Quantity__c>goods.Quantity__c)
        {
            item.Quantity__c = goods.Quantity__c;
        }
        string err;
        try{            
            update item;
        }        
        catch(DmlException e)
        {
            System.debug('A DML exception has occurred: ' +
                e.getMessage());
            err =    'A DML exception has occurred: ' +
            e.getMessage();    
            return NULL;     
        }
        
        return item;
    }


    @AuraEnabled
    public static string BasketItemMinus (Basket__c item, integer value, Goods__c goods) {
        item.Quantity__c -= value;
        if(item.Quantity__c<=0)
        {
            BasketItemDelete(item);
            return 'Null';
        }
        string err;
        try{            
            update item;
        }        
        catch(DmlException e)
        {
            System.debug('A DML exception has occurred: ' +
                e.getMessage());
            err =    'A DML exception has occurred: ' +
            e.getMessage();    
            return err;     
        }
        err='Success';
        return err;
    }

    @AuraEnabled
    public static string BasketItemDelete (Basket__c item) {
        string err;       
        try{            
            delete item;
        }        
        catch(DmlException e)
        {
            System.debug('A DML exception has occurred: ' +
                e.getMessage());
            err =    'A DML exception has occurred: ' +
            e.getMessage();    
            return err;     
        }
        err='Success';
        return err;
    }

    @AuraEnabled
    public static string checkBasket (Contact user) {
        Contact[] myUser = [SELECT Id, Email, Name FROM Contact WHERE Email=: user.Email];
        Basket__c[] Basket = [SELECT Id, Quantity__c, Contact__c, Goods__c  FROM Basket__c WHERE Contact__c=:myUser[0].Id LIMIT 1];
        
        if (Basket.isEmpty()) {
            return 'Null';            
        }
        else{            
        return 'Success';
        }
    }



    @AuraEnabled
    public static string saveCard(Card__c card, Contact user) {
        List<Card__c> checkCard = [SELECT Number__c FROM Card__c WHERE Number__c =:card.Number__c];
        if (!checkCard.isEmpty()){
            string message = 'This card is already exists';
            return message;
        }
        Contact[] myUser = [SELECT Id, Email, Name FROM Contact WHERE Email=: user.Email];
        card.Contact__c = myUser[0].Id;
       
        string err;
        try{
            insert card;
        }
        catch(DmlException e)
        {
            System.debug('A DML exception has occurred: ' +
                e.getMessage());
            err =    'A DML exception has occurred: ' +
            e.getMessage();    
            return err;     
        }
        err='Success';
        return err;
    }


    @AuraEnabled
    public static List<Card__c> getCard(Contact user) {
        Contact[] myUser = [SELECT Id, Email, Name FROM Contact WHERE Email=: user.Email];
        
        return [SELECT Id, Balance__c, Number__c, Contact__c FROM Card__c WHERE Contact__c=: myUser[0].id];
        //return [SELECT Id, Quantity__c, Goods__c, Contact__c FROM Basket__c ];
    }

    @AuraEnabled
    public static string changeUser(Contact user) {
        string err;
        Contact[] checkmobile = [SELECT Id, Email, Name, MobilePhone, Department,Password__c FROM Contact WHERE MobilePhone=:user.MobilePhone];
        if(!checkmobile.isEmpty()){
            return 'This mobile is already exists';
        }
        try{
            update user;
        }
        catch(DmlException e)
        {
            System.debug('A DML exception has occurred: ' +
                e.getMessage());
            err =    'A DML exception has occurred: ' +
            e.getMessage();    
            return err;     
        }
        err='Success';
        return err;
    }




    @AuraEnabled
    public static string payController(Contact user, Card__c card, Integer total) {
        string err;
        Card__c[] mycard = [SELECT Id, Balance__c, Number__c, Contact__c FROM Card__c WHERE Id=: card.Id];
        if(!mycard.isEmpty()){
            if(mycard[0].Balance__c>=total)
            {
                Card__c myCardUp = mycard[0];
                myCardUp.Balance__c -= total;
                //------------
                Basket__c[] basket = [SELECT Id, Goods__c, Quantity__c FROM Basket__c WHERE Contact__c=:user.Id];
                Goods__c[] goods = new List<Goods__c>();
                
                for(Basket__c item : [SELECT Id, Goods__c, Quantity__c FROM Basket__c WHERE Contact__c=:user.Id]){
                    Goods__c[] temp = [SELECT Id, Quantity__c FROM Goods__c WHERE Id=:item.Goods__c LIMIT 1];
                    temp[0].Quantity__c-=item.Quantity__c;
                    goods.add(temp[0]);
                }

                try{
                    update myCardUp;
                    update goods;
                    delete basket;
                }
                catch(DmlException e)
                {
                    System.debug('A DML exception has occurred: ' +
                        e.getMessage());
                    err =    'A DML exception has occurred: ' +
                    e.getMessage();    
                    return err;     
                }
                return 'Success!';
            }
            else {
                return 'Not enough money';
            }


        }
        try{
            update user;
        }
        catch(DmlException e)
        {
            System.debug('A DML exception has occurred: ' +
                e.getMessage());
            err =    'A DML exception has occurred: ' +
            e.getMessage();    
            return err;     
        }
        err='Success';
        return err;
    }
}