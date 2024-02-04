import axios from 'axios';

class UserService {

  async singup(user) {
    try {
      const res = await axios.post('/signup', user);
      return res.data;
    } catch (err) {
      return null;
    }
  }

}

const userService = new UserService();
export default userService;