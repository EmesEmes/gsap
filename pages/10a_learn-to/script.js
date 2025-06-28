import gsap from "gsap";

const showToastLoop = () => {
  gsap.to('.toast', {
    opacity: 1,
    y: -120,
    scale: 1,
    duration: 0.8,
    ease: 'power4.Out',
    onComplete: () => {
      gsap.to('.toast', {
        delay: 2.5,
        y: 0,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        ease: 'power2.in',
        onComplete: () => {
          setTimeout(showToastLoop, 2500);
        }
      })
    }
  })
}

showToastLoop()