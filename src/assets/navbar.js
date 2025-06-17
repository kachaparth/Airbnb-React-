import { gsap } from 'gsap';

let tl = gsap.timeline()

tl.from(".box1",{
    y:-60,
    opacity:0,
    duration:2,
    delay:0.2,
    ease: "elastic.out(0.5,1)",
})


tl.from("span",{
    x:35,
    delay:-1.5,
    opacity:0,
    duration:1,
    stagger:0.2,
})

