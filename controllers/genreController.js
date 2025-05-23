const { body, validationResult } = require("express-validator");
const db = require("../db/query");

async function index(req, res) {
    const genres = await db.getGenres();

    res.render("./genre/genres", {
        title : "Dashboard",
        genres : genres
    })
}


function createGenreGet(req, res) {
    res.render("./genre/genres_form", {
        title : "Create genres"
    })
}

async function createGenrePost(req,res) {
    const { name, desc } = req.body;
    await db.createGenre(name, desc);
    res.redirect("/");
}

module.exports = {
    index,
    createGenreGet,
    createGenrePost
};