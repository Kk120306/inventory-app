#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS artists (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100),
  birth_date DATE,
  image_url TEXT
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS albums (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
  release_date DATE,
  image_url TEXT
);

CREATE TABLE IF NOT EXISTS songs (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  album_id INTEGER REFERENCES albums(id) ON DELETE CASCADE,
  genre_id INTEGER REFERENCES genres(id) ON DELETE SET NULL,
  duration INTEGER,
  image_url TEXT
);

INSERT INTO artists (name, country, birth_date, image_url) VALUES
  ('Drake', 'Canada', '1986-10-24', 'https://example.com/drake.jpg'),
  ('Kendrick Lamar', 'USA', '1987-06-17', 'https://example.com/kendrick.jpg'),
  ('Taylor Swift', 'USA', '1989-12-13', 'https://example.com/taylor.jpg');

INSERT INTO genres (name, description) VALUES
  ('Hip Hop', 'Urban music with rhythmic and rhyming speech'),
  ('Pop', 'Mainstream catchy and melodic music'),
  ('Rock', 'Music with electric guitars and strong beats');

INSERT INTO albums (title, artist_id, release_date, image_url) VALUES 
  ('Take Care', 1, '2011-11-15', 'https://example.com/take-care.jpg'),
  ('DAMN.', 2, '2017-04-14', 'https://example.com/damn.jpg'),
  ('1989', 3, '2014-10-27', 'https://example.com/1989.jpg');

INSERT INTO songs (title, album_id, genre_id, duration, image_url) VALUES
  ('Headlines', 1, 1, 210, 'https://example.com/headlines.jpg'),
  ('HUMBLE.', 2, 1, 178, 'https://example.com/humble.jpg'),
  ('Blank Space', 3, 2, 231, 'https://example.com/blank-space.jpg');

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