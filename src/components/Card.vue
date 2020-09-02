<template>
  <a :href="link" style="display: inline-block; color: inherit; text-decoration: none">
    <div class="card">

      <!-- Image -->
      <img :src="require(`@/assets/${img}`)"/>

      <!-- Title / Desc -->
      <div class="info"> 
        <div class="card-title">{{title}}</div>
        <div class="card-desc">{{desc}}</div>
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
  width: 300px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.15s;
}

.card img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.card-title {
  text-align: center;
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 5px;
  /* border-bottom: 2px solid #fd6466; */
  /* background: linear-gradient( 90deg, #515c70 -50%, #fd6466 500%); */
  background: linear-gradient(90deg, #615c6f, #7f5e6d);
}

.card-desc {
  padding: 0px 5px 5px 5px;
}

.info {
  text-align: left;
  position: absolute;
  box-sizing: border-box;
  background-color: #000000;
  color: #f6feff;
  /* padding: 2px 5px; */
  bottom: 0;
  width: 100%;
  cursor: pointer;
  font-weight: 300;

  transition: transform 0.3s;
  transform: translateY(calc(100% - 30px));
}

.card:hover .info {
  transform: translateY(0%);
}

.card:active {
  transform: scale(0.95);
}

</style>