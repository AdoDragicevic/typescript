// ===== TYPESCRIPT =====

// JS Superset, compiled to JS
// JS: 'typeof' runtime check; TS: type assignmnets in compilation; with IDE in development
// npm install typescript / tsc --init / tsc -w / tsc app.ts



// ===== TYPE ASSIGNMENT VS. TYPE INFERENCE VS. TYPE CASTING =====

// Type Assign(ment)
const func1 = (n1: number, n2: number) => n1 + n2;
let name1: string;




// Type Infere(nce)
const n1 = 4; // type is 5
let n2 = 4; // type is num 




// Type Casting

// Informs TS value is of specific type

// When we select dom el by html tags (e.g. "h1"), TS knows it will be HTMLHeaderElement | null
// When we select dom el by class/id, TS only knows it will be HTMLElement | null
// In latter case we won't get full TS support (e.g. if el is HTMLInputElement)

// Equivalent syntaxes:
const reactInput = document.querySelector("#myInput") as HTMLInputElement; // used in React
const vanillaInput = <HTMLInputElement>document.querySelector("#myInput2"); // not used in React

// Type casting impilictly adds '!' after expression (we tell TS it insn't null)
// Alternative if we aren't sure it's not null:
const maybeNull = document.querySelector("#myInput");
if (maybeNull) (maybeNull as HTMLInputElement).value = "txt";




/* ===== TYPES =====

number, string, boolean, null
unknown // avoid; still better than 'any'
object & specific object types
array with flexible or strict types of elements
tuple // exact structure array (fixed num & type of elements)
any // most flexible type; *; all types allowed; avoid as it removes advantages of TS!
union // combination of other types
literal types // specify exact value (e.g. not only number, but 5)

Custom Types:

enum // autoamtically enumerated list; assigns labels to numbers/values; identifiers
type aliases
function type (function as a type)
function return types (void, never...)
interfaces
intersection
*/




// Object Types

// a) Generic Obj Type:
// TS offers no support
// {} / object
let a: {};
a = { name: "Ado" };
// console.log(a.name) // Error! TS will not know if name is a property on generic obj type

// b) Specific Obj Type
// Instead of key-value pairs, stores key-type pairs
const person: { name: string; age: number } = { // no need for this, TS can infere it
  name: "Ado",
  age: 31
}




// Aray Types

// any[] / string[] / (string | boolean)[]




// Tuple Type (čuta: tjupl)

let tupleArr: [number, string]; // can hold only two elements; first is a num and second a str!

// .push is an exception allowed in tupils! .push will work

// Inference will not work with tuple, because:
const arr = [2, true]; // type: (number | boolean)[]




// Enum Type

enum Role { ADMIN, READ_ONLY, AUTHOR }
const role = Role.ADMIN;
console.log(role); // 0

//You can assign your own values to enum:
enum Custom { BTC = 64000, ETH = "New hope", USD = 2 } // refer to stored values with Role.ADMIN, Custom.BTC, etc.




// Union Type

let c: number | string | boolean;




// Literal Type

let brand: "Microsoft" | "Apple"; // only these two specific strings are allowed
const num = 5 // TS inferes literal type (const can't change, it will stay not only a number, but a number of 5)

const combine = (message: "as-string" | "as-number") => message;
// combine("as-str") // Error! "as-str" not allowed!




// Type Aliases (keyword 'type')

type CustomTypeName = boolean | "only this string" | { name: string, age: number };
let custom: CustomTypeName;




// Function Return Type

// 'void': return type for func without a return statement
// 'never': return type for func that never returns anything (including 'undefined'), e.g. it thows Error or runs infinite loop

const sayHi = () => "Hello world"; // return type infered by TS (string)
function x(): void {} // no need to set, it's infered by TS




// Function Type

let fn1: Function;
let fn2: () => void;
let fn3: (a: number, b: number) => number;
fn3 = (n1: number, n2: number) => n1 + n2;
let fn4 = (a: string, b: string, action: (a: string) => void) => {
  // void above sygnalises that in fn4 we will ignore anything returned from the action callback, 
  // not that the action callback will not have a return statement!
  action(a + b);
}
fn4( "Hello", " World", (num) => console.log(num) ); // TS knows num is a number, because it's specified above




// ===== CLASSES =====

class FirstClass {
  // access modifiers: public, private, protected, readonly
  name: string; // class field definition (property object will have); valid in ES7 and TS
  private age = 31; // 'private' property/method: only accessible from inside class; 'public' is default
  readonly id: string; // 'readonly' will not change;
  protected employees: string[] = []; // 'protected' can be changed from within the class and its instances
  optional?: string; // ? marks optinal property/method
  constructor(n: string, id: string, o?: string) { // we have to add '?' here as well
    this.name = n;
    this.id = id;
    if (o) this.optional = o;
  }
}

class SecondClass {
  constructor(public name: string, private readonly id: string) {} // shorthand
}

class ThirdClass {
  constructor(private name: string) {}
  // getters and setters are great for adding more complex logic before we read/set a value
  // getter: property that executes a method that returns a value
  get upperCaseName() { // access it as property, i.e. instanceObj.upperCaseName
    return this.name === "" ? "John Doe" : this.name.toUpperCase();
  }
  // setter: must take an argument
  set changeName(newName: string) { // access it as property, i.e. instanceObj.changeName = "NewName"
    if (newName.trim().length === 0) throw new Error("Invalid name");
    this.name = newName;
  }
}

class ForthClass {
  // 'static' property/method is not available on instance, but directly on class (often utilites, e.g. Math.random(), Math.PI)
  static dateOfBirth = "06.01.1990."; // access directly on class, i.e. with ForthClass.dateOfBirth
  static sayHello() {} // invoke with ForthClass.sayHello()
}

abstract class FifthClass { // if class contains abstract method/property, we must add 'abstract' before 'class' keyword
  // use 'abstract' when you can't provide a general method/property, but you want to enforce that it exists on all instances
  abstract list: string[]; // every instance must override this property
  abstract mandatoryMethod(arg: boolean): void; // every instance must override this method
} // abstract classes can't be instanciated (they can only be extended)

class SixtClass { // Singleton pattern in OOP ensures class has only one instance
  // implement by:
  private static instance: SixtClass; // a) instance will store a value with type of this class
  private constructor() {} // b) private constructor 
  static getInstance() { // c) static method used to create one instance (with a check if there is already such instance)
    if (!this.instance) this.instance = new SixtClass();
    return this.instance;
  }
}
// d) const x = SixtClass.getInstance();




/* ===== INTERFACES =====

Describes object structure/type
We can't initialize values inside interface
You can define obj structure with 'type' and 'interface', interface is more specific
You can use it as a 'contract' to a class (obliging that class to certain things)
*/

interface Greetable { 
  readonly name: string; // 'readonly' is the only modifier allowed in interfaces 
  age?: number; // ? optional property
  sex?(): boolean; // ? optional method 
  greet(txt: string): void; 
}

// We can implement interface in class (interface acts as contract that a class implements)
class User implements Greetable {
  name = "Ado"; // this is readonly even without us specifying it here
  greet(txt: string) {
    console.log(txt);
  }
  extraMethod() {} // class can have more than Greetable requires, but never less
}
let user1: Greetable; // we don't know what will be in user1, but it has to be greetable
user1 = new User();

let user2: Greetable = {
  name: "Borna", // this is readonly even without us specifying it here
  greet() {},
  // exit() {} // Error! In obj interface doesn't allow more properties/methods
}
// user2.name = "Michael"; // Error! name is 'readonly'

// class can implement multiple interfaces
interface Named { name: string; }
interface ChangeName { changeName(newName: string): void; }
class Person implements Named, ChangeName {
  name = "Ado";
  changeName(n: string) {
    this.name = n;
  }
}

// interface can be extended
interface First { firstMethod(): void; }
interface Second extends First { secondMethod(): void; } // extends creates new interface that requires both methods
const twoMtdObj: Second = { firstMethod() {}, secondMethod() {} };
interface Third extends First, Second { thirdMethod(): void; } // interface can extend more interfaces

// interface can create function types (as alternative to custom types)
type Fn1 = (n: number) => number;
interface Fn2 { (n: number): number; } // same as defining functions in interfaces, but without func name; now it's a function type




// ===== ADVANCED TYPES =====

// Intersection Types

// Allow us to combine other types
// Similar can be achieved with interface inheritance

type One = { propOne: string; }
type Two = { methOne(): void; }
type Combination = One & Two; // intersection type

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric; // intersection type




// Type Guards

// Helps with union types, to check exact type at runtime
// Done with JS features: 'typeof', 'in' and 'instanceof'

function add(a: string | number, b: string | number) {
  if (typeof a === "string" || typeof b === "string") { // type guard (using typeof)
    return a.toString() + b.toString();
  }
  return a + b;
}

type LawEmployee = { name: string; school: string; }
type ITEmployee = { name: string; cerfication: string | null }
function printEmployeeData(employee: LawEmployee | ITEmployee) {
  console.log(employee.name);
  if ("school" in employee) { // type guard (using 'in' check)
    console.log(employee.school);
  } 
  else console.log(employee.cerfication);
}

class Car {
  drive() {}
}
class Truck {
  drive() {};
  loadCargo() {};
}
function useVehicle(v: Car | Truck) {
  v.drive();
  if (v instanceof Truck) { // type guard (using instanceof)
    v.loadCargo();
  }
}




// Discriminated Unions

// Patter that makes implementing type guards easier
// Applicable with obj types
// We build it by adding an extra property to every interface/obj type that is part of the union (identical property)

interface Bird { 
  type: "bird"; // property added to each obj in discriminated uion (literal type)
  flyingSpeed: string 
}
interface Horse {
  type: "horse"; // property added to each obj in discriminated uion (literal type)
  runningSpeed: string 
}
function printAnimalSpeed(animal: Bird | Horse) {
  switch(animal.type) { // type guard (based on common property in disciminatory union)
    case "bird":
      console.log(animal.flyingSpeed);
      break;
    case "horse":
      console.log(animal.runningSpeed);
      break;
    default:
      console.log("No info available");
  }
}




// Index Types / Index Properties

// Allow us to create more flexible obj types
// We don't have to know in advance which property names and how many properties we need

interface ErrorContaner {
  [prop: string | number]: string; // we don't know the property name, but it's value will be of type str
  // id: string; // named properties are allowed, but only of the same value type!
  // age: number; // Error! Value has to be of type string
}

const flexibleErrorData: ErrorContaner = {} // valid
const flexibleErrorData2: ErrorContaner = { anyName: "hehehe" } // valid
const flexibleErrorData3: ErrorContaner = { one: "txt", two: "txt", three: "txt" } // valid
// const flexibleErrorData4: ErrorContaner = { one: "txt", two: true } // Error! Boolean value not allowed




// Function Overloads

// Defining multiple func signatures, i.e. multiple ways of calling a func

type StrNum = string | number;

// Without Function Overloads:
const addTogether = (a: StrNum, b: StrNum) => { // TS inferes return type as StrNum (although it's really str or num)
  return (typeof a === "string" || typeof b === "string") ? a.toString() + b.toString() : a + b;
}
const sum = addTogether(1, 2); // PROBLEM: sum is a num, but TS thinks it's StrNum, and we don't get full TS support on sum
// const sum = addTogether(1, 2) as string; // One workaway is Type Casting

// With Function Overloads:
function addTogether2(a: number, b: number): number // function overload
function addTogether2(a: string, b: string): number // if we call func with 2 str, return is str
function addTogether2(a: string, b: number): string
function addTogether2(a: number, b: string): string
function addTogether2(a: StrNum, b: StrNum) {
  return (typeof a === "string" || typeof b === "string") ? a.toString() + b.toString() : a + b;
}
const sum2 = addTogether2(1, 3); // TS inferes sum2 as num




// ===== SIMPLE FEATURES =====

// Nulish Coalescing '??'

// '??' operator checks if something is null/undefined (not falsy like "", false or 0)
const vl = "" || "No value"; // "No value"
const v2 = "" ?? "No value"; // ""




// '!' tells TS expression won't be null

const paragraph = document.querySelector("p")!;




// '_' as first char of var/arg name tells TS it will not be used 




// Optional parameters (func, class, interface, obj)

function optionaParamsFn(a?:string) {}
function optionalParamsFn(a = "defaultVal") {}




/* Optional Chaining

fetchedData.name.firstName // JS: app crashes in runtime; TS: Error
fetchedData?.name?.firstName // TS
fetchedData && fetchedData.name && fetchedData.firstName // JS
*/




// ===== GENERICS =====

// Generic Type is a) connected with another type, and b) flexible regarding that other type
// Point is to add flexibility and keep TS support




// Generic Types built-in to TS

// Array

let arr1: string[]; // array is a generic type built in to TS
let arr2: Array<string>; // equivalent to line above
// let arr3: Array; // here TS can't provide support on arr el

// Promise

const promise: Promise<string> = new Promise( (res, _rej) => { // we tell TS this promise will eventually resolve to str
  setTimeout( () => res("str"), 1000 );
});
// Main type is Promise, but promise (like Array) works with other types. To get full TS support we use Generic Types




// Custom Generic Types

// functions

function merge(obj1: object, obj2: object) {
  return Object.assign(obj1, obj2);
}
const combined = merge({ name: "Ado" }, { age: 31 }); // TS inferes type 'object', but doesn't know about name property (less TS support)

// Type Casting is one alternative:
const combined2 = merge({ x: 3 }, { y: "c" }) as { x: number, y: string };

// Generics is another alternative:
function merge2<T, U>(obj1: T, obj2: U) { // T and U letters are just a convention, but can be anything else (e.g. First, Second)
  return Object.assign(obj1, obj2); // TS inferes return is T & U (intersection) and gives full TS support!
} 

// T and U are set dynamically when func is called! We can set them ourselves when func is called, 
// e.g. merge2<{ name: string }, { age: number }>(obj1, obj2), but no need to do this, because TS inferes that!



// Type Constraints (with Generic Types)

// Type Constraints using 'extends'

function merge3<T extends object, U extends object>(obj1: T, obj2: U) { // without extends, T and U would be of any type,
  // the T and U can now be any obj type, but they have to be an obj
  return Object.assign(obj1, obj2);
}

interface Lenghty { length: number } // arr and str have length property
function getLength<T extends Lenghty>(arg: T): [string, T] {
  let description: string;
  switch(arg.length) {
    case 0:
      description = `No length.`;
      break;
    case 1:
      description = `Length of 1 character.`;
      break;
    default:
      description = `Length of ${arg.length} characters.`;
  }
  return [description, arg]; // TS would infere (string | T)[]; above we specified a Tuple to be more specific
}




// Type Constraints using 'keyof'

// const getVal = (obj: object, key: string) => obj[key]; // Error! Maybe obj[key] does not exist!
const getVal = <T extends object, U extends keyof T>(obj: T, key: U) => obj[key]; // T is obj, U is key in that obj




// Generic Classes

class AppData<T> { // allows us to be flexible in regards of items in data
  private data: T[] = []; // array of T type items
  addItem(item: T) { // item is of T type (can be str, num, obj...)
    this.data.push(item);
  }
  removeItem(item: T) {
    const matchIndx = this.data.indexOf(item);
    if (matchIndx !== -1) this.data.splice(matchIndx, 1);
  }
}
const strings = new AppData<string>();
const numbers = new AppData<number>();
const objects = new AppData<object>();

// Difference if we use Union Types:
// Generic Type locks in a certain type; Union Type allows multiple types
class AppData2 { // Generic Type would tye all values to the type provided during initialization
  private data: (string | number | boolean)[] = []; // we're not saying this is EATHER str, num or bool; it can be a mix!
  addItem(item: string | number | boolean) { // we can add str, num or bool
    this.data.push(item);
  }
  removeItem(item: string | number | boolean) { // we can remove str, num or bool
    this.data.splice(this.data.indexOf(item), 1);
  }
}





// Generic Utility Types (TS built-in Types that utilize Generic Types)

// They add some utility functionality (e.g. set everything to optional, lock it down) to what is passed to them
// There are more, these are just two:




// Partial Type

// Makes all properties optional

interface CourseGoal { title: string; author: string; deadline: Date; }
function getCourseGoal(title: string, author: string, date: Date): CourseGoal {
  const courseGoal: Partial<CourseGoal> = {}; // with Partial it's ok courseGoal:CoruseGoal is not initialized with all props it requires
  courseGoal.title = title; // maybe we do it step-by-step because of some validation
  courseGoal.author = author; // TS usually does not support step-by-step adding of props to obj
  courseGoal.deadline = date;
  return courseGoal as CourseGoal; // without Type Casting TS inferes Partial<CourseGoal>
}




// Readonly Type

// Makes it immutable

const immutable: Readonly<string[]> = ["Milan", "Hrvoje", "Job", "Nikola"];
// immutable.push("Borna"); // Error! Readonly made it immutable!




// ===== DECORATORS =====

// Useful for meta programming (instrument for writing code that is easier to use for other developers)
// in tsconfig set "experimentalDecorators" to true
// Decorators are all about classes
// Decorator is a function
// @ points at a decorator
// Decorator receives arguments:
// - 1 arg when added to class (target: constructor function)
// - 2 arg when added to class property (target: prototype for instance || constructor if the property is static, propertyName)
// - 3 arg when added to class accessor (target: prototype for instance || constructor if the accessor is static, accessorName, propertyDescriptor)
// - 3 arg when added to class method (target: prototype for instance method || constructor if the method is static, methodName, propertyDescriptor)
// - 3 arg when added to class method parameter (target: prototype for instance method || constructor if the method is static, methodName, positionOfArgument)
// We can add multiple decorators; they execute "bootom up" (first the one closest to the class/mehtod/property)
// Decorators run when class is defined, they don't execute when class is instanciated
// Decorators added to class, class method or accessors can have a renturn statement:
// - decorator added to class can return a new constructor func (or class - syntactic suggar for constuctor func), that will replace the old one
// - decorator added to method or accessor can return a new PropertyDescriptor


// Added to class:

function ClassDecorator(constructor: Function) {
  console.log("Decorator..."); // first
  console.log(constructor); // second
}

@ClassDecorator // Runs when JS parser comes here (when class is defined), before the class is instanciated
class ClassOne {
  constructor(public name: string) {
    console.log("Class..."); // third (only if instanciated)
  }
}




// Decorator Factory (returns decorator, allows us to configure it when we assign it)

function ClassDecoratorFactory(logString: string) {
  return (_constructor: Function) => { // decorator
    console.log(logString); // first
    // here we can manipulate the dom or run some other logic...
    // we can even instanciate the class here:
    // const c = constructor();
  }
}

@ClassDecoratorFactory("Dynamic message")
class ClassTwo {
  constructor() {
    console.log("Constructor...."); // second (only if instanciated)
  }
}




// Added to (class) Property:

const ClassPropertyDecorator = (target: any, propertyName: string) => console.log(target, propertyName);

class ClassThree {
  constructor(private _title: string, private _price: number) {}
  @ClassPropertyDecorator // executes when JS registers the class definition (before it is instanciated)
  getPriceWithTax = (tax: number) => this._price * (1 + tax); 
}




// Added to (class) Accessors (getters & setters)

const ClassAccessorDecorator = (target: any, name: string, description: PropertyDescriptor) => console.log(target, name, description);

class ClassFour {
  private age = 31;
  get getCurrAge() {
    return `Current age is ${this.age}.`
  }
  @ClassAccessorDecorator // runs when JS regusters the class definition (even if class is not instanciated)
  set updateAge(age: number) {
    this.age = age;
  }
}




// Added to (class) Methods

const ClassMethodDecorator = (target: any, name: string, description: PropertyDescriptor) => console.log(target, name, description);

class ClassFive {
  @ClassMethodDecorator // runs when JS regusters the class definition (even if class is not instanciated)
  randMethod() {}
}




// Added to (class method) Parameter

const ClassMethodArgumentDecorator = (target: any, methodName: string, position: number) => console.log(target, methodName, position);

class ClassSix {
  randMethod(_arg1: string, @ClassMethodArgumentDecorator _arg2: number) {} // runs when JS registers the class definition
}




// Decorator added to class can have a renturn: a new class!

// Returning a new class is identical to returning a new constructor (class is syntactic suggar)

const ClassDecoratorWithReturn = (originalConstructor: any) => { // Replaces class it's added to
  return class extends originalConstructor {  // Anonymous class; it can extend received class
    constructor() { // Replaces originalConstructor
      super();
      // additional methods/properties/logic
    }
  } // Instead of extending originalClass, we can just fully replace it
};

@ClassDecoratorWithReturn // runs when JS registers the class definition
class ClassSeven {}




// Decorator added to method / accessor can have a return: a new PropertyDescriptor!

const BindToInstance = (_target: any, _methodName: string, descriptior: PropertyDescriptor) => {
  const originalMethod = descriptior.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      return originalMethod.bind(this);
    }
  }
  return adjustedDescriptor;
}

class ClassEight {
  msg = "Message";
  @BindToInstance
  showMessage() { 
    console.log(this.msg); 
  }
}
const printer = new ClassEight();
document.querySelector("button")?.addEventListener("click", printer.showMessage); // undefined without @BindToInstance
// Alternatives: a) .bind, or b) showMessage as arrow func




// Validation with Decorators

interface ValidatorConfig {
  [property: string]: {
    [validatableProperty: string]: string[];
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propertyName: string) {
  registeredValidators[target.constructor] = {
    [propertyName]: [...(registeredValidators[target.constructor.name]?.[propertyName] ?? []), 'required']
  }
}

function PositiveNum(target: any, propertyName: string) {
  registeredValidators[target.constructor] = {
    [propertyName]: [...(registeredValidators[target.constructor.name]?.[propertyName] ?? []), 'positive']
  }
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) return true;
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
      }
    }
  }
  return isValid;
}

class ClassNine {
  @Required
  title: string;
  @PositiveNum
  price: number;
  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}
document.querySelector("form")!.addEventListener("submit", e => {
  e.preventDefault();
  const title = (document.querySelector("#course-title") as HTMLInputElement).value;
  const price = (<HTMLInputElement>document.querySelector("#course-price")).value;
  // if (title !== "" && +price > 0) {} // we can add validation like this or inside ClassNine with a Decorator
  const createdCourse = new ClassNine(title, +price); // + converts str to num
  validate(createdCourse) ? console.log(createdCourse) : alert("Invalid input. Please, try again.");
});





// ===== THIRD PARTY LIBRARIES =====

// Built in TS / Supports TS / npm install @types/jQuery