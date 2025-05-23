const { body, validationResult } = require("express-validator");
const db = require("../db/query");

async function index(req, res) {
    const search = req.query.search;

    if (search) {
        const songs = await db.getSongWithTerm(search);
        const albums = await db.getAlbumWithTerm(search);
        const artist = await db.getArtistWithTerm(search);
        res.render("search" ,{
            title : "Results :",
            songs: songs,
            albums : albums,
            artist: artist
        })
    } else {
        const songs = await db.getRecentSongs();
        const albums = await db.getRecentAlbums();

        res.render("index", {
            title: "Dashboard",
            songs: songs,
            albums: albums
        })
    }
}

module.exports = {
    index
};