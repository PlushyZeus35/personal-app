const TicketAdapter = {}
const { parse } = require("json2csv");
const { DateTime } = require("luxon");

TicketAdapter.parseTicket = (async (ticketText, shopsAvailable) => {
    let selectedShop;
    let shopId;
    const ticketParsed = parseTicket(ticketText);
    for(let line of ticketParsed){
        for(let shop of shopsAvailable){
            if(line.includes(shop.name)){
                shopId = shop.id;
                selectedShop = shop.name;
            }
        }
    }
    if(selectedShop == 'MERCADONA'){
        return mercadonaAdapter(ticketParsed, shopId);
    }
    return null;
})

function mercadonaAdapter(ticketParsed, shopId){
    const INIT_PRODUCTS = 'UnitImporte';
    const END_PRODUCTS = 'TOTAL';
    const TOTAL = 'TOTAL';
    const SHOP_NAME = 'MERCADONA';
    const DATE = 'OP:';

    let initIndex = 0;
    let endIndex = 0;
    let totalIndex = 0;
    let dateIndex = 0;
    for(let index in ticketParsed){
        if(ticketParsed[index].includes(INIT_PRODUCTS) && initIndex==0){
            initIndex = parseInt(index);
        }
        if(ticketParsed[index].includes(END_PRODUCTS) && endIndex==0){
            endIndex = parseInt(index);
        }
        if(ticketParsed[index].includes(TOTAL) && totalIndex==0){
            totalIndex = parseInt(index);
        }
        if(ticketParsed[index].includes(DATE) && dateIndex==0){
            dateIndex = parseInt(index);
        }
    }
    
    const products = ticketParsed.slice(initIndex+1, endIndex);
    let total = ticketParsed.slice(totalIndex, totalIndex+1)[0].split(')')[1];
    total = parseFloat(total.replace(',','.'));
    let date = ticketParsed.slice(dateIndex, dateIndex+1)[0].split(DATE)[0];

    let hour = date.split(' ')[1].split(':');
    date = date.split(' ')[0].split('/');
    date = DateTime.local(parseInt(date[2]), parseInt(date[1]), parseInt(date[0]), parseInt(hour[0]), parseInt(hour[1]))
    date = date.setZone("Europe/Andorra").toISO();
    const buy = {
        shopId: shopId,
        shop: SHOP_NAME,
        date: date,
        products: [],
        total: total
    }

    for(let product of products){
        let name;
        let price;
        let amount;
        if(isWeightProduct(product,products[products.indexOf(product)+1])){
            //console.log(isWeightProduct(product,products[products.indexOf(product)+1]))
            const productInfo = parseMercadonaWeightProduct(product, products[products.indexOf(product)+1]);
            name = productInfo.name;
            price = productInfo.price;
            amount = productInfo.amount;
            products.splice(products.indexOf(product)+1,1);
        }else{
            const productInfo = parseMercadonaProduct(product);
            name = productInfo.name;
            price = productInfo.price;
            amount = productInfo.amount;
        }
        if(name!=undefined && amount!=undefined && price!=undefined){
            const newProduct = {
                name: name,
                amount: amount,
                price: price
            }
            buy.products.push(newProduct);
        }
    }
    return buy;
}

function parseTicket(ticketText){
    return ticketText.split(/\r\n|\r|\n/,-1);
}

function isWeightProduct(product, productWeight){
    return (productWeight!=undefined && productWeight!=null && productWeight.includes('/kg'))
}

function parseMercadonaWeightProduct(product, weightInfo){
    let amount = weightInfo.split(' ')[0];
    let price = weightInfo.split('kg')[1].split(' ')[0];
    price = parseFloat(price.replace(',','.'));
    amount = parseFloat(amount.replace(',','.'));
    let name = product.substr(1);
    return {amount, name, price};
}

function parseMercadonaProduct(product){
    // Get amount from first number of the product
    let amount = product.slice(0,1);

    let endIndex = 0;
    for(let i=product.length; i--; i>0){
        if(isNaN(parseInt(product[i])) && endIndex == 0 && product[i]!=','){
            endIndex = i;
        }
    }
    let name = product.slice(1,endIndex+1);
    let price = product.slice(endIndex+1);
    // If product has unit price
    if(price.split(',').length>2){
        let priceSplit = price.split(',');
        price = priceSplit[0] + ',';
        price += priceSplit[1][0]+priceSplit[1][1];
    }
    price = parseFloat(price.replace(',','.'));
    amount = parseFloat(amount.replace(',','.'));
    return {amount, name, price};
}

module.exports = TicketAdapter;