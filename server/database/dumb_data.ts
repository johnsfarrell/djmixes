const insertRecordsQuery: string = `
    INSERT INTO mix (user_id, title, file_url, cover_url, tags, visibility, allow_download, artist, album, is_deleted)
    VALUES
    (1, 'Mix1', '/file1.mp3', '/cover1.jpg', 'tag1,tag2', 'public', TRUE, 'Artist 1', 'Album 1', 0),
    (2, 'Mix2', '/file2.mp3', '/cover2.jpg', 'tag3,tag4', 'private', FALSE, 'Artist 2', 'Album 2', 0),
    (3, 'Mix3', '/file3.mp3', '/cover3.jpg', 'tag5,tag6', 'public', TRUE, 'Artist 3', 'Album 3', 0),
    (4, 'Mix4', '/file4.mp3', '/cover4.jpg', 'tag7,tag8', 'private', FALSE, 'Artist 4', 'Album 4', 0),
    (5, 'Mix5', '/file5.mp3', '/cover5.jpg', 'tag9,tag10', 'public', TRUE, 'Artist 5', 'Album 5', 0),
    (6, 'Mix6', '/file6.mp3', '/cover6.jpg', 'tag11,tag12', 'private', FALSE, 'Artist 6', 'Album 6', 0),
    (7, 'Mix7', '/file7.mp3', '/cover7.jpg', 'tag13,tag14', 'public', TRUE, 'Artist 7', 'Album 7', 0),
    (8, 'Mix8', '/file8.mp3', '/cover8.jpg', 'tag15,tag16', 'private', FALSE, 'Artist 8', 'Album 8', 0),
    (9, 'Mix9', '/file9.mp3', '/cover9.jpg', 'tag17,tag18', 'public', TRUE, 'Artist 9', 'Album 9', 0),
    (10, 'Mix10', '/file10.mp3', '/cover10.jpg', 'tag19,tag20', 'private', FALSE, 'Artist 10', 'Album 10', 0);
`;

const insertUsersQuery: string = `
  INSERT INTO users (username, email, password, registration_method, active)
  VALUES
    ('user1', 'user1@example.com', 'password1', 0, 1),
    ('user2', 'user2@example.com', 'password2', 1, 0),
    ('user3', 'user3@example.com', 'password3', 1, 1),
    ('user4', 'user4@example.com', 'password4', 0, 0),
    ('user5', 'user5@example.com', 'password5', 1, 1),
    ('user6', 'user6@example.com', 'password6', 0, 0),
    ('user7', 'user7@example.com', 'password7', 1, 0),
    ('user8', 'user8@example.com', 'password8', 0, 0),
    ('user9', 'user9@example.com', 'password9', 1, 1),
    ('user10', 'user10@example.com', 'password10', 0, 0)
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
    (1, 101),
    (2, 102),
    (3, 103)
    ON DUPLICATE KEY UPDATE mix_id = VALUES(mix_id);
`;

const insertEventsQuery: string = `
  INSERT INTO events (title, date, artist_id, user_id, description, created_at)
  VALUES
    ('DJ Night', '2024-12-15 20:00:00', 1, 1, 'An exciting night with DJ X.', NOW()),
    ('Summer Fest', '2024-06-20 18:00:00', 2, 2, 'A music festival featuring popular artists.', NOW()),
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
  insertEventsQuery,
  insertUserProfilesQuery
};
