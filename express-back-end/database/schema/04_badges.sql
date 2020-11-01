DROP TABLE IF EXISTS badges CASCADE;
DROP TABLE IF EXISTS userBadges CASCADE;

-- CREATE TABLE badges (
--   id SERIAL PRIMARY KEY NOT NULL,
--   scene_id INTEGER REFERENCES scenes(id),
--   user_id INTEGER REFERENCES users(id),
--   title VARCHAR(255), 
--   description TEXT,
--   image VARCHAR(255) 
-- );

CREATE TABLE badges (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255), 
  description TEXT,
  image VARCHAR(255) 
);

CREATE TABLE userBadges (
  id SERIAL PRIMARY KEY NOT NULL, 
  user_id INTEGER REFERENCES users(id),
  badge_id INTEGER REFERENCES badges(id)

); 