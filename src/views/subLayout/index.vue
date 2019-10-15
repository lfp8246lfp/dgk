<template>
  <div id="sublayout">
    <el-container>
      <el-header>
        <router-link
          tag="img"
          class="dgk_logo"
          src="../../../static/images/dgk-logo.png"
          alt
          :to="{ path: '/home' }"
        ></router-link>
        <img class="dgk-title" src="../../../static/images/dgk-title.png" alt />
        <i class="fa fa-bars toggleMemu" @click="toggleMenu"></i>
        <div class="pull-right" style="height: 70px;">
          <!-- <div class="search pull-left" style="height: 70px;">
            <el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="inputValue"></el-input>
          </div> -->
          <div class="message pull-left" style="height: 70px;">
            <el-badge :value="0" class="item">
              <i class="el-icon-message-solid"></i>
            </el-badge>
          </div>
          <!-- <lang-select class="pull-left" style="color: #b7b7b7; width: 40px; line-height: 70px; font-size: 34px;"></lang-select> -->

          <div class="user_box pull-left" @click="changeIsShow">
            <img src="../../../static/images/avatar.png" alt />
            {{accountId}}
            <div class="user_manage">
              <p @click="changePSW">修改密码</p>
              <p @click="loginOut">退出</p>
            </div>
          </div>
        </div>
      </el-header>
      <el-container>
        <side-bar :isCollapse="isCollapse"></side-bar>
        <el-main>
          <bread-crumb></bread-crumb>
          <tags-view></tags-view>
          <router-view></router-view>
          <p class="Copyright">Copyright Company © 2018-2019</p>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import BreadCrumb from './BreadCrumb/BreadCrumb.vue';
import TagsView from './TagsView/TagsView.vue';
import SideBar from './SideBar/SideBar.vue';
import LangSelect from './LangSelect/index.vue';
import { mapState } from 'vuex';

export default {
    components: {
        TagsView,
        BreadCrumb,
        SideBar,
        LangSelect
    },
    data () {
        return {
            isCollapse: false,
            routeName: null,
            inputValue: '',
            accountId: localStorage.getItem('accountId'),
            changePSWParams: {
                'password': localStorage.getItem('password')
            }
        };
    },
    watch: {
        $route: function (newV, oldV) {
            this.routeName = this.$route.path
                .replace(/\//g, '-')
                .match(/-(\S*)/)[1]
                .match(/(\S*)-/)[1];
        }
    },
    computed: {
        activeMenu () {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        }
    },
    mounted () {
        this.routeName = this.$route.path
            .replace(/\//g, '-')
            .match(/-(\S*)/)[1]
            .match(/(\S*)-/)[1];
    },
    methods: {
        loginOut () {
            this.$confirm(
                this.$t('areaManage.deleteTip'),
                this.$t('areaManage.reminder'),
                {
                    confirmButtonText: this.$t('common.yes'),
                    cancelButtonText: this.$t('common.cancel'),
                    type: 'warning'
                }
            ).then(() => {
                this.$request('logout').then(res => {
                    if (res.data.returnCode == 0) {
                        this.$message({
                            message: '退出成功',
                            center: true,
                            type: 'success'
                        });

                        this.$router.push('/login');
                    } else {
                        this.$message({
                            message: res.data.returnMsg,
                            center: true,
                            type: 'error'
                        });
                    }
                });
            }).catch(() => {});
        },
        changePSW () {
            let that = this;
            that.$prompt('请输入新的密码', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[a-zA-Z0-9]{6,12}$/,
                inputType: 'password',
                inputErrorMessage: '密码应该由6到12位数字或字符串组成'
            }).then(({ value }) => {
                that.$request('updatePassword', {'password': value}).then(res => {
                    console.log('修改密码', res);
                    if (res.data.returnCode == 0) {
                        this.$router.push('/login');
                        that.$message({
                            type: 'success',
                            message: '修改密码成功',
                            center: true
                        });
                    } else {
                        that.$message({
                            type: 'error',
                            message: res.data.returnMsg,
                            center: true
                        });
                    }
                });
            }).catch(() => {
                // this.$message({
                //   type: 'info',
                //   message: '取消输入'
                // });
            });
        },
        handleOpen (key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose (key, keyPath) {
            // console.log(key, keyPath);
        },
        toggleMenu () {
            this.isCollapse = !this.isCollapse;
        },
        changeIsShow () {
            this.isShow = !this.isShow;
        }
    }
};
</script>

<style lang='scss' scope>
#sublayout {
  overflow-y: auto;
}
.el-header {
  background-color: rgb(43, 48, 52);
  color: #fff;
  text-align: left;
  font-size: 18px;
  height: 70px !important;
  line-height: 70px;
  padding-left: 14px;
  padding-right: 89px;
  // padding-top: 10px;
  // padding-bottom: 10px;
  position: relative;
  .user_manage {
    position: absolute;
    width: 220px;
    right: 37px;
    z-index: 12;
    background-color: rgb(56, 58, 61);
    display: none;
    p {
      height: 50px;
      font-size: 14px;
      line-height: 50px;
      padding: 0 30px;
      cursor: pointer;
    }
    p:hover {
      background-color: rgb(21, 27, 33);
    }
  }
  .search {
    width: 310px;
    margin-right: 1.4rem;

    .el-input__icon {
      font-size: 14px;
      font-weight: 700;
    }
  }
  .el-input__inner {
    height: 40px;
    line-height: 40px;
    border: none;
    background-color: rgb(64, 68, 72);
    color: #fff;
    font-size: 14px;
    padding-left: 59px;
  }
  .user_box {
    cursor: pointer;
    font-size: 14px;
    color: #fff;
    img {
      width: 40px;
      height: 40px;
      margin-right: 23px;
      vertical-align: middle;
    }
  }

  .user_box:hover {
    .user_manage {
      display: block;
    }
  }
  .message {
    margin-right: 23px;
    color: #b7b7b7;
    font-size: 30px;
    .el-badge__content.is-fixed {
      top: 20px;
      right: 14px;
    }
    .el-badge__content {
      height: 15px;
      line-height: 15px;
    }
  }
  .dgk_logo {
    display: inline-block;
    width: 42px;
    height: 42px;
    vertical-align: middle;
    margin-right: 15px;
    cursor: pointer;
  }
}

.el-aside {
  background-color: #20252b;
  line-height: 800px;
}

.el-main {
  background-color: #f5f5f5;
  color: #333;
  padding: 0;
  .Copyright {
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  border-right: none;
}
.el-submenu__title {
  text-align: left;
}
.el-menu-item {
  text-align: left;
}
.el-submenu .el-menu-item {
  padding-left: 50px;
  text-align: left;
}
.el-menu--popup-right-start {
  margin-left: 0;
}
.toggleMemu {
  color: #fff;
  margin-left: 0.1rem;
  cursor: pointer;
}
</style>
