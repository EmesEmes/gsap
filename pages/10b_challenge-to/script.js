import gsap from "gsap"

const showToasts = () => {
  gsap.to('.one', {
    y: -100,
    duration: 0.5,
    ease: 'power2.inOut',
    onComplete: () => {
      gsap.to('.one', {
        delay: 2,
        y: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to('.one', {
            delay: 1,
            y: 0,
            duration: 0.5,
            onComplete: () => {
              gsap.to('.two', {
                delay: 1,
                y: -100,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: () => {
                  gsap.to('.two', {
                    delay: 2,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.inOut',
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}

showToasts()