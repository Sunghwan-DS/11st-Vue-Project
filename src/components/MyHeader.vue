<template>
  <div>
    <header>
      <div class="inner">
        <div
          class="open-nav-drawer"
          @click="onNav('LNB')"></div>
        <a
          href="javascript:void(0)"
          class="logo"></a>
        <div class="search">
          <input
            v-model="searchText"
            placeholder="찾고 싶은 상품을 검색해 보세요!"
            type="text"
            @keyup.enter="search" />
          <!--BEM-->
          <div
            class="search__icon"
            @click="search"></div>
        </div>
        <div class="ranking">
          <!-- Slider main container -->
          <div
            ref="swiper"
            class="swiper-container">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
              <!-- Slides -->
              <div
                v-for="(rank, index) in rankings.rankings"
                :key="rank.name"
                class="swiper-slide">
                <a :href="rank.href">
                  <span class="index">{{ index + 1 }}</span>
                  <span class="name">{{ rank.name }}</span>
                </a>
              </div>
            </div>
          </div>
          <div
            class="open-more"
            @click="toggleRankingWrap($event)"></div>
          <div
            v-if="isShowRankingWrap"
            class="ranking-wrap">
            <div class="title">
              <h3>실시간 쇼핑 검색어</h3>
              <div class="time">
                {{ referenceDate }} 기준
              </div>
              <div
                class="close-wrap"
                @click="toggleRankingWrap($event)"></div>
            </div>
            <div class="tabs">
              <div
                :class="{ active: !tabIndex }"
                class="tab"
                @click="tabIndex = 0">
                1~10위
              </div>
              <div
                :class="{ active: tabIndex }"
                class="tab"
                @click="tabIndex = 1">
                11~20위
              </div>
            </div>
            <ul class="list">
              <li
                v-for="(rank, index) in filteredRankings"
                :key="rank.name">
                <a :href="rank.href">
                  <span class="index">{{ index + 1 + tabIndex * 10 }}</span>
                  <span class="name">{{ rank.name }}</span>
                  <span class="relative-name">{{ rank.relativeName }}</span>
                </a>
                <div
                  :class="rank.status"
                  class="icon"></div>
              </li>
            </ul>
          </div>
        </div>
        <ul class="user-menu">
          <li class="my">
            <a href="javascript:void(0)"></a>
            <ul class="my__menu">
              <li
                v-for="item in myMenu"
                :key="item.name">
                <a :href="item.href">
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0)"></a>
          </li>
          <li>
            <a href="javascript:void(0)"></a>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              @click="onNav('RNB')"></a>
          </li>
        </ul>
      </div>
    </header>
    <div class="utils">
      <div class="inner">
        <ul>
          <li>
            <a href="javascript:void(0)">베스트</a>
          </li>
          <li>
            <a href="javascript:void(0)">쿠폰/혜택</a>
          </li>
          <li>
            <a href="javascript:void(0)">기획전</a>
          </li>
          <li>
            <a href="javascript:void(0)">오늘장보기</a>
          </li>
          <li>
            <a href="javascript:void(0)">T공식대리점</a>
          </li>
          <li>
            <a
              class="shocking-deal"
              href="javascript:void(0)"></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// Swiper.js를 모듈로 활용하는 경우 bundle로 가져와야 합니다.
import Swiper from 'swiper/bundle'
// Style를 연결해야 정상적으로 동작합니다.
import 'swiper/swiper-bundle.css'
import dayjs from 'dayjs'

export default {
  data () {
    return {
      searchText: '',
      rankings: {},
      isShowRankingWrap: false,
      tabIndex: 0,
      myMenu: [
        { name: '나의 쿠폰', href: 'javascript:void(0)' },
        { name: '주문/배송조회', href: 'javascript:void(0)' },
        { name: '취소/반품/교환', href: 'javascript:void(0)' },
        { name: '고객센터', href: 'javascript:void(0)' },
        { name: '회원정보', href: 'javascript:void(0)' }
      ],
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    referenceDate () {
      return dayjs(this.rankings.referenceDate).format('YYYY.MM.DD HH:mm')
    },
    filteredRankings () {
      return this.rankings.rankings.filter((rank, index) => {
        const start = this.tabIndex * 10
        const end = start + 9
        return start <= index && index <= end
      })
    }
  },
  methods: {
    async init () {
      this.rankings = await this.$fetch({
        requestName: 'rankings'
      })
      this.$nextTick(() => {
        new Swiper(this.$refs.swiper, {
          direction: 'vertical',
          speed: 1000,
          autoplay: {
            delay: 1000
          },
          loop: true
        })
      })
    },
    onNav (name) {
      this.$store.dispatch('navigation/onNav', name)
    },
    async search () {
      if (!this.searchText.trim()) return
      const res = await this.$search({
        searchText: this.searchText
      })
      console.log(res)
      // location = res
    },
    toggleRankingWrap (event) {
      this.isShowRankingWrap = !this.isShowRankingWrap
      event.currentTarget.classList.toggle("active")
    },
  }
}
</script>

<style scoped lang="scss">
header {
  .inner {
    display: flex;
    align-items: center;
    height: 120px;
    .open-nav-drawer {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      cursor: pointer;
      box-shadow:
          0 2px 6px rgba(#000,.06),
          0 0 1px rgba(#000,.4);
      display: flex;
      justify-content: center;
      align-items: center;
      &::after {
        content: "";
        display: block;
        width: 36px;
        height: 36px;
        background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
        background-position: -302px -203px;
        background-size: 363px;
      }
    }
    .logo {
      display: block;
      width: 94px;
      height: 40px;
      margin: 0 24px;
      background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
      background-position: -162px 0;
      background-size: 363px;
      cursor: pointer;
    }
    .search {
      position: relative;
      input {
        // display: inline-block;
        width: 500px;
        height: 50px;
        padding: 0 27px;
        border: 1px solid #ddd;
        border-radius: 25px;
        box-sizing: border-box;
        background-color: #fafafa;
        font-size: 18px;
        outline: none;
        font-family: 'Noto Sans KR', sans-serif;
        &::placeholder {
          color: #bbb;
        }
      }
      // & ==> .search
      // .search__icon {
      &__icon {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
        background-position: -162px -45px;
        background-size: 363px;
      }
    }
    .ranking {
      width: 210px;
      margin: 0 30px;
      position: relative;
      .swiper-container {
        width: 182px;
        height: 28px;
        .swiper-slide {
          a {
            display: block;
            height: 28px;
            line-height: 28px;
            text-decoration: none;
            font-size: 15px;
            color: #333;
            font-weight: 700;
            span.index {
              margin-right: 10px;
              color: #f43142;
              font-style: italic;
            }
            &:hover span.name {
              color: #f43142;
            }
          }
        }
      }
      .open-more {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1; // Required! Cause Swiper.
        cursor: pointer;
        user-select: none; // 실시간 쇼핑 검색어가 자동으로 선택(Selection)되는 것을 방지.
        &:hover {
          background-color: #ececec;
        }
        &::after {
          content: "";
          display: block;
          width: 7px;
          height: 7px;
          margin-top: -3px;
          border: solid #999;
          border-width: 0 1px 1px 0;
          box-sizing: border-box;
          transform: rotate(45deg);
        }
        &.active::after {
          transform: rotate(225deg);
          margin-top: 3px;
        }
      }
      .ranking-wrap {
        position: absolute;
        top: 44px;
        z-index: 2;
        width: 410px;
        padding: 18px 25px 25px;
        border: 1px solid #eee;
        border-radius: 4px;
        box-sizing: border-box;
        box-shadow: 0 6px 24px rgba(#000,.10);
        background-color: #fff;
        .title {
          display: flex;
          align-items: flex-end;
          h3 {
            font-size: 17px;
            font-weight: 700;
          }
          .time {
            margin-left: 10px;
            font-size: 13px;
            color: #999;
            flex: 1;
          }
          .close-wrap {
            width: 36px;
            height: 36px;
            background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
            background-position: -261px -203px;
            background-size: 363px;
            cursor: pointer;
            margin: -6px -10px;
            transform: scale(.6666); // from 36px to 24px
          }
        }
        .tabs {
          height: 40px;
          margin: 18px 0;
          border: 1px solid #eee;
          box-sizing: border-box;
          background-color: #fafafa;
          display: flex;
          .tab {
            flex: 1;
            color: #7d7d7d;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &:first-child {
              border-right: 1px solid #eee;
            }
            &.active {
              background-color: #fff;
              font-weight: 700;
              color: #333;
            }
          }
        }
        .list {
          li {
            position: relative;
            margin-top: 14px;
            &:first-child {
              margin-top: 0;
            }
            a {
              display: block;
              height: 22px;
              line-height: 22px;
              text-decoration: none;
              font-size: 15px;
              color: #000;
              .index {
                font-weight: 700;
                margin-right: 10px;
                color: #f43142;
                font-style: italic;
              }
              .relative-name {
                margin-left: 4px;
                font-size: 13px;
                color: #999;
              }
            }
            .icon {
              position: absolute;
              top: 0;
              right: 0;
              width: 22px;
              height: 22px;
              background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
              background-size: 363px;
              &.stay {
                background-image: none;
                &::after {
                  content: "";
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  margin: auto;
                  width: 6px;
                  height: 2px;
                  background: #999;
                }
              }
              &.up {
                background-position: -110px -251px;
              }
              &.down {
                background-position: -58px -251px;
              }
            }
          }
        }
      }
    }
    .user-menu {
      display: flex;

      > li {
        margin-right: 25px;
        padding: 7px 0;
        position: relative;

        &:last-child {
          margin-right: 0;
        }

        > a {
          display: block;
          width: 48px;
          height: 48px;
          background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
          background-size: 363px;
        }

        &:nth-child(1) > a {
          background-position: -106px -145px;
        }

        &:nth-child(2) > a {
          background-position: 0px -198px;
        }

        &:nth-child(3) > a {
          background-position: -53px -198px;
        }

        &:nth-child(4) > a {
          background-position: -94px -70px;
        }

        &:nth-child(1) > a:hover {
          background-position: -53px -145px;
        }

        &:nth-child(2) > a:hover {
          background-position: -159px -145px;
        }

        &:nth-child(3) > a:hover {
          background-position: 0px -145px;
        }

        &:nth-child(4) > a:hover {
          background-position: -106px -198px;
        }

        &.my {
          &:hover {
            .my__menu {
              display: block;
            }
          }

          .my__menu {
            display: none;
            width: 170px;
            padding: 15px 0;
            position: absolute;
            top: 60px;
            left: 0;
            z-index: 2;
            border: 1px solid #eee;
            border-radius: 6px;
            box-sizing: border-box;
            box-shadow: 0 6px 24px -8px rgba(#000, .12);
            background-color: #fff;

            li {
              a {
                display: block;
                padding: 7px 10px 7px 25px;
                font-size: 15px;

                &:hover {
                  color: #f43142;
                  background: #fafafa;
                }
              }
            }
          }
        }
      }
    }
  }
}
.utils {
  border-top: 1px solid #f1f1f1;
  &.fixed {
    padding-top: 120px;
  }
  .inner {
    width: 1240px;
    margin: 0 auto;
    ul {
      display: flex;
      li {
        box-sizing: border-box;
        height: 66px;
        margin-right: 25px;
        &:last-child {
          margin-right: 0px;
        }
        &:hover {
          border-bottom: 2px solid red;
        }
        a {
          display: flex;
          height: 66px;
          align-items: center;
          &.shocking-deal {
            width: 63px;
            background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
            background-position: -94px 0;
            background-size: 363px;
          }
        }
      }
    }
  }
}
</style>