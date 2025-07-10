# Curso de GSAP

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

¿Cómo funciona?
1. __Estado inicial__: al disparar la animación, GSAP aplica inmediatamente los valores de `vars`.
2. __Tween__: durante `duration` segundos, interpola esos valores __hacia__ los que el elemento tenía antes de llamar a `from()`.
3. __Resultado__: al completar, el elemento que con sus estilos orginales.

> En GSAP, `from()` anima los valores de las propiedades iniciales que le proveemos, y luego, regresa a cualquier que sean los valores originales.

Ejemplo: 

```javascript
gsap.from(".box", {
  opacity: 0, // inicia invisible
  y: 100, // inicia 100px más abajo (como translateY(100px))
  duration: 1, //anima en un segundo
});
```

* box empieza invisible y sale desde abajo.
* luego se anima a sus valores originales: `opacity: 1` y `y: 0`.

Algunos de los elementos que se puede animar con `from()`:
```javascript
gsap.from(".selector", {
  x: 100,
  opacity: 0,
  scale: 0.5,
  rotation: 45,
  duration: 1,
  delay: 0.3,
  ease: "back.out(1.7)",
  stagger: 0.2, 
  repeat: 1,
  yoyo: true,
  onComplete: () => console.log("Animation finished!"),
});
```

### gsap.fromTo()

El método gsap.fromTo() da control total sobre los valores de inicio y fin de la animación en un solo llamado. A diferencia de gsap.from() (que va de values → estado actual) o gsap.to() (que va de estado actual → values), con fromTo() se define explícitamente ambos extremos:

```javascript
gsap.fromTo(
  target,       // Selector, elemento(s) o array de objetos
  fromVars,     // Valores iniciales
  toVars        // Valores finales + opciones (duración, easing, callbacks…)
);
```
* `target`: Que vamos a animar (selector, elemento, objeto)
* `fromVars`: Los valores iniciales
* `toVars`: Los valores finales.

Es útil cuando: 
* Necesitamos control exacto.
* Encadenamos multiples animaciones.
* No queremos que GSAP "adivine" donde terminan o comienzan las animaciones.

Ejemplo:

```javascript
gsap.fromTo(
  ".box",
  {
    opacity: 0, // empieza invisible
    y: 100, // empieza 100px más abajo
  },
  {
    opacity: 1, // termina completamente visible
    y: 0, // termina en la posición normal
    duration: 1,
  }
);
```

> Pensar en .fromTo() como si se estableciera una ruta GPS completa: uno mismo elige el punto de partida y el destino. Sin suposiciones automáticas: precisión total.

### Stagger
En GSAP, el stagger es una propiedad especial que permite escalonar (desfasar) el inicio de la misma animación en varios elementos de forma automática. En lugar de lanzar todos los tweens a la vez, stagger añade un pequeño retraso incremental entre cada uno, creando un efecto de “ola” o “secuencia”.

Podemos escalonar: 
* Listas simples
* Grids complejos
* Incluso podeemos perssonalizar el patrón o comportamiento del escalonamiento.

Como funciona Stagger:
* `stagger: 0.05`: 0.05 segundo entre que la animación de cada elemento empiece.
* `ex: -0.05`: `Stagger negativo`, Las animaciones comienzan al revés (el último elemento comienza primero).

¿Cuándo utilizarlo?
* Micro-interacciones: desplegar menús o listas con un ligero escalonamiento.
* Galerías: aparición en cascada de imágenes o tarjetas.
* Efectos de cuadrícula: animar tablas, tableros o mosaicos de forma ordenada.

- Stagger con objeto de configuración
```javascript
gsap.from(".item", {
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: {
    each: 0.15,        // equivalente a stagger: 0.15
    from: "center",    // punto de inicio: "start" (por defecto), "center", "end" o un índice numérico
    amount: 1.2,       // en lugar de each, reparte todos los elementos dentro de 1.2s
    grid: "auto"       // o [filas, columnas] para distribuciones en cuadrícula
  }
});
```
* `each`: tiempo de desfase por elemento.
* `from`: punto de referencia para el orden (“start”, “center”, “end”, “random” o índice).
* `amount`: tiempo total para cubrir todos los desfases (ignora each).
* `grid`: define un layout de filas×columnas para animaciones “en dos dimensiones”.

Ejemplos avanzados:
1. Stagger "random"
```javascript
gsap.to(".bola", {
  y: 100,
  duration: 1,
  stagger: {
    each: 0.1,
    from: "random"
  }
});
```
Cada bola comienza en un orden aleatorio.

2. Stagger een cuadrícula:

Si se tiene una matriz de celdas

```javascript
gsap.from(".celda", {
  scale: 0,
  duration: 0.5,
  stagger: {
    grid: [4, 5],    // 4 filas, 5 columnas
    from: [1, 2],    // empieza desde la celda en fila 1, columna 2
    amount: 1        // todas las animaciones comienzan repartidas en 1s
  }
});
```

¿Por qué stagger es tan poderoso?
1. Da a la animación un sensación de fluidez y naturalidad.
2. Guia a la atención del usuario paso a paso.
3. Espaciado o escalonado automático

### gsap.set()
El método gsap.set() te permite asignar valores a las propiedades de un elemento u objeto de forma instantánea, sin crear tween ni interpolación. Es ideal para preparar estados iniciales antes de animar, o para aplicar estilos dinámicos “al instante”.

Firma Básica:

```javascript
gsap.set(target, vars);
```

* `target`: selector CSS, nodo(s) DOM, array de elementos o incluso un objeeto JavaScript.
* `vars`: objeto con las propiedades y valores que se quiere aplicar inmediatamente (x, opacity, scale, backgroundColor, atributos SVG, etc.), junto con opciones como visibility, clearProps, o overwrite.

Ejemplos de uso: 
1. Estado inicial parra una entrada
```javascript
// Preparo las cajas para que empiecen invisibles y desplazadas
gsap.set(".caja", {
  opacity: 0,
  y: 50
});
```
Luego se puede animarlas con gsap.to() o gsap.from() sabiendo que parten de ese estado.

2. Cambio de visibilidad inmediato
```javascript
// Hacer visible un menú sin animación
gsap.set("#menu", {
  visibility: "visible"
});
```

3. Limpiar propiedades inline
```javascript
// Aplico un scale inmediato y luego elimino el estilo inline
gsap.set(".logo", {
  scale: 1.2,
  clearProps: "transform"
});
```

Características clave:
* `Sin duración ni easing`: no hay interpolación, los valores ses aplican al momeento.
* `overwrite`: por defecto GSAP intentará limpiar tweens conflictivos; se puede ajustar con `overwrite: false` si no se quiere que elimine otros tweens activos.
* `clearProps`: se puede pasar `clearProps: all` o una lista de propiedades para borrar estilos inline después de aplicarlos, devolviendo el elemeento a su CSS original.

## Timelines
El método `gsap.timeline()` se utiliza para crear una instancia de línea (timeline) de tiempo que secuencia múltiples animaciones de forma controlada y sincronizada.

Una línea de tiempo permite a los desarrolladores encadenar animaciones mediante métodos como .to(), .from() y .fromTo(), lo que permite un control preciso del orden y la sincronización de cada paso de la animación.

A diferencia de las animaciones GSAP independientes, que se ejecutan de forma independiente, una línea de tiempo agrupa las animaciones, lo que permite un control centralizado de la reproducción mediante métodos como .play(), .pause(), .reverse() y .restart().

Las líneas de tiempo también admiten funciones como posicionamiento relativo, superposición de animaciones mediante desplazamientos temporales, etiquetas para la navegación y anidación de otras líneas de tiempo, lo que las hace ideales para secuencias de animación complejas.

```javascript
// Crea un timeline con opciones globales (opcional)
const tl = gsap.timeline({
  defaults: { duration: 1, ease: "power2.out" },
  paused: false,       // si se quiere arrancar detenido
  repeat: 0,           // cuántas veces se repite (-1 infinito)
  repeatDelay: 0.5     // retraso entre repeticiones
});

```

> Una línea de tiempo en GSAP es como un plan maestro para las animaciones. Es un contenedor que alberga múltiples interpolaciones y las reproduce en secuencia, una tras otra, o incluso simultáneamente.

¿Para qué sirve un timeline?
* __Encadenar__ animaciones de forma ordenada.
* __Controlar__ todo el conjunto como una sola pieza (play, reverse, seek).
* __Solapar__ tweens fácilmente usando desplazamientos relativos o etiquetas.
* __Reutilizar__ secuencias completas en diferentes partes de una app.

> Cuando se empieza a pensar en las animaciones como una historia, no solo como efectos individuales, las líneas de tiempo se convierten en el mejor aliado. ¡Son la herramienta que ayuda a orquestarlo todo!

Añadir Tweens
```javascript
tl
  .to(".caja1", { x: 100 })           // 1) inicia en t=0
  .to(".caja2", { y: 50 }, "-=0.5")   // 2) inicia 0.5s antes de que termine el anterior
  .from(".titulo", { opacity: 0 })    // 3) después del segundo tween
```

Control del Timeline
```javascript
tl.play();        // reproduce
tl.pause();       // pausa
tl.reverse();     // invierte
tl.seek(1.5);     // salta a t = 1.5s
tl.timeScale(2);  // acelera x2
```

¿Por qué usar un timeline?
* __Claridad__: el código de animacioneses queda agrupado y más legible.
* __Sincronización__: controla solapes y retardos ssin calcular manualmente los `delay`.
* __Control global__: pausar/reproducir/invertir todas las animaciones de golpe.
* __Reutilización__: exportar un timeline y usarlo en distintos componentes o situaciones.

¿Por qué es tan potente?
* Sin retrasos molestos: GSAP gestiona el flujo por nosotros.
* Código legible: visualiza toda la secuencia de animación de un vistazo.
* Orden flexible: ¿ se quiere cambiarlo? ¡Solo hay que reorganizar las líneas!
* Sensación profesional: las animaciones se ven intencionadas y fluidas.

### Controlando el timeline (línea de tiempo) - play, pause, reverse, restart

Se puede controlar un Timeline de GSAP como si fuera un “reproductor” de animaciones, gracias a una serie de métodos y propiedades que permiten pausar, reproducir, invertir, saltar a un punto o ajustar la velocidad. 

Métodos de control:

* `.play()`: Inicia o reanuda la reproducción desde el punto actual.
```javascript
tl.play();

```

* `.pause()`: Detiene la reproducción em el instantet actual.
```javascript
tl.pause();
```

* `.reverse()`: Invierte la dirección de la reproducción (si estaba en marcha, comeenzará a ir hacia atrás).
```javascript
tl.reverse();
```

* `.restart()`: Vuelve al comienzo y arranca la reproducción. Equivale a `.pause().time(0).play()`.
```javascript
tl.restart();
```

* `.seek(time)`: Salta a un tiempo específico (en segundos) dentro del timeline, sin cambiar si esta pausado o no.
```javascript
tl.seek(1.5);  // posiciona el playhead a 1.5s
```

* `.progress(ratio)`: Ajusta el pogreso expresado como un valor entre 0 y 1.
```javascript
tl.progress(0.25);  // 25% de la duración total
```

* `.timeScale(value)`: Cambiia la velocidad deel timeline:
    * `1` = velocidad normal
    * `2` = el doble de rápido
    * `0.5` = la mitad de la velocidad
```javascript
tl.timeScale(2);   // acelera 2×
tl.timeScale(0.5); // desacelera 50%
```

* `.reverse(delay)`: Invieerte la reproducción y, si se pasa un número, espera ese tiempo antes de arrancar la inversión.
```javascript
tl.reverse(0.5);  // espera 0.5s, luego invierte
```

* `.repeat(value)` y `.repeatDelay(delay)`: Se puede configurar, o modificar en tiempo real, cuántas veces se repite el timeline y con qué retardo entre repeticiones.
```javascript
tl.repeat(2);        // se ejecuta 3 veces en total
tl.repeatDelay(0.3); // espera 0.3s entre cada repetición
```

Callbackes de evento, podemos engancharnos a eventos globales del timeline:

```javascript
tl.eventCallback("onStart",    () => console.log("Timeline iniciado"));
tl.eventCallback("onComplete", () => console.log("Timeline terminado"));
tl.eventCallback("onReverseComplete", () => console.log("¡Terminó al invertir!"));
```

Propiedades de estado:
* `tl.paused()` / `tl.paused(true | false)`: Consulta o establece si está pausado
* `tl.reversed()` / `tl.reversed(true|false)`: Consulta o invierte el estado de rerproducción.
* `tl.duration()`: devuelve (o ajusta) la duración total del timeline.

### Position Parameter
El “position parameter” en GSAP es ese tercer argumento opcional que ses puede pasar a métodos de un timeline (ya sea .to(), .from() o .fromTo()) para controlar exactamente cuándo debe arrancar ese tween dentro de la secuencia, sin tener que calcular delays manuales.

Formas de usarlo: 
1. Tiempo absoluto (segundos)
```javascript
tl.to(".caja1", { x:100, duration:1 }, 0.5)
// empieza a los 0.5s del inicio del timeline
```

2. Offset relativo
    * `"+=0.3"` -> retrasa 0.3s respecto al final del tween anterior.
    * `"-=0.5"` -> addelanta 0.5s, solapando con el anterior.

```javascript
tl
  .to(".a", { x:100, duration:1 })       // t=0 → t=1
  .to(".b", { y:50, duration:1 }, "-=0.5")  // empieza en t=0.5
```

3. Etiquetas (labels): Primero se define un label, luego se usa como punto de anclaje: 
```javascript
tl
  .addLabel("medio", 1.2)
  .to(".caja", { scale:1.5 }, "medio")
  .to(".otra", { opacity:1 }, "medio+=0.2")
```

4. Array de offsets (stagger avanzado): En combinaciones complejas puedes pasar un array de valores para escalonar posiciones, pero esto se ve más en configuraciones de stagger dentro de un tween suelto.

### Staggered Animations with Timelines
Las animaciones escalonadas (staggered) dentro de un Timeline permiten orquestar un grupo de elementos para que entren en escena en sucesión, pero formando parte de una secuencia lógica: en lugar de lanzar un tween suelto con stagger, se inserta dentro de la línea de tiempo, de modo que  se pueda mezclarlo con otros tweens y controlar pausas, solapamientos, etiquetas, repeticiones, etc.

1. Sintaxis básica

En GSASP 3 se puede animar varios elementos con stagger directamente en un `timeline.to()` (o `from`, `fromTo`)
```javascript
const tl = gsap.timeline({ defaults: { duration: 1 } });

tl.to(".item", {
  y: -50,
  opacity: 1,
  stagger: 0.2       // cada .item empieza 0.2s después de la anterior
});
```

Aquí, todos los .item se animan en bloque, pero con un desfase interno de 0.2 s. Como está dentro de un timeline, ese bloque se considera un solo paso en la secuencia, con su propio inicio y fin.

2. Controlando el bloque escalonado

    1. Offset relativo al bloque: Se puede combinar ese bloquee escalonado con solapamientos o etiquetas:

    ```javascript
    tl
      .to(".titulo", { opacity: 1 })                  // paso A
      .to(".item", 
        { y: -50, opacity:1, stagger: 0.15 },          // paso B: animación escalonada
        "-=0.5"                                        // empieza 0.5s antes de que termine A
      )
      .to(".footer", { y: 20, opacity:1 }, "+=0.3");   // paso C
    ```

    2. Objeto de configuración de stagger: Para un control más fino
    ```javascript
    tl.to(".card", {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      stagger: {
        each: 0.1,          // desfase entre ítems
        from: "center",     // orden de aparición: "start" | "center" | "end" | índice | "random"
        amount: 0.8,        // el desfase total se reparte en 0.8s (“each” se ignora si pones amount)
        grid: [3, 4]        // animar como si fuera una cuadrícula 3×4
      }
    });
    ```

3. Ventajas de usa stagger dentro de un Timeline
  1. __Sincronización con otros tweens__: el grupo escalonaddo es un bloque más del timeline. Se puede solaparlo, retrasarlo o etiquetarlo igual que un tween individual.
  2. __Reutilización ed secuencias__: Se puede encapsular "entrar en cascada" como parte de una animación más compleja (por ejemplo, un módulo completo que entraa, mustraa sus items, luego sale).

## ScrollTrigger
ScrollTrigger es un plugin de GSAP que permite disparar animaciones basadas en la posición de scroll del usuario, sin necesidad de depender de librerías externas de scroll o de manejar manualmente listeners. Con se puede:

1. Sincronizar animaciones con el Scroll
    * Animar elementos mientras se hace scroll, mapeando directamente el progeso del scroll a la línea de tiempo de un twee o timeline.
    * Ejemplo:
    ```javascript
    gsap.to(".imagen", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".seccion",
        start: "top bottom",      // cuando el top de .seccion alcanza el bottom del viewport
        end:   "bottom top",      // hasta que el bottom de .seccion alcanza el top del viewport
        scrub: true               // enlaza el progreso de la animación al scroll
      }
    });
    ```
2. Disparar aanimaciones al entrar/salir del viewport
    * Lanzar tweens o timelines cuando un elemento entra ("enter") o sale ("leave") del viewport o de un contenedor.
    * Ejemplo:
    ```javascript
    gsap.from(".tarjeta", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".tarjeta",
        start: "top 80%",     // cuando el top de .tarjeta alcanza el 80% del viewport
        toggleActions: "play none none reverse"
        // onEnter: "play", onLeave: "none", onEnterBack: "none", onLeaveBack: "reverse"
      }
    });
    ```
3. Opciones clave de `scrollTrigger`
    * `trigger`: elemento que actúa como referencia de scroll.
    * `start`/ `end`: puntos de inicio y fin, usando sintaxis `"posiciónDisparador posiciónViewport"`, p. ej. `"top center"`, `"50% 50%"`.
    * `scrub`: si es `true` o un número, enlaza la animación aal scroll de forma fluida.
    * `toggleActions`: controla qué ocurre en los cuatro eventos (enter, leave, enterBack, leaveBack), con palabras clave: `"play"`, `"pause"`, `"resume"`, `"reverse"`, `"reset"`, `"restart"`, `"complete"`, `"none"`.
    * `markers`: ssi se activa (markers: true), dibuja en pantalla los puntos de `start` y `end` para depuración.
    * `pin`: fija ("pin") un elemento en su lugar durante la animación de scroll.
    * `pinSpacing`: controla si el espacio del elemento permanece cuando esta "pinneado"
4. Secuencias basadas en scroll
    * Se puede usar un timeline completo:
    ```javascript
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".galeria",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true
      }
    });
    tl
      .to(".foto1", { x: -200 })
      .to(".foto2", { x:  200 }, "<")
      .to(".caption", { opacity: 1 }, "-=0.5");
    ```

¿Por qué usa ScrollTrigger?
* __Sencillez__: se puede configurar el disparador en unas pocass líneas, sin listeners manuales.
* __Potencia__: control total del comportamiento del scroll.
* __Flexibilidad__: "toggleActions" para gestionar qué sucede en cada escenario de scroll.
* __Integración con Timeline__: se puede mezclar múltiples tweens y secuencias orquestadas por la posición del scroll. 


`Scrub`

En el contexto de ScrollTrigger, la opción scrub vincula el progreso de un tween o línea de tiempo directamente al desplazamiento de la página, de modo que la animación avanza o retrocede en función de cuánto se haya hecho scroll.

* `scrub: true`: Sin suavizado: el progreso del tween sigue exactamente la posición de scroll, de forma “dura”.

* `scrub: número` (por ejemplo scrub: 1): Introduce un retardo de interpolación entre el scroll y la animación; cuando se hace scroll, la animación “persigue” esa posición con un cierto “arrastre” o suavizado (en segundos).

`Pinning`

El “pinning” en ScrollTrigger te permite fijar (o “anclar”) un elemento en su posición dentro del viewport mientras el usuario hace scroll, de modo que permanezca visible aunque el resto de la página siga desplazándose. Una vez que el scroll supera el punto final definido, el elemento “despinnea” y continúa moviéndose con el flujo normal de la página.

¿Cómo se activa?

Dentro de la configuración de tu scrollTrigger, se debe añadir:

```javascript
scrollTrigger: {
  trigger: ".mi-seccion",  // elemento que actúa como referencia
  start: "top top",        // cuándo comienza el pinning
  end: "bottom top",       // cuándo termina el pinning
  pin: true                // activa el pin
}
```
* `pin: true` -> fija el propio .mi-seccion
* `pin: selector` -> fija otro elemento, por ejemplo .boton, #header.