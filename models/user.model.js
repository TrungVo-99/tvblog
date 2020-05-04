const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  role: {
    type: String,
    default: "user"
  }
});

userSchema.method({
  encryptPassword: password => {
    return bcrypt.hashSync(password, 10);
  },

  validPassword: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  }
});

module.exports = model("users", userSchema);
