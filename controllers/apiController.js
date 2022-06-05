var config = require("../config");
var pgp = require("pg-promise")();
var db = pgp(config.getDbConnectionString());
module.exports = function (app) {
  app.get("/api/countries", function (req, res) {
    db.any("select code, name from country;")
      .then(function (data) {
        res.json({
          status: "success",
          data: data,
        });
      })
      .catch((err) => {
        res.json({
          description: "Tekkis viga",
          error: err,
        });
      });
  });

  app.get("/api/continents", function (req, res) {
    db.any("SELECT DISTINCT continent FROM country")
      .then(function (data) {
        res.json({
          status: "success",
          data: data,
        });
      })
      .catch((err) => {
        res.json({
          description: "Tekkis viga",
          error: err,
        });
      });
  });
  app.get("/api/continents/:continent/capitals", function (req, res) {
    db.any(
      "SELECT sensor.sensorname FROM sensor INNER JOIN controller_sensor ON controller_sensor.id_sensor=sensor.id " +
        "WHERE controller_sensor.room=" +
        req.params.number +
        ":: varchar"
    )
      .then(function (data) {
        res.json({
          status: "success",
          data: data,
        });
      })
      .catch(function (err) {
        return next(err);
      });
  });
};
