const { Router } = require("express");
const router = Router();

const indexController = require("../controllers/indexController");
const albumController = require("../controllers/albumController");
const artistController = require("../controllers/artistController");
const genreController = require("../controllers/genreController");
const songsController = require("../controllers/songsController");


// Homepage Routes 
router.get("/", indexController.index);

// Album Routes 
router.get("/albums", albumController.index);

router.get("/albums/create", albumController.createAlbumGet);
router.post("/albums/create", albumController.createAlbumPost);

// Artist Routes 
router.get("/artists", artistController.index);

router.get("/artists/create", artistController.createArtistGet);
router.post("/artists/create", artistController.createArtistPost);


// Gener Routes 
router.get("/genres", genreController.index);

router.get("/genres/create", genreController.createGenreGet);
router.post("/genres/create", genreController.createGenrePost);

// Song Routes 
router.get("/songs", songsController.index);

router.get("/songs/create", songsController.createSongsGet);
router.post("/songs/create", songsController.createSongsPost);




module.exports = router;