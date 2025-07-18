class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  talk() {
    console.log(`Hi, my name is ${this.name} and my age is ${this.age}`);
  }
}

let p1 = new Person("adam", 25);
let p2 = new Person("eve", 21);
p1.talk();
p2.talk();
