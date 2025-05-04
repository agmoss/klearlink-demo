export interface RequestConfig {
  method: string;
  url: string;
  headers: { key: string; value: string }[];
  body?: string;
}

export interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
}
