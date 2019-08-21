import axios from 'axios';

class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: 'http://localhost:4000',
      withCredentials: true,
    })
  }

updateScore(score, pillId) {
  return this.user.put('/user/score', { score, pillId })
  .then(({data}) => data);
}

}

const userService = new UserService();

export default userService;