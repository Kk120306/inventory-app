const pool = require("./pool");

async function getAlbums() {
    const albums = await pool.query("SELECT * FROM albums");
    return albums.rows;
}

async function createAlbum(title, artist_id, release_date, image_url) {
    await pool.query("INSERT INTO albums (title, artist_id, release_date, image_url) VALUES ($1, $2, $3, $4)",
        [title, artist_id, release_date, image_url]
    );
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
    await pool.query("INSERT INTO artists (name, country, birth_date, image_url) VALUES ($1, $2, $3, $4)",
        [name, country, birth_date, image_url]
    );
}


async function getGenres() {
    const genres = await pool.query("SELECT * FROM genres");
    return genres.rows;
}


async function createGenre(name, desc) {
    await pool.query("INSERT INTO genres (name, desc) VALUES ($1, $2)",
        [name, desc]
    );
}

async function getSongs() {
    const songs = await pool.query("SELECT * FROM songs");
    return songs.rows;
}

async function getRecentSongs() {
    const result = await pool.query("SELECT * FROM songs ORDER BY id DESC LIMIT 12");
    return result.rows;
}

async function createSong(title, album_id, genre_id, duration, image_url) {
    await pool.query("INSERT INTO songs (title, album_id, genre_id, duration, image_url) VALUES ($1, $2, $3, $4, $5)",
        [title, album_id, genre_id, duration, image_url]
    );
}

async function getArtistWithTerm(search) {
    const result = await pool.query(`
        SELECT * FROM artists
        WHERE LOWER(name) LIKE LOWER($1)
        ORDER BY name ASC
    `, [`%${search}%`]);
    return result.rows;
}


async function getAlbumWithTerm(search) {
    const result = await pool.query(`
        SELECT albums.*, artists.name AS artist_name
        FROM albums
        JOIN artists ON albums.artist_id = artists.id
        WHERE LOWER(albums.title) LIKE LOWER($1)
           OR LOWER(artists.name) LIKE LOWER($1)
        ORDER BY albums.title ASC
    `, [`%${search}%`]);
    return result.rows;
}


async function getSongWithTerm(search) {
    const result = await pool.query(`
        SELECT songs.*, albums.title AS album_title, artists.name AS artist_name
        FROM songs
        JOIN albums ON songs.album_id = albums.id
        JOIN artists ON albums.artist_id = artists.id
        WHERE LOWER(songs.title) LIKE LOWER($1)
           OR LOWER(artists.name) LIKE LOWER($1)
        ORDER BY songs.title ASC
    `, [`%${search}%`]);
    return result.rows;
}



module.exports = {
    getAlbums,
    getArtists,
    getGenres,
    getSongs,
    getRecentSongs,
    getRecentAlbums,
    createArtist,
    createGenre,
    createSong,
    createAlbum,
    getSongWithTerm,
    getAlbumWithTerm,
    getArtistWithTerm

};