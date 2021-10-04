<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Hello World</h1>
      <p class="subtitle">
        My first website with <strong>Bulma</strong> & {{ msg }}!

        <font-awesome-icon icon="user-secret" />
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
