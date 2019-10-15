<template>
  <div class="alarmDetails">
    <div class="alarmDetails_top">
       <el-tabs v-model="activeName" type="card" @tab-click="handleClick" >

         <!-- 网关tab -->
           <el-tab-pane label="网关" name="first">

             <!-- 网关事件名称 -->
              <div class="alarm_name pull-left">
                  <span class="title pull-left">{{$t('alarmDetails.eventName')}}</span>
                  <el-select v-model="queryAlarmParam.eventType" class="pull-left " style="width: 2.6rem">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                  </el-select>
              </div>

              <!-- 网关解决状态 -->
              <div class="alarm_dealstatus pull-left">
                    <span class="title pull-left">{{$t('alarmDetails.resolveStatus')}}</span>
                    <el-select v-model="queryAlarmParam.dealStatus" class="pull-left" style="width: 2.6rem">
                      <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
              </div>

              <!-- 网关时间选择 -->
              <div class="alarm_time_filter pull-left">
                  <el-date-picker
                    v-model="time"
                    type="daterange"
                    :range-separator="$t('common.to')"
                    :start-placeholder="$t('common.startDate')"
                    :end-placeholder="$t('common.endDate')"
                  ></el-date-picker>
              </div>

                <!-- 网关查询按钮 -->
              <el-button type="primary" @click="queryAlarmData">{{$t('common.query')}}</el-button>
              <el-button type="primary export">{{$t('common.export')}}</el-button>



              <!-- 网关表格 -->
                  <div class="alarmDetails_table">
                    <el-table
                      ref="multipleTable"
                      border
                      :data="tableData"
                      tooltip-effect="dark"
                      :header-cell-style="{background:'#F2F2F2',color:'rgb(51,51,51)'}"
                      style="width: 100%;font-size: 14px"
                      @selection-change="handleSelectionChange">
                        <el-table-column
                          type="selection"
                          width="55">
                        </el-table-column>
                        <el-table-column
                          :label="$t('common.serialNum')"
                          type="index" :index="indexMethod"
                          width="90">
                        </el-table-column>
                        <el-table-column
                          :label="$t('common.deviceName')"
                           prop="disc">
                        </el-table-column>
                        <el-table-column
                          prop="commaddress"
                          :label="$t('alarmDetails.devID')"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="eventTime"
                          :label="$t('alarmDetails.alarmTime')"
                          width="160"
                          :formatter="dateFormat"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="reportTime"
                        :label="$t('alarmDetails.reportTime')"
                          width="160"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="eventItemId"
                        :label="$t('alarmDetails.alarmName')"
                        >
                          <template slot-scope="scope">{{changeEventName(scope.row.eventItemId)}}</template>
                        </el-table-column>
                        <el-table-column
                          prop="dealStatus"
                          :label="$t('alarmDetails.dealStatus')"
                          >
                          <template slot-scope="scope">
                            <span class="green" v-if="scope.row.dealStatus == 1" >已处理</span>
                            <span class="red"  v-else-if="scope.row.dealStatus == 2">未解决</span>
                            <span class="red"  v-else>未处理</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="eventNote"
                          :label="$t('alarmDetails.dealOwner')"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="dealTime"
                          :label="$t('alarmDetails.dealTime')"
                          width="160"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="dealResult"
                          :label="$t('alarmDetails.dealContent')"
                          show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                  </div>

                  <!-- 网关立即处理按钮 -->
                <div class="alarmDetails_pagination clearfix">
                  <el-button type="primary" class="pull-left" @click="dealwith()">{{$t('alarmDetails.dealImmediate')}}</el-button>

                  <!-- 网关表格分页 -->
                  <el-pagination
                      class="pull-right"
                      background
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :page-sizes="[10, 20, 30, 40]"
                      :page-size="10"
                      layout=" prev, pager, next, sizes"
                      :total="total">
                </el-pagination>
              </div>
           </el-tab-pane>

          <!-- 开关tab -->
           <el-tab-pane label="开关" name="second">

             <!-- 开关事件名称 -->
             <div class="alarm_name pull-left">
                  <span class="title pull-left">{{$t('alarmDetails.eventName')}}</span>
                  <el-select v-model="queryAlarmParam.eventType" class="pull-left " style="width: 2.6rem">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                  </el-select>
              </div>

              <!-- 开关解决状态 -->
              <div class="alarm_dealstatus pull-left">
                    <span class="title pull-left">{{$t('alarmDetails.resolveStatus')}}</span>
                    <el-select v-model="queryAlarmParam.dealStatus" class="pull-left" style="width: 2.6rem">
                      <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
              </div>

              <!-- 开关时间选择 -->
              <div class="alarm_time_filter pull-left">
                  <el-date-picker
                    v-model="time"
                    type="daterange"
                    :range-separator="$t('common.to')"
                    :start-placeholder="$t('common.startDate')"
                    :end-placeholder="$t('common.endDate')"
                  ></el-date-picker>
              </div>

              <!-- 开关查询按钮 -->
              <el-button type="primary" @click="queryAlarmData">{{$t('common.query')}}</el-button>
              <el-button type="primary export">{{$t('common.export')}}</el-button>


              <!-- 开关表格 -->
                  <div class="alarmDetails_table">
                    <el-table
                      ref="multipleTable"
                      border
                      :data="tableData"
                      tooltip-effect="dark"
                      :header-cell-style="{background:'#F2F2F2',color:'rgb(51,51,51)'}"
                      style="width: 100%;font-size: 14px"
                      @selection-change="handleSelectionChange">
                        <el-table-column
                          type="selection"
                          width="55">
                        </el-table-column>
                        <el-table-column
                          :label="$t('common.serialNum')"
                          type="index" :index="indexMethod"
                          width="90">
                        </el-table-column>
                        <el-table-column
                          :label="$t('common.deviceName')"
                           prop="disc">
                        </el-table-column>
                        <el-table-column
                          prop="commaddress"
                          :label="$t('alarmDetails.devID')"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="eventTime"
                          :label="$t('alarmDetails.alarmTime')"
                          width="160"
                          :formatter="dateFormat"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="reportTime"
                        :label="$t('alarmDetails.reportTime')"
                          width="160"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="eventItemId"
                        :label="$t('alarmDetails.alarmName')"
                        >
                          <template slot-scope="scope">{{changeEventName(scope.row.eventItemId)}}</template>
                        </el-table-column>
                        <el-table-column
                          prop="dealStatus"
                          :label="$t('alarmDetails.dealStatus')"
                          >
                          <template slot-scope="scope">
                            <span class="green" v-if="scope.row.dealStatus == 1" >已处理</span>
                            <span class="red"  v-else-if="scope.row.dealStatus == 2">未解决</span>
                            <span class="red"  v-else>未处理</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="eventNote"
                          :label="$t('alarmDetails.dealOwner')"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="dealTime"
                          :label="$t('alarmDetails.dealTime')"
                          width="160"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="dealResult"
                          :label="$t('alarmDetails.dealContent')"
                          show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                  </div>


                  <!-- 开关立即处理 -->
                <div class="alarmDetails_pagination clearfix">
                  <el-button type="primary" class="pull-left" @click="dealwith()">{{$t('alarmDetails.dealImmediate')}}</el-button>

                  <!-- 开关表格分页 -->
                  <el-pagination
                      class="pull-right"
                      background
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :page-sizes="[10, 20, 30, 40]"
                      :page-size="10"
                      layout=" prev, pager, next, sizes"
                      :total="total">
                </el-pagination>
              </div>
           </el-tab-pane>
       </el-tabs>
       
      <!-- <div class="alarm_name pull-left">
        <span class="title pull-left">{{$t('alarmDetails.eventName')}}</span>
        <el-select v-model="value" class="pull-left " style="width: 2.6rem">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              
            ></el-option>
      </el-select>
      </div>
       <div class="alarm_dealstatus pull-left">
          <span class="title pull-left">{{$t('alarmDetails.resolveStatus')}}</span>
          <el-select v-model="value1" class="pull-left" style="width: 2.6rem">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
       </div>
       <div class="alarm_time_filter pull-left">
         <el-date-picker
          v-model="time"
          type="daterange"
          :range-separator="$t('common.to')"
          :start-placeholder="$t('common.startDate')"
          :end-placeholder="$t('common.endDate')"
        ></el-date-picker>
       </div>
       <el-button type="primary">{{$t('common.query')}}</el-button>
       <el-button type="primary export">{{$t('common.export')}}</el-button> -->
    </div> 
    <!-- 立即处理弹框 -->
    <el-dialog
      :title="$t('alarmDetails.dealImmediate')"
      :visible.sync="dialogVisible"
       width="400px"
      >
      <el-form ref="form" :model="form" label-width="80px">
          <el-form-item :label="$t('alarmDetails.resolveStatus')">
            <el-radio-group v-model="form.dealstatus">
              <el-radio :label="2">未解决</el-radio>
              <el-radio :label="1">已处理</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('alarmDetails.dealTime')">
             <el-input v-model="form.dealtime"></el-input>
          </el-form-item>
          <el-form-item :label="$t('alarmDetails.dealOwner')">
             <el-input v-model="form.eventnote"></el-input>
          </el-form-item>
           <el-form-item :label="$t('alarmDetails.dealContent')">
              <el-input type="textarea" v-model="form.dealresult"></el-input>
          </el-form-item>
      </el-form>

      <!-- 弹框按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" @click="dealwithAlarm">{{$t('common.yes')}}</el-button>
      </span>
    </el-dialog> 
  </div>
</template>

<script>
import format from 'date-fns/format'
export default {
    name: '',

    data () {
        return {
           time: [new Date(+new Date() - 7 * 24 * 60 * 60 * 1000), new Date()],
            options: [
                {
                    value: '选项1',
                    label: '补光灯运作超时'
                },
                {
                    value: '选项2',
                    label: '过流'
                },
                {
                    value: '选项3',
                    label: '过压'
                }
            ],
            // value: '',

            options1: [
                {
                    value: -1,
                    label: '全部'
                },
                {
                    value: 1,
                    label: '已处理'
                },
                {
                    value: 0,
                    label: '未处理'
                },
                {
                    value: 2,
                    label: '未解决'
                }
            ],
            // value1: '',
            tableData: [],

            // 表格选项数据
            multipleSelection: [],
            currentPage: 1,
            dialogVisible: false,

            // 对话框数据
            form: {
                "dealstatus": 1,
                "dealresult": '',
                "dealtime": format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                "eventnote":localStorage.getItem('accountId')
            },

            // 处理告警参数
            dealwithParams: {
              saveItem: []
            },


            activeName:'first', //tab切换绑定值

            // 表格数据参数
            queryAlarmParam: {
                // 解决状态的值
              dealStatus:-1,
              startTime:'',
              endTime:'',
                // 事件名称的值
              eventType:0,
              id:17,
              pageNum: 1,
              pageSize: 10,
              type: 1
            },

            // 网关表格数据总条数
            total:0,
        };
    },
    mounted(){
      // 获取事件名称数据
        this.getAlarnType();

      // 获取表格数据
        this.queryAlarm();
    },
    methods: {

      // 获取事件名称数据
        getAlarnType(){
          this.options = [{label:'全部', value: 0}];
          this.$request('queryEventList').then( res => {
           console.log("事件名称", res);
           if(res.data.returnCode == 0){
             for(let i=0; i< res.data.eventItems.length; i++){
               let obj = {
                 value: res.data.eventItems[i].eventItemId,
                 label: res.data.eventItems[i].discName,
               }
               this.options.push(obj);
             }
           }
         })
        },

        // 获取表格数据
        queryAlarm(){
            // this.queryAlarmParam.dealStatus = this.value1;
            // this.queryAlarmParam.eventType = this.value;
           
            this.queryAlarmParam.startTime = format(this.time[0],'YYYY-MM-DD');
            this.queryAlarmParam.endTime = format(this.time[1],'YYYY-MM-DD');
            console.log("告警数据参数",this.queryAlarmParam)
            this.$request('queryElectricityRtuAlarm', this.queryAlarmParam).then( res => {
               console.log("告警数据",res)
               if(res.data.returnCode == 0){
                 this.tableData = res.data.zdtEvts;
                 this.total = res.data.total;
               }
             })
        },
        queryAlarmData(){
          this.queryAlarm();
        },
        changeEventName(item){
          for(let i =0; i< this.options.length; i++){
              if(item == this.options[i].value){
                  return this.options[i].label;
              }
          }
        },

        // 点击选项
        handleSelectionChange (val) {
            this.multipleSelection = val;
        },

        // 修改每页条数
        handleSizeChange (val) {
            this.queryAlarmParam.pageSize = val;
            this.queryAlarm();
            console.log(`每页 ${val} 条`);
        },
        // 修改当前页
        handleCurrentChange (val) {
           this.queryAlarmParam.pageNum = val;
            this.queryAlarm();
            console.log(`当前页: ${val}`);
        },
        indexMethod (index) {
            return index + 1;
        },
        dateFormat(row, column, cellValue, index){
             const daterc = row[column.property]
             return format(daterc,'YYYY-MM-DD HH:mm');
        },

        // 打开处理告警对话框
        dealwith () {
          if (this.multipleSelection.length > 0) {
            this.dialogVisible = true
            this.dealwithParams.type = this.activeName === 'first' ? 1 : 2
          } else {
            this.$message.error('请选择要处理的选项')
          }
        },

        // 处理告警
        dealwithAlarm () {
          this.dealwithParams.saveItem = this.multipleSelection.map(item => {
            return {
                "eventitemid": item.eventItemId,
                "id": item.id,
                "eventtime": item.eventTime,
                ...this.form
              }
            })
            this.sendPut()          
        },

        sendPut() {
          this.$request('dealAlarm', this.dealwithParams).then(res => {
            console.log(res)
            if (res.data.returnCode === 0) {
              this.dialogVisible = false
              this.$message.success('操作成功')
              this.queryAlarm()
            } else {
              this.$message.success('操作失败')
            }
          })
        },

        handleClick (tab, event) {

            if(tab.name == 'first'){
                this.queryAlarmParam.type = 1;
                // this.queryAlarmParam.id = 17;
                 this.tableData = [];
                this.queryAlarm();
            } else if(tab.name == 'second'){
              this.queryAlarmParam.type = 2;
                // this.queryAlarmParam.id = 14699;
                 this.tableData = [];
                this.queryAlarm();
            }
        },
    }
};
</script>

<style lang='scss' scope>
  .alarmDetails {
    padding: 10px;
    background-color: #fff;
    .green {
      color: green;
    }
    .red {
      color: red;
    }
    .alarmDetails_top {
       font-size: 14px;
       .el-select {
         .el-input__inner {
           border-radius:0 4px 4px 0;
         }
       }
      .alarm_dealstatus {
        margin-left: 10px;
      }
      .alarm_time_filter {
        margin-left: 10px;
        .el-range-editor.el-input__inner {
          border-radius: 4px ;
        }
      }
      .el-button {
        margin-left: 10px;
        font-size: 14px;
      }
      .export {
          border: 1px solid rgb(64,169,255);
          color: rgb(64,169,255);
          background-color: rgb(236,245,255);
      }
       .title {
          display: inline-block;
          border: 1px solid #DCDFE6;
          height: 40px;
          line-height: 40px;
          box-sizing: border-box;
          border-right: none;
          padding:0 10px;
          border-radius: 4px 0 0 4px;
        }
      
       
      .clearfix:after {
        display: block;
        clear: both;
        content: '';
        visibility:hidden;
        height: 0;
      }
      .clearfix {
        *zoom: 1;
      }
    }
    .alarmDetails_table {
      margin: 20px 0 30px 0 ;
      
    }
    .alarmDetails_pagination {
      .el-button {
        margin-left: 10px;
        font-size: 14px;
      }
    }
    .el-dialog {
      .el-dialog__header {
        padding: 10px 10px 10px 20px;
        border-bottom: 1px solid #DCDFE6;
        .el-dialog__title {
          font-size: 16px;
        }
        .el-dialog__headerbtn {
          top: 13px;
        }
      }
      .el-dialog__body {
        padding: 10px 20px 10px 20px;
        border-bottom: 1px solid #DCDFE6;
        .el-form-item__label {
          text-align: left;
          font-size: 14px;
        }
        .el-input {
          font-size: 14px;
        }
      }
      .el-dialog__footer {
        padding: 10px 20px;
       
      }
    }
  }
</style>
