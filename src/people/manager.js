var Person = require("./person");
var Building = require("../rental_property/building");

function Manager(name, contact) {
  this.name = name;
  this.contact = contact;
  this.buildings = [];
  // inherit name and contact
  // ...
  // manager manages an 'array' of buildings
  // ...
}

// Set prototype and constructor
// ...
Manager.prototype = new Person ();
Manager.prototype.constructor = Manager;

Manager.prototype.addBuilding = function(building) {
 // check if building is an INSTANCEOF a Building
  // ...
 if(building instanceof Building) {
  this.buildings.push(building);
}
return this;
};

Manager.prototype.removeBuilding = function(building) {
  if(this.buildings.indexOf(building) != -1) {
    this.buildings.splice(this.buildings.indexOf(building),1);
  }

  // remove building
  // ...
  return this;
};

module.exports = Manager;