const ShopListener = {};
const Shop = require('../models/Shop')
const Product = require('../models/Product')
const Buy = require('../models/Buy');
const Ticket = require('../models/Ticket');

ShopListener.getShops = async() => {
    return await Shop.findAll();
}

ShopListener.getOrCreateProduct = async (name, price, shopId) => {
    return await Product.findOrCreate({
        where: {
            name: name,
            price: price,
            shopId: shopId
        }
    })
}

ShopListener.createBuy = async (amount, userId, productId, ticketId) => {
    return await Buy.create({
        amount: amount,
        userId: userId,
        productId: productId,
        ticketId: ticketId
    })
}

ShopListener.getProduct = async (productId) => {
    return await Product.findAll({where:{id:productId}});
}

ShopListener.getProductsByNameAndShop = async (productName, shopId) => {
    return await Product.findAll({
        where: {
            name: productName,
            shopId: shopId
        }
    })
}

ShopListener.getShop = async (shopId) => {
    return await Shop.findByPk(shopId);
}

ShopListener.getUserBuys = async (userId) => {
    return await Buy.findAll({
        where: {
            userId: userId
        }
    })
}

ShopListener.createTicket = async (shop, date, amount, userId) => {
    return await Ticket.create({
        shop: shop,
        date: new Date(date),
        amount: amount,
        userId: userId
    })
}

ShopListener.getUserTickets = async (userId) => {
    return await Ticket.findAll({
        where: {
            userId: userId
        }
    })
}

ShopListener.getTicket = async (ticketId) => {
    return await Ticket.findByPk(ticketId);
}

ShopListener.getBuysFromTicket = async (ticketId) => {
    return await Buy.findAll({
        where: {
            ticketId: ticketId
        }
    })
}

module.exports = ShopListener;