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


### Power Eeasing
En GSAP, los Power Easing son una familia de funciones de “easing” (suavizado) basadas en polinomios de distinto grado, diseñadas para dar diferentes sensaciones de aceleración y frenado. Se nombran como `power1`, `power2`, `power3` y `power4`, y cada una tiene tres variantes:
* `.in`: arranca despacio y acelera hacia el final.
* `.out`: parte rápido y desacelera al acercarse al final.
* `.inOut`: combina ambos—suave al inicio, más rápida en la mitad y suave al cierre.

Viene en cuatro diferentes variaciones:

power1 (gentil)
power2 (medio)
power3 (fuerte)
power4 (agresivo)

```javascript
// Power Easing:

// power1 (t²)
ease: "power1.in"     // inicia lento, termina rápido
ease: "power1.out"    // inicia rápido, termina lento
ease: "power1.inOut"  // inicia lento, acelera a la mitad, desacelera al final

// power2 (t³)
ease: "power2.in"     // inicia lento, termina rápido
ease: "power2.out"    // inicia rápido, termina lento
ease: "power2.inOut"  // inicia lento, acelera a la mitad, desacelera al final

// power3 (t⁴)
ease: "power3.in"     // inicia muy lento, termina muy rápido
ease: "power3.out"    // inicia muy rápido, termina muy lento
ease: "power3.inOut"  // combinación de ambos

// power4 (t⁵)
ease: "power4.in"     // inicia súper lento, termina súper rápido
ease: "power4.out"    // inicia súper rápido, termina súper lento
ease: "power4.inOut"  // combinación dramática
```

Cómo utilizarlo:

* Si algo necesita un feedback rápido; transiciones suaves y naturales, ideales para interfaces de usuario.: `power1` o `power2`
* Si es el elemento clave de la UI entrando; movimientos más dramáticos, útiles para énfasis o animaciones destacadas.: `power3` o `power4`
* Para animaciones balanceadas con ritmo natural: `power2.inOut`

> ease: none nos peermite realiizar animaciones lineal,sin aceleración ni desaceleración.


### Sine Easing

El Sine Easing en GSAP es una familia de funciones de interpolación basadas en una curva senoidal, que producen transiciones muy suaves y “orgánicas”. A diferencia de los easings polinómicos (power1, power2…), la Sine utiliza funciones trigonométricas para calcular el progreso de la animación.

No todas las animaciones tienen que ser dramáticas o impactantes.

A veces, se busca transiciones que se sientan suaves. Se quiere que los elementos se muevan como si se deslizaran sobre una superficie lisa, sin esfuerzo, tranquilos y elegantes.

Para eso está precisamente Sine easing.

Es un grupo de suavizado sutil, con forma de onda, perfecto para pequeñas transiciones de interfaz de usuario que deben sentirse suaves pero no dramáticas.

```javascript
ease: "sine.in"     // Arranca muy despacio y va acelerando de forma suave hacia el final.
ease: "sine.out"    // Arranca rápido y va desacelerando suavemente al acercarse al final.
ease: "sine.inOut"  // Combina ambas: arranque suave, aceleración en la mitad y desaceleración al cierre.
```

¿Cuándo usarlo?

* Para movimientos de interfaz muy naturales y sin “saltos” bruscos.

* Cuando quieres una sensación de deslizamiento o transición orgánica (por ejemplo, abrir/cerrar menús, sliders, tooltips).

* Siempre que se necesite un easing más suave que los power easing de grado bajo.

* Cuando se desee que la animación apoye la interfaz y no robe la atención.

### Back easing
La mayoría de las animaciones se conforman con llegar silenciosamente.

Pero a veces, la interfaz de usuario necesita destacar con un toque de estilo, un pequeño sobreimpulso, un pequeño "tachán".

Ahí es donde entra en juego el back easing (suavización de retroceso).

La suavización de retroceso añade un ligero rebote al movimiento. Da la sensación de que el elemento animado se excede en su objetivo y luego se corrige suavemente.

Esto significa que, en lugar de ir del punto A al punto B en línea recta o en una curva simple, se excede un poco (hacia adelante o hacia atrás) y luego regresa y se asienta en su lugar.

En GSAP, se presenta en tres variantes:
```javascript
ease: "back.in"      // Comienza desplazándose ligeramente en sentido contrario (hacia atrás) y luego avanza rápido hasta el final.
ease: "back.out"     // Avanza primero hacia el valor final, lo sobrepasa un poco (overshoot) y luego “rebota” para asentarse en el punto exacto. 
ease: "back.inOut"   // Combina ambos comportamientos: retrocede al inicio, avanza y sobrepasa el objetivo al medio, y finalmente rebota de nuevo para terminar.
```

> Se basa en un polinomio que incluye un parámetro de “overshoot” (desbordamiento) para controlar cuánto retrocede.

Todas las variantes aceptan opcionalmente un parámetro de intensidad (overshoot) que por defecto vale `1.70158`.

```javascript
ease: "back.out(2.5)" // A mayor valor, más pronunciado será el “tirón” hacia atrás o el rebote.
```

¿Cuándo usarlo?

* Para animaciones que deben llamar la atención con un efecto “recoil” (como botones que se retraen y luego disparan hacia adelante).

* Al hacer micro-interacciones en UI donde quieres resaltar la dinámica de entrada o salida de un elemento.

* Para simular objetos con cierta elasticidad o “muelle” antes de estabilizarse.


### Bounce easing

Cuando algo cae en la pantalla, no debería detenerse. Debería aterrizar.

Y cuando aterrice, es posible que rebote un poco, tal como suceden las cosas en el mundo real.

Para ello, se utiliza la bounce easing(suavización de rebote), que proporciona una sensación de peso, gravedad y retroalimentación táctil.

La suavización de rebote simula el comportamiento de un objeto físico que cae y rebota antes de asentarse.

No se trata de sutileza, sino de diversión, impacto y atención.

En GSAP, existen tres variantes de rebote:

```javascript
ease: "bounce.in"     // Rebota al inicio (efecto “tirón” hacia atrás con rebotes)
ease: "bounce.out"    // Rebota al final (más típico para “caídas”) 
ease: "bounce.inOut"  // Rebotes al inicio y al final
```

¿Cuándo usarlo?

Usar la suavización de rebote cuando se quiera que una animación se sienta divertida o enérgica, o imita la física (caída, aterrizaje, caída) que capta la atención del usuario.

Es ideal para notificaciones o alertas que aparecen, tarjetas que se colocan en su lugar, elementos flotantes de la interfaz de usuario que aparecen de inmediato o botones de entrada en flujos de incorporación o gamificados. Nosotros decidimos, y el producto se siente.

Pero no hay que excederse. El rebote tiene carácter. Hay que usarlo donde mejor encaje.

La suavización de rebote le da a la interfaz de usuario peso y presencia.

Si se usa con cuidado, le da al producto una sensación lúdica y táctil que puede deleitar a los usuarios. Pero si nos excedemos, las cosas pueden volverse absurdas rápidamente, así que hay que usarlo con cuidado.


### Elastic bounce
A veces, una animación necesita algo más que un simple movimiento fluido o un rebote juguetón.

Necesita estirarse, sobrepasar el objetivo y retroceder bruscamente como una goma elástica.

Imagina que tiras de una honda. La estiras... y luego la sueltas. Vuela un poco más allá y luego rebota antes de detenerse.

Esa es la sensación que crea el elastic bounce (suavización elástica). Simula el comportamiento de un resorte o una goma elástica.

Cuando algo se mueve con flexibilización elástica, sobrepasa el objetivo bruscamente y luego retrocede bruscamente con oscilaciones decrecientes antes de finalmente estabilizarse. Esto crea una sensación de tensión y liberación.

Está disponible en tres variantes:

```javascript
ease: "elastic.in"      // Parte desde 0, se lanza hacia atrás y oscila antes de llegar al valor final.
ease: "elastic.out"     // Llega rápido al destino, luego rebota varias veces antes de asentarse.
ease: "elastic.inOut"   // Combina ambos: rebotes al inicio, luego se desliza y oscila al final.
```

Pero no es solo eso. Se puede personalizar completamente el dramatismo:

```javascript
ease: "elastic.out(1, 0.3)"
```

Como se puede ver, la elasticidad acepta dos argumentos:

* Amplitud (1)

Determina la distancia de estiramiento.

Cuanto mayor sea el valor, mayor será el sobreimpulso.

* Periodo (0.3)

Determina la velocidad de oscilación.

Cuanto menor sea el valor, más rápido será el ajuste.

Siempre se puede experimentar para encontrar la sensación adecuada para la animación.

¿Cuándo usarlo?

* __Micro-interacciones llamativas__: botones que “estiran” y vuelven, tarjetas que emergen con rebote.

* __Animaciones de entrada/salida__: elementos que entran al viewport de forma divertida.

* __Simular objetos elásticos__: gráficos, globos, componentes que deben “rebotar” antes de asentarse.

### Expo easing

Expo easing (aceleración exponencial) en GSAP crea animaciones dramáticas que comienzan o terminan extremadamente rápido o lento, imitando una aceleración o desaceleración exponencial.

Es perfecta para efectos que requieren una explosión potente o un final nítido y fluido.

Está disponible en tres variantes:

```javascript
ease: "expo.in"      // Comienza lentamente y acelera rápidamente, ideal para generar tensión.
ease: "expo.out"     // Comienza con una explosión de velocidad y se ralentiza drásticamente, ideal para finales limpios y tecnológicos.
ease: "expo.inOut"   // Combina ambos, ofreciendo una sensación intensa y cinematográfica.
```

¿Cuándo usarlo?

* __Carga de elementos__: hacer que aparezcan con “explosión” de velocidad tras un inicio muy suave.

* __Transiciones rápidas__: pasajes de pantalla o cambios de estado donde quieres un feed visual impactante.

* __Animaciones de desplazamiento__: scrolleo o “slides” que deban sentirse muy dinámicos sin ser bruscos al final.


## Métodos de GSAP

En GSAP existen varios métodos (“APIs”) clave que permiten crear, controlar y organizar animaciones. A continuación los más usados, agrupados por categorías:

1. Creación de tweens
    * `gsap.to(tarrget, vars)`: Anima las propiedades edl `target` desde su valor actual hasta los valoress que se especifican en `vars`.

    * `gsasp.from(target, vars)`: Anima las propiedades de `target` desde los valores de `vars` hassta sus valores actuales.

    * `gsap.fromTo(target, fromVars, toVars)`: Animación completamente explícita: arranca en los valores de `fromVars` y termina en `toVars`.

```javascript
gsap.fromTo(".caja",
  { opacity: 0, y: -50 },     // valores iniciales
  { opacity: 1, y: 0, duration: 1 }  // valores finales
);
```

2. Ajustes instantáneos
    * `gsap.set(target, vars)`: Aplica inmediatamente (sin tween) los valore que se pongan en `vars`. Útil para preparas estados iniciales.

```javascript
gsap.set(".caja", { scale: 0, visibility: "hidden" });
```

3. Contro y eliminación de tweens
    * `gsap.killTweensOf(target, [, props])`: Elimina todos los tweens activos del `target`. Opcionalmente se filtra por propiedades específicas.

    * `gsap.killDelayedCallsto(func)`: Si se usó `gsap.delayedCall()`, se puede cancelar llamadas pendientes.
```javascript
const tween = gsap.to(".caja", { x: 200, duration: 2 });
gsap.killTweensOf(".caja");      // detiene cualquier tween sobre .caja
```

4. Llamadas retrasadas
    * `gsap.delayedCall(delay, callback, params?, scope?)`: Ejecuta una función (`callback`) despuéss de `delay` segundos, integrándose en la línea de tiempo de GSAP (se puede pausarla/reanuddarla).
```javascript
gsap.delayedCall(1.5, () => console.log("¡1.5s después!"));
```

5. Timelines (secuencias)
    * `gsap.timeline(vars?)`: Crea una `línea de tiempo` donde se apilan múltiples tweens, con control preciso de solapamientos, etiquetas y callbacks.
```javascript
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl
  .to(".caja1", { x: 100 })
  .to(".caja2", { y: 50 }, "-=0.5")  // empieza 0.5s antes de que termine el tween anterior
  .from(".titulo", { opacity: 0 });
```
Dentro de un timeline también se tiene métodos para: 
* `.add(labelOrTween, position)`: Insertar un tween o etiqueta en una posición específica.
* `.adddLabel(name, position)`: Crear puntos de control.
* `.play() / .pause() / .reverse() / .seek(time)`: Controlar la reproducción.

6. Utilidades y helpers

    * `gsap.registerPlugin(Plugin1, Plugin2...)`: Carga plugins (ScrollTrigger, Draggable, etc.) para que GSAP los reconozca.
    * `gsap.utils`: Colección dde funciones útiles: `gsap.utils.toArrays()`, `gsap.utils.random()`, `gsap.utils.mapRange()`, etc.
    * `gsap.getTweensOf(target[, props])`: Devuelve un array con los tweens activos que afectan a ese `target`.

```javascript
gsap.registerPlugin(ScrollTrigger);
const val = gsap.getProperty(".caja", "scale");  // p.e. 1.2
``` 


### gsap.to()
El método gsap.to() es la forma más común de crear un tween en GSAP. Básicamente se le dice “lleva esta(s) propiedad(es) de mi elemento u objeto desde su valor actual hasta estos nuevos valores” en un cierto tiempo y con un cierto easing.

> Toma esta cosa y anímala con estas nuevas configuraciones.

```javascript
gsap.to(".box", {
  x: 200,     // Move 200 pixels to the right
  duration: 1 // Animate over 1 second
});
```

¿Por qué gsap.to() es tan poderoso?
* No necesitamos saber donde empiezan los elementos, GSAP lo descubre automáticamente.
* Podemos animar multiples propiedadedss a la vez (como x, y, opacity, scale, etc).
* Poddemos encadenar animaciones .to() juntas para movimientos complejo.

Este es un ejemplo de lo que se puede animar con `.to()`. 

```javascript
gsap.to(".selector", {
  x: 100, //movimiento horizontal
  backgroundColor: "red", // cambiarr el color (camelCase!)
  duration: 1, // cuanto tiempo dura una animación (segundos)
  delay: 0.5, // empieza después de 0.5 segundos
  ease: "power2.inOut", // controlar la velocidad de la curva
  stagger: 0.1, // Animar multiples elementos con un retraso ent
  overwrite: "auto", // manejar conflictos entre las animaciones
  repeat: 2, // repetir la animación 2 veces (-1 = infinite)
  repeatDelay: 1, // esperar un segundo entre repeticione
  repeatRefresh: true, // refrescar los valores en cada repetición
  yoyo: true, // regresar la animación (A-B-B-A)
  yoyoEase: true, // Diferente ease cuando regresa 
  immediateRender: false, // controlar cuando la animación empieza a calcular
  onComplete: () => {
    console.log("finished!");
  },
  // otros callbacks: onStart, onUpdate, onRepeat, onReverseComplete
});
```

> No está limitado a CSS, podemos animar cualquier propiedad numérica o de color.

> camelCase, cuando animamos algo con el backgroundColor, usamos camelCase (no guiones CSS).

> Callbacks, podemos engancharnos a eventos cuando las animaciones empiezan, se actualizan o son completadas. 

### gsap.from()
El método gsap.from() permite animar un elemento desde unos valores iniciales que se especifiquen hacia sus valores actuales en el DOM/CSS. Es justamente el opuesto de gsap.to(), que va de “valor actual → valor final”; con from se empieza en el “valor inicial” y GSAP calcula la interpolación hasta el estado que ya estaba aplicado.

```javascript
gsap.from(target, vars);
```

* `target`: selector CSS, nodo(s) DOM, array de elementos o incluso un objeto JS.
* `vars`: objeto donde se define:
    * Propiedades a animar __desde__ esos valores
    * duración de la animación een segundos
    * Opcionales: delay, ease, callbacks (onStart, onComplete…), plugins (scrollTo, etc.).