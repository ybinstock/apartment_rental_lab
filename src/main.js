var menu = require('node-menu');
var app = require('./app.js');

var building = new app.Building("Waterfront Tower");
var people = [];

people.push(new app.Person("Anna", "765-4321"));
var john = new app.Manager("John", "700-4321");
building.setManager(john);
people.push(john);
var devin = new app.Tenant("Devin", "765-1234");
devin.addReference(new app.Person("Carl", "415 3536 222"));
devin.addReference(new app.Person("Steve", "415 1111 222"));
people.push(devin);
people.push(new app.Tenant("Steve", "744-1234"));

building.units.push(new app.Unit("12", building, 400, 2000));
building.units.push(new app.Unit("13", building, 800, 3000));
building.units.push(new app.Unit("14", building, 1800, 4500));

// --------------------------------
menu.addDelimiter('-', 40, building.address + " rental app");

menu.addItem('Add manager',
  function(name, contact) {
    var aManager = new app.Manager(name, contact);
    aManager.addBuilding(building);
    building.setManager(aManager);
    people.push(new app.Manager(name, contact));
  },
  null,
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Add tenant',
  function(name, contact) {
    people.push(new app.Tenant(name, contact));
  },
  null,
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Show tenants:',
  function() {
    for (var i = 0; i <= people.length; i++) {
      if (people[i] instanceof app.Tenant){
        console.log("\n" + people[i].name + " " + people[i].contact);
        var references = people[i].references;
        if(!references) {continue;}
        for (var j = references.length - 1; j >= 0; j--) {
          console.log("-> Reference: " + references[j].name + " " + references[j].contact);
        }
      }
    }
  }
);

menu.addItem('Add unit',
  function(number, sqft, rent) {
    var aUnit = new app.Unit(number, building, sqft, rent);
    building.units.push(aUnit);
  },
  null,
  [{'name': 'number', 'type': 'string'},
    {'name': 'sqft', 'type': 'numeric'},
    {'name': 'rent', 'type': 'numeric'}]
);

menu.addItem('Show all units',
  function() {
    for(var i = building.units.length - 1; i >= 0; i--) {
      console.log(" tenant: " + building.units[i].tenant +
      			      " num: " + building.units[i].number +
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent);
    }
  }
);

menu.addItem('Show available units',
  function() {

    for(var i = building.units.length - 1; i >= 0; i--) {
      if (building.unit === null) {
        console.log(" tenant: " + building.units[i].tenant +
                    " num: " + building.units[i].number +
                    " sqft: " + building.units[i].sqft +
                    " rent: $" + building.units[i].rent);
      }
    }
  });

menu.addItem(
  'Add tenant reference',
  function(tenant_name, ref_name, ref_contact) {
    var throwError = true;
    people.forEach(function(tenant){
      if (tenant_name == tenant.name) {
        throwError = false;
        tenant.references.push(new Person(ref_name, ref_contact));
      }
    });
    if (throwError) {
      console.log("error " + tenant_name + " tenant not found");
    }
  },
  null,
  [{'name': 'tenant_name', 'type': 'string'},
  {'name': 'ref_name', 'type': 'string'},
  {'name': 'ref_contact', 'type': 'string'}]
);

menu.addItem('Move tenant in unit',
  function(unit_number, tenant_name) {
    var targetTenant;
      // find tenant and unit objects, use building's addTenant() function.
    building.tenants.forEach(function(tenant) {
      if (tenant_name == tenant.name) {
        targetTenant = tenant;
      }
    });

     building.units.forEach(function(unit) {
      if (unit_number == unit.number) {
        building.addTenant(unit, targetTenant);
      }
    });
    console.log(targetTenant + " has moved into " + unit_number);

  },
  null,
  [{'name': 'unit_number', 'type': 'string'},
  {'name': 'tenant_name', 'type': 'string'}]
);

menu.addItem(' Evict tenant',
  function(tenant_name) {
    var targetTenant;
    building.tenants.forEach(function(tenant) {
      if (tenant_name == tenant.name) {
        targetTenant = tenant;
      }
    });
    building.units.forEach(function(unit) {
      if (unit.tenant == targetTenant) {
        building.removeTenant(unit, targetTenant);
      }
    });
    // find tenant and unit objects, use building's addTenant() function.

    // Similar to above, use building's removeTenant() function.
    console.log(tenant_name + " has been evicted out of ");
  },
  null,
  [{'name': 'tenant_name', 'type': 'string'}]
);

menu.addItem('(implement me) Show total sqft rented',
  function() {
    var runningTotal = 0;
    for(var i = 0; i< building.units.length; i++){
      runningTotal += building.units[i].sqft;
    }
  console.log(runningTotal);
  return runningTotal;
    }
);

menu.addItem('(implement me) Show total yearly income',
    function() {
    var runningTotal = 0;
    for(var i = 0; i< building.units.length; i++){
      if(building.units[i].available()) {
        runningTotal += building.units[i].rent;
      }
    }
  console.log(runningTotal);
  return runningTotal;
    }
);

menu.addItem('(Add your own feature ...)',
  function() {
      console.log("Implement a feature that you find is useful");
    }
);

// *******************************
menu.addDelimiter('*', 40);

menu.start();