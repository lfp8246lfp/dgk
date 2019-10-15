<template>
  <div class="index">
    <div class="content">
      <div class="cont">
        <!-- 产品与服务 -->
        <product-service></product-service>
        <!-- 解决方案 -->
        <solve-plan></solve-plan>
        <!-- 项目分布地图 -->
        <project-location></project-location>
        <!-- 合作伙伴 -->
        <!-- <partners></partners> -->
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from 'components/ProductService.vue';
import SolvePlan from 'components/SolvePlan.vue';
import ProjectLocation from 'components/ProjectLocation.vue';
import Partners from 'components/Partners.vue';

export default {
    components: {
        ProductService,
        SolvePlan,
        ProjectLocation,
        Partners

    },
    mounted () {
        this.$store.dispatch('delAllViews');
    },
    data () {
        return {};
    },

    methods: {}
};
</script>

<style lang='scss' scope>
</style>
