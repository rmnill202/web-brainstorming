<template>
  <div class="perspective-parent">
    <div>No debounce, rotate target div.</div>
    <div class="rounded-card" @mousemove="mouseCard($event)" @mouseleave="clearCard($event)">Rounded Card Div</div>

    <div>No debounce, rotate child div of wrapper.</div>
    <a class="parent-to-card" @mousemove="mouseCardChild($event)" @mouseleave="clearChildCard($event)">
      <div class="rounded-card-child" :style="childCardStyle">Child Div</div>
    </a>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      // Degree limits on the animation
      limitY: 20,
      limitX: 15,

      // Border limit for lerp to floor/ceil
      lerpBorder: 0.1,

      // Other stuff
      scrollAnimWaiting: false,

      childnx: 0, childny: 0,
      
    }
  },
  computed: {
    childCardStyle() {
      return {
        '--childnx': this.childnx,
        '--childny': this.childny,
      };
    }
  },
  methods: {
    mouseCard(e) {
      if(!this.scrollAnimWaiting) {
        this.scrollAnimWaiting = true;

          // Smart thing to do would be queueing up animations that get run in a single animation frame callback with a single
          //   mutex controlling it, but I'm lazy rn so assume there's only one animation running at any given time. 
          window.requestAnimationFrame(() => {
            this.rotateTargetDiv(e);
          });
        }
    },
    mouseCardChild(e) {
      if(!this.scrollAnimWaiting) {
        this.scrollAnimWaiting = true;

          // Smart thing to do would be queueing up animations that get run in a single animation frame callback with a single
          //   mutex controlling it, but I'm lazy rn so assume there's only one animation running at any given time. 
          window.requestAnimationFrame(() => {
            this.rotateChildDiv(e);
          });
        }
    },


    rotateTargetDiv(e) {
      let b = e.target.getBoundingClientRect();
      let nx = (e.clientX - b.left) / b.width, ny = (e.clientY - b.top) / b.height;
      
      let rx = this.lerp(nx, -this.limitX, this.limitX), ry = this.lerp(ny, this.limitY, -this.limitY);

      // console.log(`${nx}, ${ny}`);
      // console.log(`transform: rotateX(${rx}deg) rotateY(${ry}deg);`);

      e.target.style = `transform: rotateY(${rx}deg) rotateX(${ry}deg);`;
      this.scrollAnimWaiting = false;
    },
    rotateChildDiv(e) {
      let b = e.target.getBoundingClientRect();
      let nx = (e.clientX - b.left) / b.width, ny = (e.clientY - b.top) / b.height;
      let rx = this.lerp(nx, -this.limitX, this.limitX), ry = this.lerp(ny, this.limitY, -this.limitY);
      // e.target.style = `transform: rotateY(${rx}deg) rotateX(${ry}deg);`;
      this.childnx = `${rx}deg`
      this.childny = `${ry}deg`;
      this.scrollAnimWaiting = false;
    },
    // Mouseleave would be better in this case, since I don't wanna track events thrown by leaving child divs
    // This also makes me think; maybe I should run these mouse events on an invisible wrapper, and pass down a CSS variable to the children to consume?

    clearCard(e) {
      window.requestAnimationFrame(() => {
        e.target.style="transform: rotateY(0deg) rotateX(0deg)";
      });
    },    
    clearChildCard(e) {
      window.requestAnimationFrame(() => {
        this.childnx = `0deg`;
        this.childny = `0deg`;
      });
    },
    lerp(t, a, b) {
      return a + (t * (b - a));
    },
  }
}
</script>

<style scoped>
.rounded-card {
  display: inline-block;
  color: white;
  padding: 10px;
  min-height: 200px;
  min-width: 400px;
  border-radius: 3px;
  background-color: rgb(82, 75, 75);

  transition: transform 0.15s ease;
}
.rounded-card-child {
  display: inline-block;
  color: white;
  padding: 10px;
  min-height: 200px;
  min-width: 400px;
  border-radius: 3px;
  background-color: rgb(82, 75, 75);

  transition: transform 0.1s ease;
  transform: rotateY(var(--childnx)) rotateX(var(--childny));
}
.parent-to-card {
  display: inline-block;
  cursor: pointer;
}
.parent-to-card:active .rounded-card-child {
  background-color: rgb(133, 61, 61);
  transform: rotateY(var(--childnx)) rotateX(var(--childny)) scale(0.9);
}
.perspective-parent {
  perspective: 750px;
}

</style>
