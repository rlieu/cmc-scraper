const cheerio = require("cheerio");
const request = require("request");
// const getLink = require("./get-link");

request("", function(error, response, body) {
    const data = JSON.parse(body);
    let allPromises = [];
    let results = [];
    for(var i in data.results) {
        allPromises.push(new Promise(function(resolve, reject) {
            const name = data.results[i].name;
            const logo = data.results[i].logo;
            const desc = data.results[i].desc;
            const rating = data.results[i].rating;
            const url = data.results[i].url;

            const getLink = new Promise(function(resolve, reject) {
                const link = getlink(resolve, url);
            })

            getLink.then(function(link){
                result = {
                    name: name,
                    logo: logo,
                    desc: desc,
                    rating: rating,
                    homepageurl: link
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

function getlink(resolve, url) {
    request(url, function(error, response, html) {
        let link = "";
        if(html) {
            const $ = cheerio.load(html);
            link = $("a.button_big").attr("href");
        }
        resolve(link);
    });
}