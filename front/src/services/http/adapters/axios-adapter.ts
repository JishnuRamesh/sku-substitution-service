import {
  HttpAdapter,
  HttpRequest,
  HttpResponse,
} from "@services/http/adapters/http-adapter";
import axios from "axios";

export class AxiosAdapter implements HttpAdapter {
  public async request<T>(config: HttpRequest): Promise<HttpResponse<T>> {
    const client = axios.create({ baseURL: config.baseURL });
    return (await client.request<T>(config)) as HttpResponse<T>;
  }
}
