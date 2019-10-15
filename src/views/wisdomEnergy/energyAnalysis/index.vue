<template>
  <div class="historicaldata clearfix">
     <el-select v-model="devValue" :placeholder="$t('common.pleaseSelect')" @change="changeVal" style="background-color: #fff;">
        <el-option
          v-for="item in devValOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
       <el-input v-model="input" :placeholder="$t('deviceManage.pleaseInput')" clearable v-show="!devClassifyShow" style="width: 217px;"></el-input>
      <el-select v-model="devClassifyVal" :placeholder="$t('common.pleaseSelect')" v-show="devClassifyShow" style="background-color: #fff;">
        <el-option
          v-for="item in devClassifOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    <el-button type="primary" @click="search">{{$t('common.query')}}</el-button>
    <el-table :data="tableData" style="width: 100%;margin-top: 20px;" border row-key="id">
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
    ></el-pagination>
     

    <!-- 弹框 -->
    <el-dialog :title="$t('historicaldata.historicalData1')" :visible.sync="historicalVisible" width="1100px" class="his_dialog">
      <!-- <el-select v-model="switchValue" :placeholder="$t('common.pleaseSelectSwitch')" style="background-color: #fff;" @change="changeOpint">
        <el-option
          v-for="item in switchValOptions"
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
        <!-- <div id="main" ref="chart" style="width: 100%;height: 400px;"></div> -->
        <div>
            <el-table :data="tableData1" style="width: 100%;margin-top: 20px;" border row-key="index">
                <el-table-column :label="$t('common.serialNum')" type="index" :index="indexMethod"  width="100"></el-table-column>
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
    </el-dialog>
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
            time: [new Date(2019,6, 1),new Date(2019,7, 30)],
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
            devValue: '',
            devValOptions: [
            //     {
            //         value: '0',
            //         label: this.$t('common.all')
            //     },
            //    {
            //         value: '1',
            //         label: this.$t('common.deviceName')
            //     },
            //     {
            //         value: '2',
            //         label: this.$t('common.commAddress')
            //     }
                {
                    value: 'disc',
                    label: this.$t('common.deviceName')
                },
                {
                    value: 'commAddress',
                    label: this.$t('common.commAddress')
                }
            ],
            devClassifyShow: false,
            devClassifyVal:'',
            devClassifOptions:[],
            input:'',
            switchValue:1010,
            switchValOptions: [
                {
                    value: '180101111001',
                    label: '开关01'
                },
                {
                    value: '180101111002',
                    label: '开关02'
                },
                {
                    value: '180101111003',
                    label: '开关03'
                },
                {
                    value: '180101111004',
                    label: '开关03'
                }
            ],
            pointName:'开关01',
            getElecDevListParam: {
                "searchValue": "",
                "pageNum": 1,
                "pageSize": 10,
                "searchType": 0,
                "token": ""
            },
            rtuId: 0,
            queryHistoryParams:{
                "endTime": "2019-08-30",
                "pageNum": 1,
                "pageSize": 10,
                // "pointId": 14552,
                "startTime": "2019-07-01"
            },
            lineDate:["2019-8-19 10:10", "2019-8-19 10:15", "2019-8-19 10:20", "2019-8-19 10:25", "2019-8-19 10:30", "2019-8-19 10:35", "2019-8-19 10:40", "2019-8-19 10:45", "2019-8-19 11:10", "2019-8-19 11:15"],
            currentCount:[0.014, 0.014, 0.013, 0.015, 0.014, 0.012, 0.013, 0.015, 0.014, 0.014],
            voltageCount:[0.3, 0.2, 0, 0.1, 0.2, 0.1, 0, 0, 0, 0.1],
            powerCount:[0.8, 0.4, 0.3, 0.5, 0.3, 0.4, 0.1, 0.2, 0.1, 0.2],
            histotal:0,
            queryParams: {
                'pageNum': 1,
                'pageSize': 10,
                'appType': 2
            },
            deviceDics:''

        };
    },
    mounted(){
    //   this.getElecDevList();
      this.getDevClassify();  
      this.getDeviceData();
         
    },
    methods: {
        // 表头样式
        getRowClass () {
            return 'background:#f2f2f2;';
        },
        // 查询
        search () {
            // this.getElecDevListParam.searchValue = this.input;
            // this.getElecDevListParam.searchType = Number(this.devValue);
            // this.getElecDevList();
             if (this.devValue == 'type') {
                this.queryParams = {};
                this.queryParams[this.devValue] = this.devValue;
                this.queryParams.pageNum = 1;
                this.queryParams.pageSize = 10;
                this.getDeviceData();
            } else {
                
                if(this.input){
                    this.queryParams = {};
                    this.queryParams[this.devValue] = this.input;
                    this.queryParams.pageNum = 1;
                    this.queryParams.pageSize = 10;
                    this.getDeviceData();
                } else{
                    this.queryParams = {};
                    this.queryParams.pageNum = 1;
                    this.queryParams.pageSize = 10;
                    this.queryParams.appType = 2;
                    this.getDeviceData();
                }
            }
        },
        // 查看历史电量
        check (index, row) {
            this.historicalVisible = true;
            console.log(row)
            this.rtuId = row.rtuId;
            this.deviceDics = row.disc;
            // this.getPointList();
            this.lineDate = [];
            this.currentCount = [];
            this.voltageCount = [];
            this.powerCount = [];
            this.tableData1 = [];
            // this.$nextTick(function() {
            //     this.drawLine('main')
            // })
        },
         getDeviceData () {
            this.$request('queryDeviceList', this.queryParams).then(res => {
                if (res.data.returnCode == 0) {
                    console.log('getDeviceData', res);
                     this.tableData = res.data.deviceInfos;
                     this.total = res.data.total;
                }
            });
        },
        handleSizeChange (val) { //yes
            console.log(`handleSizeChange每页 ${val} 条`);
            this.queryParams.pageSize = val;
            this.getDeviceData();

        },
        handleCurrentChange (val) { //yes
            console.log(`当前页: ${val}`);
            this.queryParams.pageNum = val;
             this.getDeviceData();
        },
        // 导出
        exportData () {},
        hisSizeChange (val) {
            console.log(`hisSizeChange每页 ${val} 条`);
            this.queryHistoryParams.pageSize = val;
            this.searchSwitch();
        },
        hisCurrentChange (val) {
            console.log(`hisCurrentChange: ${val}`);
            this.queryHistoryParams.pageNum = val;
            this.searchSwitch();
        },
        changeVal (event, item) {
            //  if (event == 'type') {
            //     this.devClassifyShow = true;
            // } else {
            //     this.devClassifyShow = false;
            // }       
        },
        changeOpint(event){
            // console.log("kaiguan",event)
            for(let i=0; i< this.switchValOptions.length; i++){
                if(event == this.switchValOptions[i].value){
                    this.pointName = this.switchValOptions[i].label;
                    
                }
            }
        },
        getDevClassify () {
            this.$request('queryDeviceTypeList').then(res => {
                if (res.data.returnCode == 0) {
                    for (let i = 0; i < res.data.typeInfos.length; i++) {
                        let obj = {
                            value: res.data.typeInfos[i].typeNo,
                            label: res.data.typeInfos[i].alias
                        };
                        this.devClassifOptions.push(obj);
                    }
                }
            });
        },
        indexMethod (index) {
            return index + 1;
        },
        // 查询开关历史数据
        searchSwitch(){
            this.queryHistoryParams.rtuId = 23; //有历史数据
            // this.queryHistoryParams.pointId = Number(this.switchValue);
            this.queryHistoryParams.startTime = format(this.time[0],'YYYY-MM-DD');
            this.queryHistoryParams.endTime = format(this.time[1],'YYYY-MM-DD');
            console.log("查询历史数据参数", this.queryHistoryParams)
            this.lineDate = [];
            this.currentCount = [];
            this.voltageCount = [];
            this.powerCount = [];
            this.sendPost();
        },
        sendPost(){
            this.$request('queryHistoricalData',this.queryHistoryParams).then( res => {
                console.log("查询历史数据res",res)
                this.tableData1 = res.data.energyHistDataInfos;
                 this.histotal = res.data.total;
            })

        },
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
