let express = require('express');
let router = express.Router();
let rq = require('request-promise');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({ title: 'Social Crypto API' });
});


router.get('/toptencryptos', async (req, res) => {
    let topCryptoCall = await rq(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=${process.env.CRYPTO_API_KEY}`);
    let topCryptos = JSON.parse(topCryptoCall);
    topCryptos = topCryptos.Data;

    for(let i = 0; i < topCryptos.length; i++){
        topCryptos[i].RAW.USD.CHANGEPCT24HOUR = Math.round(topCryptos[i].RAW.USD.CHANGEPCT24HOUR * 100) / 100
    }

    res.json(topCryptos)
});

router.get('/topnewsarticles', async (req, res) => {
    let newNewsArticlesCall = await rq(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${process.env.CRYPTO_API_KEY}`);
    let newNewsArticles = JSON.parse(newNewsArticlesCall);
    newNewsArticles = newNewsArticles.Data;
    let newsArticles = {
        featuredNewsArticle: newNewsArticles.slice(0, 1),
        otherNewsArticles: newNewsArticles.slice(1, 5)
    }

    res.json(newsArticles)
});

module.exports = router;
