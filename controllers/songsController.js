const { body, validationResult } = require("express-validator");
const db = require("../db/query");

async function index(req, res) {
    const songs = await db.getSongs();

    res.render("./song/songs", {
        title : "Dashboard",
        songs : songs,
    })
}


module.exports = {
    index
};