"use strict";
const user = { id: 1, name: "Kader", city: "Paris" };
function greet(u) {
    return `Hello, ${u.name}!`;
}
const out = document.querySelector("#out");
const btn = document.querySelector("#btn");
if (!out || !btn) {
    throw new Error("Missing DOM elements");
}
out.textContent = greet(user);
btn.addEventListener("click", (e) => {
    const target = e.currentTarget;
    target.disabled = true;
    out.textContent = "Button clicked (typed event) ";
});
