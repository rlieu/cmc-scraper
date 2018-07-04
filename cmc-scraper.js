const cheerio = require("cheerio");
const request = require("request");
const getLink = require("./get-link");
const getLogo = require("./get-logo");

console.log("\n***********************************\n" +
            "Grabbing all coins from coinmarketcap\n" +
            "\n***********************************\n");

request("https://coinmarketcap.com/all/views/all/", function(error, response, html) {

    const $ = cheerio.load(html);
    let results = [];
    let rank = 0;

    $("tr").each(function(i, element) {

        // const rank = $(element).find("td.text-center.sorting_1").text(); 
        const name = $(element).find("a.currency-name-container.link-secondary").text();
        const symbol = $(element).find("td.text-left.col-symbol").text();
        const url = "https://coinmarketcap.com" + $(element).find("a.currency-name-container.link-secondary").attr("href");
        const link = getLink(url);
        const logo = getLogo(url);

        results.push({
            name: name,
            symbol: symbol,
            rank: rank,
            link: link,
            logo: logo
        });
        rank++;
    });
    console.log(results);
});

// function getLogo(url) {
//     request(url, function(error, response, html) {
//         let logo = "";
//         if(html) {
//             const $ = cheerio.load(html);
//             logo = $("img.logo-32x32").attr("src");
//         }
//         return logo;
//     });
// }

// function getLink(url) {
//     request(url, function(error, response, html) {
//         let link = "";
//         if(html) {
//             const $ = cheerio.load(html);
//             const link = $("ul.list-unstyled.details-panel-item--links").find("a").attr("href");
//         }
//         return link;
//     });
// }