const name = "Mayas";
let age = 19;
const isStudent = true;

const numbers = [3, 8, 1, 10, 6];
const user = { id: 1, name: "Mayas", city: "Paris" };

console.log("Types:", typeof name, typeof age, typeof isStudent);
console.log("Array:", numbers);
console.log("Object:", user);

console.log("Coercion:", "5" + 1, Number("5") + 1);
console.log("isArray:", Array.isArray(numbers));

function sum(a, b) {
  return a + b;
}
const toUpper = (s) => s.toUpperCase();
const avg = (arr) => arr.reduce((acc, v) => acc + v, 0) / arr.length;

const apply = (value, fn) => fn(value);

console.log("sum:", sum(2, 3));
console.log("toUpper:", toUpper("hello"));
console.log("avg:", avg(numbers));
console.log("apply:", apply("epitech", toUpper));

const max = Math.max(...numbers);
const min = Math.min(...numbers);
const evens = numbers.filter((n) => n % 2 === 0);
const doubled = numbers.map((n) => n * 2);

console.log({ max, min, evens, doubled });

const students = [
  { name: "A", grades: [12, 15, 18] },
  { name: "B", grades: [9, 11, 10] },
  { name: "C", grades: [16, 17, 14] },
];

const studentAverage = (s) => avg(s.grades);
const topStudent = students.reduce((best, cur) =>
  studentAverage(cur) > studentAverage(best) ? cur : best
);

console.log("Top student:", topStudent.name, studentAverage(topStudent));

const { city } = user;
const [first] = numbers;
console.log("Destructuring:", city, first);

const listEl = document.querySelector("#list");
const addBtn = document.querySelector("#add-item");
const themeBtn = document.querySelector("#toggle-theme");

let count = 0;

addBtn.addEventListener("click", () => {
  count += 1;
  const li = document.createElement("li");
  li.textContent = `Item #${count}`;
  listEl.appendChild(li);
});

themeBtn.addEventListener("click", () => {
  document.body.style.background = document.body.style.background ? "" : "#111";
  document.body.style.color = document.body.style.color ? "" : "#fff";
});


const fakeFetch = (data, delayMs = 400) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delayMs));

async function runAsyncDemo() {
  const res = await fakeFetch({ ok: true, time: Date.now() });
  console.log("async result:", res);
}

runAsyncDemo();
