class ApiServices {
    
  api = 'https://conduit.productionready.io/api';

  mainRequest = async (url, options) => {
    try {
      const request = await fetch(url, options);
      return await request.json();
    } catch(err) {
      console.log(err)
    }
  }
    
  allArticlesRequest = (page) => {
      return this.mainRequest(`${this.api}/articles?limit=10&offset=${page}`)
    }

  getOneArticle = (slug) => {
        return this.mainRequest(`${this.api}/articles/${slug}`)
    }

  regRequets = (name, email, pass) => {
    this.mainRequest(`${this.api}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "user":{
          "username": name,
          "email": email,
          "password": pass
        }
      })
    })
  }

  authentication = (email, pass) => {
    return this.mainRequest(`${this.api}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "user":{
          "email": email,
          "password": pass
        }
      })
    })
  }

  getUser = (userToken) => {
      return this.mainRequest(`${this.api}/user`, {
        headers: {
          Authorization: `Token ${userToken}`
        }
      })
  }

  updateUser = (name, email, pass, imageUrl) => {
    return this.mainRequest(`${this.api}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('userToken')}`
      },
      body: JSON.stringify({
        "user":{
          "username": name,
          "email": email,
          'password': pass,
          "image": imageUrl
          }
      })
    })
    .then(data => console.log(data))
  }
  
}

export default new ApiServices();