export type LectureHttp<T> = {
  get: (
    url: string,
    config?: { headers?: Record<string, string> }
  ) => Promise<{ data: T }>;
};
