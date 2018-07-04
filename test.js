const cheerio = require("cheerio");
const request = require("request");


request("https://coinmarketcap.com/currencies/bitcoin", function(error, response, html) {
    const $ = cheerio.load(html);
    const link = $("ul.list-unstyled.details-panel-item--links").find("a").attr("href");
    console.log(link);
    const logo = $("img.logo-32x32").attr("src");
    console.log(logo);
});