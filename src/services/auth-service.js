import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: 'http://localhost:4000',
      withCredentials: true,
    })
  }

  signup(user) {
    const { name, password, rePassword, email } = user;
    return this.auth.post('/auth/signup', { name, password, rePassword, email })
      .then(({ data }) => data);
  }

  login(user) {
    const { email, password } = user;
    return this.auth.post('/auth/login', { email, password })
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post('/auth/logout')
      .then(response => response.data)
  }

  me() {
    return this.auth.get('/auth/me')
      .then(response => response.data)
  }

  updateUser(user) {
    const { name, profileImage, location, age, gender, nativeLanguage, spokenLanguages, learningLanguages } = user;
    return this.auth.put('/auth/profile', { name, profileImage, location, age, gender, nativeLanguage, spokenLanguages, learningLanguages })
      .then(response => response.data)
  }
}

const authService = new AuthService();

export default authService;