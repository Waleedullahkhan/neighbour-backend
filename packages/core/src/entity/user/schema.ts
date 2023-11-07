import { model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, 'Please enter the first_name'],
    },
    last_name: {
      type: String,
      required: [true, 'Please enter the last_name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter the email'],
      unique: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    description: {
      type: String,
      required: false,
    },
    cognito_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model('User', UserSchema);
