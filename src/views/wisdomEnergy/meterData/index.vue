<template>
  <div class="historicaldata clearfix">
      <el-select v-model="meterDataValue" :placeholder="$t('common.pleaseSelectMeterData')" style="background-color: #fff;" @change="changeMeter">
        <el-option
          v-for="item in meterDataValOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      
       <el-select v-model="switchValue" :placeholder="$t('common.pleaseSelectWifiSwitch')" style="background-color: #fff;" @change="changeSwitch">
        <el-option
          v-for="item in switchValOptions"
          :key="item[switchKey]"
          :label="item.disc"
          :value="item[switchKey]"
        ></el-option>
      </el-select>
     <el-select v-model="devValue" :placeholder="$t('common.pleaseSelect')" @change="changeVal" style="background-color: #fff;">
        <el-option
          v-for="item in devValOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- <el-select v-model="devClassifyVal" :placeholder="$t('common.pleaseSelect')"  style="background-color: #fff;">
        <el-option
          v-for="item in devClassifOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select> -->
       
       <el-date-picker
        v-model="time"
        type="daterange"
        :range-separator="$t('common.to')"
        :start-placeholder="$t('common.startDate')"
        :end-placeholder="$t('common.endDate')"
      ></el-date-picker>
    <el-button type="primary" @click="searchSwitch">{{$t('common.query')}}</el-button>
        <div>
            <el-table :data="tableData1" style="width: 100%;margin-top: 20px;" border row-key="index">
                <el-table-column :label="$t('common.serialNum')" type="index" :index="indexMethod"  width="100"></el-table-column>
                <el-table-column prop="commaddress" :label="$t('historicaldata.devOrder')" ></el-table-column>
                <el-table-column prop="disc" :label="$t('historicaldata.deviceName')" width="180">
                     <!-- lfp <template slot-scope="scope">{{deviceDics}}</template> -->
                </el-table-column>
                <el-table-column prop="datatime" :label="$t('historicaldata.dataTime')" width="180" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="ia" :label="$t('historicaldata.current')"></el-table-column>
                <el-table-column prop="ua" :label="$t('historicaldata.voltage')"></el-table-column>
                <el-table-column prop="pa" :label="$t('historicaldata.power')"></el-table-column>
                <el-table-column prop="zybm" :label="$t('historicaldata.zybm')"></el-table-column>
                <el-table-column prop="balancevlaue" :label="$t('historicaldata.balanceVlaue')"></el-table-column>
            </el-table>
            <el-pagination
            style="float:right;margin-top:30px;margin-bottom:10px"
            @size-change="hisSizeChange"
            @current-change="hisCurrentChange"
            background
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="prev, pager, next,sizes"
            :total="histotal"
            ></el-pagination>
      </div>
    <!-- <el-table :data="tableData" style="width: 100%;margin-top: 20px;" border row-key="id">
      <el-table-column :label="$t('common.serialNum')" type="index" :index="indexMethod"  width="120"></el-table-column>
      <el-table-column prop="commAddress" :label="$t('historicaldata.devOrder')" ></el-table-column>
      <el-table-column prop="disc" :label="$t('historicaldata.gatewayName')" ></el-table-column>
      <el-table-column prop="dimension" :label="$t('areaManage.dimension')" ></el-table-column>
      <el-table-column prop="longitude" :label="$t('areaManage.longitude')" ></el-table-column>
      <el-table-column prop="" :label="$t('common.operate')">
        <template slot-scope="scope">
          <el-button type="text" @click="check(scope.$index, scope.row)">{{$t('historicaldata.historyPoints')}}</el-button>        
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="float:right;margin-top:30px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="prev, pager, next,sizes"
      :total="total"
    ></el-pagination> -->
     

    <!-- 弹框 -->
    <!-- <el-dialog :title="$t('historicaldata.historicalData1')" :visible.sync="historicalVisible" width="1100px" class="his_dialog">
      <el-select v-model="switchValue" :placeholder="$t('common.pleaseSelectSwitch')" style="background-color: #fff;" @change="changeOpint">
        <el-option
          v-for="item in switchValOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker
        v-model="time"
        type="daterange"
        :range-separator="$t('common.to')"
        :start-placeholder="$t('common.startDate')"
        :end-placeholder="$t('common.endDate')"
      ></el-date-picker>
      <el-button type="primary" @click="searchSwitch">{{$t('common.query')}}</el-button>
        <div>
            <el-table :data="tableData1" style="width: 100%;margin-top: 20px;" border row-key="index">
                <el-table-column :label="$t('common.serialNum')" type="index" :index="indexMethod"  width="100"></el-table-column>
                <el-table-column prop="commAddress" :label="$t('historicaldata.devOrder')" ></el-table-column>
                <el-table-column prop="" :label="$t('historicaldata.deviceName')" width="180">
                     <template slot-scope="scope">{{deviceDics}}</template>
                </el-table-column>
                <el-table-column prop="dataTime" :label="$t('historicaldata.dataTime')" width="180" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="ia" :label="$t('historicaldata.current')"></el-table-column>
                <el-table-column prop="ua" :label="$t('historicaldata.voltage')"></el-table-column>
                <el-table-column prop="pa" :label="$t('historicaldata.power')"></el-table-column>
                <el-table-column prop="zybm" :label="$t('historicaldata.zybm')"></el-table-column>
                <el-table-column prop="balanceVlaue" :label="$t('historicaldata.balanceVlaue')"></el-table-column>
            </el-table>
            <el-pagination
            style="float:right;margin-top:30px;margin-bottom:10px"
            @size-change="hisSizeChange"
            @current-change="hisCurrentChange"
            background
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="prev, pager, next,sizes"
            :total="histotal"
            ></el-pagination>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import echarts from 'echarts';
import format from 'date-fns/format'
export default {
    name: '',

    data () {
        return {
            charts: '',
            tableData: [],
            tableData1: [],
            historicalVisible: false,
            total: 10,
            value: '1',
            options: [
                {
                    value: '1',
                    label: this.$t('historicaldata.lineChart')
                },
                {
                    value: '2',
                    label: this.$t('historicaldata.table')
                }
            ],
            chartData: {
                columns: ['日期', '温度'],
                rows: [
                    { 日期: '1/1', 温度: 22 },
                    { 日期: '1/2', 温度: 23 },
                    { 日期: '1/3', 温度: 13 },
                    { 日期: '1/4', 温度: 37 },
                    { 日期: '1/5', 温度: 35 },
                    { 日期: '1/6', 温度: 40 }
                ]
            },
            chartSettings: {
                area: true,
                yAxisName: ['(kWh)']
            },
            colors: ['#2d86e1'],
            chartExtend: {
                xAxis: {
                    boundaryGap: false
                },
                grid: {
                    bottom: 0
                }
            },
            devClassifyShow: false,
            devClassifyVal:'',
            devClassifOptions:[],
            input:'',
            pointName:'开关01',
            getElecDevListParam: {
                "searchValue": "",
                "pageNum": 1,
                "pageSize": 10,
                "searchType": 0,
                "token": ""
            },
            rtuId: 0,
            lineDate:["2019-8-19 10:10", "2019-8-19 10:15", "2019-8-19 10:20", "2019-8-19 10:25", "2019-8-19 10:30", "2019-8-19 10:35", "2019-8-19 10:40", "2019-8-19 10:45", "2019-8-19 11:10", "2019-8-19 11:15"],
            currentCount:[0.014, 0.014, 0.013, 0.015, 0.014, 0.012, 0.013, 0.015, 0.014, 0.014],
            voltageCount:[0.3, 0.2, 0, 0.1, 0.2, 0.1, 0, 0, 0, 0.1],
            powerCount:[0.8, 0.4, 0.3, 0.5, 0.3, 0.4, 0.1, 0.2, 0.1, 0.2],
            deviceDics:'',


            // 电表的value
            meterDataValue:'',

            // 电表数据
            meterDataValOptions: [
                {label: 'wifi电表', value: 2},
                {label: '普通电表', value: 1}
            ],

            // 开关的值
            switchValue:'',

            // 开关的数据
            switchValOptions: [
                // lfp {
                //     value: '180101111001',
                //     label: '开关01'
                // },
                // {
                //     value: '180101111002',
                //     label: '开关02'
                // },
                // {
                //     value: '180101111003',
                //     label: '开关03'
                // },
                // {
                //     value: '180101111004',
                //     label: '开关03'
                // }
            ],

            // 第三个选择器的值
            devValue: '',

            // 第三个选择器的数据
            devValOptions: [
                {
                    // lfp value: 'minute',
                    value: 0,
                    label: '分'
                },
                {
                    // lfp value: 'hour',
                    value: 1,
                    label: '时'
                },
                {
                    // lfp value: 'day',
                    value: 2,
                    label: '日'
                },
                {
                    // lfp value: 'month',
                    value: 3,
                    label: '月'
                }
            ],

            // 日历的值
            time: [new Date(2019,8, 1),new Date()],

            // lfp queryParams: {
            //     'pageNum': 1,
            //     'pageSize': 10,
            //     'appType': 2
            // },

            // 普通电表参数
            queryParams: {
                apptype: 5
            },

            // wifi电表参数
            switchParams: {
                type:14
            },

            // 查询的参数
            queryHistoryParams:{
                "endTime": "2019-08-30",
                "pageNum": 1,
                "pageSize": 10,
                // "pointId": 14552,
                "startTime": "2019-07-01"
            },

            // 数据总条数
            histotal:0,

            switchKey:''
        };
    },
    mounted(){
    //   this.getElecDevList()
    // lfp  this.getDevClassify()
    // lfp  this.getDeviceData()
    },
    methods: {
        // 表头样式
        // getRowClass () {
        //     return 'background:#f2f2f2;';
        // },


        // 查询
        // search () {
        //     // this.getElecDevListParam.searchValue = this.input;
        //     // this.getElecDevListParam.searchType = Number(this.devValue);
        //     // this.getElecDevList();
        //      if (this.devValue == 'type') {
        //         this.queryParams = {};
        //         this.queryParams[this.devValue] = this.devValue;
        //         this.queryParams.pageNum = 1;
        //         this.queryParams.pageSize = 10;
        //         this.getDeviceData();
        //     } else {
        //         if(this.input){
        //             this.queryParams = {};
        //             this.queryParams[this.devValue] = this.input;
        //             this.queryParams.pageNum = 1;
        //             this.queryParams.pageSize = 10;
        //             this.getDeviceData();
        //         } else{
        //             this.queryParams = {};
        //             this.queryParams.pageNum = 1;
        //             this.queryParams.pageSize = 10;
        //             this.queryParams.appType = 2;
        //             this.getDeviceData();
        //         }
        //     }
        // },


        // 查看历史电量
        // lfp check (index, row) {
        //     this.historicalVisible = true;
        //     console.log(row)
        //     this.rtuId = row.rtuId;
        //     this.deviceDics = row.disc;
        //     // this.getPointList();
        //     this.lineDate = [];
        //     this.currentCount = [];
        //     this.voltageCount = [];
        //     this.powerCount = [];
        //     this.tableData1 = [];
        //     // this.$nextTick(function() {
        //     //     this.drawLine('main')
        //     // })
        // },
        
        //  getDeviceData () {
            // this.$request('queryDeviceList', this.queryParams).then(res => {
            //     if (res.data.returnCode == 0) {
            //         console.log('getDeviceData', res);
            //          this.tableData = res.data.deviceInfos;
            //          this.total = res.data.total;
            //     }
            // });
        // },

        // 选择电表
        changeMeter() {
            if (this.meterDataValue == 2) {
                this.getWifiData()
            } else {
                this.getMeterData()
            }
        },

        // 选择普通电表
        getMeterData() {
            this.$request('queryMeterList', {params: this.queryParams}).then(res => {
                if (res.data.returnCode === 0) {
                    console.log('普通电表', res)
                    this.switchKey = 'pointid'
                    this.switchValOptions = res.data.pointInfos
                    this.switchValue = ''
                }
            })
        },

        // 选择wifi电表
        getWifiData () {
            this.$request('queryWIfiList', {params: this.switchParams}).then(res => {
                if (res.data.returnCode === 0) {
                    console.log('wifi电表', res)

                        //返回的rtuId，I要大写
                    this.switchKey = 'rtuId'
                    this.switchValOptions = res.data.pointInfos
                    this.switchValue = ''
                }
            })
        },

        // 选择开关
        changeSwitch() {
            if (this.meterDataValue == 2) {
                this.queryHistoryParams.rtuid = this.switchValue
            } else {
                this.queryHistoryParams.pointid = this.switchValue
            }  
        },

        // 查询按钮
        searchSwitch(){
            // lfp this.queryHistoryParams.rtuId =  this.rtuId; //有历史数据
            // this.queryHistoryParams.pointId = Number(this.switchValue);
            this.queryHistoryParams.startTime = format(this.time[0],'YYYY-MM-DD');
            this.queryHistoryParams.endTime = format(this.time[1],'YYYY-MM-DD');

                //apptype 14?
            this.queryHistoryParams.apptype = this.queryParams.apptype
                //datatype根据 年月日时
            this.queryHistoryParams.datatype = this.devValue
                // kid根据 电表的value
            this.queryHistoryParams.kid = this.meterDataValue
            this.queryHistoryParams.type = this.switchParams.type
            // lfp console.log("查询历史数据参数", this.queryHistoryParams)
            // lfp this.lineDate = [];
            // lfp this.currentCount = [];
            // lfp this.voltageCount = [];
            // lfp this.powerCount = [];
            this.sendPost()
        },


        // 查询数据
        sendPost(){
            this.$request('queryMeterData',this.queryHistoryParams).then( res => {
                console.log("查询电表数据",res)
                this.tableData1 = res.data.meterDataInfos;
                this.histotal = res.data.total;
            })
        },

        
        // handleSizeChange (val) { //yes
        //     console.log(`handleSizeChange每页 ${val} 条`);
        //     this.queryParams.pageSize = val;
        //     // lfp this.getDeviceData();
        //     this.sendPost()
        // },

        
        // handleCurrentChange (val) { //yes
        //     console.log(`当前页: ${val}`);
        //     this.queryParams.pageNum = val;
        //     //  this.getDeviceData();
        //     this.sendPost()
        // },

        // 导出
        // lfp exportData () {},


        changeVal (event, item) {
            //  if (event == 'type') {
            //     this.devClassifyShow = true;
            // } else {
            //     this.devClassifyShow = false;
            // }       
        },


        // changeOpint(event){
            // console.log("kaiguan",event)

            // lfp 这个函数不知道有什么用，先注释
            // for(let i=0; i< this.switchValOptions.length; i++){
            //     if(event == this.switchValOptions[i].value){
            //         this.pointName = this.switchValOptions[i].label;
                    
            //     }
            // }
        // },


        // lfp 不知道什么用的
        // getDevClassify () {
        //     this.$request('queryDeviceTypeList').then(res => {
        //         if (res.data.returnCode == 0) {
        //             for (let i = 0; i < res.data.typeInfos.length; i++) {
        //                 let obj = {
        //                     value: res.data.typeInfos[i].typeNo,
        //                     label: res.data.typeInfos[i].alias
        //                 };
        //                 this.devClassifOptions.push(obj);
        //             }
        //         }
        //     });
        // },

        //改变每页条数
        hisSizeChange (val) {
            console.log(`hisSizeChange每页 ${val} 条`);
            this.queryHistoryParams.pageSize = val;
            this.sendPost();
        },

        // 改变当前页
        hisCurrentChange (val) {
            console.log(`hisCurrentChange: ${val}`);
            this.queryHistoryParams.pageNum = val;
            this.sendPost();
        },

        // 表格序号
        indexMethod (index) {
            return index + 1;
        },

        // 表格日期格式化
        dateFormat(row, column, cellValue, index){
             const daterc = row[column.property]
             return format(daterc,'YYYY-MM-DD HH:mm');
        },

        //折线图
        drawLine(id){
             let    that = this,
                    lineDate = this.lineDate,
                    currentCount = this.currentCount,
                    voltageCount = this.voltageCount,
                    powerCount = this.powerCount;
           this.charts = echarts.init(document.getElementById(id));
           this.charts.clear(); 
           this.charts.setOption({
              title : {
                text : '设备数据',
                padding: 20,        
            },   
            tooltip: {
              trigger: "axis",
              axisPointer: {
                  type: 'cross'
              }
            },
            legend : {
                data : ["电流(A)", "电压(V)", "功率(kW)"],
                padding: 20,
            },
            grid: {
                // y2: 80,
                right: '20%',
                left:'30'
            },
            xAxis : [
                {
                 type: "category",
                 boundaryGap: false,
                 data: lineDate,
                 axisLabel: {
                        interval: 0, //0：全部显示，1：间隔为1显示对应类目，2：依次类推，（
                        rotate: -20 //倾斜显示，-：顺时针旋转，+或不写：逆时针旋转
                    }
                 }
            ],
            yAxis : [
                {
                    type: "value",
                    name: "电流(A)",
                    offset: 0,
                    position: "right",
                    axisLine: {
                        lineStyle: {
                        color: ['#FF3B3B']
                        }
                    },
                    axisLabel: {
                            formatter: "{value}"
                        }
                },
                {
                    type: "value",
                    name: "电压(V)",
                    offset: 60,
                    position: "right",
                    axisLine: {
                        lineStyle: {
                        color: ['#C885FF']
                        }
                    },
                    axisLabel: {
                        formatter: "{value}"
                    }
                },
                {
                    type: "value",
                    name: "功率(kW)",
                    offset: 120,
                    position: "right",
                    axisLine: {
                        lineStyle: {
                        color: ['#00FF00']
                        }
                    },
                    axisLabel: {
                        formatter: "{value}"
                    }
                },
            ],
             dataZoom: [
              {
                type: "slider",
                realtime: true, //拖动滚动条时是否动态的更新图表数据
                height: 25, //滚动条高度
                start: 10, //滚动条开始位置（共100等份）
                end: 65//结束位置（共100等份）
              }
            ],
            series : [
                {
                    name: "电流(A)",
                    type: "line",
                    // showAllSymbol: true,
                    color:['#FF3B3B'],
                    // symbol:'none',
                    // itemStyle:{normal:{label:{show: true}}},
                    smooth: 0.3,
                    data: currentCount
                },
                {
                    name: "电压(V)",
                    type: "line",
                    color:['#C885FF'],
                    smooth: 0.3,   
                    data: voltageCount,
                    yAxisIndex: 1,
                },
                {
                    name: "功率(kW)",
                    type: "line",
                    color:['#00FF00'],
                    smooth: 0.3,
                    data: powerCount,
                    yAxisIndex: 2,
                }
              ]
           })
         },
        }
        };
        </script>

        <style lang='scss' scope>
        .historicaldata {
          padding: 10px;
        }
        .his_dialog {
          .el-dialog:after {
            display: block;
            content: "";
            clear: both;
          }
          .el-dialog__header {
            border-bottom: 1px solid rgb(243, 243, 243);
            padding: 10px;
            padding-left: 20px;
          }
          .el-dialog__headerbtn {
            top: 12px;
            right: 10px;
          }
}
</style>
