const axios = require('axios');
const dotenv = require('dotenv').config();
const searchUrl = process.env.DB_GOOGLEBOOKSEARCHURL;

module.exports = {
  searchGoogle: function(req, res) {
    axios
      .get(searchUrl, { params: req.query })
      .then(results => results.data.items)
      .then(books => res.json(books))
      .catch(err => res.status(422).json(err));
  }
};