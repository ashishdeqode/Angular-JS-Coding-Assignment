const createError = require("http-errors");
const GitUser = require("../schemas/git-user");
const axios = require("axios");
require("dotenv").config();

module.exports = {
  searchRepo: async (req, res, next) => {
    try {
      console.log("Req payload: ", req.query);
      const searchText = req.query.repo;
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const headerData = {
        Authorization: `token ${process.env.GIT_TOKEN}`,
      };
      axios
        .get(
          `https://api.github.com/search/repositories?q=${searchText}&page=${page}&per_page=${limit}`,
          { headers: headerData }
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
      const skip = (page * limit) - limit || 0;
      let searchResult = [];

      const searchRegex = new RegExp(searchText, "i");
      const totalDbUsers = await GitUser.countDocuments({ name: { $regex: searchRegex } });
      const dbUsers = await GitUser.find({ name: { $regex: searchRegex } }).skip(skip);

      if (dbUsers.length > 0) {
        console.log('<----Searched from DB---->');
        res.send({ succes: true, statusCode: 200, data: dbUsers, total_counts: totalDbUsers});
      } else {
        const headerData = {
          Authorization: `token ${process.env.GIT_TOKEN}`,
        };
        axios
          .get(
            `https://api.github.com/search/users?q=${searchText}&page=${page}&per_page=${limit}`,
            { headers: headerData }
          )
          .then(function (response) {
            searchResult = response.data.items;
            console.log('Search result: ', response.data);
            let promises = [];
            let users = [];
            searchResult.forEach((user) => {
              console.log("urllll---> ", user.url);
              promises.push(
                getUserProfile(user.url).then((result) => {
                  // console.log('User details: ', result);
                  if(result.name){
                    const regex = new RegExp(searchText, "i");
                    if (result.name.match(regex)) {
                      users.push(result);
                    }
                  }
                  // users.push(result)
                })
              );
            });

            return Promise.all(promises).then(() => {
              const saveUsers = GitUser.insertMany(users);
              // console.log('search result: ', users.length);
              res.send({ succes: true, statusCode: 200, data: users, total_counts: response.data.total_count });
            });
          })
          .catch(function (error) {
            console.log("Error: ", error);
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
    Authorization: `token ${process.env.GIT_TOKEN}`,
  };
  const response = await axios.get(url, { headers: headerData });
  return response.data;
}
