const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const deletedAt = require('../../plugins/deleted-at.plugin');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      trim: true,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

UserSchema.plugin(deletedAt, { index: true });

UserSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
