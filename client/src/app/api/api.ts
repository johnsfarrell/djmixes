import { mockMixResponse, mockProfileResponse } from "./mockData";
import {
  GetMixResponse,
  GetProfileResponse,
  MixUploadRequest,
  UploadMixResponse,
} from "./types";

interface Request {
  mock?: boolean;
}

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const apiAdapter = async (
  url: string = API_URL,
  slug: string = "",
  options: RequestInit,
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
  mock,
}: GetMixRequest): Promise<GetMixResponse> => {
  if (mock) {
    return Promise.resolve(mockMixResponse);
  }

  const res = await apiAdapter(API_URL, `/mixes/${mixId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let resJson = (await res.json()) as GetMixResponse;

  let fileRes: Response;
  let coverRes: Response;

  try {
    fileRes = await apiAdapter(API_URL, `/mixes/${mixId}/download`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    resJson.fileUrl = URL.createObjectURL(await fileRes.blob());

    coverRes = await apiAdapter(API_URL, `/mixes/${mixId}/download/cover`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    resJson.coverUrl = URL.createObjectURL(await coverRes.blob());
  } catch (error) {
    console.error("Error fetching mix file:", error);
  }

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
  mock,
}: UploadMixRequest): Promise<UploadMixResponse> => {
  if (mock) {
    return Promise.resolve({
      message: "Mix uploaded successfully",
      fileKey: "mock-file-key",
      uploadResult: {},
    });
  }

  const formData = new FormData();
  formData.append("user_id", userId.toString());
  formData.append("title", title);
  formData.append("artist", artist);
  formData.append("album", album);
  formData.append("release_date", releaseDate);
  formData.append("tags", JSON.stringify(tags));
  formData.append("visibility", visibility);
  formData.append("allow_download", allowDownload ? "1" : "0");
  formData.append("mix", mix);
  formData.append("cover", cover);

  const res = await apiAdapter(API_URL, "/mixes/upload", {
    method: "POST",
    body: formData,
  });

  return res.json();
};

interface GetSavedMixesRequest extends Request {
  userId: number;
}

const getSavedMixes = async ({
  userId,
  mock,
}: GetSavedMixesRequest): Promise<GetMixResponse[]> => {
  if (mock) {
    return Promise.resolve([mockMixResponse, mockMixResponse]);
  }

  const res = await apiAdapter(API_URL, `/profile/${userId}/liked`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resJson = await res.json();
  const mixIds = resJson.mix_ids;

  const mixes = [];

  for (const mixId of mixIds) {
    try {
      mixes.push(await getMix({ mixId }));
    } catch (error) {
      console.error("Error fetching mix:", error);
    }
  }

  return mixes;
};

interface GetFollowedProfilesRequest extends Request {
  userId: number;
}

const getFollowedDJs = async ({
  userId,
  mock,
}: GetFollowedProfilesRequest): Promise<GetProfileResponse[]> => {
  if (mock) {
    return Promise.resolve([mockProfileResponse, mockProfileResponse]);
  }

  const res = await apiAdapter(API_URL, `/users/${userId}/djs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

const getProfile = async (userId: number): Promise<GetProfileResponse> => {
  const res = await apiAdapter(API_URL, `/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
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

const getRandomMixes = async ({ mock }: Request): Promise<GetMixResponse[]> => {
  if (mock) {
    return Promise.resolve([mockMixResponse, mockMixResponse]);
  }

  const res = await apiAdapter(API_URL, "/mixes/random", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resJson = await res.json();
  const mixIds = resJson.mix_ids;

  const mixes = [];
  for (const mixId of mixIds) {
    try {
      mixes.push(await getMix({ mixId }));
    } catch (error) {
      console.error("Error fetching mix:", error);
    }
  }

  return mixes;
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
};
