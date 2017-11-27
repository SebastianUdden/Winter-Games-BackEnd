







// app.use(express.static('public'));





// // if our user.js file is at app/models/user.js
// var User = require('./app/models/user');

// // create a new user called chris
// var chris = new User({
//   userName: 'sevilayha',
//   password: 'pAssw0rd',
//   firstName: 'Chris',
//   lastName: 'Pash',
//   email: 'chris@Pash.com'
// });

// // call the custom method. this will just add -dude to his name
// // user will now be Chris-dude
// chris.dudify(function(err, userName) {
//   if (err) throw err;
//   console.log('Your new name is ' + userName);
// });

// // call the built-in save method to save to the database
// chris.save(function(err) {
//   if (err) throw err;

//   console.log('User saved successfully!');
// });

































// ////////////////
// // Variables
// ////////////////////////////////////////////////////////////////////////////////
// var blocks = {
//     'Fixed': 'Fastened securely in position',
//     'Movable': 'Cabaple of being moved',
//     'Rotating': 'Moving in a circle around its center'
// };
// var cities = {
//     'Lotopia': 'Rough and mountainous',
//     'Caspiana': 'Sky-top island',
//     'Indigo': 'Vibrant and thriving',
//     'Paradise': 'Lush, green plantation',
//     'Flotilla': 'Bustling urban oasis'
// };
// var citiesYear = {
//     5000: 'Lotopia',
//     5100: 'Caspiana',
//     5200: 'Indigo',
//     6000: 'Paradise',
//     7000: 'Flotilla'
// };
// var locations = {
//     'Fixed': 'First floor', 
//     'Movable': 'Second floor',
//     'Rotating': 'Penthouse'
// };

// ////////////////
// // Params
// ////////////////////////////////////////////////////////////////////////////////
// app.param('name', function(request, response, next) {
//     var name = request.params.name;
//     request.parseName = name[0].toUpperCase() + name.slice(1).toLowerCase();
//     next();
// });

// app.param('year', function(request, response, next) {
//     if(isYearFormat(request.params.year)) {
//         next(); 
//     } else {
//         response.status(400).json('Invalid Format for Year');
//     }
// });

// ////////////////
// // Blocks
// ////////////////////////////////////////////////////////////////////////////////
// app.get('/blocks', function(request, response) {  
//     response.send(blocks);
//     // response.send(Objects.keys(blocks));
// });
// app.get('/blocks/:name', function(request, response) {  
//    var description = blocks[request.parseName];
//    if(!description) {

//    }
// });
// app.get('/locations/:name', function(request, respone) {
//     var description = locations[request.blockName];
// });
// app.post('/blocks', parseUrlencoded, function(req, res) {
//     var newblocks = req.body;
//     blocks[newblocks.name] = newblocks.description;
//     res.status(201).json(newblocks.name);
// });

// ////////////////
// // Cities
// ////////////////////////////////////////////////////////////////////////////////
// app.get('/cities', function(request, response) {
//     response.json(cities);
// });
// app.get('/cities/:name', function(request, response) {    
//     var cityInfo = cities[request.parseName];
//     if(cityInfo) {
//         response.json(cityInfo);
//     } else {
//         response.status(404).json('City ' + request.params.name + ' not found');
//     }
// });
// app.get('/cities/year/:year', function(request, response) {
//     var year = request.params.year;
//     var city = citiesYear[year];

//     if(!city) {
//       response.status(404).json("No City found for given year");
//     } else {
//       response.json("In " + year + ", " + city + " is created.");
//     }
// });

// ////////////////
// // Functions
// ////////////////////////////////////////////////////////////////////////////////
// function citySearch (keyword) {
//     var regexp = RegExp(keyword, 'i');
//     var result = cities.filter(function (city) {
//         return city.match(regexp);
//     });
//     return result;
// }

// function isYearFormat(value) {
//     var regexp = RegExp(/^d{4}$/);
//     return regexp.test(value);
// }



