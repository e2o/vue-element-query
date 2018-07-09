<template>
  <div style="height: 100px">
    <h1>{{ size.width }} x {{ size.height }} ({{ $eq }})</h1>
  </div>
</template>

<script>
export default {
  name: "App",
  eq: {
    // debounce: 50,
    breakpoints: {
      small: { maxWidth: 499 },
      medium: { minWidth: 500, maxWidth: 800 },
      large: { minWidth: 1200 }
    }
  }
};
</script>
