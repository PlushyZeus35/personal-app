const Binance = {};
const { Spot } = require('@binance/connector')

Binance.getUserAssets = (async (apikey, apisecret) => {
    const client = new Spot(apikey, apisecret);
    const assets = [];
    await client.account()
        .then(response => {
            console.log(response.data)
            for(let i=0; i<response.data.balances.length; i++){
                if(parseFloat(response.data.balances[i].free)>0 || parseFloat(response.data.balances[i].locked)>0){
                    assets.push(response.data.balances[i]);
                }
            }
            
        })
        .catch(error => client.logger.log(error));
    return assets;
});

module.exports = Binance;