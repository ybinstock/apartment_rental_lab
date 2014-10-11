var Person = require("./person");

function Tenant(name, contact) {
	Person.call(this, name, contact);
	this.references = [];

  // inherits name contact from Person
  // ...
  // tennant has 'array' of references
  // ...
}

// Set prototype and constructor
// ...
Tenant.prototype = new Person ();
Tenant.prototype.constructor = Tenant;

Tenant.prototype.addReference = function(reference){
 	if(reference instanceof Person) {
  	this.references.push(reference);
}
return this;
};
  // add reference to references. Reference must be of type Person
  // ...


Tenant.prototype.removeReference = function(reference) {
   if(this.references.indexOf(reference) != -1) {
    this.references.splice(this.references.indexOf(reference),1);
  }

  // remove building
  // ...
  return this;
};

module.exports = Tenant;
