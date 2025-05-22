const { body, validationResult } = require("express-validator");
const db = require("../db/query");

async function index(req, res) {
    const albums = await db.getAlbums();

    res.render("./album/albums", {
        title : "Albums",
        albums : albums
    })
}

function createAlbumGet() {
    res.render("./album/albums_form", {
        title : "Create a new Album"
    })
}

module.exports = {
    index,
    createAlbumGet
};