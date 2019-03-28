import { Document, model, Model, Schema, Error } from 'mongoose';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt-nodejs';

export type UserModel = Document & {
  name: string,
  email: string,
  password: string,
  createdAt: Date,
  comparePassword: comparePasswordFunction
};


// issue password is any
export interface IUser extends Document {
  name: string;
  email: string;
  password: any;
  createdAt: Date;
  updatedAt: Date;
}

const schema: Schema = new Schema({
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });


schema.pre("save", function (next) {
  const user = this as any;
  if (!user.isModified("password")) { return next(); }
  bcrypt.genSalt(10, (err: any, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, (err: Error, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});



type comparePasswordFunction = (password: string, cb: (err: any, isMatch: any) => {}) => void;

const comparePassword: comparePasswordFunction = function(password, cb) {
  bcrypt.compare(password, this.password, (err: Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

schema.methods.comparePassword = comparePassword;

const UserModel: Model<IUser> = model<IUser>('Account', schema, 'accounts');

export default UserModel;