import { mockMixResponse, mockProfile } from "./mockData";
import {
  GetMixResponse,
  MixUploadRequest,
  UploadMixResponse,
  ProfileResponse,
} from "./types";

interface Request {
  mock?: boolean;
}

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

const apiAdapter = async (
  url: string = API_URL,
  slug: string = "",
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

  // TODO: Type check the response

  return res.json();
};

interface UploadMixRequest extends Request, MixUploadRequest {}

const uploadMix = async ({
  mock,
}: UploadMixRequest): Promise<UploadMixResponse> => {
  if (mock) {
    return Promise.resolve({
      message: "Mix uploaded successfully",
      fileKey: "mock-file-key",
      uploadResult: {},
    });
  }

  const res = await apiAdapter(API_URL, "/mixes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // TODO add body
  });

  return res.json();
};

const getCreator = async ({
  userId,
  mock,
}: GetMixRequest): Promise<GetMixResponse> => {
  if (mock) {
    return Promise.resolve(mockProfile);
  }

  const res = await apiAdapter(API_URL, `/creator/${mixId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // TODO: Type check the response

  return res.json();
};

export { getMix, uploadMix, getCreator };
