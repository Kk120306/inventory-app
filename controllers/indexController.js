const { body, validationResult } = require("express-validator");
const db = require("../db/query");

async function index(req, res) {
    const songs = await db.getRecentSongs();
    const albums = await db.getRecentAlbums();

    res.render("index", {
        title : "Dashboard",
        songs : songs,
        albums : albums
    })
}

module.exports = {
    index
};