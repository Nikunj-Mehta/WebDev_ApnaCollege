CREATE TABLE user (
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL
);

-- This is a practice file showcasing we can use a file to run sql commands not used in any project.
-- To run this open mysql -u root -p in terminal then, USE statersql;  then source schema.sql;