const cheerio = require("cheerio");
const request = require("request");
// const getLink = require("./get-link");

request("https://api.icowatchlist.com/public/v1/", function(error, response, body) {
    let data = JSON.parse(body);
    // console.log(data.ico.upcoming);
    let allPromises = [];
    let results = [];
    data = data.ico.upcoming
    for(var i in data) {
        // allPromises.push(new Promise(function(resolve, reject) {
            const name = data[i].name;
            const logo = data[i].image;
            const desc = data[i].description;
            const url = data[i].website_link;
            const start_time = data[i].start_time;
            const end_time = data[i].end_time;

            // const getLink = new Promise(function(resolve, reject) {
                // const link = getlink(resolve, url);
            // })

            // getLink.then(function(link){
                result = {
                    name: name,
                    logo: logo,
                    desc: desc,
                    homepageurl: url,
                    icostart: start_time,
                    icoend: end_time
                }
                results.push(result);
                // resolve();
            // });
        // }));
    }
    // Promise.all(allPromises).then(function(){
        console.log(results);
    // });
});

// function getlink(resolve, url) {
//     request(url, function(error, response, html) {
//         let link = "";
//         if(html) {
//             const $ = cheerio.load(html);
//             link = $("a.button_big").attr("href");
//         }
//         resolve(link);
//     });
// }