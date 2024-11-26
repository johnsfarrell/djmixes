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
}

const getMix = async ({
  mixId,
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

  const fileRes = await apiAdapter(API_URL, `/mixes/${mixId}/download`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  resJson.fileUrl = URL.createObjectURL(await fileRes.blob());

  resJson.coverUrl = ''; // TODO: will be replaced once we have a download cover endpoint

  return resJson;
};

interface UploadMixRequest extends Request, MixUploadRequest {}

const uploadMix = async ({
  mock
}: UploadMixRequest): Promise<UploadMixResponse> => {
  if (mock) {
    return Promise.resolve({
      message: 'Mix uploaded successfully',
      fileKey: 'mock-file-key',
      uploadResult: {}
    });
  }

  const res = await apiAdapter(API_URL, '/mixes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
    // TODO add body
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

  // const res = await apiAdapter(API_URL, `/users/${userId}/mixes`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });

  const mixes = [];

  // TODO: switch to use real data
  for (const mixId of [1]) {
    mixes.push(await getMix({ mixId }));
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

export { getMix, uploadMix, getSavedMixes, getFollowedDJs };
