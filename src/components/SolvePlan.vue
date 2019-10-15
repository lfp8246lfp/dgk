<template>
  <div id="solveplan">
      <el-row>
          <el-col :span="24">
             <h2 class="solveplan_top"> {{ $t('home.solveplan.solveplan') }}</h2>
             <p class="solveplan_manage">{{ $t('home.solveplan.subsolveplan') }}</p>
          </el-col>
          <div class="solveplan_content">
                <el-col :span="16" :offset="4">
                    <ul class="solveplan_content_list">
                        <el-col :xs="8">
                           <li class="solveplan_content_item plan1">
                               <p class="plan2_title">{{ $t('home.solveplan.beadhouseplan.title') }}</p>
                               <p class="plan1_desrc">{{ $t('home.solveplan.beadhouseplan.description') }}</p>
                               <p class="plan1_konw">{{ $t('home.solveplan.beadhouseplan.knowmore') }}</p>
                           </li>
                        </el-col>
                        <el-col :xs="8">
                           <li class="solveplan_content_item plan2">
                                <p class="plan2_title">{{ $t('home.solveplan.planA.title') }}</p>
                                <p class="plan1_desrc">{{ $t('home.solveplan.planA.description') }}</p>
                                <p class="plan1_konw">{{ $t('home.solveplan.planA.knowmore') }}</p>
                           </li>
                        </el-col>
                         <el-col :xs="8">
                           <li class="solveplan_content_item plan3">
                               <p class="plan3_title">{{ $t('home.solveplan.planB.title') }}</p>
                                <p class="plan1_desrc">{{ $t('home.solveplan.planB.description') }}</p>
                                <p class="plan1_konw">{{ $t('home.solveplan.planB.knowmore') }}</p>
                           </li>
                        </el-col>
                    </ul>
                </el-col>
          </div>
          <el-col :span="24">
             <p class="solveplan_more">{{ $t('home.solveplan.getmoreplan') }}<i class="el-icon-back"></i></p>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {

    data () {
        return {
            solveList: []
        };
    },
    mounted () {
        // this.getData();
    },
    methods: {
        getData () {
            this.$request('solvePlan').then(res => {
                this.solveListres = res.data.list;
            });
        }
    }
};
</script>

<style lang='scss' scope>
#solveplan {
    background-color:#151323;
    color: #fff;
    padding-top:0.44rem;
    height: 7.12rem;
    .solveplan_top {
        text-align: center;
        font-size: 0.4rem;
        font-weight: 400;
    }
    .solveplan_manage {
        text-align: center;
        font-size: 0.24rem;
        margin: 0.15rem 0;
        color: gray;
    }
    .solveplan_content { 
        .solveplan_content_list {
            display: flex;
            .solveplan_content_item { 
                    text-align: center;           
                    height: 4.8rem;
                    box-sizing: border-box;
                    padding: 0 0.387rem;
            }
            .plan1 {
                background-image: url("../../static/images/plan1.png");
                background-size: 100% 100%;
                padding-top: 3.33rem;
                .plan1_title {
                    font-size: 0.35rem;  
                    position: relative; 
                }
                .plan1_title:before {
                    content: "";
                    display: block;
                    position: absolute;
                    bottom: -0.1rem;
                    left: 50%;
                    transform: translateX(-50%);
                    -webkit-transform: translateX(-50%);
                    -moz-transform: translateX(-50%);
                    width: 1.33rem;
                    height: 0.05rem;
                    background-color: rgb(51,102,255);
                }
            }
              .plan1_desrc {
                    font-size: 7px;
                    color: rgb(255,255,255);
                    margin-top: 0.826rem;
                    text-align: left;
                    display: none;
                }
                .plan1_konw {
                    display: inline-block;
                    font-size: 0.197rem;
                    border: 1px solid #fff;
                    padding: 0.1rem 0.613rem;
                    margin-top: 0.533rem;
                    cursor: pointer;
                    display: none;
                }
                .plan2_title {
                    font-size: 0.35rem;  
                    position: relative; 
                }
                .plan2_title:before {
                    content: "";
                    display: block;
                    position: absolute;
                    bottom: -0.1rem;
                    left: 50%;
                    transform: translateX(-50%);
                    -webkit-transform: translateX(-50%);
                    -moz-transform: translateX(-50%);
                    width: 1.33rem;
                    height: 0.05rem;
                    background-color: rgb(51,102,255);
                }
            .plan2 {
                background-image: url("../../static/images/plan2.png");
                background-size: 100% 100%;
                padding-top: 3.33rem;
                .plan2_title {
                    font-size: 0.35rem;  
                    position: relative; 
                }
                .plan2_title:before {
                    content: "";
                    display: block;
                    position: absolute;
                    bottom: -0.1rem;
                    left: 50%;
                    transform: translateX(-50%);
                    -webkit-transform: translateX(-50%);
                    -moz-transform: translateX(-50%);
                    width: 1.33rem;
                    height: 0.05rem;
                    background-color: rgb(51,102,255);
                }
            }
            .plan2:hover,   .plan1:hover,  .plan3:hover{
                  padding-top: 1.253rem!important;
                  transition: padding-top ease-in 0.5s; 
                  .plan1_desrc {
                      display: block;
                  }
                   .plan1_konw {
                        display: inline-block;
                   }
            }
            .plan3 {
                background-image: url("../../static/images/plan3.png");
                background-size: 100% 100%;
                padding-top: 3.33rem;
                .plan3_title {
                    font-size: 0.35rem;  
                    position: relative; 
                }
                .plan3_title:before {
                    content: "";
                    display: block;
                    position: absolute;
                    bottom: -0.1rem;
                    left: 50%;
                    transform: translateX(-50%);
                    -webkit-transform: translateX(-50%);
                    -moz-transform: translateX(-50%);
                    width: 1.33rem;
                    height: 0.05rem;
                    background-color: rgb(51,102,255);
                }
            }
        }
    }
    .solveplan_more {
        text-align: center;
        font-size: 0.24rem;
        margin-top: 0.6rem;
        cursor: pointer;
        i {
            transform: rotate(-180deg);
            margin-left: 10px;
        }
    }
}
</style>
