const algoliasearch = require('algoliasearch/lite');
const express = require('express');
const asyncHandler = require('express-async-handler');
// const redis = require('redis');

const router = express.Router();

/**
 * Algolia
 *
 * Get a term: http://localhost:3001/api/algolia?searchIndex=cast&lookFor=mickey-mouse
 * Get all terms: http://localhost:3001/api/algolia?searchIndex=cast
 * Get related products: http://localhost:3001/api/algolia?searchIndex=product&lookFor='Tee'
 * Get a product by id: http://localhost:3001/api/algolia?searchIndex=product&lookFor=79204
 */
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    // const redisClient = redis.createClient(process.env.REDISCLOUD_URL, {
    //   no_ready_check: true,
    // });
    // const getAsync = promisify(redisClient.get).bind(redisClient);
    // const setAsync = promisify(redisClient.set).bind(redisClient);

    let searchIndex = req.query.searchIndex;
    let lookFor = req.query.lookFor;
    // let lookFor = req.query.lookFor;
    let pageName;
    let searchPermalink;

    switch (searchIndex) {
      case 'cast':
        searchIndex = 'mtw_terms_cast';
        pageName = 'All Cast Members';
        searchPermalink = 'cast';
        break;
      case 'brands':
        searchIndex = 'mtw_terms_product_brand';
        pageName = 'All Brands';
        searchPermalink = 'brand';
        break;
      case 'films':
        searchIndex = 'mtw_terms_film';
        pageName = 'All Films & Shows';
        searchPermalink = 'film';
        break;
      case 'product-category':
        searchIndex = 'mtw_terms_product_cat';
        pageName = 'All Product Categories';
        searchPermalink = 'category';
        break;
      case 'product':
        searchIndex = 'mtw_posts_product';
        pageName = 'All Products';
        searchPermalink = 'product';
        break;
      default:
    }

    const searchClient = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_API_KEY
    );
    const algoliaSearch = searchClient.initIndex(searchIndex);

    // Requires admin key
    algoliaSearch.setSettings(
      {
        searchableAttributes: [
          'name',
          'post_id',
          'post_title',
          'slug',
          'term_id',
        ],
      }
      // (err, content) => {
      //   console.log(content);
      // }
    );

    algoliaSearch.search(lookFor, (err, content) => {
      if (err) {
        // console.log(err.message);
        // console.log(err.debugData);
        return;
      }

      res.json({
        data: content,
        pageName: pageName,
        searchPermalink: searchPermalink,
      });
    });
  })
);

module.exports = router;
