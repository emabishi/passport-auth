const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltingRounds = 10;

// schema maps to a collection, defines attributes of documents within collection
const Schema = mongoose.Schema;

const userSchema = new Schema({
  local: {
    email: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    password: {
      type: 'String',
      required: true,
      trim: true
    }
  },
  google: {
    id: {
      type: 'String',
      required: true,
      trim: true,
      unique: true
    },
    token: {
      type: 'String',
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: 'String',
      required: true,
      trim: true,
      unique: true
    },
    name: {
      type: 'String'
    }
  },
  facebook: {
    id: {
      type: 'String',
      required: true,
      trim: true,
      unique: true
    },
    token: {
      type: 'String',
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: 'String',
      required: true,
      trim: true,
      unique: true
    },
    name: {
      type: 'String'
    }
  },
  twitter: {
    id: {
      type: 'String',
      required: true,
      trim: true,
      unique: true
    },
    token: {
      type: 'String',
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: 'String',
      required: true,
      trim: true,
      unique: true
    },
    name: {
      type: 'String'
    }
  },
  
});

// encrypt password before save
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified || !user.isNew) { // don't rehash if it's an old user
    next();
  } else {
    bcrypt.hash(user.local.password, saltingRounds, function (err, hash) {
      if (err) {
        console.log('Error hashing password for user', user.email);
        next(err);
      } else {
        user.local.password = hash;
        next();
      }
    });
  }
});

// Validate password
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);