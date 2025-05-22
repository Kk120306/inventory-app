#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS artists (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS albums (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS songs (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  album_id INTEGER REFERENCES albums(id) ON DELETE CASCADE,
  genre_id INTEGER REFERENCES genres(id) ON DELETE SET NULL,
  duration INTEGER  -- duration in seconds
);

-- Optional: Insert sample data
INSERT INTO artists (name) VALUES ('Drake'), ('Kendrick Lamar'), ('Taylor Swift');

INSERT INTO genres (name) VALUES ('Hip Hop'), ('Pop'), ('Rock');

INSERT INTO albums (title, artist_id) VALUES 
  ('Take Care', 1),
  ('DAMN.', 2),
  ('1989', 3);

INSERT INTO songs (title, album_id, genre_id, duration) VALUES
  ('Headlines', 1, 1, 210),
  ('HUMBLE.', 2, 1, 178),
  ('Blank Space', 3, 2, 231);
`;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  }); 

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();