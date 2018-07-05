const cheerio = require("cheerio");
const request = require("request");

request("https://api.coinmarketcap.com/v2/ticker/", function(error, response, body) {
    const data = JSON.parse(body);
    let allPromises = [];
    let results = [];
    // for(var i in data.data) {
        const name = data.data[1].name;
        const symbol = data.data[1].symbol;
        const rank = data.data[1].rank;
        const url = `https://coinmarketcap.com/currencies/${data.data[1].website_slug}`;
        const logo = `https://s2.coinmarketcap.com/static/img/coins/32x32/${data.data[1].id}.png`;

        const getLink = new Promise(function(resolve, reject) {
            const link = getlink(resolve, url);
        })

        getLink.then(function(link){
            result = {
                name: name,
                symbol: symbol,
                rank: rank,
                link: link,
                logo: logo
            }
            console.log(result);
            results.push(result);
        });
    // }
});

function getlink(resolve, url) {
    request(url, function(error, response, html) {
        let link = "";
        if(html) {
            const $ = cheerio.load(html);
            link = $("ul.list-unstyled.details-panel-item--links").find("a").attr("href");
        }
        resolve(link);
    });
}