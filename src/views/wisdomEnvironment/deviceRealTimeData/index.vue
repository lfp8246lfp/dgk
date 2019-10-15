  <template>
  <div id="realtimecontrol">
    <div class="device_top" v-show="!switchVisible">

      <!-- 下拉框 -->
      <el-select v-model="value" :placeholder="$t('common.pleaseSelect')" @change="changeVal">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <!-- 输入框 -->
      <el-input v-model="input" :placeholder="$t('realtimecontrol.pleaseInput')" clearable v-show="!devClassifyShow"></el-input>



      <!-- 隐藏下拉框，隐藏按钮 -->
       <el-select v-model="devClassifyVal" :placeholder="$t('common.pleaseSelect')" v-show="devClassifyShow">
        <el-option
          v-for="item in devClassifOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" @click.native="queryByFactor">{{$t('common.query')}}</el-button>
    </div>


    <!-- 开关top 返回上层按钮-->
    <div class="device_top" v-show="switchVisible">
      <span style="margin-right: 20px; font-size: 18px;">{{chooseGatewayItem}}下的设备档案</span>
      <el-button type="primary" @click.native="backGateway">返回上层</el-button>
    </div>



    <!-- 网关body -->
    <div class="device_body" v-show="!switchVisible">
      <el-col :span="24">
        <ul class="device_body_lists">
          <el-row :gutter="13">
           <el-col :xs="12" :sm="6" class="el-col-lg-4-8" v-for="(item,index) in deviceData" :key="index">
              <li class="item" >
                <img :src="item.deviceType|getDevTypeIcon" alt class="item_img" />
                <p>
                  {{$t('common.deviceName')}}：
                  <span>{{item.disc}}</span>
                </p>
                <!-- <p>
                  {{$t('realtimecontrol.devStatus')}}：
                  <span class="status_red">异常</span>
                </p> -->
                <p>
                  {{ $t('deviceManage.devStatus')}}：
                  <span :class="{ green : item.curStatus == 1, grey : item.curStatus !== 1} ">{{item.curStatus|deviceStaus}}</span>
                </p>
                <p>
                   {{$t('realtimecontrol.devClassify')}}：
                  <span>{{item.typeName}}</span>
                </p>
                <p class="item_address">
                  {{$t('realtimecontrol.commAddress')}}：
                  <span>{{item.commAddress}}</span>
                </p>
                <i class="operator">
                    <el-tooltip effect="dark" content="联动" placement="top-start">
                      <span class="detail" @click="linkPoint(item)">
                         <img src="../../../../static/images/link.png" alt />
                      </span>
                   </el-tooltip>
                </i>
              </li>
           </el-col>   
          </el-row>
        </ul>
      </el-col>
    </div>


   <!-- 开关body -->
    <div class="device_body" v-show="switchVisible">
      <el-col :span="24">
        <ul class="device_body_lists" >
          <el-row :gutter="13" v-infinite-scroll="load">
             <el-col :xs="12" :sm="6" class="el-col-lg-4-8" v-for="(item,index) in piontData" :key="index">
                <li class="item">
                <img :src="item.appType|getDevTypeIcon" alt class="item_img" />
                <p>
                  {{ $t('deviceManage.piontName')}}：
                  <span>{{item.disc}}</span>
                </p>
                <p>
                  {{ $t('deviceManage.appType')}}：
                  <span>{{item.appType | changeDevType}}</span>
                </p>
                <p>
                  {{ $t('deviceManage.commAddress')}}：
                  <span>{{item.commAddress}}</span>
                </p>
                <p>{{$t('environmentMonitor.Temperature')}}：<span>{{item.temValuea}}</span></p>
                <p>{{$t('environmentMonitor.Humidity')}}：<span>{{item.hrValue}}</span></p>
                <p>{{$t('environmentMonitor.PM25')}}：<span>{{item.pmValue}}</span></p>
                <p>{{$t('environmentMonitor.CO₂')}}：<span>{{item.co2Value}}</span></p>
                <p>{{$t('environmentMonitor.lightIntensity')}}：<span>{{item.intValue}}</span></p>
                <p class="item_address">{{$t('environmentMonitor.pressure')}}：<span>{{item.pressureValue}}</span></p>
                <i class="operator"> 
                   <el-tooltip effect="dark" content="实时数据" placement="top-start">
                      <span class="detail" @click="getPointCurrentData(item)">
                        <img src="../../../../static/images/realtimeData.png" alt />
                      </span>
                   </el-tooltip>
                </i>
              </li>
             </el-col>
          </el-row>
        </ul>
      </el-col>
    </div>
    <div class="device_footer" v-show="switchVisible" style="background-color: #f3f3f3!important;">
    </div>
     

  <!-- 实时数据弹框 -->
    <el-dialog
      class="realtime_data_dialog clearfix"
      :title="$t('realtimecontrol.realtimeData')"
      :visible.sync="dialogVisible1"
      width="1000px"
     >
      <!-- <div class="dialog_left pull-left">
        <div class="dev_info">
          <h3>{{$t('realtimecontrol.devInfo')}}</h3>
          <p>{{$t('common.deviceName')}}：<span>{{pointName}}</span></p>
          <p>{{$t('realtimecontrol.devStatus')}}：<span>正常</span></p>
          <p>{{$t('realtimecontrol.devClassify')}}：<span>{{pointType|changeDevType}}</span></p>
          <p>{{$t('realtimecontrol.commAddress')}}:<span>{{pointComm}}</span></p>
        </div>
        <div class="realtime_data">
          <h3>{{$t('realtimecontrol.realtimeData')}}</h3>
          <p>{{$t('environmentMonitor.Temperature')}}：<span>{{nowTemperature}}</span></p>
          <p>{{$t('environmentMonitor.Humidity')}}：<span>{{nowHumidity}}</span></p>
          <p>{{$t('environmentMonitor.PM25')}}：<span>{{nowPM25}}</span></p>
          <p>{{$t('environmentMonitor.CO₂')}}：<span>{{nowCO2}}</span></p>
          <p>{{$t('environmentMonitor.lightIntensity')}}：<span>{{nowLightIntensity}}</span></p>
          <p>{{$t('environmentMonitor.pressure')}}：<span>{{nowPressure}}</span></p>
        </div>
      </div> -->
      <div class="dialog_right pull-left">
         <h3>{{$t('realtimecontrol.currentTrendChart1')}}</h3>
         <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
            <el-tab-pane :label="$t('realtimecontrol.temperature')" name="first" lazy>
              <ve-line :data="currentData" :settings="currentChartSettings" style="width: 10rem;" :extend="chartExtend"></ve-line>
            </el-tab-pane>
            <el-tab-pane :label="$t('environmentData.humidity')" name="second" lazy>
                <ve-line :data="currentData1" :settings="currentChartSettings1" style="width: 10rem;" :extend="chartExtend"></ve-line>
            </el-tab-pane>
            <el-tab-pane :label="$t('environmentMonitor.PM25')" name="third" lazy>
               <ve-line :data="currentData2" :settings="currentChartSettings2" style="width: 10rem;" :extend="chartExtend"></ve-line>
            </el-tab-pane>
             <el-tab-pane :label="$t('environmentMonitor.CO₂')" name="fourth" lazy>
               <ve-line :data="currentData3" :settings="currentChartSettings3" style="width: 10rem;" :extend="chartExtend"></ve-line>
            </el-tab-pane>
             <el-tab-pane :label="$t('environmentMonitor.lightIntensity')" name="five" lazy>
               <ve-line :data="currentData4" :settings="currentChartSettings4" style="width: 10rem;" :extend="chartExtend"></ve-line>
            </el-tab-pane>
             <el-tab-pane :label="$t('environmentMonitor.pressure')" name="SIX" lazy>
               <ve-line :data="currentData5" :settings="currentChartSettings5" style="width: 10rem;" :extend="chartExtend"></ve-line>
            </el-tab-pane>
        </el-tabs>
      </div>
   </el-dialog>
  </div>

   
</template>

<script>

import dateformat from 'date-fns/format'
export default {
    name: '',

    data () {
         this.currentChartSettings = {
            dimension: ['日期'],
            yAxisName: ['温度(℃)'],
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

          // 下拉框数据
            options: [
                {
                    value: 'disc',
                    label: this.$t('common.deviceName')
                },
                {
                    value: 'commAddress',
                    label: this.$t('common.commAddress')
                }
            ],


            value: '',
            input: '',
            chooseList: [],
            visible: false,
            dialogVisible1: false,
            dataReadingVisible: false,
            syncParamVisible: false,
            activeName: 'first',
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
            chartExtend: {
                legend: {
                    bottom: 0,
                    // left: 300,
                    // right: 0,
                    textStyle: {
                        color: '#409EFF',
                        fontSize: 12,
                        left: 30,
                    }
                },
                xAxis: {
                    show: false
                },
                // yAxis:{
                //   name: '电流(A)'
                // },
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
            queryParams: {
                'pageNum': 1,
                'pageSize': 100,
                'appType': 4
            },
            devClassifOptions: [],
            devClassifyShow: false,
            devClassifyVal: '',
            deviceData: [],
            switchVisible: false,
            chooseGatewayItem: '',
            chooseGatewayRtuId: 0,
            piontData: [],
            pointName: '', // 实时数据里的开关名称
            pointType:'', //设备分类
            pointComm:'', //开关的通讯地址


            // 获取折线图参数
            queryHistoryParams:{
               "endTime": "2019-06-30",
                "pageNum": 1,
                "pageSize": 300,
                "pointId": 1012,
                "startTime": "2019-05-01"
            },
            // time: [new Date(2019,4, 1),new Date(2019,5, 30)],
            time: [new Date(),new Date()],
            nowCurrent:'',
            nowVoltage:'',
            nowPower:'',
            nowHumidity:'',
            nowTemperature:'',
            nowPM25:'',
            nowCO2:'',
            nowLightIntensity:'',
            nowPressure:''
        };
    },
    mounted () {
      // 获取主体数据
        this.getDeviceData();

      // 获取隐藏下拉框的数据
        this.getDevClassify();
    },
    methods: {

      // 获取主体数据
        getDeviceData () {
            this.$request('queryDeviceList', this.queryParams).then(res => {
                if (res.data.returnCode == 0) {
                    console.log('getDeviceData', res);
                    this.totalNum = res.data.total;
                    if (this.queryParams.pageNum == 1) {
                        this.deviceData = res.data.deviceInfos;
                    } else {
                        this.deviceData.concat(res.data.deviceInfos);
                    }
                }
            });
        },

        // 按条件查询
        // 隐藏按钮
        queryByFactor () {
            if (this.value == 'type') {
                this.queryParams = {};
                this.queryParams[this.value] = this.devClassifyVal;
            } else {
                this.queryParams = {};
                this.queryParams[this.value] = this.input;
            }
            this.queryParams.pageNum = 1;
            this.queryParams.pageSize = 20;
            this.getDeviceData();
        },

        // 下拉框选择
        // 当下拉框的值为'type'时，显示隐藏下拉框
        changeVal (event, item) {
          // console.log(event,item)
            if (event == 'type') {
                this.devClassifyShow = true;
            } else {
                this.devClassifyShow = false;
            }
        },


        // 按设备分类查询的选项
        // 获取隐藏下拉框的数据
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
       
        // tab切换
        handleClick (tab, event) {
        // console.log(tab, event);
        },


        //联动按钮
        linkPoint(item){
          console.log("当前网关",item);
           this.switchVisible = true;
           this.chooseGatewayItem = item.disc;
           this.chooseGatewayRtuId = item.rtuId;      
           this.getPointList();
          //  this.getSomeData();
        },

        // 获取实时数据
        getPointList () {
            this.$request('queryPoint', {params: {rtuId: this.chooseGatewayRtuId}}).then(res => {
                console.log('PPOk', res);
                if (res.data.returnCode == 0) {
                    // this.piontData = res.data.pointInfos;
                    // this.getSomeData();
                     this.piontData = [];
                    // let date = new Date();
                    // let year = dateformat(date,'YYYY');
                    // let month = dateformat(date,'MM');
                    // let day = dateformat(date,'DD');
                        // this.time = [new Date(year,8, 3),new Date(year,8, 3)]; //有假数据
                    //  this.time = [new Date(year,month-1, day),new Date(year,month-1, day)];
                    this.time = [new Date(), new Date()]
                    this.queryHistoryParams.startTime  =  dateformat(this.time[0],'YYYY-MM-DD');
                    this.queryHistoryParams.endTime  =  dateformat(this.time[1],'YYYY-MM-DD');

                    
                      for( let i = 0; i< res.data.pointInfos.length; i++){
                         this.queryHistoryParams.pointId = res.data.pointInfos[i].pointId;
                          // this.queryHistoryParams.pointId = 1012; //有数据
                          console.log("查询历史数据的参数",this.queryHistoryParams);
                          this.$request('queryEnvironmentHistData',this.queryHistoryParams).then( res1 => {
                              console.log("查询历史数据res1",res1)
                                if(res.data.returnCode == 0){
                                  if(res1.data.sensorDataInfos.length > 0){
                                     let obj = {
                                        pointId: res.data.pointInfos[i].pointId, 
                                        disc: res.data.pointInfos[i].disc,
                                        appType: res.data.pointInfos[i].appType,
                                        commAddress: res.data.pointInfos[i].commAddress,
                                        hrValue: res1.data.sensorDataInfos[res1.data.sensorDataInfos.length-1].hrValue ,
                                        temValuea: res1.data.sensorDataInfos[res1.data.sensorDataInfos.length-1].temValuea,
                                        pmValue: res1.data.sensorDataInfos[res1.data.sensorDataInfos.length-1].pmValue,
                                        co2Value: res1.data.sensorDataInfos[res1.data.sensorDataInfos.length-1].co2Value,
                                        intValue: res1.data.sensorDataInfos[res1.data.sensorDataInfos.length-1].intValue,
                                        pressureValue: res1.data.sensorDataInfos[res1.data.sensorDataInfos.length-1].pressureValue,
                                      
                                      }
                                      this.piontData.push(obj);
                                  } else {
                                     let obj = {
                                        pointId: res.data.pointInfos[i].pointId, 
                                        disc: res.data.pointInfos[i].disc,
                                        appType: res.data.pointInfos[i].appType,
                                        commAddress: res.data.pointInfos[i].commAddress,
                                        hrValue: '',
                                        temValuea: '',
                                        pmValue: '',
                                        co2Value: '',
                                        intValue: '',
                                        pressureValue: '',
                                      
                                      }
                                      this.piontData.push(obj);
                                  }
                                 
                                }
                          })
                      }
                    
                } else {
                    this.$message({
                        title: this.$t('common.tip'),
                        message: res.data.returnMsg,
                        type: 'warning'
                    });
                }
            });
        },

        // 滚动加载数据
        load () {},


        backGateway () {
            this.switchVisible = false;
            this.getDeviceData();
        },


        // ???不知道啥
        getSomeData(){
            console.log("二级列表",this.piontData);
           let date = new Date();
           let year = dateformat(date,'YYYY');
           let month = dateformat(date,'MM');
           let day = dateformat(date,'DD');
              // this.time = [new Date(year,8, 3),new Date(year,8, 3)];
           this.time = [new Date(year,month-1, day),new Date(year,month-1, day)];
           this.queryHistoryParams.startTime  =  dateformat(this.time[0],'YYYY-MM-DD');
           this.queryHistoryParams.endTime  =  dateformat(this.time[1],'YYYY-MM-DD');
            for( let i = 0; i< this.piontData.length; i++){
               this.queryHistoryParams.pointId = item[i].pointId;
                //  this.queryHistoryParams.pointId = 1012; //有数据
                 console.log("查询历史数据的参数",this.queryHistoryParams);
                 this.$request('queryEnvironmentHistData',this.queryHistoryParams).then( res => {
                    console.log("查询历史数据res",res)
                      if(res.data.returnCode == 0){
                          this.piontData[i].hrValue = res.data.sensorDataInfos[res.data.sensorDataInfos.length-1].hrValue;
                          this.piontData[i].temValuea = res.data.sensorDataInfos[res.data.sensorDataInfos.length-1].temValuea;
                          this.piontData[i].pmValue = res.data.sensorDataInfos[res.data.sensorDataInfos.length-1].pmValue;
                          this.piontData[i].co2Value = res.data.sensorDataInfos[res.data.sensorDataInfos.length-1].co2Value;
                          this.piontData[i].intValue = res.data.sensorDataInfos[res.data.sensorDataInfos.length-1].intValue;
                          this.piontData[i].pressureValue = res.data.sensorDataInfos[res.data.sensorDataInfos.length-1].pressureValue;
                      }
                 })
            }
             console.log("push了二级列表",this.piontData);
        }, 


        // 获取折线图
        getPointCurrentData(item){
          // console.log("kaiguan",item)
          this.dialogVisible1 = true;
          // // this.pointName = item.disc;
          // // this.pointType = item.appType;
          // // this.pointComm = item.commAddress;
          this.queryHistoryParams.pointId = item.pointId;
          //  this.queryHistoryParams.pointId = 1012; //有数据


          //  let date = new Date();
          //  let year = dateformat(date,'YYYY');
          //  let month = dateformat(date,'MM');
          //  let day = dateformat(date,'DD');
          //  this.time = [new Date(year,month-1, day),new Date(year,month-1, day)];

          
            // this.time = [new Date(year,8, 3),new Date(year,8, 3)];
           this.queryHistoryParams.startTime  =  dateformat(this.time[0],'YYYY-MM-DD');
           this.queryHistoryParams.endTime  =  dateformat(this.time[1],'YYYY-MM-DD');

          //  console.log("查询历史数据的参数",this.queryHistoryParams);
           this.$request('queryEnvironmentHistData',this.queryHistoryParams).then( res => {
              console.log("查询历史数据res",res)
             
              // if(res.data.returnCode == 0){

              //   if(res.data.sensorDataInfos.length>0){
              //     this.currentData.rows = res.data.sensorDataInfos.map(item => {
              //     return {
              //       '日期': dateformat(item.dataTime, 'YYYY-MM-DD HH:mm'),
              //       '温度(℃)': item.temValuea
              //     }
              //   })

              //   this.currentData1.rows = res.data.sensorDataInfos.map(item => {
              //     return {
              //       '日期': dateformat(item.dataTime, 'YYYY-MM-DD HH:mm'),
              //       '湿度(RH%)': item.hrValue
              //     }
              //   })

              //   this.currentData2.rows = res.data.sensorDataInfos.map(item => {
              //     return {
              //       '日期': dateformat(item.dataTime, 'YYYY-MM-DD HH:mm'),
              //       'pm2.5含量(μg/m³)': item.pmValue
              //     }
              //   })

              //   this.currentData3.rows = res.data.sensorDataInfos.map(item => {
              //     return {
              //       '日期': dateformat(item.dataTime, 'YYYY-MM-DD HH:mm'),
              //       'co2含量(ppm)': item.co2Value
              //     }
              //   })

              //   this.currentData4.rows = res.data.sensorDataInfos.map(item => {
              //     return {
              //       '日期': dateformat(item.dataTime, 'YYYY-MM-DD HH:mm'),
              //       '光照强度(wlux)': item.intValue
              //     }
              //   })

              //   this.currentData5.rows = res.data.sensorDataInfos.map(item => {
              //     return {
              //       '日期': dateformat(item.dataTime, 'YYYY-MM-DD HH:mm'),
              //       '气压(Pa)': item.pressureValue
              //     }
              //   })
              //   }

                


                this.currentData.rows =[];
                this.currentData1.rows =[];
                this.currentData2.rows =[];
                this.currentData3.rows =[];
                this.currentData4.rows =[];
                this.currentData5.rows =[];
                if(res.data.sensorDataInfos.length>0){
                    this.nowHumidity = res.data.sensorDataInfos[res.data.sensorDataInfos.length-1].hrValue;
                    this.nowTemperature = res.data.sensorDataInfos[res.data.sensorDataInfos.length-1].temValuea;
                    this.nowPM25 = res.data.sensorDataInfos[res.data.sensorDataInfos.length-1].pmValue;
                    this.nowCO2 = res.data.sensorDataInfos[res.data.sensorDataInfos.length-1].co2Value;
                    this.nowLightIntensity = res.data.sensorDataInfos[res.data.sensorDataInfos.length-1].intValue;
                    this.nowPressure = res.data.sensorDataInfos[res.data.sensorDataInfos.length-1].pressureValue;

                    for(let i=0; i<res.data.sensorDataInfos.length; i++ ){
                      let obj = {
                        '日期': dateformat(res.data.sensorDataInfos[i].dataTime,'YYYY-MM-DD HH:mm'),
                        '温度(℃)': res.data.sensorDataInfos[i].temValuea
                      }
                      this.currentData.rows.push(obj);

                      let obj1 = {
                        '日期': dateformat(res.data.sensorDataInfos[i].dataTime,'YYYY-MM-DD HH:mm'),
                        '湿度(RH%)': res.data.sensorDataInfos[i].hrValue
                      }
                      this.currentData1.rows.push(obj1);

                      let obj2 = {
                        '日期': dateformat(res.data.sensorDataInfos[i].dataTime,'YYYY-MM-DD HH:mm'),
                        'pm2.5含量(μg/m³)': res.data.sensorDataInfos[i].pmValue
                      }
                      this.currentData2.rows.push(obj2);

                        let obj3 = {
                        '日期': dateformat(res.data.sensorDataInfos[i].dataTime,'YYYY-MM-DD HH:mm'),
                        'co2含量(ppm)': res.data.sensorDataInfos[i].co2Value
                      }
                      this.currentData3.rows.push(obj3);

                        let obj4 = {
                        '日期': dateformat(res.data.sensorDataInfos[i].dataTime,'YYYY-MM-DD HH:mm'),
                        '光照强度(wlux)': res.data.sensorDataInfos[i].intValue
                      }
                      this.currentData4.rows.push(obj4);

                       let obj5 = {
                        '日期': dateformat(res.data.sensorDataInfos[i].dataTime,'YYYY-MM-DD HH:mm'),
                        '气压(Pa)': res.data.sensorDataInfos[i].pressureValue
                      }
                      this.currentData5.rows.push(obj5);
                    }
                }
                
            })

        }

    }
};
</script>

<style lang='scss' scope>
#realtimecontrol {
  background-color: #fff;
  box-sizing: border-box;
   .green {
    color: green!important;
  }
  .grey {
    color: grey!important;
  }
  .progressCss {
    .el-dialog__header {
      border-bottom: 1px solid rgb(243, 243, 243);
      padding: 20px;
    }
    .el-dialog__body {
       border-bottom: 1px solid rgb(243, 243, 243);
    }
    .el-button  {
      padding: 8px 16px;
    }
  }
  .device_top {
    padding-left:10px;
    height: 80px;
    line-height:80px;
    background-color: #fff;
    box-sizing: border-box;
    .el-input {
      width: 217px;
      margin-right: 10px;
    }
  }
  .device_body {
    height: 61vh;
    background-color: rgb(243, 243, 243);
    padding: 10px;
    padding-top: 0;
    overflow-y: auto;
    .device_body_lists {
      .item {
        border: 1px solid transparent;
        background-color: #fff;
        box-sizing: border-box;
        // height: 200px;
        margin-top: 15px;
        padding: 15px;
        padding-right: 5px;
        position: relative;
        .status_green {
            color: rgb(34,172,56);
        }
        .status_red {
            color: rgb(228,0,18);
        }
        .status_gray {
            color: rgb(204,204,204);
        }
        .item_img {
          display: block;
          width: 0.65rem;
          height: 0.65rem;
          margin-bottom: 0.3rem;
        }
        p {
          font-size: 14px;
          color: rgb(153, 153, 153);
          margin-bottom: 0.2rem;
          span {
            color: rgb(51, 51, 51);
          }
        }
        // .item_address {
        //   margin-bottom: 0;
        // }
        .delete {
          position: absolute;
          right: 15px;
          top: 15px;
          font-size: 18px;
          color: rgb(153, 153, 153);
        }
        .operator {
          position: absolute;
          cursor: pointer;
          right: 10px;
          bottom: 18px;
          // bottom: 12px;
          // right: 0;
          // bottom: 18px;
          // font-size: 14px;
          .detail {
            background-color: rgb(236, 243, 252);
            padding: 10px;
            border-radius: 2px;
            display: inline-block;
            width: 36px;
            height: 36px; 
            box-sizing: border-box;
            margin-right: 5px;
            i {
              display: block;
              height: 16px;
              width: 16px;
              color: #409EFF;
            }
            img {
              display: block;
              height: 16px;
              width: 16px;

            }
          }
          .edit {
            background-color: rgb(236, 243, 252);
            padding: 10px;
            border-radius: 2px;
            display: inline-block;
            width: 36px;
            height: 36px;
            box-sizing: border-box;
            img {
              display: block;
              height: 16px;
              width: 16px;

            }
          }
        }
        .operator1 {
          position: absolute;
          cursor: pointer;
          right: 12px;
          bottom: 12px;
          font-size: 14px;
          .detail {
            background-color: rgb(236, 243, 252);
            padding: 8px;
            border-radius: 2px;
            display: inline-block;
            width: 32px;
            height: 32px;
            
            box-sizing: border-box;
            margin-right: 5px;
            i {
              display: block;
              height: 16px;
              width: 16px;
              color: #409EFF;
            }
            img {
              display: block;
              height: 16px;
              width: 16px;

            }
          }
          .edit {
            background-color: rgb(236, 243, 252);
            padding: 8px;
            border-radius: 2px;
            display: inline-block;
            width: 32px;
            height: 32px;
            box-sizing: border-box;
            img {
              display: block;
              height: 16px;
              width: 16px;

            }
          }
        }
      }

      .checkbox {
          display: block;
          cursor: pointer;
          border: 1px solid rgb(243, 243, 243);
          width: 18px;
          height: 18px;
          line-height: 18px;
          text-align: center;
            span {
                font-size: 17px;
                color: #fff;
            }
      }
      .selectStyle {
          background-color: rgb(24,144,255);
          border-color: rgb(24,144,255);
      }
      .selectStyle1 {
          border-color: rgb(24,144,255);
      }
    }
  }
  .device_footer {
    height: 80px;
    line-height: 80px;
    background-color: #fff;
    padding-left: 10px;
  }
 
  
  .realtime_data_dialog {
     .el-dialog__header {
          border-bottom: 1px solid rgb(243, 243,243);
          padding: 10px;
          padding-left: 20px;
      }
      .el-dialog__title {
          font-size: 16px;
          color: rgb(51, 51, 51);
      }
      .el-dialog__headerbtn {
          top: 12px;
          right: 10px;
      }
      .el-dialog__body {
        padding: 10px;
        overflow: hidden;
        .dialog_left {
          display: inline-block;
          width: 255px;
          .dev_info {
            padding-left: 10px;
            border-bottom: 1px solid rgb(243, 243, 243);
            h3 {
              font-size: 18px;
              color: #000;
              margin-bottom: 15px;
            }
            p {
              color: rgb(153, 153, 153);
              font-size: 14px;
              margin: 8px 0;
              span {
                color: rgb(102,102,102);
              }
            }
          }
          .realtime_data {
            padding-left: 10px;
            h3 {
              font-size: 18px;
              color: #000;
              margin-top: 10px;
              margin-bottom: 15px;
            }
            p {
              color: rgb(153, 153, 153);
              font-size: 14px;
              margin: 8px 0;
              span {
                color: rgb(102,102,102);
              }
            }
          }
        }
        .dialog_right {
          height: 530px;
          border-left: 1px solid rgb(243, 243, 243);
          padding-left: 10px;
          h3 {
            font-size: 18px;
            color: #000;
            margin-bottom: 15px;
          }

        }
      }
      
  }

  .dataReading {
      .el-button {
        padding: 8px 16px;
      }
      .el-dialog__body {
        padding: 20px;
      }
  }
  .timeStrategy {
      .el-dialog__body {
        border-bottom: 1px solid #f3f3f3;
      }
      .el-select {
        width: 80px;
      }
      .el-input__inner  {
        height: 30px!important;
      }
     .el-input__icon {
       line-height: 30px;
     }
     .el-date-editor.el-input {
       width: 80px!important;
      .el-input__icon {
        display: none;
      }
     
     }
    .el-input--prefix .el-input__inner {
            padding-left: 8px!important;
            padding-right: 8px!important;
          }
  }
  .setThreshold {
    width: 100%;
    height: 300px;
   
    .setThreshold_top {
         background-color: #f3f3f3;
         height: 35px;
         text-align: center;
         line-height: 35px;
         margin-bottom: 20px;
         font-weight: 700;
    }
    .setThreshold_mid {
      padding-left: 100px;
        
        .el-form-item__label {
            border: 1px solid #DCDFE6;
            border-right: none;
            border-radius: 4px 0 0 4px;
            padding: 0 10px;;
            height: 40px;
            line-height: 40px;
           
        }
        .el-input__inner  {
            height: 40px!important;
            border-radius: 0 4px 4px 0;
            line-height: 40px;
            width: 290px;
        }
    }
  }
  @media only screen and (min-width: 1200px) {
    .el-col-lg-4-8 {
      width: 20%;
    }
  }
}
</style>

