<template>
  <div>
    <l-n-b></l-n-b>
    <r-n-b></r-n-b>
    <my-header></my-header>
    <billboard></billboard>
    <direct></direct>
    <hot-focus></hot-focus>
    <global-banner></global-banner>
  </div>
</template>

<script>
import LNB from '~/src/components/LNB'
import RNB from '~/src/components/RNB'
import MyHeader from '~/src/components/MyHeader'
import Billboard from '~/src/components/Billboard'
import Direct from '~/src/components/Direct'
import HotFocus from '~/src/components/HotFocus'
// 위 방식처럼 경로 별칭을 사용하는 게 좋아요~
import GlobalBanner from "./components/GlobalBanner";
export default {
  components: {
    LNB,
    RNB,
    MyHeader,
    Billboard,
    Direct,
    HotFocus,
    GlobalBanner,
  }
}
</script>

<style lang="scss">
@import "./scss/main.scss";

</style>
