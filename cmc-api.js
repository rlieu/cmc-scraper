const cheerio = require("cheerio");
const request = require("request");
const firebase = require("firebase");
// const getLink = require("./get-link");

var config = {
    apiKey: "AIzaSyA_zLJNeHik17VpCEQZcJ7MOSG0xKST-zQ",
    authDomain: "cmc-api.firebaseapp.com",
    databaseURL: "https://cmc-api.firebaseio.com",
    projectId: "cmc-api",
    storageBucket: "cmc-api.appspot.com",
    messagingSenderId: "849334807828"
};
firebase.initializeApp(config);

const db = firebase.firestore();

// set start <= # of tokens on coinmarketcap
for(var start = 1; start <= 1615; start += 100) {

    request(`https://api.coinmarketcap.com/v2/ticker/?start=${start}`, function(error, response, body) {
        const data = JSON.parse(body);
        // let allPromises = [];
        // let results = [];
        for(var i in data.data) {
            // allPromises.push(new Promise(function(resolve, reject) {
                const name = data.data[i].name;
                const symbol = data.data[i].symbol;
                const rank = data.data[i].rank;
                const url = `https://coinmarketcap.com/currencies/${data.data[i].website_slug}`;
                const logo = `https://s2.coinmarketcap.com/static/img/coins/32x32/${data.data[i].id}.png`;

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
                    db.collection("tokens").add(result)
                    .then(function(docRef) {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });
                    // results.push(result);
                    // resolve();
                });
            // }));
        }
        // Promise.all(allPromises).then(function(){
        //     console.log(results);
        // });
    });
}

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