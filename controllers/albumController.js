const { body, validationResult } = require("express-validator");
const db = require("../db/query");

async function index(req, res) {
    const albums = await db.getAlbums();

    res.render("./album/albums", {
        title : "Albums",
        albums : albums
    })
}

async function createAlbumGet(req, res) {
    const artists = await db.getArtists();
    res.render("./album/albums_form", {
        title : "Create a new Album",
        artists : artists
    })
}

async function createAlbumPost(req, res) {
    const { title, artist_id, release_date, image_url } = req.body;
    await db.createAlbum( title, artist_id, release_date, image_url);
    res.redirect("/");
}


module.exports = {
    index,
    createAlbumGet,
    createAlbumPost
};