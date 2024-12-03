const insertRecordsQuery: string = `
INSERT INTO mixes (user_id, title, file_url, cover_url, tags, visibility, allow_download, artist, album, is_deleted)
VALUES
(1, 'DJMix1', '1732581611898_track1.mp3', '1732581611898_cover1.jpg', 'house,techno', 'public', TRUE, 'DJ One', 'House Vibes', 0),
(1, 'DJMix2', '1732581611898_track2.mp3', '1732581611898_cover1.jpg', 'house,techno', 'public', TRUE, 'DJ One', 'House Vibes', 0),
(2, 'ElectroMix1', '1732581781195_track3.mp3', '1732581781195_cover2.jpg', 'electro,edm', 'private', FALSE, 'Electro Master', 'EDM Universe', 0),
(2, 'ElectroMix2', '1732581781195_track4.mp3', '1732581781195_cover2.jpg', 'electro,edm', 'public', FALSE, 'Electro Master', 'EDM Universe', 0),
(3, 'IndieMix1', '1732581611898_track5.mp3', '1732581611898_cover3.jpg', 'indie,acoustic', 'public', TRUE, 'Indie Artist', 'Strum Acoustic', 0),
(3, 'IndieMix2', '1732581611898_track6.mp3', '1732581611898_cover3.jpg', 'indie,acoustic', 'private', TRUE, 'Indie Artist', 'Strum Acoustic', 0),
(4, 'PopMix1', '1732581891254_track7.mp3', '1732581891254_cover4.jpg', 'pop,summer', 'public', TRUE, 'Pop Singer', 'Summer Hits', 0),
(5, 'RockMix1', '1732581991122_track8.mp3', '1732581991122_cover5.jpg', 'rock,classic', 'public', TRUE, 'Rock Band', 'Classic Rock Anthems', 0),
(5, 'RockMix2', '1732581991122_track9.mp3', '1732581991122_cover5.jpg', 'rock,classic', 'public', TRUE, 'Rock Band', 'Classic Rock Anthems', 0),
(6, 'JazzMix1', '1732582091323_track10.mp3', '1732582091323_cover6.jpg', 'jazz,smooth', 'private', FALSE, 'Jazz Trio', 'Smooth Jazz Vibes', 0),
(7, 'ChillMix1', '1732582191456_track11.mp3', '1732582191456_cover7.jpg', 'chill,lounge', 'public', TRUE, 'Chill Beats', 'Lounge Grooves', 0),
(8, 'TrapMix1', '1732582291789_track12.mp3', '1732582291789_cover8.jpg', 'trap,hiphop', 'public', FALSE, 'Trap King', 'Bassline Trap', 0),
(9, 'EDMMix1', '1732582391876_track13.mp3', '1732582391876_cover9.jpg', 'edm,techno', 'private', TRUE, 'DJ Electro', 'Techno Night', 0),
(10, 'HipHopMix1', '1732582491987_track14.mp3', '1732582491987_cover10.jpg', 'hiphop,rap', 'public', TRUE, 'HipHop Legend', 'Rap Origins', 0),
(1, 'DJMix3', '1732581611898_track15.mp3', '1732581611898_cover1.jpg', 'house,techno', 'public', TRUE, 'DJ One', 'House Vibes', 0),
(2, 'ElectroMix3', '1732581781195_track16.mp3', '1732581781195_cover2.jpg', 'electro,edm', 'private', FALSE, 'Electro Master', 'EDM Universe', 0),
(3, 'IndieMix3', '1732581611898_track17.mp3', '1732581611898_cover3.jpg', 'indie,acoustic', 'public', TRUE, 'Indie Artist', 'Strum Acoustic', 0),
(4, 'PopMix2', '1732581891254_track18.mp3', '1732581891254_cover4.jpg', 'pop,summer', 'private', TRUE, 'Pop Singer', 'Summer Hits', 0),
(5, 'RockMix3', '1732581991122_track19.mp3', '1732581991122_cover5.jpg', 'rock,classic', 'public', TRUE, 'Rock Band', 'Classic Rock Anthems', 0),
(6, 'JazzMix2', '1732582091323_track20.mp3', '1732582091323_cover6.jpg', 'jazz,smooth', 'private', TRUE, 'Jazz Trio', 'Smooth Jazz Vibes', 0),
(7, 'ChillMix2', '1732582191456_track21.mp3', '1732582191456_cover7.jpg', 'chill,lounge', 'public', TRUE, 'Chill Beats', 'Lounge Grooves', 0),
(8, 'TrapMix2', '1732582291789_track22.mp3', '1732582291789_cover8.jpg', 'trap,hiphop', 'private', TRUE, 'Trap King', 'Bassline Trap', 0),
(9, 'EDMMix2', '1732582391876_track23.mp3', '1732582391876_cover9.jpg', 'edm,techno', 'public', TRUE, 'DJ Electro', 'Techno Night', 0),
(10, 'HipHopMix2', '1732582491987_track24.mp3', '1732582491987_cover10.jpg', 'hiphop,rap', 'private', TRUE, 'HipHop Legend', 'Rap Origins', 0),
(1, 'DJMix4', '1732581611898_track25.mp3', '1732581611898_cover1.jpg', 'house,techno', 'public', TRUE, 'DJ One', 'House Vibes', 0),
(2, 'ElectroMix4', '1732581781195_track26.mp3', '1732581781195_cover2.jpg', 'electro,edm', 'private', FALSE, 'Electro Master', 'EDM Universe', 0),
(3, 'IndieMix4', '1732581611898_track27.mp3', '1732581611898_cover3.jpg', 'indie,acoustic', 'public', TRUE, 'Indie Artist', 'Strum Acoustic', 0),
(4, 'PopMix3', '1732581891254_track28.mp3', '1732581891254_cover4.jpg', 'pop,summer', 'private', TRUE, 'Pop Singer', 'Summer Hits', 0),
(5, 'RockMix4', '1732581991122_track29.mp3', '1732581991122_cover5.jpg', 'rock,classic', 'public', TRUE, 'Rock Band', 'Classic Rock Anthems', 0),
(6, 'JazzMix3', '1732582091323_track30.mp3', '1732582091323_cover6.jpg', 'jazz,smooth', 'private', TRUE, 'Jazz Trio', 'Smooth Jazz Vibes', 0),
(7, 'ChillMix3', '1732582191456_track31.mp3', '1732582191456_cover7.jpg', 'chill,lounge', 'public', TRUE, 'Chill Beats', 'Lounge Grooves', 0),
(8, 'TrapMix3', '1732582291789_track32.mp3', '1732582291789_cover8.jpg', 'trap,hiphop', 'private', TRUE, 'Trap King', 'Bassline Trap', 0),
(9, 'EDMMix3', '1732582391876_track33.mp3', '1732582391876_cover9.jpg', 'edm,techno', 'public', TRUE, 'DJ Electro', 'Techno Night', 0),
(10, 'HipHopMix3', '1732582491987_track34.mp3', '1732582491987_cover10.jpg', 'hiphop,rap', 'private', TRUE, 'HipHop Legend', 'Rap Origins', 0)
ON DUPLICATE KEY UPDATE user_id = VALUES(user_id);
`;

const insertUsersQuery: string = `
  INSERT INTO users (username, email, password, registration_method, active)
  VALUES
    ('user1', 'user1@example.com', 'password1', 0, 1),
    ('user2', 'user2@example.com', 'password2', 1, 0),
    ('user3', 'user3@example.com', 'password3', 1, 1),
    ('user4', 'user4@example.com', 'password4', 0, 1),
    ('user5', 'user5@example.com', 'password5', 1, 0),
    ('user6', 'user6@example.com', 'password6', 1, 1),
    ('user7', 'user7@example.com', 'password7', 0, 1),
    ('user8', 'user8@example.com', 'password8', 1, 0),
    ('user9', 'user9@example.com', 'password9', 1, 1),
    ('user10', 'user10@example.com', 'password10', 0, 1)
    ON DUPLICATE KEY UPDATE username = VALUES(username);`;

const insertCommentsQuery: string = `
  INSERT INTO comments (user_id, mix_id, comment_text, created_at)
  VALUES
    (1, 101, 'Great mix! Love the beats.', NOW()),
    (2, 102, 'This mix is a bit too slow for me.', NOW()),
    (3, 103, 'Amazing energy, would love to see more like this!', NOW()),
    (4, 104, 'Very unique sound, enjoyed it!', NOW()),
    (5, 105, 'Good effort but could use some refining.', NOW()),
    (6, 106, 'Superb mix, added to my playlist!', NOW()),
    (7, 107, 'Loved the transitions in this one.', NOW()),
    (8, 108, 'A bit too experimental for my taste.', NOW()),
    (9, 109, 'Absolutely brilliant, keep it up!', NOW()),
    (10, 110, 'Not my style, but well done.', NOW())
    ON DUPLICATE KEY UPDATE comment_text = VALUES(comment_text);`;

const insertLikesQuery: string = `
  INSERT INTO likes (user_id, mix_id)
  VALUES
    (1, 1), (1, 2), (1, 5), (1, 7), (1, 9),
    (2, 3), (2, 6), (2, 8), (2, 10), (2, 11),
    (3, 2), (3, 4), (3, 6), (3, 12), (3, 15),
    (4, 1), (4, 5), (4, 7), (4, 13), (4, 16),
    (5, 4), (5, 9), (5, 11), (5, 14), (5, 17),
    (6, 2), (6, 8), (6, 10), (6, 18), (6, 20),
    (7, 3), (7, 7), (7, 9), (7, 19), (7, 21),
    (8, 1), (8, 6), (8, 8), (8, 14), (8, 22),
    (9, 2), (9, 3), (9, 5), (9, 10), (9, 24),
    (10, 1), (10, 4), (10, 6), (10, 11), (10, 25),
    (1, 12), (1, 14), (1, 17), (1, 19), (1, 23),
    (2, 5), (2, 7), (2, 9), (2, 16), (2, 18),
    (3, 10), (3, 11), (3, 15), (3, 17), (3, 26),
    (4, 3), (4, 6), (4, 10), (4, 13), (4, 27),
    (5, 8), (5, 12), (5, 14), (5, 18), (5, 28),
    (6, 1), (6, 4), (6, 9), (6, 11), (6, 29),
    (7, 2), (7, 6), (7, 12), (7, 14), (7, 30),
    (8, 3), (8, 7), (8, 13), (8, 16), (8, 19),
    (9, 5), (9, 8), (9, 10), (9, 13), (9, 20),
    (10, 1), (10, 6), (10, 9), (10, 14), (10, 30),
    (1, 21), (1, 24), (1, 27), (1, 29), (1, 30),
    (2, 12), (2, 15), (2, 17), (2, 20), (2, 26),
    (3, 19), (3, 21), (3, 23), (3, 28), (3, 30),
    (4, 25), (4, 26), (4, 27), (4, 29), (4, 30)
  ON DUPLICATE KEY UPDATE mix_id = VALUES(mix_id);
`;  

const insertFollowsQuery: string = `
  INSERT INTO follows (user_id, artist_id)
  VALUES
    (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
    (2, 1), (2, 3), (2, 4), (2, 5), (2, 7),
    (3, 2), (3, 1), (3, 5), (3, 6), (3, 8),
    (4, 3), (4, 2), (4, 6), (4, 7), (4, 9),
    (5, 1), (5, 4), (5, 6), (5, 7), (5, 10),
    (6, 2), (6, 4), (6, 5), (6, 8), (6, 9),
    (7, 1), (7, 3), (7, 4), (7, 5), (7, 10),
    (8, 1), (8, 2), (8, 6), (8, 7), (8, 9),
    (9, 3), (9, 4), (9, 5), (9, 8), (9, 10),
    (10, 2), (10, 3), (10, 6), (10, 7), (10, 8)
  ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), artist_id = VALUES(artist_id);
`;

const insertEventsQuery: string = `
  INSERT INTO events (title, date, artist_id, user_id, description, created_at)
  VALUES
    ('DJ Night 1', '2024-12-15 20:00:00', 1, 1, 'An exciting night with DJ X.', NOW()),
    ('Summer Fest 2', '2024-06-20 18:00:00', 2, 2, 'A music festival featuring popular artists.', NOW()),
    ('Rock Concert 3', '2024-09-10 19:00:00', 3, 3, 'A live rock concert by local bands.', NOW()),
    ('Jazz Night 4', '2024-03-12 19:30:00', 4, 4, 'An intimate jazz evening.', NOW()),
    ('Pop Festival 5', '2024-07-15 17:00:00', 5, 5, 'A celebration of pop music.', NOW()),
    ('Electronic Beats 6', '2024-11-22 21:00:00', 6, 6, 'A night of electronic vibes.', NOW()),
    ('Classic Fest 7', '2024-04-10 19:00:00', 7, 7, 'A journey through classical music.', NOW()),
    ('Indie Jam 8', '2024-05-18 20:00:00', 8, 8, 'An indie music showcase.', NOW()),
    ('Folk Evening 9', '2024-08-25 19:30:00', 9, 9, 'A soulful evening of folk music.', NOW()),
    ('Hip Hop Night 10', '2024-10-30 22:00:00', 10, 10, 'A night of hip hop and rap.', NOW())
    ON DUPLICATE KEY UPDATE title = VALUES(title);`;

const insertUserProfilesQuery: string = `
  INSERT INTO user_profiles (user_id, bio, avatar_url, created_at)
  VALUES
    (1, 'Music lover and DJ enthusiast.', 'https://example.com/avatar1.jpg', NOW()),
    (2, 'Guitarist and music producer.', 'https://example.com/avatar2.jpg', NOW()),
    (3, 'Enjoys creating mixes and exploring new genres.', 'https://example.com/avatar3.jpg', NOW()),
    (4, 'Live performer with a passion for acoustic.', 'https://example.com/avatar4.jpg', NOW()),
    (5, 'Pop artist and singer-songwriter.', 'https://example.com/avatar5.jpg', NOW()),
    (6, 'Electronic music producer.', 'https://example.com/avatar6.jpg', NOW()),
    (7, 'Drummer and sound engineer.', 'https://example.com/avatar7.jpg', NOW()),
    (8, 'Classical pianist with a modern twist.', 'https://example.com/avatar8.jpg', NOW()),
    (9, 'Hip hop artist and lyricist.', 'https://example.com/avatar9.jpg', NOW()),
    (10, 'Indie folk singer with a passion for storytelling.', 'https://example.com/avatar10.jpg', NOW()),
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
