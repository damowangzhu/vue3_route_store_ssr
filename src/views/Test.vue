<template>
  <div>Hello {{ message }}</div>
  <div>{{ tips }}</div>
</template>

<script>
export default {
  data() {
    return {
      tips: "TTT"
    };
  },
  computed: {
    message() {
      return this.$store.state.message;
    }
  },
  asyncData({ store }) {
    return store.dispatch("fetchMessage");
  }
};
</script>

<style></style>
