import { getData } from './localStorage';

class ApiServices {
  api = 'https://conduit.productionready.io/api';

  // headers = {
  //   'Content-Type': 'application/json;charset=utf-8',
  //   Authorization: `Token ${getData('userToken')}`,
  // }

  // mainRequest = async (url, method, body, token) => {
  //     const request = await fetch(url, options);
  //   if (token) {
  //     const resp = await request.json();
  //     return resp.then(url, {
  //       method: method,
  //       headers: this.headers,
  //       body: body
  //     })
  //   }
  //   return resp
  // }

  mainRequest = async (url, options) => {
    try {
      const request = await fetch(url, options);
      return request.json();
    } catch (err) {
      throw new Error(err);
    }
  };

  allArticlesRequest = (page) => this.mainRequest(`${this.api}/articles?limit=10&offset=${page}`);

  getOneArticle = (slug) =>
    this.mainRequest(`${this.api}/articles/${slug}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getData('userToken')}`,
      },
    });

  regRequets = (name, email, pass) => {
    this.mainRequest(`${this.api}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          username: name,
          email,
          password: pass,
        },
      }),
    });
  };

  authentication = (email, pass) =>
    this.mainRequest(`${this.api}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          email,
          password: pass,
        },
      }),
    });

  getUser = (userToken) =>
    this.mainRequest(`${this.api}/user`, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });

  updateUser = (userData) =>
    this.mainRequest(`${this.api}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getData('userToken')}`,
      },
      body: JSON.stringify({
        user: {
          username: userData.name,
          email: userData.email,
          password: userData.pass,
          image: userData.img,
        },
      }),
    });

  createArticle = (postData) =>
    this.mainRequest(`${this.api}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getData('userToken')}`,
      },
      body: JSON.stringify({
        article: {
          title: postData.title,
          description: postData.shortDescr,
          body: postData.text,
          tagList: postData.tagList,
        },
      }),
    });

  updateArticle = (slug, articleData) => {
    this.mainRequest(`${this.api}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getData('userToken')}`,
      },
      body: JSON.stringify({
        article: {
          title: articleData.title,
          description: articleData.shortDescr,
          body: articleData.text,
          tagList: articleData.tagList,
        },
      }),
    });
  };

  rateArticle = (slug, method) =>
    this.mainRequest(`${this.api}/articles/${slug}/favorite`, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getData('userToken')}`,
      },
    });

  deleteMyArticle = (slug) =>
    this.mainRequest(`${this.api}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getData('userToken')}`,
      },
    });

  editMyArticle = (slug) => {
    this.mainRequest(`${this.api}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getData('userToken')}`,
      },
    });
  };
}

export default new ApiServices();
