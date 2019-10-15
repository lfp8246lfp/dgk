<template>
  <el-aside width="50px;" class="el-aside">
    <el-menu
      :default-active="activeMenu"
      :unique-opened="true"
      background-color="#20252B"
      text-color="rgb(179,181,182)"
      active-text-color="#fff"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      :router="true"
    >
      <!-- 一级菜单 -->
      <template v-for="item in list">
        <el-submenu
          v-if="item.children && item.children.length"
          :index="item.path"
          :key="item.path"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <!-- <i><img :src="item.icon" alt=""></i> -->
            <span>{{generateTitle(item.name)}}</span>
          </template>

          <!-- 二级菜单 -->
          <template v-for="itemChild in item.children">
            <el-submenu
              v-if="itemChild.children && itemChild.children.length"
              :index="itemChild.path"
              :key="itemChild.path"
            >
              <template slot="title">
                <i :class="itemChild.icon"></i>
                <span>{{generateTitle(itemChild.name)}}</span>
              </template>

              <!-- 三级菜单 -->
              <el-menu-item
                v-for="itemChild_Child in itemChild.children"
                :index="itemChild_Child.path"
                :key="itemChild_Child.path"
              >
                <i :class="itemChild_Child.icon"></i>
                <!-- <i>
                    <img :src="itemChild.icon" alt="">
                </i>-->
                <span slot="title">{{generateTitle(itemChild_Child.name)}}</span>
              </el-menu-item>
            </el-submenu>

            <el-menu-item v-else :index="itemChild.path" :key="itemChild.path">
              <i :class="itemChild.icon"></i>
              <span slot="title">{{generateTitle(itemChild.name)}}</span>
            </el-menu-item>
          </template>
        </el-submenu>

        <el-menu-item v-else :index="item.path" :key="item.path">
          <i :class="item.icon"></i>
          <!-- <i><img :src="item.icon" alt=""></i> -->
          <span slot="title">{{generateTitle(item.name)}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapGetters } from 'vuex';
import { generateTitle } from '../../../utils/i18n';

export default {
    name: 'SideBar',
    data () {
        return {
            list: []
        };
    },
    props: ['isCollapse'],
    components: {},
    computed: {
    // 点击菜单事件 返回路由
        activeMenu () {
            const route = this.$route;
            const { meta, path } = route;
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        }
    },
    mounted () {
        this.getMenuList();
    },
    methods: {
        getMenuList () {
            this.$request('getMenuList',{params:{systemId:7}}).then(res => {
                console.log('getMenuList', res);
                this.list = res.data.menuInfoItems;
                localStorage.setItem('menu', JSON.stringify(this.list));
            });
        },
        handleOpen (key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose (key, keyPath) {
            // console.log(key, keyPath);
        },
        generateTitle
    }
};
</script>


<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 92.5vh;
}
.el-aside {
    min-height: 92.5vh;
}
.el-menu {
  border-right: none;
}
.el-submenu__title {
  background-color: #20252B;
  color:#B4B6B7;
  
  i {
     margin-right: 10px;
  }
}
.el-menu-item {
  font-size: 14px;
  i {
    margin-right: 10px;
  }
}
.el-menu-item:hover {
  background-color: #0D141B!important; 
}
.active{
     background:#0D141B;
  }


</style>
<style lang="scss">
  .el-menu--popup {
  padding: 0px!important;
}

.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
  padding-left: 14px;
}
.el-menu .el-menu--inline {
    .el-submenu {
        .el-submenu__title {
            padding-left: 40px!important;
        }
   }
}

.el-submenu__title {
   font-size: 14px!important;
    padding: 0  20px!important; 
//    text-align: center;
}
.el-menu-item, .el-submenu__title {
  height: 40px!important;
  line-height: 40px!important;
//   padding-left: 40px!important; 
}

.el-menu--collapse {
    width: 50px!important;
    // text-align: center;
}
.fa {
    width: 16px;
    height: 16px;
}
// .el-tooltip {
//     padding: 0  14px!important; 
// }
</style>