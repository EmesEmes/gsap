import gsap from "gsap";

import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: ".pin-container",
  start: "top center",
  end: "+=500",
  pin: ".box",
  markers: true,
});