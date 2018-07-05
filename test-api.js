const request = require("request");
const getLink = require("./get-link");

request("https://api.coinmarketcap.com/v2/ticker/", function(error, response, body) {
    const data = JSON.parse(body);
    let results = [];
    for(var i in data.data) {
        const url = `https://coinmarketcap.com/currencies/${data.data[i].website_slug}`;
        const link = getLink(url);
        const logo = `https://s2.coinmarketcap.com/static/img/coins/32x32/${data.data[i].id}.png`;
        results.push({
            name: data.data[i].name,
            symbol: data.data[i].symbol,
            rank: data.data[i].rank,
            link: link,
            logo: logo
        });
    }
    console.log(results);
});