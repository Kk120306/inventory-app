const pool = require("./pool");

async function getAlbums() {
    const albums = await pool.query("SELECT * FROM albums");
    return albums.rows;
}

async function getRecentAlbums() {
    const result = await pool.query("SELECT * FROM albums ORDER BY id DESC LIMIT 12");
    return result.rows;
}


async function getArtists() {
    const artists = await pool.query("SELECT * FROM artists");
    return artists.rows;
}

async function createArtist(name, country, birth_date, image_url) {
    await pool.query("INSERT INTO artists (title, artist_id, genre_id) VALUES ($1, $2, $3)",
        [title, artist_id, genre_id]
    );
}


async function getGenres() {
    const genres = await pool.query("SELECT * FROM genres");
    return genres.rows;
}




async function getSongs() {
    const songs = await pool.query("SELECT * FROM songs");
    return songs.rows;
}

async function getRecentSongs() {
    const result = await pool.query("SELECT * FROM songs ORDER BY id DESC LIMIT 12");
    return result.rows;
}

module.exports = {
    getAlbums,
    getArtists,
    getGenres,
    getSongs,
    getRecentSongs,
    getRecentAlbums,
    createArtist
};