# Ultimate GSAP Workshop Starter

## Cómo utilizar GSAP

1. Vía CDN

```bash
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
```

2. Vía NPM 
```bash
npm install gsap
```

## Entendiendo GSAP
GASP es intencionalmente minimalista. Su poder reside en su legibilidad y expresividad.

Así es como se ve su estructura general,

```javascript
gsap.fn(target, vars)
```

donde, 

* `gsap` es el objeto principal de GSAP.
* `fn` es el metodo que utiliza para crear animaciones como `.to()`, `.from()`, `.fromTo()`, etc.
* `target` es el selector, el elemento DOM o la matriz de elementos que se desean animar.
* `vars` es un objeto que contiene las propiedades que desea animar y las opciones que controlan la animación (duración, facilitación, devoluciones de llamadas, etc.)

por ejemplo, 

```javascript
gsap.to(".box", {
  x: 100,
  duration: 1,
  ease: "power1.out"
});
```