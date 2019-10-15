  <template>
  <div id="realtimecontrol">
    <div class="device_top">
      <el-select v-model="value" :placeholder="$t('common.pleaseSelect')">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="input" :placeholder="$t('realtimecontrol.pleaseInput')" clearable ></el-input>
      <el-button type="primary" @click.native="queryByFactor">{{$t('common.query')}}</el-button>
    </div>
    <!-- 网关body -->
    <div class="device_body">
      <el-col :span="24">
        <ul class="device_body_lists">
          <el-row :gutter="13">
           <el-col :xs="12" :sm="6" class="el-col-lg-4-8" v-for="(item,index) in deviceData" :key="index">
              <li class="item">
                <img :src="item.deviceType|getDevTypeIcon" alt class="item_img" />
                <p>
                  {{$t('common.deviceName')}}：
                  <span>{{item.disc}}</span>
                </p>
                <p>
                  {{ $t('deviceManage.devStatus')}}：
                  <span :class="{ green : item.curStatus == 1, grey : item.curStatus !== 1} ">{{item.curStatus|deviceStaus}}</span>
                </p>
                <p>
                   {{$t('realtimecontrol.devClassify')}}：
                  <span>{{item.typeName}}</span>
                </p>
                <p>
                  {{$t('realtimecontrol.commAddress')}}：
                  <span>{{item.commAddress}}</span>
                </p>
                 <p>
                  {{$t('realtimecontrol.temperature')}}：
                  <span>{{item.temValuea}}</span>
                </p>
                 <p>
                  {{$t('realtimecontrol.smokeConcentration')}}：
                  <span>{{item.co2Value}}</span>
                </p>
                 <p class="item_address">
                  {{$t('realtimecontrol.alarmStatus')}}：
                  <span>{{item.smokeFlag | alaramStatus}}</span>
                </p>
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
      <div>
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
                <el-table-column prop="" :label="$t('historicaldata.devOrder')">
                     <template slot-scope="scope">{{pointComm}}</template>
                </el-table-column>
                <el-table-column prop="" :label="$t('historicaldata.deviceName')">
                      <template slot-scope="scope">{{pointName}}</template>
                </el-table-column>
                <el-table-column prop="dataTime" :label="$t('historicaldata.dataTime')" width="180" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="temValuea" :label="$t('historicaldata.temperature')"></el-table-column>
                <el-table-column prop="co2Value" :label="$t('historicaldata.smokeConcentration')"></el-table-column>
                <el-table-column prop="smokeFlag" :label="$t('historicaldata.alarmStatus')">
                   <template slot-scope="scope">{{ scope.row.smokeFlag | alaramStatus }}</template>
                </el-table-column>
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
      </div>
   </el-dialog>
  </div>

   
</template>

<script>

import dateformat from 'date-fns/format'
export default {
    name: '',

    data () {
        return {
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
            visible: false,
            dialogVisible1: false,
            dataReadingVisible: false,
            syncParamVisible: false,
            queryParams: {
                'pageNum': 1,
                'pageSize': 20,
                'type': 7
            },
            devClassifyVal: '',
            deviceData: [],
            switchVisible: false,
            pointName: '', // 实时数据里的开关名称
            pointType:'', //设备分类
            pointComm:'', //开关的通讯地址
            queryHistoryParams:{
               "endTime": "2019-06-30",
                "pageNum": 1,
                "pageSize": 10,
                "rtuId": 1012,
                "startTime": "2019-05-01"
            },
            time: [new Date(),new Date()],
            tableData1:[],
            histotal:0,
        };
    },
    mounted () {
        this.getDeviceData();
    },
    methods: {
        getDeviceData () {
             console.log(" this.queryParams",this.queryParams)    
             this.$request('queryDeviceRealTimeStatus',{params: this.queryParams}).then(res => {
                if (res.data.returnCode == 0) {
                    console.log('getDeviceData', res);    
                     this.totalNum = res.data.total;
                    if (this.queryParams.pageNum == 1) {
                       this.deviceData = res.data.safetyDeviceDetails;
                    } else {
                        this.deviceData.concat(res.data.safetyDeviceDetails);
                    }
                }
            });
        },
        // 按条件查询
        queryByFactor () {
             if (this.value == 'type') {
                this.queryParams = {};
                this.queryParams[this.value] = this.devClassifyVal;
                this.queryParams.pageNum = 1;
                this.queryParams.pageSize = 20;
                this.getDeviceData();
            } else {   
                if(this.input){
                    this.queryParams = {};
                    this.queryParams[this.value] = this.input;
                    this.queryParams.pageNum = 1;
                    this.queryParams.pageSize = 20;
                    this.getDeviceData();
                } else{
                    this.queryParams = {};
                    this.queryParams.pageNum = 1;
                    this.queryParams.pageSize = 20;
                    this.queryParams.appType = 3;
                    this.getDeviceData();
                }
            }
        },
           // 查询开关历史数据
        searchSwitch(){
            this.queryHistoryParams.startTime = dateformat(this.time[0],'YYYY-MM-DD');
            this.queryHistoryParams.endTime = dateformat(this.time[1],'YYYY-MM-DD');
            this.sendPost();
        },
        sendPost(){
           console.log("查询历史数据的参数",this.queryHistoryParams);
           this.$request('querySafeDeviceHistData',this.queryHistoryParams).then( res => {
              console.log("查询历史数据res",res)
              if(res.data.returnCode == 0){
                this.tableData1 = res.data.safetyDeviceDataInfos;
                this.histotal = res.data.total
             }
           })
        },
        indexMethod (index) {
            return index + 1;
        },
        dateFormat(row, column, cellValue, index){
             const daterc = row[column.property]
             return dateformat(daterc,'YYYY-MM-DD HH:mm');
        },
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
        // 滚动加载数据
        load () {},
        getPointCurrentData(item){
          // console.log("kaiguan",item)
          this.dialogVisible1 = true;
          this.pointName = item.disc;
          this.pointComm = item.commAddress;
          this.queryHistoryParams.rtuId = item.rtuId;
          //  let date = new Date();
          //  let year = dateformat(date,'YYYY');
          //  let month = dateformat(date,'MM');
          //  let day = dateformat(date,'DD');
          //  this.time = [new Date(year,month-1, day),new Date(year,month-1, day)];
          
          this.time = [new Date(+new Date() - 7 * 24 * 60 * 60 * 1000), new Date()]
          
          this.queryHistoryParams.startTime  =  dateformat(this.time[0],'YYYY-MM-DD');
          this.queryHistoryParams.endTime  =  dateformat(this.time[1],'YYYY-MM-DD');  
          this.sendPost();
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
        // padding-right: 5px;
        padding-right: 20px;
        padding-bottom: 50px;
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

