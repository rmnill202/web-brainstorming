<template>
  <div>
    <div class="title">UI Experiments</div>
    <div class="title-lines">
      <div class="title-line-alt" style="margin-top: -20px; max-width: 300px;"/>
      <div class="title-line-alt" style="margin-top: 2px; max-width: 350px"/>
    </div>

    <div class="card-container">
      <card v-for="item in list" v-bind:key="item.id"
            class="card"
            :title="item.title" :img="item.img" :desc="item.description"
            :link="`/experiments/${item.id}`"/>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  name: 'Home',
  components: {
    Card
  },
  data() {
    return {
      list: this.$store.state.listing,
    };
  },
}
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
}
.card {
  margin: 15px 10px;
}
.title {
  font-size: 36px;
  font-weight: 300;
  margin-top: 80px;
  z-index: 2;
  font-family: Alata, Helvetica, Arial, sans-serif;
  color: rgb(61, 55, 51);
}

.title-lines {
  margin-bottom: 30px;
}
.title-line {
  border-bottom: 1px solid #a39eb698;
  margin: auto;
}

.title-line-alt {
  background: linear-gradient(90deg, #fff, rgb(184, 46, 46));
  height: 1px;
  margin: auto;
}
</style>
