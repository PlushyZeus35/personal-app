const ShopListener = require("./ShopListener");
const { DateTime, DATE_SHORT } = require("luxon");

class UserHandler{

    constructor(id, username, email){
        this.userId = id;
        this.userName = username;
        this.userMail = email;
        if(!this.userId){
            this.error=true;
            this.errorMsg = 'UserId not specified in constructor'; 
        }
    }

    get ticketsInfo(){
        if(this.error){return{error:this.error, errorMsg: this.errorMsg}}
        if(this.tickets){return this.tickets}
        return ShopListener.getUserTickets(this.userId).then((data) => {
            if(data==undefined){return {error: true, errorMsg: 'No values retrieved from database'}}
            const tickets = [];
            for(let userTicket of data){
                let ticket = {
                    id: userTicket.id,
                    shop: userTicket.shop,
                    date: userTicket.date,
                    total: userTicket.amount
                }
                tickets.push(ticket);
            }
            this.tickets = tickets;
            return tickets;
        });
    }

    get ticketsStats(){
        if(this.error){return{error:this.error, errorMsg: this.errorMsg}}
        if(this.ticketStats){return this.ticketStats}
        return Promise.all([ShopListener.getUserTickets(this.userId), ShopListener.getUserBuys(this.userId)]).then((data) => {
            const userTickets = data[0];
            const userBuys = data[1];
            if(userTickets==undefined || userBuys==undefined){return {error: true, errorMsg: 'No values retrieved from database'}}
            const productsToRetrieve = [];
            for(let uBuy of userBuys){
                productsToRetrieve.push(uBuy.productId);
            }
            let total = 0;
            let totalThisMonth = 0;
            let dt = DateTime.now();
            dt = dt.startOf('month');
            let startMonth = new Date(dt.toISODate());
            for(let uTicket of userTickets){
                if(new Date(uTicket.date) > startMonth){
                    totalThisMonth += parseFloat(uTicket.amount);
                }
                total += uTicket.amount;
            }
            total = parseFloat(total.toFixed(2))
            totalThisMonth = parseFloat(totalThisMonth.toFixed(2))
            this.ticketStats = {total: total, totalThisMonth: totalThisMonth}
            return {total: total, totalThisMonth: totalThisMonth}
        })
    }

    
}

module.exports = UserHandler