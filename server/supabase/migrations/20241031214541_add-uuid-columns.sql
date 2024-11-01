CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER TABLE games 
ADD COLUMN publicId UUID DEFAULT uuid_generate_v4();

ALTER TABLE leagues 
ADD COLUMN publicId UUID DEFAULT uuid_generate_v4();

ALTER TABLE players
ADD COLUMN publicId UUID DEFAULT uuid_generate_v4();

ALTER TABLE teams
ADD COLUMN publicId UUID DEFAULT uuid_generate_v4();