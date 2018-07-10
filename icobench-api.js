const cheerio = require("cheerio");
const request = require("request");
// const getLink = require("./get-link");

request("https://icobench.com/api/v1/icos/all", function(error, response, body) {
    let data = JSON.parse(body);
    let allPromises = [];
    let results = [];
    data = data.results
    for(var i in data) {
        allPromises.push(new Promise(function(resolve, reject) {
            const id = data[i].id;
            const name = data[i].name;
            const logo = data[i].logo;
            const desc = data[i].desc;
            const rating = data[i].rating;
            const start_time = data[i].icoStart;
            const end_time = data[i].icoEnd;
            const url = data[i].url;

            // const getLink = new Promise(function(resolve, reject) {
            //     const link = getlink(resolve, url);
            // })

            const getLink = new Promise(function(resolve, reject) {
                const links = getlinks(resolve, id);
            })

            getLink.then(function(links){
                result = {
                    name: name,
                    logo: logo,
                    desc: desc,
                    rating: rating,
                    icostart: start_time,
                    icoend: end_time,
                    platforms: links,
                    homepageurl: links.homepageurl,
                    whitepaperurl: links.whitepaperurl
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

function getlinks(resolve, id) {
    request(`https://icobench.com/api/v1/ico/${id}`, function(error, response, body) {
        const data = JSON.parse(body);
        const links = {
            twitter: data.links.twitter,
            slack: data.links.slack,
            telegram: data.links.telegram,
            facebook: data.links.facebook,
            medium: data.links.medium,
            bitcointalk: data.links.bitcointalk,
            github: data.links.github,
            reddit: data.links.reddit,
            discord: data.links.discord,
            homepageurl: data.links.www,
            whitepaperurl: data.links.whitepaper
        };
        resolve(links);
    });
}