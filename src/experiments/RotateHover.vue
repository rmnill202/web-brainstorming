<template>
  <div class="perspective-parent">
    <div>No debounce, rotate target div.</div>
    <div class="rounded-card" @mousemove="mouseCard($event)" @mouseleave="clearCard($event)">Rounded Card Div</div>

    <div>No debounce, rotate child div of wrapper.</div>
    <a class="parent-to-card" @mousemove="mouseCardChild($event)" @mouseleave="clearChildCard($event)">
      <div class="rounded-card-child" :style="childCardStyle">
        <div class="card-highlight" :style="highlightStyle"></div>
        <div style="position: absolute; right: 10px; font-size: 28px">CC Company</div>
        <div style="width: 60px; height: 45px; background-color: #e4e4a0; border-radius: 5px; position: absolute; left: 50px; bottom: 95px"/>
        <div style="position: absolute; bottom: 60px; font-size: 24px; left: 50px">1111 2222 3333 4444</div>
        <div style="position: absolute; bottom: 30px; left: 145px; font-weight: 300">12/24</div>
        <div style="position: absolute; bottom: 10px; left: 20px; font-weight: 300">First Last</div>
      </div>
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
      hlx: 0, hly: 0,
      
    }
  },
  computed: {
    childCardStyle() {
      return {
        '--childnx': this.childnx,
        '--childny': this.childny,
      };
    },
    highlightStyle() {
      return {
        '--hlx': this.hlx,
        '--hly': this.hly,
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
      this.hlx = `${-rx * 3.5}px`
      this.hly = `${ry  * 1.5}px`;
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
        this.hlx = `0`;
        this.hly = `0`;
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
  background-color: #524b4b;

  transition: transform 0.15s ease;
}
.rounded-card-child {
  pointer-events: none;
  display: inline-block;
  position: relative;
  color: white;
  padding: 10px;
  min-height: 200px;
  min-width: 400px;
  border-radius: 3px;
  background-color: #853d3d;

  transition: transform 0.1s ease;
  transform: rotateY(var(--childnx)) rotateX(var(--childny));
}
.parent-to-card {
  display: inline-block;
  cursor: pointer;
  transform-style: preserve-3d
}
.parent-to-card:active .rounded-card-child {
  background-color: #853d3d;
  transform: rotateY(var(--childnx)) rotateX(var(--childny)) scale(0.9);
}
.perspective-parent {
  perspective: 750px;
}


.card-highlight {
  position: absolute;
  left: 100px;
  width: 200px;
  height: 200px;
  background-color: #ffffff09;
  clip-path: circle();
  transform: translateX(var(--hlx)) translateY(var(--hly));
  transition: transform 0.1s ease;
}

</style>
