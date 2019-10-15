<template>
  <div id="breadcrumb">
    <el-breadcrumb separator="/">
       <transition-group>
         <el-breadcrumb-item v-for="item in trueList" :key="item">{{ generateTitle(item)}}</el-breadcrumb-item>
       </transition-group>
      
    </el-breadcrumb>
  </div>
</template>

<script>
import { generateTitle } from '../../../utils/i18n';

export default {
    name: '',

    data () {
        return {
            menuList: [],
            trueList: []
        };
    },
    watch: {
        // 监听路由变化
        $route: function (newV, oldV) {
            this.trueList = [];
            this.getRoutePath();
        }

    },
    created () {
        this.getRoutePath();
    },
    mounted () {
        this.menuList = JSON.parse(localStorage.getItem('menu'));
        this.getRoutePath();
    },
    methods: {
        getRoutePath () {
            for (let i = 0; i < this.menuList.length; i++) {
                if (this.menuList[i].children && this.menuList[i].children.length) {
                    if (this.$route.matched[0].path === this.menuList[i].path) {
                        this.trueList.push(this.menuList[i].name);
                    }
                    for (let j = 0; j < this.menuList[i].children.length; j++) {
                        if (this.$route.matched[1].path === this.menuList[i].children[j].path) {
                            this.trueList.push(this.menuList[i].children[j].name);
                        } else {
                            let index = this.$route.matched[1].path.lastIndexOf('\/');
                            if (this.$route.matched[1].path.substring(0, index) === this.menuList[i].children[j].path) {
                                this.trueList.push(this.menuList[i].children[j].name);
                                for (let k = 0; k < this.menuList[i].children[j].children.length; k++) {
                                    if (this.$route.matched[1].path === this.menuList[i].children[j].children[k].path) {
                                        this.trueList.push(this.menuList[i].children[j].children[k].name);
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (this.$route.matched[0].path === this.menuList[i].path || this.$route.matched[1].path === this.menuList[i].path) {
                        this.trueList.push(this.menuList[i].name);
                    }
                }
            }
        },
        generateTitle
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.routeList = to.meta.routeList;
        });
    }

};
</script>

<style lang='scss' scope>
#breadcrumb {
    height: 40px;
    background-color: #20252B;
    padding-left: 24px;
    position: relative;
   .bread_icon {
       display: inline-block;
       width: 2px;
       height: 10px;
       background-color: rgb(45,134,225);
       margin-right: 0.1rem;
   }
    .el-breadcrumb {
        font-size: 14px;
        height: 40px;
        line-height: 40px;
    }
    .el-breadcrumb__inner {
         color: #fff;

    }
    .el-breadcrumb__separator {
         color: #fff;
    }
    .v-enter,.v-leave-to{
      opacity: 0;
      transform: translateX(80px);
        }

    .v-enter-active,.v-leave-active{
        transition: all 0.6s ease;
        }
    .v-move{
        transition: all 0.6s ease;
        }
    .v-leave-active{
        position: absolute;
        }
}

#breadcrumb:after {
    content: '';
    position: absolute;
    height: 14px;
    left: 8px;
    bottom: 13px;
    width: 4px;
    background-color: rgb(45,134,225);
}
</style>
