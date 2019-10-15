<!--  -->
<template>
    <div id="buttom">
         <el-row>
            <el-col :span="24">
                <div class="footer">
                    <el-col :span="16" :offset="4">
                        <div class="footer_title pull-left">
                            <div class="footer_title_top">
                                <img class="pull-left" src="../../static/images/dgk.png" alt="" />
                                <p class="pull-left footer_title_dgk"> {{ $t('common.title') }}</p>
                            </div>
                              
                            <ul class="list">
                                <li>{{ $t('home.bottombar.aboutus') }}</li>
                                <li>{{ $t('home.bottombar.cooperationcases') }}</li>
                                <li>{{ $t('home.bottombar.suggestions&complaints') }}</li>
                                <li>{{ $t('home.bottombar.announcement') }}</li>
                                <li>{{ $t('home.bottombar.PromotionAlliance') }}</li>
                                <li class="none">{{ $t('home.bottombar.partners') }}</li>
                            </ul>
                            <ul class="record">
                                <li>{{ $t('home.bottombar.Copyright') }}</li>
                                <li>{{ $t('home.bottombar.InternetICP') }}<a href="JavaScript：;">{{ $t('home.bottombar.recordNum') }}</a></li> 
                            </ul>
                        </div>
                        <div class="footer_code pull-right">
                            <div class="code">
                                <img src="../../static/images/code.jpg" alt="">
                            </div>
                            <p>{{ $t('home.bottombar.wetchat') }}</p>
                        </div>
                    </el-col>
                </div>
            </el-col>
         </el-row>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },

    components: {},

    computed: {},

    mounted () {},

    methods: {}
};
</script>
<style lang='scss' scoped>
@import '../assets/scss/common.scss';
#buttom{
    padding-top: 0.307rem;
    padding-bottom: 0.507rem;
    background-color: #151323;
    color: #fff;
   .footer_title {
       .footer_title_top {
            height: 0.572rem;
           img {
               display: block;
               margin-right: 10px;
               height: 0.572rem;
               width: 0.572rem;
            //    vertical-align: top;
         
           }
           .footer_title_dgk {
            //    margin-left: 10px;
               font-size: 0.513rem;
               height: 0.572rem;
               line-height: 0.572rem;
           }
          &:after {
            content: "";
            display: block;
            clear: both;
            }
       }
       .list {
           display: flex;
           margin-top: 20px;
           li {
               padding: 0 20px;
               border-right: 1px solid #fff;
               font-size: 8px;
           }
           li:first-child {
               padding-left:0;
           }
           li:last-child {
               border-right: none;
           }
       }
       .record {
           margin-top: 20px;
           li {
               margin-top: 10px;
           }
         
           li>a {
               color:#fff;
           }
       }
   }
   .footer_code {
       text-align: center;
        .code {
            padding: 10px;
            background-color: #fff;
            width: 1.41rem;
            height: 1.41rem;
            img {
                width: 100%;
            }
        }
        p {
            margin-top: 10px;
        }
       
   }
   @media screen and (max-width: 830px) {
       .footer_title {
       
           .list {
                   display:block;
               li {
                   margin-top: 10px;
                   border-right: none;
                   padding-left:0;
               }
           }
       }
   }
   @media screen and (max-width: 960px) {
    
       .footer_code {
           width: 100%;
           margin-top: 10px;
        // text-align: center;
        p {
            text-align: left;
        }
        
       }
   }
  
   
   
}
</style>