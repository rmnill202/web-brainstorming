<template>
  <div>
    <div>Idea Directory</div>

    <div class="card-container">
      <card v-for="item in list" v-bind:key="item.id"
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

<style>
.card-container {

}
</style>
