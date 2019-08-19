import axios from 'axios';

class PillService {
  constructor() {
    this.pill = axios.create({
      baseURL: 'http://localhost:4000',
      withCredentials: true,
    })
  }

  newPill(pill) {
    const { name, fromLanguage, toLanguage, author, date, difficulty, description, topics } = pill;
    return this.pill.post('/pills/new', { name, fromLanguage, toLanguage, author, date, difficulty, description, topics })
      .then(({ data }) => data);
  }

  getPill(pillId) {
    return this.pill.get(`/pills/pill/${pillId}`)
      .then(({ data }) => data);
  }

  newCard(card) {
    const { type, pillId, images } = card;
    return this.pill.post('/pills/card/image', { type, pillId, images })
      .then(({ data }) => data);
  }

}

const pillService = new PillService();

export default pillService;