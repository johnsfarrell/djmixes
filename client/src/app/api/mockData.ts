import cover1 from '../../../public/audio/cover1.jpg';
import cover2 from '../../../public/audio/cover1.jpg';
import { MixResponse } from './types';

export const tracks = [
  {
    title: 'Last Words',
    src: '',
    author: 'Kenny Beats',
    thumbnail: cover1
  },
  {
    title: 'Some',
    src: '',
    author: 'Steve Lacy',
    thumbnail: cover2
  }
];

export const mockMixResponse: MixResponse = {
  title: 'Test Mix',
  fileUrl: 'http://example.com/file.mp3',
  coverUrl: 'http://example.com/cover.jpg',
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
  comments: ['comment1', 'comment2'],
  album: 'Test Album'
};
