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

<hr>

## Apuntar Elementos
Antes de animar cualquier cosa, necesitamos saber `QUE` estamos animando.

En GSAP, el elemento objetivo es la primera cosa que pasamoss al cualquier método de animación, como `gsap.to()` o `gsap.from()`. Esto le dice a GSAP que elemento o elementos debe animar.

Saber como apuntar a los elementos es importato porque hay diferentes maneras de haceerelo, y cada una funciona mejor en diferentes situaciones.

### Apuntar por nombre de clase
En HTML, una clase (`class`) es un atributo que damos a un elemento para estilarlo o identificarlo. En React y Next.js, se llaman `className`, pero tiene el mismo propósito.

En GSAP. para apuntar a un elemento por su clase, usamos `.` (punto) antes del nombre de la clase, exactamente igual que en CSS.

Por ejemplo,

```html
<div class="box"></div>
```

```javascript
gsap.to(".box", {...});
```
Esto encuentra un elemeento con la clase `box` y lo anima dependiendo de las propiedades pasadas.

Si hay multiples elementos con la clase `box`, todos estos serán animados.

### Apuntar po ID
Un ID es otro atributo HTML que identifica como único a un elemento. A diferencia de las clases, un ID debe ser usado una sola vez por página.

Para apuntar un ID, se usa `#` (hash) seguido del nombre del ID.

Por ejemplo,

```html
<div id="hero"></div>
```

```javascript
gsap.to("#hero", {...});
```

Esto encuentra al elemento con el ID `hero` y lo anima.

Se puede usar así cuando estamos seguros que existe solo un elemento en toda la página y tiene que ser único.

### Apuntar por el tipo de elemento
Alguna veces vamos a querer seleccionar todos los elementos de un cierto tipo, como todos los elemeentos de tipo `<button>`. Ya que los ID tienen que ser únicos, no podeemos usarlos para este propósito, pero podemoss utilizar clasess en su lugar.

Pero si no queremos agregar una clase a cada elemento y queremos apuntar todos los elementos del mismo tipo, podemos apuntarlos por el nombre del `tag`, lo que ssignifica apuntarlos solo por el nombre del elemento sin usar ni punto ni hash.

Por ejemplo,

```html
<button>Click Me</button>
<button>Another Button</button>
```

```javascript
gsap.to("button", {...});
```

Esto apunta a todos los elementos de tipo `button` y les aplicará animaciones.

Esto es genial para aplicar animaciones a multiples elementos del mismo tipo. Pero hay que tener cuidado, ya que puede aplicar animacioness a mas elementos de loss que esperamos.

### Apuntando multiples selectores

Algunas veces, vamos a querer animar juntos diferentes tipos o grupos de elementoss y no solo elementos del mismo tipo.

En ese caso, podemos usar multiples selectores separados por una coma.

Por ejemplo,

```html
<div class="box"></div>
<div class="circle"></div>
```

```javascrript
gsap.to(".box, .circle", {...});
```

Esto selecciona tanto a `.box` y `.circle` y les aplicará animaciones juntos.

Este es especialmente útil cuando animamos a un grupo de elementos que no estan relacionados pero que se deben comportar igual.

### Apuntando a elementos hijo o anidados

Algunas veces, vamos a querer animar elementos que esten dentro de contenedores específicos, como un card o un modal, sin tener que agregar clases o IDs extra para mantener el código limpio.

En estos casos, podemos utilizar selectores descentes, similar a CSS, como `.parent .child` o `.parent child` o `.parent #id`.

Por ejemplo,

```html
<div class="card">
  <img />
  <div class="info">text</div>
</div>
```

```javascript
gsap.to(".card img", {...});
```

Esto apuntará unicamente a la imagen que esta dentro de `.card`

```javascript
gsap.to(".card .info", {...});
```

Y esto apuntará solo al elemento `.info` que este dentro de `.card` y lo animará. 

Esto es muy útil cuando construimos layouts estructurados con componentes rerutilizables.

> Estas son algunas de las formas mas comunes de apuntar a los elementos con GSAP. Pero tambín podemos usar QuerySelectors o `refs` en React, dependiendo de la situación. Sin embargo, estos casos son menos comunes y usualmente ssurgen cuando los métodos antes mencionados no son adecuados.

<hr>

## Tween
Un tween (de “in-between”) es la unidad básica de animación en GSAP. Es el objeto que se encarga de interpolar una o varias propiedades de un elemento u objeto JavaScript desde un valor inicial hasta un valor final, generando automáticamente los “fotogramas intermedios”.

### Puntos clave de un tween en GSAP
* __Definición:__ Es la animación atómica que mueve una o varias propiedades de un tardee durante un tiempo determinado.
* __Creación:__ Se crea típicamente con funciones como `gsap.to()`, `gsap.from()` o `gsap.toFrom()`.
* __Duración:__ Cada tween tiene un `duration` (segundo) y, opcionalmente, y `delay`.
* __Control:__ Se puede pausar, reproducir, invertir y ajustar el progreso deel tween en cualquieer momento" 
```javascript
const miTween = gsap.to(".caja", { x: 300, duration: 2 });
miTween.pause();       // detiene
miTween.play();        // reanuda
miTween.reverse();     // invierte la animación
miTween.progress(0.5); // salta a la mitad
```
* __Callbacks:__ Soportra ganchos para rreaccionar en disstintos momentos:
```javascript
gsap.to(".caja", {
  x: 300,
  duration: 2,
  onStart:   () => console.log("Inicio"),
  onUpdate:  () => console.log("Actualizando"),
  onComplete:() => console.log("¡Terminado!")
});
```
* __Encadenamiento con Timelines:__ Aunque un tween funciona por sí solo, lo más poderoso es agrrupar varios tweens en un `Timeline` para crear secuenciass complejas y ssincronizadas.

> En resumen, un tween es el mecanismo que toma un valor A y lo lleva a un valor B de forma suave, gestionando internamente todos los cálculos de interpolación y proporcionando una API muy flexible para controlarlo.

<hr>

## Propiedades de GSAP
En GSAP, las propiedades (o “vars”) son simplemente los atributos o valores que sse le dice a GSAP que anime en un tween o timeline. Es decir, cuando se llama a funciones como `gsap.to()` o `gsap.fromTo()`, dentro del objeto de configuración se define un conjunto de pares clave–valor que indican __qué__ y __hasta dónde__ se quiere animar.

### Propiedades más utilizadas de GSAP
1. __Transformaciones básicas:__
    * x, y, z: Mueven el elemento a lo largo de los ejes X, Y o Z (usualmente equivalente a translateX, translateY, translateZ).

    * scale, scaleX, scaleY: Escalan el elemento uniformemente o por eje.

    * rotation, rotationX, rotationY: Rotan el elemento en 2D (rotation) o 3D (rotationX, rotationY).

    * skewX, skewY: Sesgan el elemento en los ejes X o Y.

    * transformOrigin: Punto de referencia para las transformaciones (ej. "50% 50%").

2. __Opacidad y visibilidad:__
    * opacity: Controla la transparencia (0 a 1).

    * autoAlpha (plugin CSSPlugin): Combina opacity + visibility (cuando opacity llega a 0, también hace visibility: hidden).

3. __Dimensiones y espaciados__
    * width, height: Tamaño del elemento.

    * margin, padding: Espaciados exteriores e interiores.

    * left, top, right, bottom: Posicionamiento absoluto/relativo.

4. __Colores y fondos__
    * backgroundColor, color, borderColor: Animan colores usando interpolación RGB/HSL.

    * boxShadow: Permite animar sombras (con valores numéricos).

    * filter (CSSPlugin o GSAP nativo): Blur, grayscale, brightness, etc: e.g. filter:"blur(5px)".

5. __Atributos y estilos de SVG/HTML__
    * attr:{…}: Para animar atributos SVG o HTML, p. ej. attr:{ x:100, r:50 }.

    * strokeDashoffset, strokeDasharray: Muy comunes al animar trazos de SVG.

    * fill, stroke: Colores de relleno y trazo en SVG.

6. __Scroll y desplazamiento__
    * scrollTo (ScrollToPlugin): Desplaza la ventana o un contenedor a una posición específica.

    * scrollTrigger (ScrollTriggerPlugin): Controla tweens y timelines basados en la posición de scroll.

7. __Texto y contenidos__
    * text (TextPlugin): Anima el contenido textual, carácter a carácter o palabra a palabra.

    * innerHTML, value: Animar contenido o valores de inputs directamente.

8. __Propiedades de objetos JS__
    * Cualquier propiedad numérica de un objeto puro:

```javascript
let estado = { progreso: 0 };
gsap.to(estado, { progreso: 100, onUpdate: () => render(estado.progreso) });
```

## Easing
En su núcleo, `easing` is una función matemática que define __Cuán rápido o lento algo se mueve__ durante la animación.

* ¿Se __acelera__?
* ¿Se __desacelera__?
* ¿__Rebota__ o se __dispara__ antes de estabilizarse?

Sin easing, la animación tiene una __velocidad constante__, y se siente como ssi un robot arrastrará la UI por la pantalla.

Pero con easing, se puede agregar emoción. ritmo, personalidad. Easing __moldea el tiempo__.

Uno de los malentendidos más comunes en animación es pensar que easing controla la velocidad, pero no lo hace, lo que realmente hace es `controlar como esa velocidad cambia a través del tiempo`. No controla cuanto tiempo debe durar una animación, en cambio __como el progreso ess distribuido__ a través de ese tiempo.

Para entender hay que comprar movimiento lineal (lineal motion) con `eased motion`.

1. __Linear Motion__
```javascript
gsap.to(".box", {
  x: 300,
  duration: 1,
  ease: "none"
});
```
En este ejemplo, box se mueve desde `x: 0` a `x: 300` en un segundo. Cada frame progresa exactamente al missmo ritmo. Es Plano, mecánico y sin emoción.

2. __Eased Motion__
```javascript
gsap.to(".box", {
  x: 300,
  duration: 1,
  ease: "power2.out"
});
```

`power2.out` es uno de los tipos clásicos de easing que proveé GSAP. Con el cual, el movimiento empieza rápido y gradualmente se relentiza hasta el final. SSe siente natural, como un auto que hace una parada gentil.

Basicamente, easing remodela la curva del tiempo, doblándola para crear impulso, arrastre, resorte o rebote, todo sin alterar la duración total.

> GSAP inclueye numerosas funciones de easing integradas, que son intuitivas y expresivas.
