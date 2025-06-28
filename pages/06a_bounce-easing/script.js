import gsap from "gsap";

const ball = document.querySelector('.circle')
const ball2 = document.querySelector('.circle2')
const ball3 = document.querySelector('.circle3')

gsap.to(ball, {
  y: 200,
  ease: 'bounce.out',
  duration: 2
})
gsap.to(ball2, {
  y: 200,
  ease: 'bounce.in',
  duration: 2
})
gsap.to(ball3, {
  y: 200,
  ease: 'bounce.inOut',
  duration: 2
})