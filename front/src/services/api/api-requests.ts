import { AxiosRequestConfig } from "axios";

// type Method = 'GET' | 'POST';

export const requests: { [key: string]: AxiosRequestConfig } = {
  helloWorld: {
    url: `/`,
    method: "GET",
  },
};
