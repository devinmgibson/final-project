DROP DATABASE IF EXISTS high-scores;
CREATE DATABASE high-scores;

\c high-scores;

CREATE TABLE scores (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  password VARCHAR,
  score INTEGER
);
