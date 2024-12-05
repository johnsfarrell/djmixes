import { GetMixResponse, GetProfileResponse } from './types';

export const mockMixResponse: GetMixResponse = {
  title: 'Test Mix',
  fileUrl: '/mock/track1.mp3',
  coverUrl: '/mock/cover1.jpg',
  visibility: 'public',
  allowDownload: true,
  tags: ['tag1', 'tag2'],
  updatedAt: new Date(),
  createdAt: new Date(),
  artist: 'Test Artist',
  upload_user: {
    user_id: 1,
    username: 'testuser'
  },
  comments: ['Great mix!', 'Love the transitions!'],
  album: 'Test Album',
  vocalsUrl: '/mock/vocals.mp3',
  drumsUrl: '/mock/drums.mp3',
  bassUrl: '/mock/bass.mp3',
  otherUrl: '/mock/other.mp3',
  splits: [
    {
      name: 'Intro',
      timestamp: 0
    },
    {
      name: 'Verse 1',
      timestamp: 45
    },
    {
      name: 'Chorus',
      timestamp: 90
    },
    {
      name: 'Outro',
      timestamp: 180
    }
  ]
};

export const mockProfileResponse: GetProfileResponse = {
  username: 'testuser',
  bio: 'Test bio',
  mixes: [],
  events: [],
  profilePhoto: '/mock/profile1.png'
};
