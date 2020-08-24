<template>
  <a :href="link" style="display: inline-block; color: inherit; text-decoration: none">
    <div class="card">

      <!-- Image -->
      <img :src="require(`@/assets/placeholder.jpg`)"/>

      <!-- Title / Desc -->
      <div class="info"> 
        <div>{{title}}</div>
        <div>{{desc}}</div>
      </div>

    </div>
  </a>
</template>

<script>
export default {
  props: ['title', 'desc', 'img', 'link'],
};
</script>

<style scoped>
.card {
  position: relative;
  height: 200px;
  width: 200px;
  background-color: gray;
  overflow: hidden;
  cursor: pointer;
}

.card img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.info {
  position: absolute;
  box-sizing: border-box;
  background-color: rgb(151, 164, 223);
  padding: 2px;
  bottom: 0;
  width: 100%;
  cursor: pointer;

  transition: transform 0.5s;
  transform: translateY(calc(100% - 20px));
}

.card:hover .info {
  transform: translateY(0%);
}

</style>