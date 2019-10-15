<template>
  <div class="alarmDetails">
    <div class="alarmDetails_top">
      <div class="alarm_name pull-left">
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
       <el-button type="primary export">{{$t('common.export')}}</el-button>
    </div>

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
            width="90">
            <template slot-scope="scope">{{ scope.row.no }}</template>
          </el-table-column>
          <el-table-column
             :label="$t('common.deviceName')"
            >
            <template slot-scope="scope">{{ scope.row.disc }}</template>
          </el-table-column>
          <el-table-column
            prop="devId"
             :label="$t('alarmDetails.devID')"
           >
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('alarmDetails.alarmTime')"
            >
          </el-table-column>
          <el-table-column
            prop="name"
           :label="$t('alarmDetails.reportTime')"
            >
          </el-table-column>
          <el-table-column
            prop="name"
           :label="$t('alarmDetails.alarmName')"
           >
          </el-table-column>
          <el-table-column
            prop="name"
             :label="$t('alarmDetails.data')"
            >
          </el-table-column>
          <el-table-column
            prop="name"
             :label="$t('alarmDetails.dealStatus')"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('alarmDetails.dealOwner')"
           >
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('alarmDetails.dealTime')"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('alarmDetails.dealContent')"
            show-overflow-tooltip>
          </el-table-column>
       </el-table>
    </div>
    
    <div class="alarmDetails_pagination clearfix">
        <el-button type="primary" class="pull-left" @click="dealwith()">{{$t('alarmDetails.dealImmediate')}}</el-button>
        <el-pagination
            class="pull-right"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout=" prev, pager, next, sizes"
            :total="100">
      </el-pagination>
    </div>
     
    <!-- 立即处理弹框 -->
    <el-dialog
      :title="$t('alarmDetails.dealImmediate')"
      :visible.sync="dialogVisible"
       width="400px"
      >
      <el-form ref="form" :model="form" label-width="80px">
          <el-form-item :label="$t('alarmDetails.resolveStatus')">
            <el-radio-group v-model="form.status">
              <el-radio :label="$t('alarmDetails.resolved')"></el-radio>
              <el-radio :label="$t('alarmDetails.unresolve')"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('alarmDetails.dealTime')">
             <el-input v-model="form.time"></el-input>
          </el-form-item>
          <el-form-item :label="$t('alarmDetails.dealOwner')">
             <el-input v-model="form.user"></el-input>
          </el-form-item>
           <el-form-item :label="$t('alarmDetails.dealContent')">
              <el-input type="textarea" v-model="form.content"></el-input>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" @click="dialogVisible = false">{{$t('common.yes')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name: '',

    data () {
        return {
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
            value: '补光灯运作超时',
            options1: [
                {
                    value: '选项1',
                    label: '已解决'
                },
                {
                    value: '选项2',
                    label: '未解决'
                }
            ],
            value1: '已解决',
            time: '',
            tableData: [{
                no: 1,
                date: '2016-05-03',
                disc: '设备一号',
                devId: '0001',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                no: 2,
                date: '2016-05-02',
                disc: '设备一号',
                devId: '0001',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                no: 3,
                date: '2016-05-04',
                disc: '设备一号',
                devId: '0001',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                no: 4,
                date: '2016-05-01',
                disc: '设备一号',
                devId: '0001',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                no: 5,
                date: '2016-05-08',
                disc: '设备一号',
                devId: '0001',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                no: 6,
                date: '2016-05-06',
                disc: '设备一号',
                devId: '0001',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                no: 7,
                date: '2016-05-07',
                disc: '设备一号',
                devId: '0001',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                no: 8,
                date: '2016-05-07',
                disc: '设备一号',
                devId: '0001',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                no: 9,
                date: '2016-05-07',
                disc: '设备一号',
                devId: '0001',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                no: 10,
                date: '2016-05-07',
                disc: '设备一号',
                devId: '0001',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            multipleSelection: [],
            currentPage: 1,
            dialogVisible: false,
            form: {
                status: '已处理',
                time: '',
                user: '',
                content: ''
            }
        };
    },

    methods: {
        handleSelectionChange (val) {
            this.multipleSelection = val;
        },
        handleSizeChange (val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange (val) {
            console.log(`当前页: ${val}`);
        },
        dealwith () {
            this.dialogVisible = true;
        }
    }
};
</script>

<style lang='scss' scope>
  .alarmDetails {
    padding: 10px;
    background-color: #fff;
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
