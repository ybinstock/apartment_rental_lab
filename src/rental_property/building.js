function Building(address) {
  this.address = address;
  this.building = [];
  this.units = [];

  // building has an address
  // ...
  // and array of units
  // ...
}

Building.prototype.setManager = function(person) {

  // set this.manager to person. Person needs to be of type Manager.
  //
  // we can't use `instanceof` here because requiring the Manager
  // class in this file would create a circular dependency. therefore,
  // we're giving you this `if` statement for free.  in most other
  // cases you can use `instanceof` to check the class of something.
  if (person.constructor.name === "Manager") {
    this.manager = person;

  }
};

Building.prototype.getManager = function(){
  return this.manager;
};

Building.prototype.addTenant = function(unit, tenant) {
  if (tenant.references.length >= 2 && this.manager !== undefined && this.units.indexOf(unit) != -1 && unit.available())

    {unit.tenant = tenant;
  // add tenant but check to make sure there
  // is a manager first and a tenant has 2 references
  // Note that tenat does not belong to Building, but to Unit
  // ...
}
};

Building.prototype.removeTenant = function(unit, tenant) {
  // remove tenant
  // ...
  if(this.units.indexOf(unit) !== -1 &&
    unit.tenant === tenant &&
    this.manager)
  {
    unit.tenant = null;
  }
};

Building.prototype.availableUnits = function(){
  return this.units.filter(function(unit) {
return unit.available();
  });
};
Building.prototype.rentedUnits = function(){
return this.units.filter(function(unit) {
return !unit.available();

});
  // return rented units
  // ...
};

module.exports = Building;
