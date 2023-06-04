const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://btebresultsbd.com/booksList/footwear-technology-98-2016';

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // Use Cheerio selectors to extract the desired data from the HTML

    let books = [];

    $('.css-1xnox0e .css-1gqug66').each((index, element) => {
      const code = $(element).find('.css-1jbgjpv').text();
        const name = $(element).find('.css-bceb9r').text();
        books.push({ code, name });

    });
    fs.writeFile('graphic-design.json', JSON.stringify(books, null, 4), (err) => {
        console.log('File successfully written! - Check your project directory for the output.json file');
    });
    
  })
  .catch(error => {
    console.log(error);
  });
