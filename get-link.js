const cheerio = require("cheerio");
const request = require("request");

module.exports = function(url) {
    request(url, function(error, response, html) {
        let link = "";
        if(html) {
            const $ = cheerio.load(html);
            const link = $("ul.list-unstyled.details-panel-item--links").find("a").attr("href");
        }
        return link;
    });
}