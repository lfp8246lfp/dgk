  <template>
  <div id="realtimecontrol">
    <div class="device_top" v-show="!switchVisible">
      <el-select v-model="value" :placeholder="$t('common.pleaseSelect')" @change="changeVal">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="input" :placeholder="$t('realtimecontrol.pleaseInput')" clearable v-show="!devClassifyShow"></el-input>
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
    <div class="device_body" v-show="!switchVisible">
      <el-col :span="24">
        <ul class="device_body_lists">
          <el-row :gutter="13">
           <el-col :xs="12" :sm="6" class="el-col-lg-4-8" v-for="(item,index) in deviceData" :key="index">
              <li class="item">
              <!-- <li class="item"  :class="{selectStyle1 : chooseArr.includes(item.rtuId)}"  @click="selectItem($event,item.rtuId, item)"> -->
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
                <!-- <i class="delete checkbox"  :class="{selectStyle : chooseArr.includes(item.rtuId)}">
                  <span class="el-icon-check" v-show="chooseArr.includes(item.rtuId)"></span>
                </i> -->
                <i class="operator" style="right: 15px!important;" v-show="item.communicationType == 1">
                   <el-dropdown>     
                    <span class="edit">
                        <img src="../../../../static/images/operator.png" alt />
                    </span>
                   <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="beginToClick(1,item)"> {{$t('realtimecontrol.open')}}</el-dropdown-item>
                      <el-dropdown-item @click.native="beginToClick(0,item)"> {{$t('realtimecontrol.close')}}</el-dropdown-item>
                      <el-dropdown-item @click.native="beginToClick(2,item)"> {{$t('realtimecontrol.recover')}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </i>
              </li>
           </el-col> 
          </el-row>
        </ul>
      </el-col>
    </div>
  
    <!-- <div class="device_footer" v-show="!switchVisible">
      <el-button type="primary" @click.native="beginToClick(1)">{{$t('realtimecontrol.open')}}</el-button>
      <el-button type="primary" @click.native="beginToClick(0)">{{$t('realtimecontrol.close')}}</el-button>
      <el-button type="primary" @click.native="beginToClick(2)">{{$t('realtimecontrol.recover')}}</el-button>
    </div> -->

  <!-- 进度条弹框 -->
  <el-dialog
      class="progressCss"
      :title="progressTitle"
      :visible.sync="progressVisible"
      width="510px"
     >
        <el-progress :percentage="percent" :stroke-width="10"></el-progress>
        <p style="margin-top: 10px;" v-show=" percent == 100">{{waitrecvMsg }}</p>
         <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="progressVisible=false"
        >关闭</el-button>
        </span>
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
            index: '',
            chooseArr: [],
            chooseList: [],
            visible: false,
            multipleSelection: [],
            interrupt: false,
            switchList: {         
                fir: '1',
                fin: '1',
                objectid: 17893,
                objecttype: 1,
                requestid: 'requestid',
                taskid: 5579,
                frameindex:1,
                isresive: 0,
                afn: '3',
                content: {
                    name: 'F11',
                    data: ""     
                }
            },    
            queryParams: {   //查询设备参数 yes
                'pageNum': 1,
                'pageSize': 20,
                'appType': 2
            },
            devClassifOptions: [],
            devClassifyShow: false,
            devClassifyVal: '',
            deviceData: [],
            progressVisible: false,
            percent: 20,
            progressTitle: '等待数据回复中...',
            recvTimeoutCount: 10,
            waitrecvMsg: '', // 提示信息
            selectedrecvDcu: [],
            tocontinue: false,
            switchVisible: false,
            procIndex:0,
            flag:0,
                  
        };
    },
    mounted () {
        this.getDeviceData();
    },
    methods: {
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
        // 按条件查询 yes
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
                    this.queryParams.appType = 2;
                    this.getDeviceData();
                }
            }
           
        },
        changeVal (event, item) {
            if (event == 'type') {
                this.devClassifyShow = true;
            } else {
                this.devClassifyShow = false;
            }
        },
        //选中设备 yes
        selectItem (item, index, list) {
          console.log("list",list)
            if (this.chooseArr.includes(index)) {
                this.chooseArr = this.chooseArr.filter(function (ele) { return ele != index; });
            } else {
                this.chooseArr.push(index);
            }
            console.log('this.chooseArr', this.chooseArr);

            let obj = {
                commAddress: list.commAddress,
                rtuId: list.rtuId,
            };
            this.chooseList.push(obj);
            //  console.log("选择的网关", list);
            this.selectedrecvDcu = [];
            for (var i = 0; i < this.chooseList.length; i++) {
                for (var j = 0; j < this.chooseArr.length; j++) {
                    if (this.chooseArr[j] == this.chooseList[i].rtuId) {
                        let item = {
                            commAddress: this.chooseList[i].commAddress,
                            rtuId: this.chooseList[i].rtuId,
                        };
                        this.selectedrecvDcu.push(item);
                    }
                }
            }
            console.log('选择的网关', this.selectedrecvDcu);
            this.wifiName = list.disc;
            
           
        },
        genTaskid() {
          this.switchList.taskid = this.genRandomNum(1000, 9999);
        },
        genRequestid() {
          this.switchList.requestid = this.randomWord(false, 8, 8);
        },
        genRandomNum (min, max) {
            let range = max - min;
            let rand = Math.random();
            return min + Math.round(rand * range);
        },
        randomWord (randomFlag, min, max) {
            let str = '',
                range = min,
                arr = [
                    '0',
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    'a',
                    'b',
                    'c',
                    'd',
                    'e',
                    'f',
                    'g',
                    'h',
                    'i',
                    'j',
                    'k',
                    'l',
                    'm',
                    'n',
                    'o',
                    'p',
                    'q',
                    'r',
                    's',
                    't',
                    'u',
                    'v',
                    'w',
                    'x',
                    'y',
                    'z',
                    'A',
                    'B',
                    'C',
                    'D',
                    'E',
                    'F',
                    'G',
                    'H',
                    'I',
                    'J',
                    'K',
                    'L',
                    'M',
                    'N',
                    'O',
                    'P',
                    'Q',
                    'R',
                    'S',
                    'T',
                    'U',
                    'V',
                    'W',
                    'X',
                    'Y',
                    'Z'
                ];
            let pos;
            // 随机产生
            if (randomFlag) {
                range = Math.round(Math.random() * (max - min)) + min;
            }
            for (var i = 0; i < range; i++) {
                pos = Math.round(Math.random() * (arr.length - 1));
                str += arr[pos];
            }
            return str;
        },
        intercept () {
            this.interrupt = false;
            this.recvTimeoutCount = 10;
            this.progressVisible = false;
            this.percent = 0;
            this.waitrecvMsg = '';
        },
        getErrorMsg (errortype, errorcode) {
            if (errortype == '0') {
                return this.$t('errorMsg.errortype0');
            } else if (errortype == '1') {
                if (errorcode == '0') {
                    return this.$t('errorMsg.errorcode1_0');
                } else
                if (errorcode == '1') {
                    return this.$t('errorMsg.errorcode1_1');
                } else
                if (errorcode == '2') {
                    return this.$t('errorMsg.errorcode1_2');
                } else
                if (errorcode == '3') {
                    return this.$t('errorMsg.errorcode1_3');
                } else
                if (errorcode == '4') {
                    return this.$t('errorMsg.errorcode1_4');
                } else {
                    return this.$t('errorMsg.errorcode1_other');
                }
            } else if (errortype == '2' || errortype == '3') {
                if (errorcode == '0') {
                    return this.$t('errorMsg.errorcode23_0');
                } else if (errorcode == '3') {
                    return this.$t('errorMsg.errorcode23_3');
                } else if (errorcode == '4') {
                    return this.$t('errorMsg.errorcode23_4');
                } else if (errorcode == '12') {
                    return this.$t('errorMsg.errorcode23_12');
                } else {
                    return this.$t('errorMsg.errorcode23_other');
                }
            } else if (errortype == '4') {
                return this.$t('errorMsg.errortype4');
            } else {
                return this.$t('errorMsg.errortypeother');
            }
        },
        // 0 close  1 open   2 recover
        beginToClick (number, item) {
            this.interrupt = false;
            this.procIndex = 0;
            this.flag = number;
            this.switchList.objectid = item.rtuId;
           this.beginToBat();
        },
        beginToBat(){
          this.percent = 0;
            // if (this.chooseArr.length < 1) {
            //     this.$message({
            //         title: this.$t('common.tip'),
            //         message: '请选择至少一项设备',
            //         type: 'warning'
            //       });
            //   }  
            //   else {  
            //           this.interrupt = false;
            //           this.tocontinue = true;
            //           this.switchList.content.name = "F11";
            //          if(this.procIndex < this.selectedrecvDcu.length ){
            //            let item = this.selectedrecvDcu[this.procIndex];
            //            this.switchList.objectid = item.rtuId;
            //            if(this.flag == 0){
            //                 this.switchList.content.data = "0";
            //                 this.$confirm('是否继续拉闸的操作?', '提示', {
            //                       confirmButtonText: '确定',
            //                       cancelButtonText: '取消',
            //                       type: 'warning'
            //                   }).then(() => {
            //                       this.sendData();
            //                   });
                           
            //               } else if(this.flag == 1){
            //                 this.switchList.content.data= "1";
            //                  this.$confirm('是否继续拉闸的操作?', '提示', {
            //                       confirmButtonText: '确定',
            //                       cancelButtonText: '取消',
            //                       type: 'warning'
            //                   }).then(() => {
            //                       this.sendData();
            //                   });
            //               }  else if(this.flag == 2){
            //                 this.switchList.content.data = "2"; 
            //                  this.$confirm('是否继续拉闸的操作?', '提示', {
            //                       confirmButtonText: '确定',
            //                       cancelButtonText: '取消',
            //                       type: 'warning'
            //                   }).then(() => {
            //                       this.sendData();
            //                   });
            //               } 
            //          } else {
            //              this.percent = 100;
            //          }                          
            //   }

              this.interrupt = false;
              this.tocontinue = true;
              this.switchList.content.name = "F11";
              if(this.flag == 0){
                    this.switchList.content.data = "0";
                    this.$confirm('是否继续关闸的操作?', '提示', {
                                  confirmButtonText: '确定',
                                  cancelButtonText: '取消',
                                  type: 'warning'
                              }).then(() => {
                                  this.sendData();
                              }).catch(() => {});;
                           
                } else if(this.flag == 1){
                        this.switchList.content.data= "1";
                             this.$confirm('是否继续开闸的操作?', '提示', {
                                  confirmButtonText: '确定',
                                  cancelButtonText: '取消',
                                  type: 'warning'
                              }).then(() => {
                                  this.sendData();
                              }).catch(() => {});;
                          }  else if(this.flag == 2){
                            this.switchList.content.data = "2"; 
                             this.$confirm('是否继续恢复的操作?', '提示', {
                                  confirmButtonText: '确定',
                                  cancelButtonText: '取消',
                                  type: 'warning'
                              }).then(() => {
                                  this.sendData();
                              }).catch(() => {});;
                  } 
                                     
        },
        sendData(){
            this.genTaskid();
            this.genRequestid();
            console.log('switchList', this.switchList);
            this.recvTimeoutCount = 10;
            this.$request('sendData', this.switchList).then(res => {
                console.log('发送数据', res);
                if (res.data.success == 1) {
                    this.receiveData();
                } else {
                    // if (this.selectedrecvDcu.length > 1) {
                    //     this.procIndex++;
                    //     this.beginToBat();
                    // } else {
                    //     this.$message({
                    //         title: this.$t('common.tip'),
                    //         message: '发送数据失败',
                    //         type: 'warning'
                    //     });
                    // }
                     this.$message({
                            title: this.$t('common.tip'),
                            message: '发送数据失败',
                            type: 'warning'
                        });
                }
            });
        },
        receiveData(){
           this.$request('receiveData', this.switchList).then(res => {
                console.log('//...>>>> receiveData', res);

                if (this.interrupt) {
                    this.progressVisible = false;
                    this.percent = 0;
                } else {
                    if (this.recvTimeoutCount == 10) {
                        this.progressVisible = true;
                    }
                    this.percent = ((10 - this.recvTimeoutCount) / 10) * 100;
                }

                if (res.data.isresive == 0 && this.recvTimeoutCount > 0 && this.tocontinue) {
                    setTimeout(() => {
                        this.recvTimeoutCount--;
                        this.receiveData();
                    }, 5000);
                } else if (res.data.isresive == 1 && res.data.content.data[0].result == 0) {
                    this.percent = 100;
                    this.progressVisible = true;
                    this.waitrecvMsg = '处理完成';
                    this.tocontinue = false;
                    // this.procIndex++;
                    // setTimeout(() => {
                    //     this.beginToBat();
                    // }, 500);
                } else if (res.data.isresive == 1 && res.data.content.data[0].result == 1) {
                    this.percent = 100;
                    this.waitrecvMsg = this.getErrorMsg(res.data.content.data[0].errortype, res.data.content.data[0].errorcode);
                    this.recvTimeoutCount = 10;
                    this.tocontinue = false;
                    // this.procIndex++;
                    // setTimeout(() => {
                    //     this.beginToBat();
                    // }, 500);
                } else {
                    this.percent = 100;
                    this.recvTimeoutCount = 10;
                    this.waitrecvMsg = '超时';
                    this.tocontinue = false;
                    // this.procIndex++;
                    // setTimeout(() => {
                    //     this.beginToBat();
                    // }, 500);
                }
            });
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
        .item_address {
          margin-bottom: 0;
        }
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
          right: 15px;
          bottom: 15px;
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

