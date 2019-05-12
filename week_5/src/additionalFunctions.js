export const prettyDir = (nameGroup, obj) => {
   console.group(nameGroup);
   /* Object.getOwnPropertyNames(obj).forEach(function(val, idx,array) {
      if (typeof obj[val] === "string") {
        console.log(
          `${idx + 1}: %c${obj[val]} ${typeof obj[val]}`,
          "color: red"
        );
      } else if (typeof obj[val] === "number") {
        console.log(
          `${idx + 1}: %c${obj[val]} ${typeof obj[val]}`,
          "color: blue"
        );
      } else if (typeof obj[val] === "object") {
        console.log(
          `${idx + 1}: %c${obj[val]} ${typeof obj[val]}`,
          "color: green"
        );
      } else if (typeof obj[val] === "array") {
        console.log(
          `${idx + 1}: %c${obj[val]} ${typeof obj[val]}`,
          "color: pink"
        );
      }
   });   */
   Object.values(obj).map((element, index) => {
      if (typeof element === "string") {
         return console.log(`${index}: %c ${element} (${typeof element})`, `color: red`);
      } else if (element instanceof Array) {
         return console.log(`${index}: %c ${element} (array)`, `color: orange`);
      } else if (typeof element === "number") {
         return console.log(`${index}: %c ${element} (${typeof element})`,`color: blue`);
      } else if (typeof element === "object") {
         return console.log(`${index}: %c ${element} (${typeof element})`, `color: green`);
      } else if (typeof element === "boolean") {
         return console.log(`${index}: %c ${element} ${(typeof element)}`, `color: brown`);
      } else {
         return console.log(`${index}: %c ${element} ${(typeof element)}`, `color: black`);
      }
   });
   console.groupEnd();
};