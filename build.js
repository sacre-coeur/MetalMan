
var
  metalsmith = require('metalsmith'),
  markdown = require('metalsmith-markdown'),
  templates = require('metalsmith-templates'),
  assets = require('metalsmith-assets'),
  collections = require('metalsmith-collections'),
  contentful = require('contentful-metalsmith')


ms = metalsmith(__dirname) // the working directory
  .clean(true) // clean the build directory
  .metadata({
    site: {
      name: 'Sacre Coeur',
    }
  })
  .source('./src/html/') // the page source directory
  .destination('./build/') // the destination directory
  .use(assets({
    source: 'src/assets/', // relative to the working directory
    destination: './assets/' // relative to the build directory
  }))

  .use(collections({
    interview: {
      pattern: 'interview/*.md',
      sortBy: 'date',
      reverse: true
    },
    bio: {
      pattern: 'bio/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))

  .use(markdown({
    breaks: true,
  })) // convert markdown to HTML
  .use(contentful({
    space_id: 'knnbub1gupcl',
    access_token: 'dad21cd7010f7eb24533c2f50a8502b1704b30051ebaea6e2ddc0c3b906769f8',

  }))

  .use(templates({
    engine: 'handlebars',
    directory: './src/template',
    default: 'article.html',
    pattern: ["*/*/*html", "*/*html", "*html"],
    partials: {
      articleheader: '../partials/articleheader',
      indexheader: '../partials/indexheader',
      indexfooter: '../partials/indexfooter',
      articlefooter: '../partials/articlefooter'

    }
  }))

  .build(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Mission: Success!');
    }
  });;