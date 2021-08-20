import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

type Profile = {
  id: string;
  name: string;
}

type RegisterInput = {
  email: string;
  password: string;
}

export class FriendDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://qvhjoqcyhdvsfungdoyd.supabase.co';
  }

  willSendRequest(request: RequestOptions) {
    console.log(request.method, request.path, new Date());
    request.headers.set('content-type', 'application/json');
    request.headers.set('apikey', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyOTQzOTk1NSwiZXhwIjoxOTQ1MDE1OTU1fQ.10vAR6iIsM9XOQcVKbfii2guKlD5LBfUY8QYEcojqa4");
    if(this.context.authorization) request.headers.set('authorization', this.context.authorization);
  }

  async getProfiles(): Promise<Profile[]> {
    return this.get(`/rest/v1/profiles`);
  }

  async getProfileByUserId(id: String): Promise<Profile> {
    const profiles = await this.get(`/rest/v1/profiles?id=eq.${id}`);
    if((profiles as []).length === 0){
      throw new Error('Notfound');
    }
    return profiles[0];
  }

  async getFollowsByUserId(id: String): Promise<any> {
    return this.get(`/rest/v1/follows?user_id=eq.${id}`);
  }

  async getCurrentUser(): Promise<any> {
    return this.get(`/auth/v1/user`);
  }

  async register({ email, password }: RegisterInput): Promise<any> {
    return this.post(`/auth/v1/signup`, {
      email,
      password
    });
  }

}