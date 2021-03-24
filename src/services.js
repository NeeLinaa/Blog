class ApiServices {
  api = 'https://conduit.productionready.io/api';

  mainRequest = async (url, options) => {
    try {
      const request = await fetch(url, options);
      return await request.json();
    } catch (err) {
      throw new Error(err);
    }
  };

  allArticlesRequest = (page) => this.mainRequest(`${this.api}/articles?limit=10&offset=${page}`);

  getOneArticle = (slug) =>
    this.mainRequest(`${this.api}/articles/${slug}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('userToken')}`,
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

  updateUser = (name, email, pass, imageUrl) =>
    this.mainRequest(`${this.api}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('userToken')}`,
      },
      body: JSON.stringify({
        user: {
          username: name,
          email,
          password: pass,
          image: imageUrl,
        },
      }),
    });

  createArticle = (title, shortDescr, text, tagList) =>
    this.mainRequest(`${this.api}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('userToken')}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description: shortDescr,
          body: text,
          tagList,
        },
      }),
    });

  updateArticle = (slug, title, shortDescr, text, tagList) => {
    this.mainRequest(`${this.api}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('userToken')}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description: shortDescr,
          body: text,
          tagList,
        },
      }),
    });
  };

  rateArticle = (slug, method) =>
    this.mainRequest(`${this.api}/articles/${slug}/favorite`, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('userToken')}`,
      },
    });

  deleteMyArticle = (slug) =>
    this.mainRequest(`${this.api}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('userToken')}`,
      },
    });

  editMyArticle = (slug) => {
    this.mainRequest(`${this.api}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('userToken')}`,
      },
    });
  };
}

export default ApiServices;
