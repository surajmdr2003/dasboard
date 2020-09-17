import axios from 'axios';
import Config from '../../app.config';

export default axios.create({
  baseURL: Config.apiPath,
});
