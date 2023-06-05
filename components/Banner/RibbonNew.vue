<template>
  <div>
    <div class="ribbon-2 bg-blue-300 text-xs md:text-sm text-white font-500">
      Nowość
    </div>
  </div>
</template>

<style>
.ribbon-2 {
  --f: 10px; /* control the folded part*/
  --r: 15px; /* control the ribbon shape */
  --t: 10px; /* the top offset */

  inset: var(--t) calc(-1 * var(--f)) auto auto;
  padding: 0 10px var(--f) calc(10px + var(--r));
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - var(--f)),
    calc(100% - var(--f)) calc(100% - var(--f)),
    0 calc(100% - var(--f)),
    var(--r) calc(50% - var(--f) / 2)
  );
}
</style>
