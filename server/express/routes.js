/* eslint-disable no-multi-assign */
const nextRoutes = require('@yolkai/next-routes').default;

/**
 * ROUTING EXAMPLES                                  // Name   Page      Pattern
 * .add('about')                                     // about  about     /about
 * .add('blog', '/blog/:slug')                       // blog   blog      /blog/:slug
 * .add('user', '/user/:id', 'profile')              // user   profile   /user/:id
 * .add('/:noname/:lang(en|es)/:wow+', 'complex')    // (none) complex   /:noname/:lang(en|es)/:wow+
 * .add({name: 'beta', pattern: '/v3', page: 'v3'})  // beta   v3        /v3
 */
const routes = nextRoutes() // ----   ----      -----
  .add('about');

module.exports = routes;
