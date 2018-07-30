const firebase = require("firebase");
const functions = require('firebase-functions');
const ICOBench = require('node-icobench');

const pubKey = 'a6a7f2f2-3358-495f-af38-a869f102f495';
const prikey = '6f14ecbf-39aa-4ca7-a2eb-70ca1b74dc4c';

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

let icobench = new ICOBench(pubKey, prikey);
let data;
let allPromises = [];
let results = [];

icobench.icos.all().then(function(response) {
    data = response.results;
    console.log(response);
}).then(() => new Promise((resolve) => setTimeout(resolve, 6000))).then(() => {

    for(var i in data) {
        allPromises.push(new Promise(function(resolve, reject) {
            const id = data[i].id;
            const name = data[i].name;
            const logo = data[i].logo;
            const desc = data[i].desc;
            const rating = data[i].rating;
            const dates = {
                preicostart: data[i].dates.preIcoStart,
                preicoend: data[i].dates.preIcoEnd,
                icostart: data[i].dates.icoStart,
                icoend: data[i].dates.icoEnd
            }
            
            const url = data[i].url;

            const getLink = new Promise(function(resolve, reject) {
                const links = getlinks(resolve, id);
            })

            getLink.then(function(links){
                result = {
                    name: name,
                    logo: logo,
                    desc: desc,
                    rating: rating,
                    dates: dates,
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

function getlinks(resolve, id) {
    icobench.ico.profile({ico: id}).then(function(response) {
        const data = response;
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
    }).then(() => new Promise((resolve) => setTimeout(resolve, 6000)));
}