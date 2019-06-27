var students = {}
students[Symbol.iterator] = function() {
  let index = 1;
  return { next() {
    return {done: index>10, value: index++} }
  }
}

for(var i of students) { console.log(i); }
