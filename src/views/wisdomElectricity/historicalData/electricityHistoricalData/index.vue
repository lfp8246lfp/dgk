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
      <el-table-column prop="temperature" :label="$t('historicaldata.currentTemperature')" ></el-table-column>
      <el-table-column prop="residualCurrent" :label="$t('historicaldata.residualCurrent')" ></el-table-column>
       <el-table-column prop="curStatus" :label="$t('historicaldata.devStatus')" >
           <template slot-scope="scope">
               <span style="color: green" v-if="scope.row.curStatus=== 1">{{scope.row.curStatus|deviceStaus}}</span> 
               <span style="color: grey" v-else>{{scope.row.curStatus|deviceStaus}}</span> 
          </template>
       </el-table-column>
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
     

    <!-- 对话框 -->
    <el-dialog :title="$t('historicaldata.historicalElectricityData')" :visible.sync="historicalVisible" width="1100px" class="his_dialog">
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
       <!-- <el-select v-model="value" :placeholder="$t('common.pleaseSelect')" @change="changeChart">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select> -->

      <!-- 对话框查询按钮 -->
      <el-button type="primary" @click="searchSwitch">{{$t('common.query')}}</el-button>

        <!-- 折线图 -->
        <div id="main" ref="chart" style="width: 100%;height: 400px;"></div>

        <!-- 对话框表格 -->
        <div>
            <el-table :data="tableData1" style="width: 100%;margin-top: 20px;" border row-key="index">
                <el-table-column :label="$t('common.serialNum')" type="index" :index="indexMethod"  width="100"></el-table-column>
                <el-table-column prop="" :label="$t('historicaldata.piontNum')">
                     <template slot-scope="scope">{{switchValue}}</template>
                </el-table-column>
                <el-table-column prop="" :label="$t('historicaldata.piontName')">
                      <template slot-scope="scope">{{pointName}}</template>
                </el-table-column>
                <el-table-column prop="dataTime" :label="$t('historicaldata.dataTime')" width="180" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="ia" :label="$t('historicaldata.current')"></el-table-column>
                <el-table-column prop="ua" :label="$t('historicaldata.voltage')"></el-table-column>
                <el-table-column prop="pa" :label="$t('historicaldata.power')"></el-table-column>
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

            time: [new Date(+new Date() - 7 * 24 * 60 * 60 * 1000), new Date()],

            tableData: [
                {
                    num: 18010001,
                    name: '网关01',
                    status: '离线',
                },
                {
                    num: 18010002,
                    name: '网关02',
                    status: '离线',
                },
                {
                    num: 18010003,
                    name: '网关03',
                    status: '离线',
                },
                {
                    num: 18010004,
                    name: '网关04',
                    status: '离线',
                }
            ],
            tableData1: [
                //  {
                //     num: 180101111001,
                //     name: '开关01',
                //     dataTime: '2019-08-19 17:15:00',
                //     current: 0.014,
                //     voltage: 0,
                //     power: 0
                // }      
            ],
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
                {  
                    value: 'disc',
                    label: this.$t('common.deviceName')
                },
                {  
                    value: 'commAddress',
                    label: this.$t('common.commAddress')
                },
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
            ],
            devClassifyShow: false,
            devClassifyVal:'',
            devClassifOptions:[],
            input:'',
            switchValue:'',
            switchValOptions: [
                // {
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
                "endTime": "2019-06-30",
                "pageNum": 1,
                "pageSize": 10,
                "pointId": 14552,
                "startTime": "2019-05-01"
            },
            lineDate:["2019-8-19 10:10", "2019-8-19 10:15", "2019-8-19 10:20", "2019-8-19 10:25", "2019-8-19 10:30", "2019-8-19 10:35", "2019-8-19 10:40", "2019-8-19 10:45", "2019-8-19 11:10", "2019-8-19 11:15"],
            currentCount:[0.014, 0.014, 0.013, 0.015, 0.014, 0.012, 0.013, 0.015, 0.014, 0.014],
            voltageCount:[0.3, 0.2, 0, 0.1, 0.2, 0.1, 0, 0, 0, 0.1],
            powerCount:[0.8, 0.4, 0.3, 0.5, 0.3, 0.4, 0.1, 0.2, 0.1, 0.2],
            histotal:0,
            queryParams: {
                'pageNum': 1,
                'pageSize': 20,
                'appType': 1
            },
            
        };
    },
    mounted(){
      this.getElecDevList();
      this.getDevClassify();  
         
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
            if (this.value == 'type') {
                this.queryParams = {};
                this.queryParams[this.value] = this.devClassifyVal;
                this.queryParams.pageNum = 1;
                this.queryParams.pageSize = 10;
                this.getElecDevList();
            } else {
                
                if(this.input){
                    this.queryParams = {};
                    this.queryParams[this.devValue] = this.input;
                    this.queryParams.pageNum = 1;
                    this.queryParams.pageSize = 10;
                    this.getElecDevList();
                } else{
                    this.queryParams = {};
                    this.queryParams.pageNum = 1;
                    this.queryParams.pageSize = 10;
                    this.queryParams.appType = 1;
                    this.getElecDevList();
                }
            }
        },
        // 查看历史电量
        check (index, row) {
            this.historicalVisible = true;
            // console.log(row.rtuId)
            this.rtuId = row.rtuId;
            this.getPointList(row);
            this.lineDate = [];
            this.currentCount = [];
            this.voltageCount = [];
            this.powerCount = [];
            this.tableData1 = [];
            this.$nextTick(function() {
                this.drawLine('main')
            })
        },
        //查询智慧用电设备列表
        getElecDevList(){
             console.log("历史数据查询设备列表参数",this.queryParams)
            // this.$request('queryElectricityDeivceList',this.getElecDevListParam).then(res => {
            //     console.log("queryElectricityDeivceList",res);
            //     if(res.data.returnCode == 0){
            //         this.tableData = res.data.electricityDeivceInfos;
            //         this.total = res.data.total;
            //     }
            // })

             this.$request('queryDeviceList', this.queryParams).then(res => {
                if (res.data.returnCode == 0) {
                    console.log('getDeviceData', res);
                   this.tableData = res.data.deviceInfos;
                    this.total = res.data.total;
                }
            });
        },
        //查询网关下的开关
        getPointList(row){
            //  this.switchValOptions =[];
             this.$request('queryPointList',{params:{rtuId: this.rtuId}}).then( res => {
                console.log("queryPointList",res);
                if(res.data.returnCode == 0){
                    // for(let i=0; i<res.data.pointInfos.length; i++){
                    //     let obj={
                    //         value: res.data.pointInfos[i].pointId,
                    //         label: res.data.pointInfos[i].disc
                    //     }
                    //     this.switchValOptions.push(obj);
                    // }
                    this.switchValOptions = res.data.pointInfos.map(item => {
                        return {value: item.pointId, label: item.disc}
                    })
                }
            })
        },
        handleSizeChange (val) {
            console.log(`handleSizeChange每页 ${val} 条`);
            this.getElecDevListParam.pageSize = val;
            this.getElecDevList();

        },
        handleCurrentChange (val) {
            console.log(`当前页: ${val}`);
            this.getElecDevListParam.pageNum = val;
             this.getElecDevList();
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
        changeOpint(e){
            // console.log("kaiguan",event)
            // for(let i=0; i< this.switchValOptions.length; i++){
            //     if(e == this.switchValOptions[i].value){
            //         this.pointName = this.switchValOptions[i].label;
            //     }
            // }

            this.pointName = this.switchValOptions.find(item => item.value === e).label
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

        //历史数据查询按钮
        searchSwitch(){
            // this.queryHistoryParams.pointId = 14552; //有历史数据
            this.queryHistoryParams.pointId = Number(this.switchValue);
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
            this.$request('queryPointData',this.queryHistoryParams).then( res => {
                console.log("查询历史数据res",res)
                if(res.data.returnCode == 0){
                    if( res.data.loops.length > 0){
                     this.histotal = res.data.total;
                     this.tableData1 = res.data.loops;
                      for(let i=0; i< res.data.loops.length; i++){
                        let time = format(res.data.loops[i].dataTime,'YYYY-MM-DD HH:mm');
                        this.lineDate.push(time);
                        let current = res.data.loops[i].ia;
                        this.currentCount.push(current);
                        let voltage = res.data.loops[i].ua;
                        this.voltageCount.push(voltage);
                        let power = res.data.loops[i].pa;
                        this.powerCount.push(power);
                        this.$nextTick(function() {
                            this.drawLine('main')
                            });
                        }
                    } else {
                        this.tableData1 = [];
                        this.$nextTick(function() {
                            this.drawLine('main')
                            });
                    }
                   
              }
            })

        },
        dateFormat(row, column, cellValue, index){
             const daterc = row[column.property]
             return format(daterc,'YYYY-MM-DD HH:mm');
        },
        //切换图表
        changeChart(event, item){
            // if (event == '1') {
            //   this.$nextTick(function() {
            //     this.drawLine('main')
            //     });
            // } 
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
