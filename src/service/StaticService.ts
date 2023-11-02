export interface StaticObject {
  url: string;
}

class StaticService {
  private readonly baseUrl = '/';

  resolve = (...paths: string[]): StaticObject => {
    return { url: this.baseUrl + paths.join('/') };
  };
}

export default StaticService;
