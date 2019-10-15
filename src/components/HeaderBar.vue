<template>
  <div id="header">
    <el-row>
      <el-col :span="24">
        <div class="hd_top">
          <div class="hd_top_bg">
            <el-col :span="16" :offset="4">
              <div class="hd_top_log">
                <img class="log_img pull-left" src="../../static/images/dgk.png" />
                <p class="pull-left log_title"> {{ $t('common.title') }}</p>
                <div class="pull-right login user_box">
                   <img src="../../static/images/avatar.png" alt="">
                   {{accountId}}
                </div>
              </div>
            </el-col>
          </div>
          <div class="hd_top_banner">
            <el-col :span="16" :offset="4">
              <div class="hd_banner_title">
                <h2 class="title">{{ $t('home.headerbar.subtitle') }}</h2>
                <p class="desc">{{ $t('home.headerbar.description') }}</p>
                <span class="know">{{ $t('home.headerbar.knowdgk') }}</span>
              </div>
            </el-col>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    data () {
        return {
            accountId: localStorage.getItem('accountId')
        };
    },
    created () {
        // this.getData();
        // console.log(this.accountId)
    },
    methods: {
        getData () {
            this.$request('getHome').then(res => {
            });
        }
    }
};
</script>
<style lang="scss" scoped>
// $browser-default-font-size: 37.5px !default;
@import "../assets/scss/common.scss";
#header {
  .hd_top {
    .hd_top_bg {
      width: 100%;
      height: 0.933rem;
      background-color: rgb(0, 0, 0);
      color: #fff;
      .hd_top_log {
        height: 0.933rem;
        line-height: 0.933rem;
        .log_img {
          width: 0.32rem;
          height: 0.333rem;
          margin-top: 0.3rem;
        }
        .log_title {
          margin-left: 0.15rem;
        }
        &:after {
          content: "";
          display: block;
          clear: both;
        }
        .login {
          span {
            // padding: 0 0.2667rem;
            font-size: 0.187rem;
            color: #fff;
            &:hover {
              color: $mainColor;
              cursor: pointer;
            }
          }
        }
        .user_box {
           img {
            width: 30px;
            height: 30px;
            margin-right: 0.1rem;
            vertical-align: middle;
          }
        }
      }
    }
    .hd_top_banner {
      // height: 255px;
      height: 5.52rem;
      background-image: url("../../static/images/banner-bg.png");
      background-size: 100% 100%;
      color: #fff;
      .hd_banner_title {
        .title {
          font-size: 0.587rem;
          margin-top: 1.407rem;
          font-weight: 400;
        }
        .desc {
          font-size: 0.266rem;
          margin-top: 0.22rem;
        }
        .know {
          display: inline-block;
          font-size: 0.213rem;
          border: 1px solid #fff;
          padding: 0.12rem 0.42rem;
          margin-top: 0.466rem;
        }
      }
    }
  }
}
</style>
<style lang="scss">
</style>

