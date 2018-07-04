const cheerio = require("cheerio");
const request = require("request");

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

    results.push({
      name: name,
      symbol: symbol,
      rank: rank,
    });
    rank++;
  });

  console.log(results);
});