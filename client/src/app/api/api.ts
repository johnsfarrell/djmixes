import { mockMixResponse, mockProfileResponse } from './mockData';
import {
  GetMixResponse,
  GetProfileResponse,
  MixUploadRequest,
  UploadMixResponse
} from './types';

interface Request {
  mock?: boolean;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const apiAdapter = async (
  url: string = API_URL,
  slug: string = '',
  options: RequestInit
): Promise<Response> => {
  const response = await fetch(url + slug, options);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response;
};

interface GetMixRequest extends Request {
  mixId: number;
  includeAudio?: boolean;
}

const downloadResource = async (
  mixId: number,
  resourcePath: string
): Promise<string | undefined> => {
  try {
    const res = await apiAdapter(API_URL, resourcePath, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error(`Error fetching resource ${resourcePath}:`, error);
    return undefined;
  }
};

const getMix = async ({
  mixId,
  includeAudio = true,
  mock
}: GetMixRequest): Promise<GetMixResponse> => {
  if (mock) {
    return Promise.resolve(mockMixResponse);
  }

  const res = await apiAdapter(API_URL, `/mixes/${mixId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  let resJson = (await res.json()) as GetMixResponse;

  resJson.cover_url = await downloadResource(
    mixId,
    `/mixes/${mixId}/download/cover`
  );

  if (!includeAudio) {
    return resJson;
  }

  resJson.file_url = await downloadResource(mixId, `/mixes/${mixId}/download`);

  resJson.vocalsUrl = await downloadResource(
    mixId,
    `/mixes/${mixId}/download/vocal`
  );
  resJson.drumsUrl = await downloadResource(
    mixId,
    `/mixes/${mixId}/download/drum`
  );
  resJson.bassUrl = await downloadResource(
    mixId,
    `/mixes/${mixId}/download/bass`
  );
  resJson.otherUrl = await downloadResource(
    mixId,
    `/mixes/${mixId}/download/other`
  );

  const jsonSplits = JSON.parse(resJson.split_json || '{}');

  resJson.splits = Object.keys(jsonSplits).map((key) => ({
    name: key,
    timestamp: jsonSplits[key]
  }));

  return resJson;
};

interface UploadMixRequest extends Request, MixUploadRequest {}

const uploadMix = async ({
  userId,
  title,
  artist,
  album,
  releaseDate,
  mix,
  cover,
  tags,
  visibility,
  allowDownload,
  mock
}: UploadMixRequest): Promise<UploadMixResponse> => {
  if (mock) {
    return Promise.resolve({
      mixId: 1,
      message: 'Mix uploaded successfully',
      fileKey: 'mock-file-key',
      uploadResult: {}
    });
  }

  const formData = new FormData();
  formData.append('user_id', userId.toString());
  formData.append('title', title);
  formData.append('artist', artist);
  formData.append('album', album);
  formData.append('release_date', releaseDate);
  formData.append('tags', JSON.stringify(tags));
  formData.append('visibility', visibility);
  formData.append('allow_download', allowDownload ? '1' : '0');
  formData.append('mix', mix);
  formData.append('cover', cover);

  const res = await apiAdapter(API_URL, '/mixes/upload', {
    method: 'POST',
    body: formData
  });

  return res.json();
};

interface GetSavedMixesRequest extends Request {
  userId: number;
}

const getSavedMixes = async ({
  userId,
  mock
}: GetSavedMixesRequest): Promise<GetMixResponse[]> => {
  if (mock) {
    return Promise.resolve([mockMixResponse, mockMixResponse]);
  }

  const res = await apiAdapter(API_URL, `/profile/${userId}/liked`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const resJson = await res.json();
  const mixIds = resJson.mix_ids;

  const mixes: GetMixResponse[] = [];

  for (const mixId of mixIds) {
    try {
      mixes.push(await getMix({ mixId, includeAudio: false }));
    } catch (error) {
      console.error('Error fetching mix:', error);
    }
  }

  return mixes;
};

interface GetFollowedProfilesRequest extends Request {
  userId: number;
}

const getFollowedDJs = async ({
  userId,
  mock
}: GetFollowedProfilesRequest): Promise<GetProfileResponse[]> => {
  if (mock) {
    return Promise.resolve([mockProfileResponse, mockProfileResponse]);
  }

  const res = await apiAdapter(API_URL, `/users/${userId}/djs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return res.json();
};

const getProfile = async (userId: number): Promise<GetProfileResponse> => {
  const res = await apiAdapter(API_URL, `/profile/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const resJson = await res.json();

  const avatarUrl = await downloadResource(userId, `/profile/${userId}/avatar`);

  return {
    profileId: resJson.profile_id,
    userId: resJson.user_id,
    bio: resJson.bio,
    avatarUrl: avatarUrl || '',
    createdAt: resJson.created_at,
    username: resJson.username,
    uploadedMixIds: resJson.uploaded_mixes,
    likedMixIds: resJson.liked_mixes,
    events: []
  };
};

const login = async (email: string, password: string): Promise<Response> => {
  const res = await apiAdapter(API_URL, '/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  return res;
};

const register = async (
  username: string,
  email: string,
  password: string
): Promise<Response> => {
  const res = await apiAdapter(API_URL, '/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  });

  return res;
};

interface GetMixesRequest extends Request {
  count?: number;
}

const getRandomMixes = async ({
  count = 1,
  mock
}: GetMixesRequest): Promise<GetMixResponse[]> => {
  if (mock) {
    return Promise.resolve([mockMixResponse]);
  }

  const res = await apiAdapter(API_URL, `/mixes/random/${count}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const resJson = await res.json();
  const mixIds = resJson.mix_ids;

  const mixes: GetMixResponse[] = [];
  for (const mixId of mixIds) {
    try {
      mixes.push(await getMix({ mixId, includeAudio: false }));
    } catch (error) {
      console.error('Error fetching mix:', error);
    }
  }

  return mixes;
};

const likeMix = async (mixId: number, userId: number): Promise<Response> => {
  const res = await apiAdapter(API_URL, `/mixes/${mixId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user_id: userId })
  });

  return res;
};

const unlikeMix = async (mixId: number, userId: number): Promise<Response> => {
  const res = await apiAdapter(API_URL, `/mixes/${mixId}/unlike`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user_id: userId })
  });

  return res;
};

const commentOnMix = async (comment: string, mixId: number, userId: number) => {
  const res = await apiAdapter(API_URL, `/mixes/${mixId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user_id: userId, comment, mix_id: mixId })
  });

  return res;
};

export interface SearchResult {
  users: GetProfileResponse[];
  mixes: GetMixResponse[];
}

const search = async (query: string): Promise<SearchResult> => {
  const res = await apiAdapter(API_URL, `/search/${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const resJson = await res.json();
  const userIds = resJson.users;
  const mixIds = resJson.mixes;

  const mixes: GetMixResponse[] = [];
  if (mixIds !== null) {
    for (const mixId of mixIds) {
      try {
        mixes.push(await getMix({ mixId, includeAudio: false }));
      } catch (error) {
        console.error('Error fetching mix:', error);
      }
    }
  }

  const profiles: GetProfileResponse[] = [];
  if (userIds !== null) {
    for (const userId of userIds) {
      try {
        await getProfile(userId);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
  }

  return { users: profiles, mixes: mixes };
};

export {
  getMix,
  uploadMix,
  getSavedMixes,
  getFollowedDJs,
  login,
  register,
  getRandomMixes,
  getProfile,
  likeMix,
  unlikeMix,
  commentOnMix,
  search
};
