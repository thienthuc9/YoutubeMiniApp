import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiRequestProps {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  data?: unknown;
}
const token = localStorage.getItem("token");

export const apiRequest = async <T>({
  url,
  method = "GET",
  headers = {
    Authorization: `Bearer ${token}`,
  },
  data,
}: ApiRequestProps): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      url,
      method,
      headers,
      data,
    };

    const response: AxiosResponse<T> = await axios(config);
    return response.data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
