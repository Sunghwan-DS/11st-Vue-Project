<template>
  <div class="direct">
    <div class="inner">
      <ul>
        <li
          v-for="item in directs"
          :key="item.name">
          <a :href="item.href">
            <div>
              <img
                :src="item.src"
                :alt="item.name"
                width="90" />
              <div class="text">
                {{ item.name }}
              </div>
            </div>
          </a>
        </li>
        <li>
          <div
            class="open-more"
            @click="onNav('LNB')">
            <div class="icon"></div>
            <div class="text">
              더보기
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      directs: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.directs = await this.$fetch({
        requestName: 'directs'
      })
    },
    onNav (name) {
      this.$store.dispatch('navigation/onNav', name)
    }
  }
}
</script>

<style scoped lang="scss">
.direct {
  .inner {
    padding: 50px 0;
  }
  ul {
    display: flex;
    li {
      a {
        div {
          // 블록 요소는 이미 수직으로 쌓여요~
          display: flex;
          flex-direction: column;
          // 글자의 교차축 가운데 정렬을 의도하신 하지만,
          // text-align: center; 사용을 더 권장해요~
          align-items: center;
        }
      }
      margin-right: 25px;
      &:last-child {
        margin-right: 0;
      }
      img {
        margin-bottom: 15px;
      }
      .text {
        font-size: 15px;
      }
      .open-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        .icon {
          width: 90px;
          height: 90px;
          margin-bottom: 15px;
          background-image: url("https://trusting-williams-8cacfb.netlify.app/images/main_2x.png");
          background-position: 0 0;
          background-size: 209px;
        }
      }
    }
  }
}
</style>
