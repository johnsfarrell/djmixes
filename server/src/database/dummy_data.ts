const insertRecordsQuery: string = `
INSERT INTO mixes (user_id, title, file_url, cover_url, tags, visibility, allow_download, artist, album, is_deleted)
VALUES
(1, 'user1Mix1', '1732581611898_track1.mp3', '1732581611898_cover1.jpg', 'tag1,tag2', 'public', TRUE, 'Artist 1', 'Album 1', 0),
(2, 'Mix2', '1732581781195_track2.mp3', '1732581781195_cover2.jpg', 'tag3,tag4', 'public', FALSE, 'Artist 2', 'Album 2', 0),
(3, 'user1Mix3', '1732581611898_track1.mp3', '1732581611898_cover1.jpg', 'tag5,tag6', 'public', TRUE, 'Artist 3', 'Album 3', 0)
ON DUPLICATE KEY UPDATE user_id = VALUES(user_id);
`;

const insertUsersQuery: string = `
  INSERT INTO users (username, email, password, registration_method, active)
  VALUES
    ('user1', 'user1@example.com', 'password1', 0, 1),
    ('user2', 'user2@example.com', 'password2', 1, 0),
    ('user13', 'user13@example.com', 'password3', 1, 1)
    ON DUPLICATE KEY UPDATE username = VALUES(username);
`;

const insertCommentsQuery: string = `
  INSERT INTO comments (user_id, mix_id, comment_text, created_at)
  VALUES
    (1, 101, 'Great mix! Love the beats.', NOW()),
    (2, 102, 'This mix is a bit too slow for me.', NOW()),
    (3, 103, 'Amazing energy, would love to see more like this!', NOW())
    ON DUPLICATE KEY UPDATE comment_text = VALUES(comment_text);
`;

const insertLikesQuery: string = `
  INSERT INTO likes (user_id, mix_id)
  VALUES
    (1, 1),
    (2, 3),
    (3, 1)
    ON DUPLICATE KEY UPDATE mix_id = VALUES(mix_id);
`;

const insertFollowsQuery: string = `
  INSERT INTO follows (user_id, artist_id)
  VALUES
    (1, 1),
    (1, 2),
    (2, 3)
  ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), artist_id = VALUES(artist_id);
`;

const insertEventsQuery: string = `
  INSERT INTO events (title, date, artist_id, user_id, description, created_at)
  VALUES
    ('user1DJ Night', '2024-12-15 20:00:00', 1, 1, 'An exciting night with DJ X.', NOW()),
    ('user1Summer Fest', '2024-06-20 18:00:00', 2, 2, 'A music festival featuring popular artists.', NOW()),
    ('Rock Concert', '2024-09-10 19:00:00', 3, 3, 'A live rock concert by local bands.', NOW())
    ON DUPLICATE KEY UPDATE title = VALUES(title);
`;

const insertUserProfilesQuery: string = `
  INSERT INTO user_profiles (user_id, bio, avatar_url, created_at)
  VALUES
    (1, 'Music lover and DJ enthusiast.', 'https://example.com/avatar1.jpg', NOW()),
    (2, 'Guitarist and music producer.', 'https://example.com/avatar2.jpg', NOW()),
    (3, 'Enjoys creating mixes and exploring new genres.', 'https://example.com/avatar3.jpg', NOW())
    ON DUPLICATE KEY UPDATE bio = VALUES(bio), avatar_url = VALUES(avatar_url);
`;

export {
  insertUsersQuery,
  insertRecordsQuery,
  insertCommentsQuery,
  insertLikesQuery,
  insertFollowsQuery,
  insertEventsQuery,
  insertUserProfilesQuery,
};
