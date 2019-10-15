<template>
  <div id="layout">
    <header-bar></header-bar>
    <router-view></router-view>
    <bottom-bar></bottom-bar>
    <ul class="fix">
      <li>
        <img src="../../../static/images/kefu.png" alt>
      </li>
      <li>
        <img src="../../../static/images/top.png" alt>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import HeaderBar from 'components/HeaderBar.vue';
import BottomBar from 'components/BottomBar.vue';
// import SideMenu from "components/sideMenu.vue";

export default {
    computed: {
        // ...mapGetters(['loading'])
    },
    components: {
        HeaderBar,
        BottomBar
    // SideMenu
    }
};
</script>
<style lang="scss" scoped src="./layout.scss"></style>
<style lang="scss">
#layout {
  .el-loading-mask {
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
