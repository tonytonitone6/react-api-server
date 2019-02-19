import * as mongoose from 'mongoose';
import * as moment from 'moment';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
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

schema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err: any, salt: any) {
    if (err) return next(err);

    // bcrypt.hash(user.password, salt, function(err, hash) {
    //   if (err) return next(err);
    //   user.password = hash;
    //   next();
    // })
  })
});

schema.methods.comparePassword = (password: string, userPassword: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, userPassword, (err: any, isMatch: any) => {
      isMatch ? resolve({success: true}) : reject({success: false, errMsg: 'password is failure'});
    });
  });
};

const model = mongoose.model('Account', schema, 'accounts');

export default model;