const ShopListener = require("./ShopListener");
const { DateTime, DATE_SHORT } = require("luxon");
const ShopHelper = {};

ShopHelper.constructProductInfo = async(products, shop) => {
    const productPrices = {
        name: products[0].name,
        shop: shop.name,
        prices: []
    }
    for(let product of products){
        const price = {price: parseFloat(product.price), date: product.createdAt}
        productPrices.prices.push(price);
    }
    return productPrices;
}

ShopHelper.parseProductsShop = async(products) => {
    for(let product of products){
        const buyProduct = await ShopListener.getProduct(product.productId);
        const productShop = await ShopListener.getShop(buyProduct.shopId);
        let dateParsed = DateTime.local(product.createdAt);
        dateParsed = dateParsed.toLocaleString(DateTime.DATE_SHORT)
        product = Object.assign(product, {shop: productShop.name, product: buyProduct.name, date: dateParsed});
    }
    console.log(products)
    return products;
}

ShopHelper.parseTopProducts = async(products) => {
    let topProducts = [];
    for(let product of products){
        let exists = false;
        for(let prod of topProducts){
            if(prod.name == product.product && prod.shop == product.shop){
                exists = true;
                prod.counter += product.amount;
            }
        }
        if(!exists){
            topProducts.push({name: product.product, shop: product.shop, counter: product.amount});
        }
    }
    topProducts = orderTopProducts(topProducts);
    return topProducts;
}

function orderTopProducts(topProducts){
    topProducts.sort((a, b) => {
        return a.counter - b.counter;
    });
    topProducts.reverse();
    return topProducts;
}

module.exports = ShopHelper;