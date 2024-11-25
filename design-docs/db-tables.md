All of the class provided below will interact with REST API part

### Table: `users`

| Column Name           | Data Type      | Constraints                 | Description                                               |
| --------------------- | -------------- | --------------------------- | --------------------------------------------------------- |
| `user_id`             | `INT`          | `PRIMARY KEY`, `UNIQUE`     | Auto-incrementing unique number.                          |
| `username`            | `VARCHAR(100)` | `NOT NULL`, `UNIQUE`        | Unique name chosen by the user for their account.         |
| `email`               | `VARCHAR(150)` | `NOT NULL`, `UNIQUE`        | User's email address for login and verification.          |
| `password`            | `VARCHAR(255)` | `NOT NULL`                  | Password for account security, stored securely.           |
| `registration_method` | `INT`          | `NOT NULL`                  | 0 for email registration, 1 for third-party registration. |
| `active`              | `TINYINT`      | `DEFAULT 0`                 | 0 - active, 1 - inactive.                                 |
| `create_time`         | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP` | Time when the account was created.                        |

### related class/Module for table `users`

- **Class/Module**: `UserService`

- **Public Methods**:

  - `getUserByName(username)`: get user information

  - `getUserById(user_id_)`: get user information by user_id

  - `getUserByEmail(email)`: get user information by email

  - `createUser(username, email, password, registration_method)`: create new user

  - `deleteUser(username)`: delete user from table

### Table: `session`

| Column Name     | Data Type      | Constraints                                         | Description                                                                  |
| --------------- | -------------- | --------------------------------------------------- | ---------------------------------------------------------------------------- |
| `session_id`    | `VARCHAR(255)` | `PRIMARY KEY`                                       | Unique identifier for each session (e.g., UUID or random hash)               |
| `user_id`       | `VARCHAR(255)` | `NOT NULL`, `FOREIGN KEY REFERENCES users(user_id)` | Id of the user to whom the session belongs                                   |
| `session_data`  | `TEXT`         | `NULL`                                              | Stores the actual session data (usually serialized as JSON or other formats) |
| `created_at`    | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP`, `NOT NULL`             | The timestamp when the session was created                                   |
| `last_accessed` | `TIMESTAMP`    | `NULL`                                              | The last time the session was accessed or updated                            |
| `expires_at`    | `TIMESTAMP`    | `NULL`                                              | Expiration time of the session (useful for session cleanup)                  |

### related class/Module for table `session`

- **Class/Module**: `SessionService`

- **Public Methods**:

  - `createSession(session_id, user_id, session_data, expires_at)`: save the session data into database

  - `getSession(session_id, user_id)`: return session data if still valid or exist, if session data exist but expired, delete from database, return null

### Table: `events`

stores events associated with songs along with the artists and users who manage these events.

| Column Name   | Data Type      | Constraints                                             | Description                                     |
| ------------- | -------------- | ------------------------------------------------------- | ----------------------------------------------- |
| `event_id`    | `INT`          | `PRIMARY KEY`, `AUTO_INCREMENT`                         | Unique identifier for the event                 |
| `title`       | `VARCHAR(255)` | `NOT NULL`                                              | Title of the event                              |
| `date`        | `DATETIME`     | `NOT NULL`                                              | Date and time of the event                      |
| `artist_id`   | `INT`          | `FOREIGN KEY REFERENCES artists(artist_id)`, `NOT NULL` | ID of the artist associated with the event      |
| `user_id`     | `INT`          | `FOREIGN KEY REFERENCES users(user_id)`, `NOT NULL`     | ID of the user who created or updated the event |
| `description` | `TEXT`         | `NULL`                                                  | A brief description of the event                |
| `created_at`  | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP`                             | Time when the event was created                 |
| `updated_at`  | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Time when the event was last updated            |

### related class/Module for table `events`

- **Class/Module**: `EventsService`

- **Public Methods**:

  - `insertEvent(event_id, title, date, artist_id, user_id, description)`: save the event data into database

  - `updateEvent(event_id, title, date, artist_id, user_id, description)`: update the event data into database

  - `getEventsBasedOnDj(artist_id)`: return event data related to this artist

  - `getEvent(event_id)`: return event data if exist, otherwise return null

### Table: `user_profiles`

detailed profile information for each user.

| Column Name  | Data Type      | Constraints                             | Description                                     |
| ------------ | -------------- | --------------------------------------- | ----------------------------------------------- |
| `profile_id` | `INT`          | `PRIMARY KEY`, `AUTO_INCREMENT`         | Unique ID for the profile                       |
| `user_id`    | `INT`          | `FOREIGN KEY REFERENCES users(user_id)` | Unique identifier for the user                  |
| `bio`        | `TEXT`         | `NULL`                                  | A brief description or bio provided by the user |
| `avatar_url` | `VARCHAR(255)` | `NULL`                                  | URL to the user's avatar image                  |
| `created_at` | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP`             | Time when the profile was created               |

### related class/Module for table `user_profiles`

- **Class/Module**: `UserProfilesService`

- **Public Methods**:

  - `insertProfiles(profile_id, user_id, bio, avatar_url)`: save profile data into database

  - `updateProfiles(profile_id, user_id, bio, avatar_url)`: update profile data

  - `deleteProfiles(user_id)`: delete profile data

  - `getProfiles(user_id)`: return profile data for this user

### Table: `mixes`

| Column Name      | Data Type                                          | Constraints                                             | Description                                                      |
| ---------------- | -------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------- |
| `mix_id`         | `INT`                                              | `PRIMARY KEY`, `AUTO_INCREMENT`                         | Unique identifier for the mix                                    |
| `user_id`        | `INT`                                              | `FOREIGN KEY REFERENCES users(user_id)`, `NOT NULL`     | ID of the user who uploaded the mix                              |
| `title`          | `VARCHAR(255)`                                     | `NOT NULL`                                              | The name of the uploaded mix                                     |
| `file_url`       | `VARCHAR(255)`                                     | `NOT NULL`                                              | The URL of the audio file of the mix being uploaded              |
| `cover_url`      | `VARCHAR(255)`                                     | `NULL`                                                  | The URL of the image file that acts as the visual cover          |
| `tags`           | `TEXT`                                             | `NULL`                                                  | A comma-separated list of tags or genres associated with the mix |
| `visibility`     | `ENUM('public', 'private', 'unlisted', 'friends')` | `NOT NULL`                                              | Determines who can access the mix                                |
| `allow_download` | `BOOLEAN`                                          | `DEFAULT FALSE`                                         | Specifies if others can download the mix                         |
| `created_at`     | `TIMESTAMP`                                        | `DEFAULT CURRENT_TIMESTAMP`                             | Time when the mix was uploaded                                   |
| `updated_at`     | `TIMESTAMP`                                        | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Time when the mix was last updated                               |
| `artist`         | `VARCHAR(255)`                                     | `NOT NULL`                                              | Artist of the song                                               |
| `album`          | `VARCHAR(255)`                                     | `NULL`                                                  | Album name (if applicable)                                       |
| `split_JSON`     | `VARCHAR(255)`                                     | `NULL`                                                  | JSON String for song splits
| `stem_drum_url`     | `VARCHAR(255)`                                     | `NULL`                                                  | url for drum url
| `stem_bass_url`     | `VARCHAR(255)`                                     | `NULL`                                                  | url for bass url
| `stem_synth_url`     | `VARCHAR(255)`                                     | `NULL`                                                  | url for synth url
| `stem_vocal_url`     | `VARCHAR(255)`                                     | `NULL`                                                  | url for vocal url
| `is_deleted`     | `TINYINT`                                          | `DEFAULT 0`                                             | 0 - active, 1 - soft deleted                                     |

### related class/Module for table `mixes`

- **Class/Module**: `MixesService`

- **Public Methods**:

  - `getMixes(mix_id)`: get song information based on mix_id

  - `insertMixes(user_id, title, artist, album, release_date, file_url, cover_url, tags, visibility, allow_download)`: insert mixes information into database

  - `updateMixes(mix_id, user_id, title, artist, album, release_date, file_url, cover_url, tags, visibility, allow_download)`: update mixes information

  - `deleteMixes(mix_id)`: delete song from table

### Table: `comments`

| Column Name    | Data Type   | Constraints                                         | Description                              |
| -------------- | ----------- | --------------------------------------------------- | ---------------------------------------- |
| `comment_id`   | `INT`       | `PRIMARY KEY`, `AUTO_INCREMENT`                     | Unique identifier for each comment       |
| `user_id`      | `INT`       | `FOREIGN KEY REFERENCES users(user_id)`, `NOT NULL` | ID of the user who made the comment      |
| `mix_id`       | `INT`       | `FOREIGN KEY REFERENCES mixes(mix_id)`, `NOT NULL`  | ID of the song or mix being commented on |
| `comment_text` | `TEXT`      | `NOT NULL`                                          | The text of the comment                  |
| `created_at`   | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP`                         | Time when the comment was created        |

### related class/Module for table `comments`

- **Class/Module**: `CommentService`

- **Public Methods**:

  - `getComments(mix_id)`: get comments relate to this mixes

  - `insertComments(comment_id, user_id, mix_id, comment_text)`: insert comment information into database

  - `updateComments(comment_id, user_id, mix_id, comment_text)`: update comment information

  - `deleteComments(comment_id)`: delete comment from table

### Table: `likes`

| Column Name  | Data Type   | Constraints                                         | Description                              |
| ------------ | ----------- | --------------------------------------------------- | ---------------------------------------- |
| `like_id`    | `INT`       | `PRIMARY KEY`, `AUTO_INCREMENT`                     | Unique identifier for each like          |
| `user_id`    | `INT`       | `FOREIGN KEY REFERENCES users(user_id)`, `NOT NULL` | ID of the user who liked the song or mix |
| `mix_id`     | `INT`       | `FOREIGN KEY REFERENCES mixes(mix_id)`, `NOT NULL`  | ID of the song or mix that was liked     |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP`                         | Time when the like was given             |

### related class/Module for table `likes`

- **Class/Module**: `LikesService`

- **Public Methods**:

  - `getLikes(mix_id)`: get number of likes to this mixes

  - `insertLikes(like_id, user_id, mix_id)`: insert like information into database

  - `deleteLikes(user_id)`: delete like from table
