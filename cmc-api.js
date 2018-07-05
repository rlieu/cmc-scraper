const cheerio = require("cheerio");
const request = require("request");
// const getLink = require("./get-link");

request("https://api.coinmarketcap.com/v2/ticker/", function(error, response, body) {
    const data = JSON.parse(body);
    let allPromises = [];
    let results = [];
    for(var i in data.data) {
        allPromises.push(new Promise(function(resolve, reject) {
            const name = data.data[i].name;
            const symbol = data.data[i].symbol;
            const rank = data.data[i].rank;
            const url = `https://coinmarketcap.com/currencies/${data.data[i].website_slug}`;
            const logo = `https://s2.coinmarketcap.com/static/img/coins/32x32/${data.data[i].id}.png`;

            const getLink = new Promise(function(resolve, reject) {
                request(url, function(error, response, html) {
                    let link = "";
                    if(html) {
                        const $ = cheerio.load(html);
                        link = $("ul.list-unstyled.details-panel-item--links").find("a").attr("href");
                    }
                    resolve(link);
                });
            })

            getLink.then(function(link){
                result = {
                    name: name,
                    symbol: symbol,
                    rank: rank,
                    link: link,
                    logo: logo
                }
                results.push(result);
                resolve();
            });
        }));
    }
    Promise.all(allPromises).then(function(){
        console.log(results);
    });
});

// function getLink(url) {
//     request(url, function(error, response, html) {
//         let link = "";
//         if(html) {
//             const $ = cheerio.load(html);
//             link = $("ul.list-unstyled.details-panel-item--links").find("a").attr("href");
//         }
//         console.log(link);
//         return link;
//     });
// }