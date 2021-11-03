const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid');
const SALT_FACTOR = 6

const userSchema = new Schema(
  {
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
    password: {
    type: String,
    required: [true, 'Password is required'],
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: true,
      default: uuidv4(),
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        return ret
      },
    },
    toObject: { virtuals: true },
  },
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User