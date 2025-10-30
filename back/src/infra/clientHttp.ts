import axios from 'axios';

export type RecupereRessourceHttp<T> = (
  url: string,
  config?: { headers?: Record<string, string> },
) => Promise<T>;

export const creeRecupereRessourceHttp = <T>() => {
  return async (url: string, config?: { headers?: Record<string, string> }) => {
    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        ...config?.headers,
      },
    });
    return response.data as T;
  };
};

export type PosteRessourceHttp<T> = (
  url: string,
  corps: FormData | Record<string, unknown>,
  config?: { headers?: Record<string, string> },
) => Promise<T>;

export const creePosteRessourceHttp = <T>() => {
  return async (
    url: string,
    corps: FormData | Record<string, unknown>,
    config?: { headers?: Record<string, string> },
  ) => {
    const response = await axios.post(url, corps, {
      headers: {
        accept: 'application/json',
        ...config?.headers,
      },
    });
    return response.data as T;
  };
};
