### Table: `users` ###

| Column Name         | Data Type      | Constraints                                       | Description                                      |
|---------------------|----------------|--------------------------------------------------|--------------------------------------------------|
| `ID`                | `INT`          | `PRIMARY KEY`, `AUTO_INCREMENT`                  | Auto-incrementing unique number.                 |
| `username`          | `VARCHAR(100)` | `NOT NULL`, `UNIQUE`                             | Unique name chosen by the user for their account.|
| `email`             | `VARCHAR(150)` | `NOT NULL`, `UNIQUE`                             | User's email address for login and verification. |
| `password`          | `VARCHAR(255)` | `NOT NULL`                                       | Password for account security, stored securely.  |
| `registration_method`| `INT`         | `NOT NULL`                                       | 0 for email registration, 1 for third-party registration.|
| `active`            | `TINYINT`      | `DEFAULT 0`                                      | 0 - active, 1 - inactive.                        |
| `create_time`       | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP`                      | Time when the account was created.               |


### Table: `session` ###


| Column Name    | Data Type      | Constraints                                      | Description                                    |
|----------------|----------------|-------------------------------------------------|------------------------------------------------|
| `session_id`   | `VARCHAR(255)` | `PRIMARY KEY`                                    | Unique identifier for each session (e.g., UUID or random hash) |
| `user_id`      | `INT`          | `NOT NULL`, `FOREIGN KEY REFERENCES users(user_id)` | ID of the user to whom the session belongs      |
| `session_data` | `TEXT`         | `NULL`                                           | Stores the actual session data (usually serialized as JSON or other formats) |
| `created_at`   | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP`, `NOT NULL`          | The timestamp when the session was created      |
| `last_accessed`| `TIMESTAMP`    | `NULL`                                           | The last time the session was accessed or updated |
| `expires_at`   | `TIMESTAMP`    | `NULL`                                           | Expiration time of the session (useful for session cleanup) |


### Table: `songs` ###


| Column Name     | Data Type      | Constraints                       | Description                          |
|------------------|----------------|-----------------------------------|--------------------------------------|
| `mix_id`        | `INT`          | `PRIMARY KEY`, `AUTO_INCREMENT`   | Unique ID for the mix               |
| `user_id`        | `INT`          | `FOREIGN KEY REFERENCES users(user_id)`, `NOT NULL` | ID of the user who uploaded the song |
| `title`          | `VARCHAR(255)` | `NOT NULL`                        | Title of the song                    |
| `artist`         | `VARCHAR(255)` | `NOT NULL`                        | Artist of the song                   |
| `album`          | `VARCHAR(255)` | `NULL`                            | Album name (if applicable)           |
| `release_date`   | `DATE`         | `NULL`                            | Release date of the song             |
| `uploaded_at`    | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP`       | Time when the song was uploaded      |
| `updated_at`     | `TIMESTAMP`    | `NULL`                            | Time when the song was last updated   |
| `is_deleted`     | `TINYINT`      | `DEFAULT 0`                       | 0 - active, 1 - soft deleted         |


### Table: `events` ###

stores events associated with songs along with the artists and users who manage these events.

| Column Name      | Data Type         | Constraints                                      | Description                                                   |
|------------------|-------------------|--------------------------------------------------|---------------------------------------------------------------|
| `event_id`       | `INT`             | `PRIMARY KEY`, `AUTO_INCREMENT`                  | Unique identifier for the event                              |
| `title`          | `VARCHAR(255)`    | `NOT NULL`                                       | Title of the event                                           |
| `date`           | `DATETIME`        | `NOT NULL`                                       | Date and time of the event                                   |
| `artist_id`      | `INT`             | `FOREIGN KEY REFERENCES artists(artist_id)`, `NOT NULL` | ID of the artist associated with the event                   |
| `user_id`        | `INT`             | `FOREIGN KEY REFERENCES users(user_id)`, `NOT NULL` | ID of the user who created or updated the event              |
| `description`    | `TEXT`            | `NULL`                                           | A brief description of the event                             |
| `created_at`     | `TIMESTAMP`       | `DEFAULT CURRENT_TIMESTAMP`                      | Time when the event was created                             |
| `updated_at`     | `TIMESTAMP`       | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Time when the event was last updated                         |

### Table: `user_profiles` ###

detailed profile information for each user.

| Column Name | Data Type      | Constraints                       | Description                                      |
|-------------|----------------|-----------------------------------|--------------------------------------------------|
| `profile_id`| `INT`          | `PRIMARY KEY`, `AUTO_INCREMENT`   | Unique ID for the profile                         |
| `user_id`   | `INT`          | `FOREIGN KEY REFERENCES users(user_id)` | Unique identifier for the user                   |
| `bio`       | `TEXT`         | `NULL`                            | A brief description or bio provided by the user  |
| `avatar_url`| `VARCHAR(255)` | `NULL`                            | URL to the user's avatar image                   |
| `created_at`| `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP`       | Time when the profile was created                 |


### Table: `mixes` ###


| Column Name      | Data Type         | Constraints                                      | Description                                                   |
|------------------|-------------------|--------------------------------------------------|---------------------------------------------------------------|
| `mix_id`         | `INT`             | `PRIMARY KEY`, `AUTO_INCREMENT`                  | Unique identifier for the mix                                 |
| `user_id`        | `INT`             | `FOREIGN KEY REFERENCES users(user_id)`, `NOT NULL` | ID of the user who uploaded the mix                           |
| `title`          | `VARCHAR(255)`    | `NOT NULL`                                       | The name of the uploaded mix                                  |
| `file_url`       | `VARCHAR(255)`    | `NOT NULL`                                       | The URL of the audio file of the mix being uploaded          |
| `cover_url`      | `VARCHAR(255)`    | `NULL`                                           | The URL of the image file that acts as the visual cover      |
| `tags`           | `TEXT`            | `NULL`                                           | A comma-separated list of tags or genres associated with the mix |
| `visibility`     | `ENUM('public', 'private', 'unlisted', 'friends')` | `NOT NULL`         | Determines who can access the mix                             |
| `allow_download` | `BOOLEAN`         | `DEFAULT FALSE`                                  | Specifies if others can download the mix                     |
| `created_at`     | `TIMESTAMP`       | `DEFAULT CURRENT_TIMESTAMP`                      | Time when the mix was uploaded                                |
| `updated_at`     | `TIMESTAMP`       | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Time when the mix was last updated                            |

### Table: `comments` ###


| Column Name      | Data Type         | Constraints                                      | Description                                                   |
|------------------|-------------------|--------------------------------------------------|---------------------------------------------------------------|
| `comment_id`     | `INT`             | `PRIMARY KEY`, `AUTO_INCREMENT`                  | Unique identifier for each comment                           |
| `user_id`        | `INT`             | `FOREIGN KEY REFERENCES users(user_id)`, `NOT NULL` | ID of the user who made the comment                          |
| `mix_id`         | `INT`             | `FOREIGN KEY REFERENCES mixes(mix_id)`, `NOT NULL` | ID of the song or mix being commented on                     |
| `comment_text`   | `TEXT`            | `NOT NULL`                                       | The text of the comment                                      |
| `created_at`     | `TIMESTAMP`       | `DEFAULT CURRENT_TIMESTAMP`                      | Time when the comment was created                            |

### Table: `likes` ###


| Column Name      | Data Type         | Constraints                                      | Description                                                   |
|------------------|-------------------|--------------------------------------------------|---------------------------------------------------------------|
| `like_id`        | `INT`             | `PRIMARY KEY`, `AUTO_INCREMENT`                  | Unique identifier for each like                              |
| `user_id`        | `INT`             | `FOREIGN KEY REFERENCES users(user_id)`, `NOT NULL` | ID of the user who liked the song or mix                     |
| `mix_id`         | `INT`             | `FOREIGN KEY REFERENCES mixes(mix_id)`, `NOT NULL` | ID of the song or mix that was liked                         |
| `created_at`     | `TIMESTAMP`       | `DEFAULT CURRENT_TIMESTAMP`                      | Time when the like was given                                 |

