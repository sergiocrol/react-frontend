import axios from 'axios';

class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
      withCredentials: true,
    })
  }

  updateScore(score, pillId) {
    console.log(score);
    return this.user.put('/user/score', { score, pillId })
      .then(({ data }) => data);
  }

}

const userService = new UserService();

export default userService;