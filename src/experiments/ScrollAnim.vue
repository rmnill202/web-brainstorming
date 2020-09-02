<template>
  <div style="min-height: 2000px; text-align: left;">
    <div style="margin-bottom: 200px;">
      <div style="text-align: center;">Top of the page</div>
      <div style="margin: 0 10px">Notes:
        <ul>
          <li>JS onscroll is still expensive, but CSS-trickery isn't supported by Safari as of late.</li>
          <li>IntersectionObserver is great for entry/exit animations!</li>
          <li>Didn't do this here, but I could combine IntersectionObserver with onscroll for better performance.</li>
          <li>Probably want to use absolute positions on page instead of the maths I'm doing here.</li>
        </ul>
      </div>
    </div>
    

    <div>Fade in / out with IntersectionObserver</div>
    <div>Threshold of {{firstThreshold}} reached? {{fadedIn}}</div>
    <div :class="`fade-in-test ${fadedIn ? 'fade-in-test-translated' : ''}`" ref="fade01"></div>
    <div style="margin-bottom: 200px">Threshold of {{firstThreshold}} reached? {{fadedIn}}</div>

    
    <div>Gradual Anim. with onscroll and requestAnimationFrame</div>
    <div>Progress: {{barProgress}}</div>
    <div class="animatable-bar" :style="barStyle" ref="animbar"></div>
    <div style="margin-top: 50px; margin-bottom: 100px">Progress: {{barProgress}}</div>

    
    <div>Progress: {{circleFill}}</div>
    <div style="display: flex">
      <div class="rotating-shape" ref="rotateshape" :style="rotateStyle">Almost done...</div>
      <svg width="190" height="160" :style="svgstyle">
        <!-- https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths -->
        <path d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" stroke="black" fill="transparent"/>
      </svg>
    </div>
    <div style="margin-bottom: 0px">Progress: {{circleFill}}</div>

    


    <div style="position: relative; margin-bottom: 1000px">
      <div ref="parallaxstart">Parallax! {{parallaxValue}} </div>
      <div class="parallax-base" :style="parallaxStyle(0)"></div>
      <div class="parallax-base" :style="parallaxStyle(1)"></div>
      <div class="parallax-base" :style="parallaxStyle(2)"></div>

    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'scrollanim',
  data() {
    return {
      fadeObserver: null,
      fadedIn: false,
      firstThreshold: 0.5,


      scrollAnimWaiting: false,
      barProgress: 0.0,
      barAnimLength: 300,
      barAnimTopMargin: 400,

      circleFill: 0.0,
      circleAnimLength: 600,
      circleAnimOffset: 500,
      rgb1: [218, 100, 23],
      rgb2: [104, 189, 133],

      parallaxValue: 0.0,
      colors: ['#2d2f35', '#4a3f3f', '#5a515b'],
      scales: [0.2, 0.7, 1.5],
      offsets: [0, 0, 0],
    };
  },
  // IMPORTANT - For IntersectionObserver to work, it needs to be setup after the
  //   component has been mounted to the DOM. 
  mounted() {
    this.SETUP_intersectionApiTests();
  },
  computed: {
    barStyle() {
      let r = this.lerp(this.barProgress, this.rgb1[0], this.rgb2[0]),
          g = this.lerp(this.barProgress, this.rgb1[1], this.rgb2[1]),
          b = this.lerp(this.barProgress, this.rgb1[2], this.rgb2[2]);
      return `transform: scaleX(${this.barProgress}); background-color: rgb(${r} ${g} ${b})`
    },
    rotateStyle() {
      return `transform: rotate(${this.circleFill * 180}deg);`
    },
    svgstyle() {
      // https://css-tricks.com/svg-line-animation-works/
      return `stroke-dasharray: 1000; stroke-dashoffset: ${1000 * this.circleFill}; margin-top: 100px`
    }
  },
  methods: {
    SETUP_intersectionApiTests() {
      // 1. Fade in test
      this.fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.fadedIn = entry.isIntersecting;
        });
      }, { threshold: this.firstThreshold } );
      this.fadeObserver.observe(this.$refs.fade01);
      

      // 2. Scroll Listener
      window.onscroll = () => {
        if(!this.scrollAnimWaiting) {
          window.requestAnimationFrame(() => {
            this.performScrollAnimation();
            this.scrollAnimWaiting = false;
          });
        }
        this.scrollAnimWaiting = true;
      };


    },

    
    parallaxStyle(index) {
      
      return `transform: translateY(${this.offsets[index] + (this.parallaxValue * 100 * this.scales[index])}px); background-color: ${this.colors[index]}`;
    },

    performScrollAnimation() {
      // Animate the scrollbar
      let bnd = this.$refs.animbar.getBoundingClientRect();
      this.barProgress = this.getAnimScale(bnd.top, this.barAnimLength, this.barAnimTopMargin);

      // Rotate the thingie
      bnd = this.$refs.rotateshape.getBoundingClientRect();
      this.circleFill = this.getAnimScale(bnd.top, this.circleAnimLength, this.circleAnimOffset);

      bnd = this.$refs.parallaxstart.getBoundingClientRect();
      this.parallaxValue = this.getAnimScale(bnd.top, this.circleAnimLength, this.barAnimTopMargin);
    },

    getAnimScale(top, length, offset) { //topMargin, bottomMargin
      // return this.lerp(top - topMargin, 0, height + bottomMargin);
      // return _.clamp(-1.0 * ((top - topMargin) / (height + bottomMargin)), 0.0, 1.0);

      return _.clamp(-1.0 * ((top - offset) / length), 0.0, 1.0);
    },
    lerp(t, a, b) {
      return a + (t * (b - a));
    }
  },
};
</script>

<style scoped>
.fade-in-test {
  width: 100px;
  height: 100px;
  background-color: #ddd;

  transition: all 0.5s ease;
  transform: translateX(0px);
  opacity: 0;
}

.fade-in-test-translated {
  transform: translateX(50px);
  opacity: 1;
}

.animatable-bar {
  width: 100%; 
  height: 100px; 
  background-color: #ddd;
  transition: transform 0.1s ease;
}

.rotating-shape {
  width: 200px; 
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin: auto; */
  margin: 50px 50px;

  background-color: #ddd;

  /* transition: transform 0.05s ease; */
}

.parallax-base {
  position: absolute; 
  width: 100%; 
  height: 100px;
}

</style>
