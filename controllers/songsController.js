const { body, validationResult } = require("express-validator");
const db = require("../db/query");

async function index(req, res) {
    const songs = await db.getSongs();

    res.render("./song/songs", {
        title : "Dashboard",
        songs : songs,
    })
}


async function createSongsGet(req, res) {
    const albums = await db.getAlbums();
    const genres = await db.getGenres();

    res.render("./song/song_form", {
        title : "Create a new Song",
        albums : albums,
        genres : genres
    })
}

async function createSongsPost(req, res) {
    const { title, album_id, genre_id, duration, image_url } = req.body;
    await db.createSong( title, album_id, genre_id, duration, image_url);
    res.redirect("/");
}


module.exports = {
    index,
    createSongsGet,
    createSongsPost
};