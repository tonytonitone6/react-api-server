import * as mongoose from 'mongoose';
import * as moment from 'moment';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt-nodejs';
const { Schema } = mongoose;

interface valid{
  name: string;
  email: string;
  password: string;
  createTime: Date
}


const schema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    lowercase: true
  },
  password: {
    type: String
  },
  createTime: {
    type: Date
  }
});

type comparePasswordFunction = (password: string, cb: (err: any, isMatch: any) => {}) => void;

const comparePassword: comparePasswordFunction = function(password, cb) {
  bcrypt.compare(password, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  })
}

schema.methods.comparePassword = comparePassword;



const model = mongoose.model('Account', schema, 'accounts');

export default model;