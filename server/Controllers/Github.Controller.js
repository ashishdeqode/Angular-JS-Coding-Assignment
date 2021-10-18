const createError = require("http-errors");
const GitUser = require("../Models/git-user");
const axios = require("axios");
require("dotenv").config();

module.exports = {
  searchRepo: async (req, res, next) => {
    try {
      console.log("Req payload: ", req.query);
      const searchText = req.query.repo;
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      axios
        .get(
          `https://api.github.com/search/repositories?q=${searchText}&page=${page}&per_page=${limit}`
        )
        .then(function (response) {
          // console.log(response.data);
          res.send({ succes: true, statusCode: 200, data: response.data });
        })
        .catch(function (error) {
          console.log(error);
          res.send({ succes: false, statusCode: 400 });
        });
    } catch (error) {
      next(error);
    }
  },

  searchUser: async (req, res, next) => {
    try {
      console.log("Req payload: ", req.query);
      const searchText = req.query.user;
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      let searchResult = [];

      const searchRegex = new RegExp(searchText, "i");
      const dbUsers = await GitUser.find({ name: { $regex: searchRegex } });

      if (dbUsers.length > 0) {
        console.log('<----Searched from DB---->');
        res.send({ succes: true, statusCode: 200, data: dbUsers });
      } else {
        const headerData = {
          Authorization: `token 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`,
        };
        axios
          .get(
            `https://api.github.com/search/users?q=${searchText}&page=${page}&per_page=${limit}`,
            { headers: headerData }
          )
          .then(function (response) {
            searchResult = response.data.items;
            // console.log('Search result: ', searchResult);
            let promises = [];
            let users = [];
            searchResult.forEach((user) => {
              console.log("urllll---> ", user.url);
              promises.push(
                getUserProfile(user.url).then((result) => {
                  // console.log('User details: ', result);
                  const regex = new RegExp(searchText, "i");
                  if (result.name.match(regex)) {
                    users.push(result);
                  }
                  // users.push(result)
                })
              );
            });

            return Promise.all(promises).then(() => {
              const saveUsers = GitUser.insertMany(users);
              // console.log('search result: ', users.length);
              res.send({ succes: true, statusCode: 200, data: users });
            });
          })
          .catch(function (error) {
            console.log("Error: ", error.response);
            res.send({ succes: false, statusCode: 400 });
          });
      }
    } catch (error) {
      next(error);
    }
  },
};

async function getUserProfile(url) {
  console.log("url: ", url);
  const headerData = {
    Authorization: `token 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`,
  };
  const response = await axios.get(url, { headers: headerData });
  return response.data;
}
