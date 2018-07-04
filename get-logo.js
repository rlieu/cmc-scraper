const cheerio = require("cheerio");
const request = require("request");

module.exports = function(url) {
    request(url, function(error, response, html) {
        const $ = cheerio.load(html);
        const logo = $("img.logo-32x32").attr("src");
        return logo;
    });
}