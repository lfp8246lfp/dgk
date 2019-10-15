<template>
  <div class="historicalData">
    <div class="statis_top">

      <!-- 一级设备 -->
       <el-select v-model="rtuId" :placeholder="$t('common.pleaseSelect1')" @change="changeVal">
        <el-option
          v-for="item in options"
          :key="item.rtuId"
          :label="item.disc"
          :value="item.rtuId"
        ></el-option>
      </el-select>

      <!-- 二级设备 -->
       <el-select v-model="getHistoryDataParams.pointId" :placeholder="$t('common.pleaseSelect2')" @change="changeVal1">
        <el-option
          v-for="item in options1"
          :key="item.pointId"
          :label="item.disc"
          :value="item.pointId"
        ></el-option>
      </el-select>

      <!-- 日期选择 -->
      <el-date-picker
        v-model="time"
        type="daterange"
        :range-separator="$t('common.to')"
        :start-placeholder="$t('common.startDate')"
        :end-placeholder="$t('common.endDate')"
      ></el-date-picker>

      <!-- 查询按钮 -->
      <el-button type="primary" @click="queryDate">{{$t('common.query')}}</el-button>
    </div>

    <!-- 折线图 -->
    <div class="envirChart">
      <h3>{{$t('realtimecontrol.currentTrendChart1')}}</h3>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('realtimecontrol.temperature')" name="first" lazy>
          <ve-line
            :data="currentData"
            :settings="currentChartSettings"
            style="width: 26rem"
            :extend="chartExtend"
          ></ve-line>
        </el-tab-pane>
        <el-tab-pane :label="$t('environmentData.humidity')" name="second" lazy>
          <ve-line
            :data="currentData1"
            :settings="currentChartSettings1"
            style="width: 26rem;"
            :extend="chartExtend"
          ></ve-line>
        </el-tab-pane>
        <!-- <el-tab-pane :label="$t('environmentMonitor.UV index')" name="third" lazy>
          <ve-line
            :data="currentData"
            :settings="currentChartSettings"
            style="width: 28rem;"
            :extend="chartExtend"
          ></ve-line>
        </el-tab-pane> -->
        <el-tab-pane :label="$t('environmentMonitor.PM25')" name="fourth" lazy>
          <ve-line
            :data="currentData2"
            :settings="currentChartSettings2"
            style="width: 26rem;"
            :extend="chartExtend"
          ></ve-line>
        </el-tab-pane>
        <el-tab-pane :label="$t('environmentMonitor.CO₂')" name="five" lazy>
          <ve-line
            :data="currentData3"
            :settings="currentChartSettings3"
            style="width: 26rem;"
            :extend="chartExtend"
          ></ve-line>
        </el-tab-pane>
        <el-tab-pane :label="$t('environmentMonitor.lightIntensity')" name="six" lazy>
          <ve-line
            :data="currentData4"
            :settings="currentChartSettings4"
            style="width: 26rem;"
            :extend="chartExtend"
          ></ve-line>
        </el-tab-pane>
        <el-tab-pane :label="$t('environmentData.pressure')" name="seven" lazy>
          <ve-line
            :data="currentData5"
            :settings="currentChartSettings5"
            style="width: 26rem;"
            :extend="chartExtend"
          ></ve-line>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 环境数据 -->
    <div class="envir_table">
      <p class="clearfix">
        <span class="pull-left title">{{$t('environmentData.envirlDataList')}}</span>

        <!-- 导出excel/pdf -->
        <el-dropdown class="pull-right icon">
          <span class="el-dropdown-link">
            <i class="fa fa-upload" aria-hidden="true"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{$t('common.exportExcel')}}</el-dropdown-item>
            <el-dropdown-item>{{$t('electricityLoop.exportPDF')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </p>

      <!-- 表格 -->
      <div class="table">
        <el-table
          :data="tableData"
          border
          :header-cell-style="{background:'#F2F2F2',color:'rgb(51,51,51)'}"
          style="width: 100%;font-size: 14px"
        >
          <el-table-column prop="" :label="$t('common.serialNum')" type="index" :index="indexMethod"  width="100"></el-table-column>
          <el-table-column prop="dataTime" :label="$t('common.time')" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="temValuea" :label="$t('environmentData.temperature')" ></el-table-column>
          <el-table-column prop="hrValue" :label="$t('environmentData.humiditys')"></el-table-column>
          <el-table-column prop="pmValue" :label="$t('environmentData.pm')"></el-table-column>
          <el-table-column prop="co2Value" :label="$t('environmentData.co2')"></el-table-column>
          <el-table-column prop="intValue" :label="$t('environmentData.linght')"></el-table-column>
          <el-table-column prop="pressureValue" :label="$t('environmentData.pressure')"></el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="pagination clearfix">
        <el-pagination
          class="pull-right"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout=" prev, pager, next, sizes"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format';
export default {
    name: '',

    data () {
        this.currentChartSettings = {

            dimension: ['日期'],
              //控制纵轴名称
            yAxisName: ['温度(℃)'],
              // 控制折现阴影
            area: true
        };
        this.currentChartSettings1 = {
            dimension: ['日期'],
            yAxisName: ['湿度(RH%)'],
            area: true
        };
        this.currentChartSettings2 = {
            dimension: ['日期'],
            yAxisName: ['pm2.5含量(μg/m³)'],
            area: true
        };
        this.currentChartSettings3 = {
            dimension: ['日期'],
            yAxisName: ['co2含量(ppm)'],
            area: true
        };
        this.currentChartSettings4 = {
            dimension: ['日期'],
            yAxisName: ['光照强度(wlux)'],
            area: true
        };
        this.currentChartSettings5 = {
            dimension: ['日期'],
            yAxisName: ['气压(Pa)'],
            area: true
        };
        return {
          options: [
                {
                    value: '',
                    label: ''
                }   
            ],
            options1: [
                {
                    value: '',
                    label: ''
                }   
            ],
            // value:'',
            // value1:'',

            // 时间选择器的值
            time: [new Date(+new Date() - 7*24*60*60*1000),new Date()],

            currentData: {
                columns: ['日期', '温度(℃)'],
                rows: [
                    {'日期': '', '温度(℃)': 0 },
                    
                ]
            },
            currentData1: {
                columns: ['日期', '湿度(RH%)'],
                rows: [
                    {'日期': '', '湿度(RH%)': 0 },
                ]
            },
            currentData2: {
                columns: ['日期', 'pm2.5含量(μg/m³)'],
                rows: [
                    {'日期': '', 'pm2.5含量(μg/m³)': 0 },
                ]
            },
            currentData3: {
                columns: ['日期', 'co2含量(ppm)'],
                rows: [
                    {'日期': '', 'co2含量(ppm)': 0 },
                ]
            },
            currentData4: {
                columns: ['日期', '光照强度(wlux)'],
                rows: [
                    {'日期': '', '光照强度(wlux)': 0 },
                ]
            },
            currentData5: {
                columns: ['日期', '气压(Pa)'],
                rows: [
                    {'日期': '', '气压(Pa)': 0 },
                ]
            },

            // tab切换
            activeName: 'first',


            chartExtend: {
                grid: {
                    bottom: 20,
                    left: 30
                },
                yAxis:{
                  // name: '电流(A)',
                },
                xAxis: {
                  boundaryGap: false
                },
                lineStyle: {
                    normal: {
                        width: 10, // 连线粗细
                        color: '#409EFF' // 连线颜色
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#409EFF' // 图标颜色
                    }
                }
            },

            // 表格数据
            tableData: [
                // {
                //     temValuea: "",
                //     dataTime: '',
                //     hrValue: '',
                //     pmValue: '',
                //     co2Value: '',
                //     intValue: '',
                //     pressureValue: '',
                // },     
            ],
            // currentPage: 1,
            // radioVal: '当月',

            // 获取一级设备的参数
            queryParams: {
                'pageNum': 1,
                'pageSize': 99999,
                'appType': 4
            },

            // 获取二级设备的参数
            rtuId:'',

            // 查询参数
            getHistoryDataParams: {
              "startTime": "",
              "endTime": "",
              "pageNum": 1,
              "pageSize": 10,
              "pointId": '',
            },
            // choosePointId:'',

            // 数据总条数
            total:0
        };
    },
    mounted(){
      //获取一级设备
       this.getDeviceData();
    },
    methods: {

      //获取一级设备
       getDeviceData(){
          this.$request('queryDeviceList', this.queryParams).then( res => {
            console.log("智慧环境下的设备",res);
            // this.options = [];
            // if(res.data.returnCode == 0){
            //     if(res.data.deviceInfos.length > 0){
            //       for(let i=0; i<res.data.deviceInfos.length; i++ ){
            //            let obj = {
            //               value: res.data.deviceInfos[i].rtuId,
            //               label: res.data.deviceInfos[i].disc,
            //             }
            //             this.options.push(obj);
            //       }
            //     }
            // }
            this.options = res.data.deviceInfos
          })
       },


       //获取二级设备
       getSubDeviceDate(){
          this.$request('queryPoint', {params: {rtuId: this.rtuId}}).then( res => {
              console.log('二级设备', res);
            //    this.options1 = [];
            //    if(res.data.returnCode == 0){
            //     if(res.data.pointInfos.length > 0){
            //       for(let i=0; i<res.data.pointInfos.length; i++ ){
            //            let obj = {
            //               value: res.data.pointInfos[i].pointId,
            //               label: res.data.pointInfos[i].disc,
            //             }
            //             this.options1.push(obj);
            //       }
            //     }
            // }
            this.options1 = res.data.pointInfos
          })
       },

        //选择一级设备(气象站)
        changeVal(event, item){
            // console.log(event)
            // this.rtuid = event;

            // 获取二级设备
            this.getSubDeviceDate();
        },

        //选择二级设备
        changeVal1(event, item){
            // console.log(event)
            // this.choosePointId = event;
        },


        // 查询按钮
        queryDate(){
          // this.getHistoryDataParams.pointId = 1012; //有数据
          // this.getHistoryDataParams.pointId =  this.choosePointId; 
          // this.getHistoryDataParams.pointId =  this.value1
          this.getHistoryDataParams.startTime = format(this.time[0],'YYYY-MM-DD')
          this.getHistoryDataParams.endTime = format(this.time[1],'YYYY-MM-DD')
          this.getHistoryData()
        },


        //查询数据
        getHistoryData(){
          // console.log("历史数据参数",this.getHistoryDataParams)

            this.$request('queryEnvironmentHistData',this.getHistoryDataParams).then( res => {
              console.log("历史数据结果", res);
              if(res.data.returnCode == 0){
                this.tableData = res.data.sensorDataInfos;
                this.total = res.data.total;
                this.getLineData();
              }

            })
        },

        // 获取折线图数据
        getLineData(){
          //  this.currentData.rows =[];
          //  this.currentData1.rows =[];
          //  this.currentData2.rows =[];
          //  this.currentData3.rows =[];
          //  this.currentData4.rows =[];
          //  this.currentData5.rows =[];


          this.currentData.rows = this.tableData.map(item => {
            return {
              '日期': format(item.dataTime, 'YYYY-MM-DD HH:mm'),
              '温度(℃)': item.temValuea
            }
          })

          this.currentData1.rows = this.tableData.map(item => {
            return {
              '日期': format(item.dataTime, 'YYYY-MM-DD HH:mm'),
              '湿度(RH%)': item.hrValue
            }
          })

          this.currentData2.rows = this.tableData.map(item => {
            return {
              '日期': format(item.dataTime, 'YYYY-MM-DD HH:mm'),
              'pm2.5含量(μg/m³)': item.pmValue
            }
          })

          this.currentData3.rows = this.tableData.map(item => {
            return {
              '日期': format(item.dataTime, 'YYYY-MM-DD HH:mm'),
              'co2含量(ppm)': item.co2Value
            }
          })

          this.currentData4.rows = this.tableData.map(item => {
            return {
              '日期': format(item.dataTime, 'YYYY-MM-DD HH:mm'),
              '光照强度(wlux)': item.intValue
            }
          })

          this.currentData5.rows = this.tableData.map(item => {
            return {
              '日期': format(item.dataTime, 'YYYY-MM-DD HH:mm'),
              '气压(Pa)': item.pressureValue
            }
          })



            // for(let i=0; i< this.tableData.length; i++){
            //   let obj = {
            //      '日期': format(this.tableData[i].dataTime,'YYYY-MM-DD HH:mm'),
            //      '温度(℃)': this.tableData[i].temValuea
            //   }
            //   this.currentData.rows.push(obj);

            //   let obj1 = {
            //      '日期': format(this.tableData[i].dataTime,'YYYY-MM-DD HH:mm'),
            //      '湿度(RH%)': this.tableData[i].hrValue
            //   }
            //   this.currentData1.rows.push(obj1);

            //   let obj2 = {
            //      '日期': format(this.tableData[i].dataTime,'YYYY-MM-DD HH:mm'),
            //      'pm2.5含量(μg/m³)': this.tableData[i].pmValue
            //   }
            //   this.currentData2.rows.push(obj2);

            //   let obj3 = {
            //      '日期': format(this.tableData[i].dataTime,'YYYY-MM-DD HH:mm'),
            //      'co2含量(ppm)': this.tableData[i].co2Value
            //   }
            //   this.currentData3.rows.push(obj3);

            //   let obj4 = {
            //      '日期': format(this.tableData[i].dataTime,'YYYY-MM-DD HH:mm'),
            //      '光照强度(wlux)': this.tableData[i].intValue
            //   }
            //   this.currentData4.rows.push(obj4);

            //   let obj5 = {
            //      '日期': format(this.tableData[i].dataTime,'YYYY-MM-DD HH:mm'),
            //      '气压(Pa)': this.tableData[i].pressureValue
            //   }
            //   this.currentData5.rows.push(obj5);
            // }
          },


            // 表格序号
        indexMethod (index) {
            return index + 1;
        },

        // 表格日期
        dateFormat(row, column, cellValue, index){
             const daterc = row[column.property]
             return format(daterc,'YYYY-MM-DD HH:mm');
        },

        // 折线图tab切换
        handleClick (tab, event) {
            // console.log(tab, event);
        },

        // 修改每页条数
        handleSizeChange (val) {
            // console.log(`每页 ${val} 条`);
            this.getHistoryDataParams.pageSize = val;
            this.getHistoryData();
        },

        // 修改当前页
        handleCurrentChange (val) {
            // console.log(`当前页: ${val}`);
            this.getHistoryDataParams.pageNum = val;
            this.getHistoryData();
        }
    },
}
</script>

<style lang='scss' scope>
.historicalData {
  .statis_top {
    padding: 10px;
    height: 80px;
    line-height: 80px;
    background-color: #fff;
  }
  .envirChart{
    margin: 10px 0 0 10px;
    padding: 15px;
    background: #fff;
    height: 8rem;
    h3 {
      font-size: 18px;
      color: #000;
      margin-bottom: 15px;
    }
  }
  .envir_table {
    padding: 10px;
    background-color: #fff;
    margin: 10px;
    p {
      .title {
        font-weight: 700;
        font-size: 18px;
      }
      .icon {
        display: inline-block;
        width: 25px;
        height: 25px;
        border-radius: 5px;
        line-height: 25px;
        background-color: rgb(236, 243, 252);
        text-align: center;
        .fa-upload {
          color: rgb(24, 144, 255);
          font-size: 7px;
        }
      }
    }
    .table {
      margin: 20px 0 30px 0;
    }
  }
}
</style>
