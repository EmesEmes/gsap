import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
  x: 500,
  rotate: 360,
  duration: 3,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    markers: true,
    scrub: true,
  },
});