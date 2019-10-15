<template>
  <div id="wisdomEnvironment">
   <div class="wisdomEnvironment_top">
      <div class="location">
       <img src="../../../../static/images/location.png" alt="">
      {{$t('environmentMonitor.hangzhou')}}
      </div>
      <div class="weather">
        <ul class="weather_box">
          <li>
            <img class="weather_icon" src="../../../../static/images/weather-thunder-showe2.png" alt="">
            <!-- <i class="fa fa-sun-o weather_icon"></i> -->
          </li>
          <li class="weather_num">12°</li>
          <li>
            <p class="weather_name">{{$t('environmentMonitor.shower')}}</p>
            <p class="weather_random">12-18℃</p>
          </li>
        </ul>
      </div>
   </div>
  
  <el-row class="wisdomEnvironment_temp">
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-cloudy.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-sunny.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-rainstorm.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-heavy-snow.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-heavy-rain.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-sandstorm.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-fog.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-snow.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-overcast.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-rain.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-sleet.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-shower.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-cloudy.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-cloudy.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-cloudy.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-cloudy.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-cloudy.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-cloudy.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-cloudy.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-cloudy.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-cloudy.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-cloudy.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-cloudy.png" alt="">
      <p class="temp">14°</p>
    </el-col>
    <el-col :span="1" class="item">
      <p class="time">1am</p>
      <img class="icon" src="../../../../static/images/weather-cloudy.png" alt="">
      <p class="temp">14°</p>
    </el-col>
  </el-row> 
  
   <!-- <div class="wisdomEnvironment_params"> -->
  <el-row class="wisdomEnvironment_params">
    <el-col :span="8" class="params_temp_outbox">
       <div class="params_temp">
         <p class="params_temp_title">{{$t('environmentMonitor.temperature&humidityParameters')}}</p>
         <div class="params_current_temp">
           <div class="current_left">
             <p class="current_temp">{{$t('environmentMonitor.currentTemperature')}}</p>
             <p class="current_temp_number"><span class="special">35.1</span>℃</p>
           </div>
            <div class="current_right">
             <p class="current_temp">{{$t('environmentMonitor.currentHumidity')}}</p>
             <p class="current_temp_number"><span class="special">67.6</span>RH%</p>
           </div>
         </div>
         <div class="chart">
            <ve-line :data="chartData" :settings="chartSettings" :legend-visible="false" height="100%" :extend="chartExtend"></ve-line>
         </div>
        
       </div>
    </el-col>
     <el-col :span="16">
       <div class="params_other">
          <p>{{$t('environmentMonitor.otherParams')}}</p>
          <ul class="params_item">
            <li>
              <img class="icon" src="../../../../static/images/uv.png" alt="">
              <p class="name">{{$t('environmentMonitor.UV index')}}</p>
              <p class="num">3</p>
            </li>
           <li>
              <img class="icon" src="../../../../static/images/pm2.5.png" alt="">
              <p class="name">{{$t('environmentMonitor.PM25')}}</p>
              <p class="num">51μg/m3</p>
            </li>
            <li>
              <img class="icon" src="../../../../static/images/c02.png" alt="">
              <p class="name">{{$t('environmentMonitor.CO₂')}}</p>
              <p class="num">400 ppm</p>
            </li>
            <li>
              <img class="icon" src="../../../../static/images/light-intensity.png" alt="">
              <p class="name">{{$t('environmentMonitor.lightIntensity')}}</p>
              <p class="num">5 wlux</p>
            </li>
            <li>
              <img class="icon" src="../../../../static/images/wind-speed.png" alt="">
              <p class="name">{{$t('environmentMonitor.windSpeed')}}</p>
              <p class="num">5 m/s</p>
            </li>
          </ul>
       </div>
    </el-col>
   </el-row>
  <!-- </div> -->
 

  </div>
  
   
</template>

<script>
import { AP } from '../../../utils/mUtils.js';
export default {
    name: '',

    data () {
        this.chartSettings = {
            axisSite: { right: ['当前湿度'] },
            yAxisType: ['KMB', 'percent'],
            yAxisName: ['温度(℃)', '当前湿度']
        };
        this.chartExtend = {
            grid: {
                bottom: '10%',
                top: '24%'

            }
        };
        return {
            chartData: {
                columns: ['时间', '当前温度', '当前湿度'],
                rows: [
                    { '时间': '14:15', '当前温度': 10, '当前湿度': 0.22 },
                    { '时间': '14:30', '当前温度': 14, '当前湿度': 0.36 },
                    { '时间': '14:45', '当前温度': 15, '当前湿度': 0.34 },
                    { '时间': '15:00', '当前温度': 18, '当前湿度': 0.20 },
                    { '时间': '15:15', '当前温度': 12, '当前湿度': 0.44 },
                    { '时间': '15:30', '当前温度': 11, '当前湿度': 0.55 }
                ]

            },
            weatherInfo: {}
        };
    },
    created () {

    },
    mounted () {
        // this.getWeather();
    },
    methods: {
        getMap () {
            return new Promise(function (resolve, reject) {
                AP().then(AMap => {
                    var citysearch = new AMap.CitySearch();
                    citysearch.getLocalCity(function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            if (result && result.city && result.bounds) {
                                resolve(result.city);
                            }
                        } else {
                            console.log('定位失败');
                            console.log(result);
                            reject(result.info);
                        }
                    });
                });
            }).catch(function (reason) {
                console.log('catch:', reason);
            });
        },
        async getWeather () {
            let $self = this;
            let countyInfo = await $self.getMap();
            console.log(countyInfo);
            AMap.plugin('AMap.Weather', function () {
                var weather = new AMap.Weather();
                weather.getLive(countyInfo, function (err, data) {
                    if (!err) {
                        console.log('实时天气', data);
                        $self.weatherInfo = data;
                    }
                });

                weather.getForecast(countyInfo, function (err, data) {
                    console.log(err, data);
                });
            });
        }
    }
};
</script>

<style lang='scss' scope>
   #wisdomEnvironment {
      padding: 10px;
      height: 90vh;
      background-color: #f5f5f5;
     .wisdomEnvironment_top {
      //  height: 4.65rem;
       height: 40%;
       background-image: url("../../../../static/images/weather-bg.png");
       background-size: 100% 100%;
       text-align: center;
       padding-top: 0.54rem;
       box-sizing:border-box;
        .fa-map-marker {
        color: #fff;
      }
      .location {
        font-size: 0.38rem;
        color: #fff;
        height: 0.43rem;
        line-height: 0.43rem;
        img {
          display: inline-block;
          width: 0.347rem;
          vertical-align: middle;
           margin-right: 0.28rem;
        }
      
      }
      .weather {
        .weather_box {
          width: 33%;
          // background-color: #fff;
          height: 1.76rem;
          display: flex;
          margin: 0.727rem auto;
          li {
            flex: 1;
            // border: 1px solid #000;
            box-sizing: border-box;
          }
          .weather_icon {
            width: 100%;
            margin-top: -12%;
            // height: 100%;
            // display: inline-block;
          }
          .weather_num {
            font-size: 1.55rem;
            line-height:1.56rem;
            color: #fff;
            // font-weight: 400;
            font-family:Microsoft YaHei;
          }
          .weather_name {
            font-size: 0.43rem;
            color: #fff;
             margin-top: 0.1rem;
          }
           .weather_random {
            font-size: 0.33rem;
            color: #fff;
            margin-top: 0.34rem;
          }
        }
      }
     }
     .wisdomEnvironment_temp {
      //  height: 2.11rem;
       height: 20%;
       box-sizing: border-box;
       padding-top: 23.625px;
       padding: 23.625px 10px;
       background-color: #fff;
       border-bottom: 1px solid #F6F6F6;
       .time {
         font-size: 5.25px;
         color: rgb(153,153,153);
       }
       .icon {
         display: block;
         width: 23px;
         margin: 5px auto;
       }
       .temp {
         font-size: 5.25px;
         color: rgb(153,153,153);
       }
       .item {
         text-align: center;
         margin-top: 0.4rem;
       }
     }
     .wisdomEnvironment_params {
       height: 40%;
       background-color: #fff;
       .params_temp_outbox {
         height: 100%;
       }
         .params_temp {
            box-sizing: border-box;
            background-color: #fff;
            border-right: 1px solid #F6F6F6;
            height: 100%;
            padding: 15px;
            .params_temp_title {
             font-size: 14px;
             font-weight: bold;
           }
            .params_current_temp {
              .current_left {
                display: inline-block;
                margin-right: 1.5rem;
                .current_temp {
                  font-size: 7px;
                  color: rgb(102,102,102);
                  margin: 0.1rem 0;
                }
                .current_temp_number {
                  color: rgb(66,135,255);
                  font-size: 7px;
                   .special {
                  font-size: 25px;
                  font-weight: 700;
                  }
                }
               
              }
               .current_right {
                display: inline-block;
                 .current_temp {
                  font-size: 7px;
                  color: rgb(102,102,102);
                  margin: 0.1rem 0;
                }
                .current_temp_number {
                  color: rgb(27,211,185);
                  font-size: 7px;
                   .special {
                  font-size: 25px;
                  font-weight: 700;
                  }
                }
              }
            }
            .chart {
              height: 75%;

            }

         }
         .params_other {
            box-sizing: border-box;
            height:100%;
            background-color: #fff;
            padding: 15px 27px;
          p {
             font-size: 14px;
             font-weight: bold;
          }
          .params_item {
            display: flex;
            margin-top: 0.8rem;
            li {
              flex: 1;
              text-align: center;
              .icon {
                width: 1.253rem;
              }
              .name {
                font-size: 0.116rem;
                color: rgb(153,153,153);
                margin: 10px 0;
              }
              .num {
                font-size: 0.353rem;
              }
            }
          }

         }
     
     }
     
   }
</style>
