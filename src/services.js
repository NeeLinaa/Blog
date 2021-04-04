import { getToken } from './localStorage';

class ApiServices {
  api = 'https://conduit.productionready.io/api';

  token = getToken();

  myError = new Error(';;;;');

  mainRequest = async (url, method, body) => {
    const getHeaders = () => {
      if (this.token) {
        return { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${this.token}` };
      }
      return { 'Content-Type': 'application/json;charset=utf-8' };
    };

    let options = {};

    if (method === 'POST' || method === 'PUT') {
      options = {
        method,
        headers: await getHeaders(),
        body: JSON.stringify(body),
      };
    } else {
      options = {
        method,
        headers: getHeaders(),
      };
    }

    const request = await fetch(url, options);
    if (request.status >= 300 || request.status < 200) console.error(`Error: ${request.status}`);
    const resp = await request.json();
    return resp;
  };

  allArticlesRequest = (page) => this.mainRequest(`${this.api}/articles?limit=10&offset=${page}`);

  getOneArticle = (slug) => this.mainRequest(`${this.api}/articles/${slug}`);

  regRequets = (name, email, pass) => {
    try {
      const body = {
        user: {
          username: name,
          email,
          password: pass,
        },
      };
      return this.mainRequest(`${this.api}/users`, 'POST', body);
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  authentication = async (email, pass) => {
    try {
      const body = {
        user: {
          email,
          password: pass,
        },
      };
      const rez = await this.mainRequest(`${this.api}/users/login`, 'POST', body);
      return rez;
    } catch {
      throw new Error();
    }
  };

  getUser = () => this.mainRequest(`${this.api}/user`);

  updateUser = (userData) => {
    const body = {
      user: {
        username: userData.name,
        email: userData.email,
        password: userData.pass,
        image: userData.img,
      },
    };
    return this.mainRequest(`${this.api}/user`, 'PUT', body);
  };

  createArticle = (postData) => {
    const body = {
      article: {
        title: postData.title,
        description: postData.shortDescr,
        body: postData.text,
        tagList: postData.tagList,
      },
    };
    return this.mainRequest(`${this.api}/articles`, 'POST', body);
  };

  updateArticle = (slug, articleData) => {
    const body = {
      article: {
        title: articleData.title,
        description: articleData.shortDescr,
        body: articleData.text,
        tagList: articleData.tagList,
      },
    };
    return this.mainRequest(`${this.api}/articles/${slug}`, 'PUT', body);
  };

  rateArticle = (slug, method) => this.mainRequest(`${this.api}/articles/${slug}/favorite`, method);

  deleteMyArticle = (slug) => this.mainRequest(`${this.api}/articles/${slug}`, 'DELETE');

  editMyArticle = (slug) => this.mainRequest(`${this.api}/articles/${slug}`, 'PUT');
}

export default new ApiServices();
