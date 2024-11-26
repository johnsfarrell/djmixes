### 1. User Authentication and Management

#### 1.1 User Registration

- **Endpoint**: `/api/user/register`
- **Method**: `POST`
- **Description**: Registers a new user by creating an account.
- **Request**:

```json
{
  "username": "Anita",
  "email": "anita@brown.edu",
  "password": "abcdefg123#"
}
```

- **Request Attributes**：

| Attribute | Type   | Description                                                        |
| ----------| -------| ------------------------------------------------------------------ |
| username  | string | The unique name chosen by the user to represent their account.     |
| email     | string | The user's email address, used for login and account verification. |
| password  | string | The password for account security, stored securely.                |

- **Response**:

```json
{
  "message": "Registration successful",
  "user_id": 1234
}
```

- **Response Attributes**:

| Attribute | Type   | Description                                                                               |
| --------- | ------ | ----------------------------------------------------------------------------------------- |
| message   | string | Confirms if registration was successful: "Registration successful", "Registration failed" |
| user_id   | number | The unique identifier assigned to the newly created user.                                 |

#### 1.2 User Login

- **Endpoint**: `/api/user/login`
- **Method**: `POST`
- **Description**: Authenticates the user and returns a token for session management.
- **Request**:

```json
{
  "email": "anita@brown.edu",
  "password": "abcdefg123#"
}
```

- **Request Attributes**:

| Attribute | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| email     | string | The email used during registration. |
| password  | string | The user’s password for login.      |

- **Response**

```json
{
  "message": "Login successful",
  "token": ""
}
```

- **Response Attributes**:

| Attribute | Type   | Description                                                     |
| --------- | ------ | --------------------------------------------------------------- |
| message   | string | A success or failure message:"Login successful", "Login failed" |
| token     | string | A session token (JWT) to authenticate subsequent requests.      |

#### 1.3 Create User Profile
### Table: `user_profiles`

- **Endpoint**: `/api/profile/{user_id}`
- **Method**: `POST`
- **Description**: create/update the profile information for a specific user.
- **Request**:

```json
{
  "bio": "this is Anita yo",
  "avatar": "example.jpg"
}
```

- **Response Attributes:**

| **Attribute** | **Type** | **Description**                                        |
|---------------|----------|--------------------------------------------------------|
| `bio`         | text     | bio info                                               |
| `avatar`      | file     | profile picture                                        |

- **Response**:

```json
{
  "message": "User profile with id 1 created or updated sucessfully"
}
```

- **Response Attributes:**

| **Attribute** | **Type** | **Description**                                        |
|---------------|----------|--------------------------------------------------------|
| `message`     | string   | Creation message                                       |

#### 1.4 Get User Profile

- **Endpoint**: `/api/profile/{user_id}`
- **Method**: `GET`
- **Description**: Retrieves the profile information for a specific user.
- **Response**:

```json
{
  "username": "anita",
  "bio": "music producer",
  "mixes": [
    {
      "mix_id": 5678,
      "title": "sound of music",
      "visibility": "public"
    }
  ],
  "events": [
    {
      "event_id": 1012,
      "title": "upcoming music festival",
      "date": "2024-11-08"
    }
  ]
}
```

- **Response Attributes:**

| **Attribute** | **Type** | **Description**                                        |
|---------------|----------|--------------------------------------------------------|
| `username`    | string   | The user's display name.                               |
| `bio`         | string   | A brief description or bio provided by the user.       |
| `mix_id`      | number   | The unique identifier for the mix.                     |
| `title`       | string   | The title of the mix.                                  |
| `visibility`  | string   | The visibility status of the mix: "public", "private". |
| `event_id`    | number   | Unique identifier for the event.                       |
| `title`       | string   | Title of the event.                                    |
| `date`        | datetime | The date and time of the event.                        |

#### 1.5 Get User Profile Picture

- **Endpoint**: `/api/profile/{user_id}/avatar`
- **Method**: `GET`
- **Description**: Retrieves the profile avatar for a specific user.
- **Response**:

```json
{
  "avatar": "example.jpg"
}
```

- **Response Attributes:**

| **Attribute** | **Type** | **Description**                                        |
|---------------|----------|--------------------------------------------------------|
| `avatar`      | file     | The user's avatar                                      |

#### 1.6 Get User Liked Mixes

- **Endpoint**: `/api/profile/{user_id}/liked`
- **Method**: `GET`
- **Description**: Retrieves the profile information for all mixes a specific user liked.
- **Response**:

```json
{
  "mix_ids": [1234, 5678]
}
```

- **Response Attributes:**

| **Attribute** | **Type** | **Description**                                        |
|---------------|----------|--------------------------------------------------------|
| `mix_ids`     | number   | The unique identifier for the mix.                     |

#### 1.7 Get User Commented Mixes

- **Endpoint**: `/api/profile/{user_id}/commented`
- **Method**: `GET`
- **Description**: Retrieves the profile information for all mixes a specific user commented.
- **Response**:

```json
{
  "mix_ids": [1234, 5678]
}
```

- **Response Attributes:**

| **Attribute** | **Type** | **Description**                                        |
|---------------|----------|--------------------------------------------------------|
| `mix_ids`     | number   | The unique identifier for the mix.                     |

### 2. Mix Management

#### 2.1. Upload Mix

- **Endpoint**: `/api/mixes/upload`
- **Method**: `POST`
- **Description**: Uploads a new DJ mix with an optional visual cover and tags.
- **Request Body**:

```json
{
  "title": "bouncing",
  "mix": "bouncing_ball.mp3",
  "cover_url": "/images/ball_cover.jpg",
  "tags": ["house", "techno"],
  "visibility": "public",
  "allow_download": true,
  "artist": "DJ Artist",
  "album": "My Album",
  "user_id": 12345
}
```

- **Request Attributes:**

| Attribute      | Type              | Description                                                                     |
| -------------- | ----------------- | ------------------------------------------------------------------------------- |
| title          | string            | The name of the uploaded mix.                                                   |
| mix            | file           | The mix file to be uploaded.                                                    |
| cover          | file | The image file that acts as the visual cover for the mix.                |
| tags           | array             | A list of tags or genres associated with the mix for categorization.            |
| visibility     | string            | Determines who can access the mix (`public`, `private`, `unlisted`, `friends`). |
| allow_download | boolean           | A boolean value specifying if others can download the mix.                      |
| artist         | string(optional)  | The name of the artist.                                                         |
| album          | string(optional)  | The album name.                                                                 |
| user_id        | number             | The ID of the user uploading the mix.                                           |

- **Response**:

```json
{
  "message": "Mix uploaded successfully",
  "file_url": "https://your-s3-bucket-url.com/your-uploaded-file.mp3"
}
```

- **Response Attributes:**

| Attribute | Type   | Description                                    |
| --------- | ------ | ---------------------------------------------- |
| message   | string | Confirms if the mix was uploaded successfully. |
| file_url  | string | The URL of the uploaded file on AWS S3.        |

#### **2.2. Get Mix**

- **Endpoint**: `/api/mixes/{mix_id}`
- **Method**: `GET`
- **Description**: Retrieves details of a specific mix.
- **Response:**

```json
{
  "title": "Bouncing Ball",
  "file_url": "https://your-s3-bucket-url.com/your-uploaded-file.mp3",
  "cover_url": "https://your-cover-url.com/cover.jpg",
  "visibility": "public",
  "allow_download": true,
  "tags": ["house", "techno"],
  "created_at": "2020-01-01 15:10:10",
  "uploaded_at": "2020-01-01 15:10:10",
  "artist": "DJ Artist",
  "album": "My Album",
  "upload_user": {
    "user_id": 1234,
    "username": "anita"
  },
  "split_JSON":"{\"songname1\":\"songTime1\",\"songname2\":\"songTime2\"}",
  "stem_drum_url": "example.com/drum",
  "stem_bass_url": "example.com/bass",
  "stem_synth_url": "example.com/synth",
  "stem_vocal_url": "example.com/vocal",
  "comments": [
    {
      "comment_id": 2233,
      "user": "anita",
      "comment": "The sound of a bouncing ball."
    }
  ]
}
```

- **Response Attributes:**

| Attribute      | Type    | Description                                        |
| -------------- | ------- | -------------------------------------------------- |
| title          | string  | The title of the mix.                              |
| file_url       | string  | The URL from where the audio file can be streamed. |
| visibility     | string  | The current visibility status of the mix.          |
| allow_download | boolean | Specifies if the mix is available for download.    |
| tags           | array   | A list of tags associated with the mix.            |
| user_id        | number  | The unique identifier for the uploader.            |
| username       | string  | The uploader's display name.                       |
| split_JSON     | string  | The JSON string for splitting songs & times.       |
| stem_drum_url  | string  | The url of drum stem audio.                        |
| stem_bass_url  | string  | The url of bass stem audio.                        |
| stem_synth_url | string  | The url of synth stem audio                        |
| stem_vocal_url | string  | The url of vocal stem audio                        |
| comment_id     | number  | The unique identifier for the comment.             |
| user           | string  | The name of the user who commented.                |
| comment        | string  | The text of the comment.                           |
| artist         | string  | The name of the artist.                            |
| album          | string  | The album name (if available).                     |

#### 2.3 Get User Commented Mixes

- **Endpoint**: `/api/mixes/random`
- **Method**: `GET`
- **Description**: Get random Mix ids
- **Response**:

```json
{
  "number_of_mixes": 1
}
```

- **Request Attributes:**

| **Attribute**     | **Type** | **Description**                                        |
|-------------------|----------|--------------------------------------------------------|
| `number_of_mixes` | number   | Number of mix ids generated, 1 if omit, 10 at max      |

- **Response**:

```json
{
  "mix_ids": [1234]
}
```

- **Response Attributes:**

| **Attribute** | **Type** | **Description**                                        |
|---------------|----------|--------------------------------------------------------|
| `mix_ids`     | number   | The unique identifier for the mix.                     |

#### **2.4. Download Mix**

- **Endpoint**: `/api/mixes/{mix_id}/download/:part?`
- **Method**: `GET`
- **Description**: Downloads a mix if downloading is allowed.
- **Response Attributes:**

| **Attribute** | **Type** | **Description**                                        |
|---------------|----------|--------------------------------------------------------|
| `part`        | string   | optional param for download option, mix file if omit,  |
| can be cover, drum, synth, vocal, bass for downaloding the correspond file        |

- **Response**:
  - The actual file (e.g., in `mp3` format) as a file download, picture format for cover.

#### **2.4. Share Mix via Link**

- **Endpoint**: `/api/mixes/{mix_id}/share`

- **Method**: `POST`

- **Description**: Generates a unique shareable link for a specific mix.

- **Response:**

  ```json
  {
    "share_link": ""
  }
  ```

- **Response Attributes:**

| Attribute  | Type   | Description                                             |
| ---------- | ------ | ------------------------------------------------------- |
| share_link | string | A URL that can be shared with others to access the mix. |

### **3. Comments and Likes**

#### **3.1. Add Comment**

- **Endpoint**: `/api/mixes/{mix_id}/comment`

- **Method**: `POST`

- **Description**: Adds a comment on a specific mix.

- **Request Body:**

```json
{
  "user_id": 1,
  "comment": "good song"
}
```

- **Request Attributes:**

| Attribute | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| user_id   | number | id of comment user              |
| comment   | string | The text of the user’s comment. |

- **Response:**

```json
{
  "message": "Comment added successfully",
  "comment_id": 2233
}
```

- **Response Attributes:**

| Attribute  | Type   | Description                                     |
| ---------- | ------ | ----------------------------------------------- |
| message    | string | Confirms if the comment was added successfully. |
| comment_id | number | The unique identifier for the new comment.      |

#### **3.2. Like Mix**

- **Endpoint**: `/api/mixes/{mix_id}/like`

- **Method**: `POST`

- **Description**: Adds a "like" to the mix on behalf of the user.

- **Request**:

```json
{
  "user_id": 1
}
```

- **Request Attributes:**

| Attribute | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| user_id   | number | the user that likes             |


- **Response:**

```json
{
  "message": "Mix liked"
}
```

- **Request Attributes:**

| Attribute | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| message   | string | Confirms if the mix was liked successfully. |

### **4. Admin Management**

#### **4.1. Remove Mix or Comment**

- **Endpoint**: `/api/admin/{resource_type}/{resource_id}/remove`

- **Method**: `DELETE`

- **Description**: Allows admins to remove inappropriate mixes or comments.

  - `resource_type`: Can be either "mix" or "comment", indicating the type of content to remove.
  - `resource_id`: The unique identifier for the mix or comment to be removed.

- **Response:**

  ```json
  {
    "message": "Resource removed successfully"
  }
  ```

- Response Attributes:

  | Attribute | Type   | Description                             |
  | --------- | ------ | --------------------------------------- |
  | message   | string | Confirms that the resource was removed. |

#### **4.2. Flag Mix or Comment for Review**

- **Endpoint**: `/api/mixes/{resource_type}/{resource_id}/flag`

- **Method**: `POST`

- **Description**: Flags a mix for admin review if a user finds the content inappropriate.

- **Response:**

  ```json
  {
    "message": "Resource flagged for review"
  }
  ```

- Response Attributes:

  | Attribute | Type   | Description                             |
  | --------- | ------ | --------------------------------------- |
  | message   | string | Confirms that the resource was flagged. |

### **5. Events and News**

#### **5.1. Post DJ News/Events**

- **Endpoint**: `/api/dj/{dj_id}/events`

- **Method**: `POST`

- **Description**: Allows DJs to post news and events.

- **Request:**

  ```json
  {
    "title": "Upcoming Music Event",
    "description": "The latest music festival will be held in New York!",
    "date": "2024-11-08"
  }
  ```

- **Request Attributes:**

  | Attribute   | Type     | Description                               |
  | ----------- | -------- | ----------------------------------------- |
  | title       | string   | The name or headline of the event/news.   |
  | description | string   | A brief description of the event or news. |
  | date        | datetime | The date and time of the event.           |

- **Response:**

  ```json
  {
    "message": "Event posted successfully",
    "event_id": 3344
  }
  ```

- **Response Attributes:**

  | Attribute | Type   | Description                                        |
  | --------- | ------ | -------------------------------------------------- |
  | message   | string | Confirms the successful posting of the event/news. |
  | event_id  | number    | The unique identifier for the event/news.          |

#### **5.2. Get DJ Events**

- **Endpoint**: `/api/dj/{dj_id}/events`

- **Method**: `GET`

- **Description**: Retrieves upcoming events or news for a specific DJ.

- **Response:**

  ```json
  {
    "events": [
      {
        "event_id": 3344,
        "title": "Upcoming Music Event",
        "description": "The latest music festival will be held in New York!",
        "date": "2024-11-08"
      }
    ]
  }
  ```

- **Response Attributes:**

  | Attribute   | Type     | Description                          |
  | ----------- | -------- | ------------------------------------ |
  | event_id    | number      | The unique identifier for the event. |
  | title       | string   | The name of the event.               |
  | description | string   | A description of the event.          |
  | date        | datetime | The date and time of the event.      |

### **6. Recommendations and Radio** (TBD)

#### **6.1. Get Recommendations**

- **Endpoint**: `/api/recommendations`

- **Method**: `GET`

- **Description**: Fetches recommended mixes based on user likes/bookmarks.

- **Response:**

  ```json
  {
    "recommendations": [
      {
        "mix_id": 5566,
        "title": "universe",
        "tags": ["house", "techno"],
        "uploader": {
          "user_id": 12234,
          "username": "anita"
        }
      }
    ]
  }
  ```

- **Response Attributes:**

  | Attribute | Type   | Description                                   |
  | --------- | ------ | --------------------------------------------- |
  | mix_id    | number    | The unique identifier of the recommended mix. |
  | title     | string | The title of the mix.                         |
  | tags      | array  | The genres or tags associated with the mix.   |
  | user_id   | number    | The unique identifier for the uploader.       |
  | username  | string | The uploader's display name.                  |

#### **6.2. Play Radio**

- **Endpoint**: `/api/radio`

- **Method**: `GET`

- **Description**: Starts a continuous radio stream of mixes.

- **Response:**

  ```json
  {
    "radio_stream_url": ""
  }
  ```

- **Response Attributes:**

  | Attribute        | Type   | Description                  |
  | ---------------- | ------ | ---------------------------- |
  | radio_stream_url | string | The URL to the radio stream. |
