<template>
  <div>
    <nav :class="{ show: isShowRNB }">
      <div class="inner">
        <div class="inner__title">
          <h3 class="title">
            최근 본 상품
          </h3>
          <p class="like_link">
            <a href="javascript:void(0)">찜 목록 보기</a>
          </p>
          <div
            class="close-nav"
            @click="offNav('RNB')"></div>
        </div>
        <div class="inventory">
          <p class="caution">
            최근 본 상품이 없습니다.
          </p>
        </div>
      </div>
    </nav>

    <!--Background-->
    <div
      v-show="isShowRNB"
      v-cloak
      class="nav-bg"
      @click="offNav('RNB')"></div>
  </div>
</template>

<script>
export default {
  computed: {
    isShowRNB () {
      return this.$store.state.navigation.isShowRNB
    }
  },
  methods: {
    offNav (name) {
      this.$store.dispatch('navigation/offNav', name)
    }
  }
}
</script>

<style scoped lang="scss">
nav {
  width: 300px;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  background-color: #fff;
  transition: transform .4s;
  transform: translateX(300px);
  &.show {
    transform: translateX(0);
  }
  .inner {
    height: 100%;
    &__title {
      display: flex;
      padding-left: 25px;
      border-bottom: 1px solid #f4f4f4;
      height: 70px;
      box-sizing: border-box;
      align-items: center;
      .like_link {
        display: inline-block;
        font-size: 14px;
        margin-left: 25px;
        a::after {
          content: "";
          display: inline-block;
          width: 7px;
          height: 7px;
          margin-top: -30px;
          border: solid #999;
          border-width: 0 1px 1px 0;
          box-sizing: border-box;
          transform: rotate(-45deg);
        }
      }
      .close-nav {
        width: 36px;
        height: 36px;
        background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
        background-position: -261px -203px;
        background-size: 363px;
        cursor: pointer;
        justify-self: end;
        margin-left: 30px;
      }
    }
    .inventory {
      height: 100%;
      display: flex;
      align-items: center;
      .caution {
        margin-left: 70px;
      }
    }
  }
}
.nav-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#000, .2);
  z-index: 98;
}
</style>