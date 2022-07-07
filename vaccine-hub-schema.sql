CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  password      TEXT NOT NULL,
  first_name    varchar(25) NOT NULL,
  last_name     varchar(25) NOT NULL,
  email         TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
  location      varchar(25) NOT NULL,
  date          DATE NOT NULL
);


