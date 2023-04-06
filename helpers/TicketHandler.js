const ShopListener = require("./ShopListener");

class TicketHandler{
    constructor(id){
        this.ticketId = id;
        if(!this.ticketId){
            this.error=true;
            this.errorMsg = 'TicketId not specified in constructor'; 
        }
    }
    get compactInfo(){
        if(this.error){
            return {error: this.error, errorMsg: this.errorMsg};
        }
        if(this.ticketInfo){return this.ticketInfo}
        return ShopListener.getTicket(this.ticketId).then((data) => {this.ticketInfo = data; return data;}).catch((err) => {return {error: true, errorMsg: err.toString()}});
    }

    get productsInfo(){
        if(this.error){
            return {error: this.error, errorMsg: this.errorMsg};
        }
        if(this.ticketProducts){return this.ticketProducts;}
        return Promise.all([ShopListener.getTicket(this.ticketId), ShopListener.getBuysFromTicket(this.ticketId)]).then((values) => {
            const ticketInfo = values[0];
            const buysInfo = values[1];
            if(ticketInfo==undefined || buysInfo==undefined){return{error: true, errorMsg: 'No values retrieved from database'}}
            const productsToRetrieve = [];
            for(let buy of buysInfo){
                productsToRetrieve.push(buy.productId);
            }
            return ShopListener.getProduct(productsToRetrieve).then((data) => {
                if(data==undefined){return {error: true, errorMsg: 'No values retrieved from database'}}
                let parsedDate = ticketInfo.date.split('-').reverse().join('/');
                let ticket = {
                    id: ticketInfo.id,
                    shop: ticketInfo.shop,
                    date: parsedDate,
                    total: ticketInfo.amount,
                    products: []
                }
                for(let buy of buysInfo){
                    let productInfo = data.filter(i => i.id == buy.productId)[0];
                    let product = {
                        name: productInfo.name,
                        price: parseFloat(productInfo.price),
                        amount: buy.amount
                    }
                    ticket.products.push(product);
                }
                this.ticketProducts = ticket;
                return ticket;
            })
        })
    }
}

module.exports = TicketHandler