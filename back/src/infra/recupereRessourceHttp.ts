import axios from 'axios';

export type RecupereRessourceHttp<T> = (
  url: string,
  config?: { headers?: Record<string, string> }
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
