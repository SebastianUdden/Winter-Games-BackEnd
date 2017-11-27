// // create a schema
// var userSchema = new Schema({
//     id: { type: Number },
//     userName: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     score: { type: Number },
//     level: { type: String },
//     current: { type: Boolean },
//   });
  
//   // custom method to add string to end of name
//   // you can create more important methods like name validations or formatting
//   // you can also do queries and find similar users 
//   userSchema.methods.dudify = function() {
//     // add some stuff to the users name
//     this.userName = this.userName + '-dude'; 

//     return this.userName;
// };
  
//   // the schema is useless so far
//   // we need to create a model using it
//   var User = mongoose.model('User', userSchema);
  
//   // make this available to our users in our Node applications
//   module.exports = User;
  