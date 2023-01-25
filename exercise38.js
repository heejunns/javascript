function person(name) {
  this.name = name;

  this.setName = function (name) {
    this.name = name;
  };

  this.getName = function () {
    return this.name;
  };
}

const hello = new person('hello');
hello.setName('hi');

console.log(hello);
