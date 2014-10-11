var Person = require('./people/person'),
	Manager = require('./people/manager'),
  	Tenant = require('./people/tenant');

var Building = require('./rental_property/building');
var Unit = require('./rental_property/unit');

// start our apartment module to export later
var App = {};

// Add our types of people to our
// module
App.Person = Person;
App.Manager = Manager;
App.Tenant = Tenant;

// Add building and unit
App.Building = Building;
App.Unit = Unit;

module.exports = App;
