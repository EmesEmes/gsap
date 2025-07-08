import gsap from "gsap";

const card = document.querySelector('#card')

card.addEventListener('mouseenter',() => {
  gsap.to(card, {
    rotateY: 180,
    duration: 1,

  })
})

card.addEventListener('mouseleave',() => {
  gsap.to(card, {
    rotateY: 0,
    duration: 1,
  })
})
