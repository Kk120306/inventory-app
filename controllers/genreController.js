const { body, validationResult } = require("express-validator");
const db = require("../db/query");

async function index(req, res) {
    const genres = await db.getGenres();

    res.render("./genre/genres", {
        title : "Dashboard",
        genres : genres
    })
}

module.exports = {
    index
};