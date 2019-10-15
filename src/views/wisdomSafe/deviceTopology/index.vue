<template>
  <div class="wisdomSafe">
    <el-row :gutter="10">
      <el-col :span="16">
        <div class="left">
          <div class="imgs">
            <h1>{{$t('deviceTopology.nursingHome1f')}}</h1>
            <div class="imgbox" v-show="showimg">
              <img src="../../../../static/images/floor2.png" alt class="floorlog">
              <img
                src="../../../../static/images/watersucc.png"
                alt
                style="position:absolute;top:3rem;left:4.8rem;"
              >
              <img
                src="../../../../static/images/somkesucc.png"
                alt
                style="position:absolute;top:3rem;left:6.4rem;"
              >
              <img
                src="../../../../static/images/papersucc.png"
                alt
                style="position:absolute;top:3rem;left:6.4rem;"
              >
              <img
                src="../../../../static/images/waterwarn.png"
                alt
                style="position:absolute;top:4rem;left:7rem;"
              >
              <img
                src="../../../../static/images/somkesucc.png"
                alt
                style="position:absolute;top:4.6rem;left:7rem;"
              >
              <img
                src="../../../../static/images/somkesucc.png"
                alt
                style="position:absolute;top:3.3rem;left:7.14rem;"
              >
              <img
                src="../../../../static/images/paperout.png"
                alt
                style="position:absolute;top:3rem;left:7.3rem;"
              >
              <img
                src="../../../../static/images/smokeout.png"
                alt
                style="position:absolute;top:4.3rem;left:7.8rem;"
              >
              <img
                src="../../../../static/images/paperwarn.png"
                alt
                style="position:absolute;top:3rem;left:8.5rem;"
              >
              <img
                src="../../../../static/images/waterout.png"
                alt
                style="position:absolute;top:3.2rem;left:8.7rem;"
              >

              <img
                src="../../../../static/images/smokewarn.png"
                alt
                style="position:absolute;top:5rem;left:9.2rem;"
              >
              <img
                src="../../../../static/images/waterwarn.png"
                alt
                style="position:absolute;top:4.4rem;left:10rem;"
              >
              <img
                src="../../../../static/images/watersucc.png"
                alt
                style="position:absolute;top:4rem;left:10.4rem;"
              >
              <img
                src="../../../../static/images/somkesucc.png"
                alt
                style="position:absolute;top:3.3rem;left:10.6rem;"
              >
              <img
                src="../../../../static/images/waterout.png"
                alt
                style="position:absolute;top:2.8rem;left:11rem;"
              >
              <img
                src="../../../../static/images/waterwarn.png"
                alt
                style="position:absolute;top:3rem;left:11.3rem;"
              >
              <img
                src="../../../../static/images/papersucc.png"
                alt
                style="position:absolute;top:4rem;left:12.8rem;"
              >
              <img
                src="../../../../static/images/watersucc.png"
                alt
                style="position:absolute;top:4.3rem;left:13.4rem;"
              >
            </div>
            <div class="imgbox" v-show="!showimg">
              <img src="../../../../static/images/floor1.png" alt class="floorlog">
              <img
                src="../../../../static/images/watersucc.png"
                alt
                style="position:absolute;top:3rem;left:4.8rem;"
              >
              <img
                src="../../../../static/images/waterwarn.png"
                alt
                style="position:absolute;top:3.2rem;left:7rem;"
              >
              <img
                src="../../../../static/images/somkesucc.png"
                alt
                style="position:absolute;top:4.6rem;left:7rem;"
              >
              <img
                src="../../../../static/images/somkesucc.png"
                alt
                style="position:absolute;top:3.3rem;left:7.14rem;"
              >
              <img
                src="../../../../static/images/paperout.png"
                alt
                style="position:absolute;top:2.4rem;left:7.3rem;"
              >
              <img
                src="../../../../static/images/smokeout.png"
                alt
                style="position:absolute;top:4.3rem;left:7.8rem;"
              >
              <img
                src="../../../../static/images/paperwarn.png"
                alt
                style="position:absolute;top:2.4rem;left:8.5rem;"
              >
              <img
                src="../../../../static/images/waterout.png"
                alt
                style="position:absolute;top:3.1rem;left:8.7rem;"
              >
              <img
                src="../../../../static/images/smokewarn.png"
                alt
                style="position:absolute;top:5rem;left:9.2rem;"
              >
              <img
                src="../../../../static/images/waterwarn.png"
                alt
                style="position:absolute;top:4.4rem;left:10rem;"
              >
              <img
                src="../../../../static/images/watersucc.png"
                alt
                style="position:absolute;top:4rem;left:10.4rem;"
              >
              <img
                src="../../../../static/images/somkesucc.png"
                alt
                style="position:absolute;top:2.9rem;left:10.6rem;"
              >
              <img
                src="../../../../static/images/waterout.png"
                alt
                style="position:absolute;top:4rem;left:11rem;"
              >
              <img
                src="../../../../static/images/waterwarn.png"
                alt
                style="position:absolute;top:4rem;left:11.3rem;"
              >
              <img
                src="../../../../static/images/papersucc.png"
                alt
                style="position:absolute;top:5rem;left:12.8rem;"
              >
              <img
                src="../../../../static/images/watersucc.png"
                alt
                style="position:absolute;top:4.4rem;left:13.4rem;"
              >
            </div>
            <div class="select">
              <div class="floor" :class="{active:showimg}" @click="select(0)">1F</div>
              <div class="floor" :class="{active:!showimg}" @click="select(1)">2F</div>
            </div>
            <ul class="icon">
              <li>
                <img src="../../../../static/images/somkesucc.png" alt>
                <span>{{$t('deviceTopology.smoke')}}</span>
              </li>
              <li>
                <img src="../../../../static/images/watersucc.png" alt>
                <span>{{$t('deviceTopology.waterPressure')}}</span>
              </li>
              <li>
                <img src="../../../../static/images/papersucc.png" alt>
                <span>{{$t('deviceTopology.handReport')}}</span>
              </li>
              <li>{{$t('deviceTopology.redTip')}}</li>
            </ul>
          </div>
          <el-row :gutter="10">
            <el-col :span="12">
              <div class="box">
                <h1>{{$t('deviceTopology.smoke')}}</h1>
                <p style="margin-top:30px;">{{$t('deviceTopology.devLocation')}}：{{$t('deviceTopology.healthyRoom')}}</p>
                <p style="margin-top:10px;">{{$t('deviceTopology.alarmTypa')}}：{{$t('deviceTopology.independentSmokeManualSelftest')}}</p>
                <div class="warn">
                  <img src="../../../../static/images/warn.png" alt>
                  <p>{{$t('deviceTopology.warning')}}</p>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="box">
                <h1>{{$t('deviceTopology.handReport')}}</h1>
                <p style="margin-top:30px;">{{$t('deviceTopology.devLocation')}}：{{$t('deviceTopology.healthyRoom')}}</p>
                <p style="margin-top:10px;">{{$t('deviceTopology.alarmTypa')}}：{{$t('deviceTopology.independentSmokeManualSelftest')}}</p>
                <div class="warn succ">
                  <img src="../../../../static/images/success.png" alt>
                  <p>{{$t('deviceTopology.normal')}}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="right">
          <div class="device">
            <h1>{{$t('deviceTopology.equipmentOverview')}}</h1>
            <ul class="list">
              <li>
                {{$t('deviceTopology.smokeDevNum')}}
                <p>
                  22
                  <span> {{$t('deviceTopology.ge')}}</span>
                </p>
              </li>
              <li>
                 {{$t('deviceTopology.waterPressureDevNum')}}
                <p>
                  11
                  <span> {{$t('deviceTopology.ge')}}</span>
                </p>
              </li>
              <li>
                 {{$t('deviceTopology.handReportNum')}}
                <p>
                  7
                  <span> {{$t('deviceTopology.ge')}}</span>
                </p>
              </li>
            </ul>
          </div>
          <div class="temp">
            <h1>{{$t('deviceTopology.temperature&humidityParameters')}}</h1>
            <ul class="list">
              <li>
                {{$t('deviceTopology.currentTemperature')}}
                <p style="color:#4287ff;">
                  35.1
                  <span>&#8451;</span>
                </p>
              </li>
              <li>
                 {{$t('deviceTopology.currentHumidity')}}
                <p style="color:#1bd3b9;">
                  67.6
                  <span>RH%</span>
                </p>
              </li>
            </ul>
            <ve-line
              :data="chartData"
              :settings="chartSettings"
              width="94%"
              height="160px"
              :legend-visible="false"
              :colors="colors"
              :extend="chartExtend"
            ></ve-line>
          </div>
          <div class="water">
            <h1> {{$t('deviceTopology.waterPressureParam')}}</h1>
            <ul class="list">
              <li>
                {{$t('deviceTopology.currentWaterPressure')}}
                <p>
                  35.1
                  <span>kPa</span>
                </p>
              </li>
            </ul>
            <ve-line
              :data="chartDataT"
              width="94%"
              height="160px"
              :legend-visible="false"
              :colors="colors"
              :extend="chartExtend"
            ></ve-line>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    name: '',

    data () {
        this.chartSettings = {
            axisSite: { right: ['湿度'] },
            yAxisType: ['℃', 'percent'],
            yAxisName: ['温度', '湿度']
        };
        this.colors = ['#4287ff', '#1bd3b9'];
        return {
            showimg: true,
            chartData: {
                columns: ['日期', '温度', '湿度'],
                rows: [
                    { 日期: '1/1', 温度: 22, 湿度: 0.32 },
                    { 日期: '1/2', 温度: 23, 湿度: 0.26 },
                    { 日期: '1/3', 温度: 13, 湿度: 0.76 },
                    { 日期: '1/4', 温度: 37, 湿度: 0.49 },
                    { 日期: '1/5', 温度: 35, 湿度: 0.323 },
                    { 日期: '1/6', 温度: 40, 湿度: 0.78 }
                ]
            },
            chartDataT: {
                columns: ['日期', '水压'],
                rows: [
                    { 日期: '1/1', 水压: 1393 },
                    { 日期: '1/2', 水压: 3530 },
                    { 日期: '1/3', 水压: 2923 },
                    { 日期: '1/4', 水压: 1723 },
                    { 日期: '1/5', 水压: 3792 },
                    { 日期: '1/6', 水压: 4593 }
                ]
            },
            chartExtend: {
                series: {
                    type: 'line'
                },
                grid: {
                    top: 30,
                    bottom: 0
                }
            }
        };
    },

    methods: {
        select (value) {
            if (value == 0) {
                this.showimg = true;
            } else {
                this.showimg = false;
            }
        }
    }
};
</script>

<style lang='scss' scope>
.wisdomSafe {
  padding: 10px;
  .imgs {
    height: 9rem;
    background: #fff;
    padding: 30px;
    position: relative;
    h1 {
      text-align: center;
    }
    .imgbox {
      position: relative;
      .floorlog {
        display: block;
        width: 18rem;
        height: 10rem;
        margin: -1rem auto 0;
      }
    }
    .select {
      position: absolute;
      top: 0.6rem;
      right: 30px;
      .floor {
        width: 0.8rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
        border: 1px solid #eeeeee;
        font-size: 0.26rem;
        cursor: pointer;
      }
      .active {
        background: #2d86e1;
        border: 1px solid #2d86e1;
        color: white;
      }
    }
    .icon {
      position: absolute;
      top: 7rem;
      left: 0.4rem;
      li {
        margin-top: 0.2rem;
        color: #999999;
        img {
          vertical-align: middle;
        }
      }
    }
  }
  .device {
    padding: 24px;
    height: 2.4rem;
    box-sizing: border-box;
    background: #fff;
    .list {
      width: 6rem;
      margin-top: 0.3rem;
      display: flex;
      justify-content: space-between;
      li {
        font-size: 0.2rem;
        color: #666;
        p {
          font-size: 0.6rem;
        }
        span {
          font-size: 0.2rem;
        }
      }
    }
  }
  h1 {
    font-size: 0.3rem;
  }
  .temp {
    height: 4.4rem;
    background: #fff;
    margin-top: 10px;
    padding: 24px;
    .list {
      width: 4rem;
      margin-top: 0.4rem;
      display: flex;
      justify-content: space-between;
      li {
        font-size: 0.2rem;
        color: #666;
        p {
          font-size: 0.6rem;
        }
        span {
          font-size: 0.2rem;
        }
      }
    }
  }
  .water {
    height: 4.4rem;
    background: #fff;
    padding: 24px;
    border-top: 1px solid #666666;
    .list {
      margin-top: 0.4rem;
      li {
        font-size: 0.2rem;
        color: #666;

        p {
          font-size: 0.6rem;
          color: #4287ff;
        }
        span {
          font-size: 0.2rem;
        }
      }
    }
  }
  .box {
    height: 2.8rem;
    background: #fff;
    padding: 24px;
    margin-top: 10px;
    box-sizing: border-box;
    position: relative;
    p {
      font-size: 0.2rem;
      color: #666666;
    }
    .warn {
      position: absolute;
      top: 0.5rem;
      right: 2rem;
      text-align: center;
      p {
        color: #e7605c;
        margin-top: 0.1rem;
      }
    }
    .succ {
      p {
        color: #00bd9f;
      }
    }
  }
}
</style>
