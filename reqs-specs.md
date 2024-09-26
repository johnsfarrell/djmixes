# Functional requirements:
1. As a user, I want to be able to play songs/mixes/demos on the app, so I can enjoy the the mixes in the app
2. As a user, I want to be able to upload songs/mixes/demos, so I can save my file
3. As a user, I want to select visibility for listening (like private, unlisted, friends, public) songs/mixes/demos
4. As a user, I want to select availability for downloading songs/mixes/demos I uploaded
5. As a user, I want to be able to share songs/mixes/demos via link
6. As a user, I want to be able to download DJ mixes so I can listen to them offline
7. As a user, I want to be able to see/parse the original songs from certain DJ mixes, so I can find songs that I am interested in
8. As a developer, I want to be able to see documents for API call to act on some basic user function(like upload or download, comment, send likes, star certain music producers), so I don’t have to use the UI for everything
9. As a user, I want to have an profile page so everyone can view public mixes uploaded by the user and related information(like DJ’s events/news)
10. As a musician/DJ, I want to post news for new mixes and events, so other users can get to know my new works or shows
11. As an admin, I want to be able to edit or remove certain post or files that are inappropriate on the platform, so the user experience can be improved
12. As a user, I want to be able to flag certain post or files so admin gets notified to review
13. As a user, I want to know when the artist I care/follow has some new work published, so I don’t miss the latest update.
14. As a user, I want recommendations based on what I like or bookmarked since I am not into specific artists but willing to listen to different artists.
15. As a user, I want to have a brief intro or share my story or thoughts behind certain work under the mixtapes.
16. As a user, I want to have comments under my mixtapes from users.
17. As a user, I want to have message functions so I can communicate with other users
18. As an artist, I want to have feedback but on some limitations, like only from other artists, people who actually listen to my song, no bots. But they don’t necessarily have to know about the condition so they don’t abuse it.
19. As a user, I want to be able to upload songs/mixes with tag (like genre)
20. As a user, I want to have a radio section where I can just click open the tab then sit down to do my work without worrying about selecting songs.
21. As a user, I want to upload visuals when uploading different music. Like the cover of the mix, or profile picture of the artist
22. As a user, I want to see the artists’ upcoming shows/events.
23. As a user, I want to be able to pin my uploaded mixes to my profile, to give other users a representative work.


# Non-Functional requirements:
- As a user, I want the file I upload and the activity history to be private, so my file and privacy are protected.(login credentials? username/password/email?)
- As a user, I want the UI theme and style can be stylish/fashionable, so I am more likely to use the platform and think that I can find some of the music I like if the UI attracts me

# Roles and Permissions
- **Users**: Can browse, play, upload/download mixes, interact with mixes (comments, likes), and view artist profiles.
- **Musicians/DJs**: Can upload mixes, maintain artist profiles, post updates/news, and view fan interactions.
- **Admin**: Can manage content, moderate inappropriate posts/files, and manage user accounts.

# Thoughts on Specification:

## Functional Specifications

### Users:
- Play DJ Mixes with scrubber bars for easy navigation between tracks and transitions. We want to have a music player on the UI. (-> Functional 1.)
- Upload their mixes with file size limits and supported formats, then processed by an algorithm to identify and label tracks and transitions. Create an algorithm(ML or not) to process music files to a table of music titles with time (-> Functional 4.)
- Download mixes with quality and format options (mp3, wav) for offline listening. Create a cloud storage/ server to store user uploads (-> Functional 3)
- Browse artist profiles showing their mixes, events, and fan interactions. Create a page on UI with collection of artist of specific artists (-> Functional 6)
- View the list of tracks in a mix in a similar format to the album UI on Spotify & other streaming platforms
- Share feedback on a song (commenting / like button)
### Musicians/DJs: 
- Upload their mixes (same as Users?).
- Customize their profile by updating pictures, bios and listing all uploaded mixes.
- Links to socials
- Post news updates about upcoming releases and events.
### Admin:
- Edit or remove inappropriate posts, mixes, or user comments.
- Admin dashboard for monitoring flagged content and user reports.

## Non-Functional Specifications
- Privacy and Security
- Users can control the privacy of their uploads and interaction history.
- Secure login credentials: username/password with email verification.
- Two-factor authentication option.
- UI/UX Design
- Customizable themes for users to personalize their experience.
- User-friendly navigation with a focus on minimal clicks to access mixes and profiles.

## Technical Specifications
### Backend
- AI-driven algorithm (machine learning model)  for mix segmentation, detecting and labeling tracks and transitions.
- API (HTTP methods like GET, POST, PUT, DELETE) for user actions like upload, download, interactions (comments/likes).
- Store user data in a relational database (MySQL).
- Use OAuth 2.0 with token-based (JWT) authorization for identity authentication.
- Accept third party login using techniques like firebase authentication
### Frontend
- Web development.
- Real-time updates.
