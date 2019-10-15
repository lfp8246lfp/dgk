import Mock from 'mockjs';
import db from './db'

export default Mock.mock('/login', 'post', db.user);