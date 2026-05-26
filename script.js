console.log("site loaded");
const card = document.querySelector(".card");

document.addEventListener("mousemove", e => {

  let x = (window.innerWidth / 2 - e.pageX) / 25;
  let y = (window.innerHeight / 2 - e.pageY) / 25;

  card.style.transform =
  `rotateY(${x}deg) rotateX(${-y}deg)`;
});