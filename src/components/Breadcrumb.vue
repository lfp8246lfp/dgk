<template>
    <div>
        <el-breadcrumb class="separator" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{menu.rootName}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{menu.parentName}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{menu.name}}</el-breadcrumb-item>
            <slot></slot>
        </el-breadcrumb>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        computed: {
            ...mapGetters([
                'menu'
            ])
        }
    };
</script>
<style>
</style>
