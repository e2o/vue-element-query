<template>
  <div style="height: 100px">
    <h1>({{ $eq }})</h1>
  </div>
</template>

<script>
export default {
  name: "App",
  eq: {
    breakpoints: {
      small: { maxWidth: 499 },
      medium: { minWidth: 500, maxWidth: 800 },
      large: { minWidth: 1200 }
    }
  }
};
</script>
