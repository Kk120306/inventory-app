const { body, validationResult } = require("express-validator");
const db = require("../db/query");

async function index(req, res) {
    const artists = await db.getArtists();

    res.render("./artist/artists", {
        title : "Dashboard",
        artists: artists
    })
}

function createArtistGet() {
    res.render("./artist/artists_form")
}

async function createArtistPost(req,res) {
    const { name, country, birth_date, image_url } = req.body();
    await db.createArtist(name, country, birth_date, image_url);
    res.redirect("/");
}

module.exports = {
    index,
    createArtistGet,
    createArtistPost
};