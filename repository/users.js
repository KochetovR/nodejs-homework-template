const User = require('../model/user')

const findById = async (id) => {
  return await User.findById(id)
}

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const create = async (options) => {
  const user = new User(options)
  return await user.save()
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

const updateAvatar = async (id, avatar, idUserCloud = null) => {
  return await User.updateOne({ _id: id }, { avatar, idUserCloud })
}

// const updateSubscription = async (id, body) => {
//   const res = await User.updateOne(
//     { _id: id }, 
//     { ...body },
//     {new: true},)
//     return res
// }

module.exports = { findById, findByEmail, create, updateToken, updateAvatar }