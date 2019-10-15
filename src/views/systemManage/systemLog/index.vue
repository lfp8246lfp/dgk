<template>
  <div class="systemLog">
   <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane :label="$t('systemLog.loginLog')" name="loginLog">
      <el-date-picker
          v-model="dateVal"
          type="daterange"
          :range-separator="$t('common.to')"
          :start-placeholder="$t('common.startDate')"
          :end-placeholder="$t('common.endDate')">
      </el-date-picker>
      <el-button type="primary">{{$t('common.query')}}</el-button>

       <div class="table">
            <el-table   
              :data="tableData"
              border
              :header-cell-style="{background:'#F2F2F2',color:'rgb(51,51,51)'}"
              style="width: 100%;font-size: 14px">
              <el-table-column
                prop="orderNum"
                :label="$t('common.serialNum')"
                width="100">
              </el-table-column>
              <el-table-column
                prop="userAccount"
                 :label="$t('systemLog.userAccount')">
              </el-table-column>
              <el-table-column
                prop="dataTime"
                :label="$t('systemLog.logTime')">
              </el-table-column>
              <el-table-column
                prop="IP"
                :label="$t('systemLog.IP')">
              </el-table-column>
              <el-table-column
                prop="logType"
                :label="$t('systemLog.logType')">
              </el-table-column>
          </el-table> 
      </div>

      <div class="pagination clearfix">
           <el-pagination
              class="pull-right"
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="prev, pager, next, sizes"
              :total="100">
          </el-pagination>
        
      </div> 
    </el-tab-pane>
    <el-tab-pane :label="$t('systemLog.operateLog')" name="operateLog">
      <div class="operateLog pull-left">
        <span class="title pull-left">{{$t('systemLog.logType')}}</span>
        <el-select v-model="logVal" class="pull-left " style="width: 2.6rem">
            <el-option
              v-for="item in logTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              
            ></el-option>
        </el-select>
      </div>

       <el-date-picker
          v-model="dateVal"
          type="daterange"
          :range-separator="$t('common.to')"
          :start-placeholder="$t('common.startDate')"
          :end-placeholder="$t('common.endDate')">
      </el-date-picker>
      <el-button type="primary">{{$t('common.query')}}</el-button>

       <div class="table">
            <el-table   
              :data="tableData1"
              border
              :header-cell-style="{background:'#F2F2F2',color:'rgb(51,51,51)'}"
              style="width: 100%;font-size: 14px">
              <el-table-column
                prop="orderNum"
                :label="$t('common.serialNum')"
                width="100">
              </el-table-column>
              <el-table-column
                prop="userAccount"
                 :label="$t('systemLog.userAccount')">
              </el-table-column>
              <el-table-column
                prop="dataTime"
                :label="$t('systemLog.logTime')">
              </el-table-column>
              <el-table-column
                prop="logType"
                :label="$t('systemLog.logType')">
              </el-table-column>
               <el-table-column
                prop="content"
                :label="$t('systemLog.content')">
              </el-table-column>
          </el-table> 
      </div>

       <div class="pagination clearfix">
           <el-pagination
              class="pull-right"
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="prev, pager, next, sizes"
              :total="100">
          </el-pagination>
        
      </div> 
    </el-tab-pane>
   
  </el-tabs>
  </div>
</template>

<script>
export default {
    data () {
        return {
            activeName: 'loginLog',
            dateVal: '',
            tableData: [{
                orderNum: 1,
                userAccount: 'statesky',
                dataTime: '2019-06-13 06:00:00',
                IP: '127.0.1',
                logType: '登录'
            }, {
                orderNum: 2,
                userAccount: 'statesky',
                devType: '水压',
                dataTime: '2019-06-13 06:00:00',
                IP: '127.0.1',
                logType: '登录'
            }, {
                orderNum: 3,
                userAccount: 'statesky',
                dataTime: '2019-06-13 06:00:00',
                IP: '127.0.1',
                logType: '登录'
            }, {
                orderNum: 4,
                userAccount: 'statesky',
                dataTime: '2019-06-13 06:00:00',
                number: '0.1A',
                logType: '登录'
            }, {
                orderNum: 2,
                userAccount: 'statesky',
                devType: '水压',
                dataTime: '2019-06-13 06:00:00',
                IP: '127.0.1',
                logType: '登录'
            }, {
                orderNum: 3,
                userAccount: 'statesky',
                dataTime: '2019-06-13 06:00:00',
                IP: '127.0.1',
                logType: '登录'
            }, {
                orderNum: 4,
                userAccount: 'statesky',
                dataTime: '2019-06-13 06:00:00',
                number: '0.1A',
                logType: '登录'
            }
            ],
            currentPage: 1,
            logVal: '全部',
            logTypes: [{
                value: 'A',
                label: '全部'
            }, {
                value: 'B',
                label: '档案日志'
            }, {
                value: 'C',
                label: '设备日志'
            }
            ],
            tableData1: [{
                orderNum: 1,
                userAccount: 'statesky',
                dataTime: '2019-06-13 06:00:00',
                logType: '档案日志',
                content: '描述描述'
            }, {
                orderNum: 2,
                userAccount: 'statesky',
                dataTime: '2019-06-13 06:00:00',
                logType: '设备日志'
            }, {
                orderNum: 3,
                userAccount: 'statesky',
                dataTime: '2019-06-13 06:00:00',
                logType: '档案日志'
            }, {
                orderNum: 4,
                userAccount: 'statesky',
                dataTime: '2019-06-13 06:00:00',
                logType: '档案日志'
            }, {
                orderNum: 2,
                userAccount: 'statesky',
                dataTime: '2019-06-13 06:00:00',
                logType: '档案日志'
            }, {
                orderNum: 3,
                userAccount: 'statesky',
                dataTime: '2019-06-13 06:00:00',
                logType: '档案日志'
            }, {
                orderNum: 4,
                userAccount: 'statesky',
                dataTime: '2019-06-13 06:00:00',
                logType: '档案日志'
            }
            ]
        };
    },

    methods: {
        handleClick (tab, event) {
            // console.log(tab, event);
        },
        handleSizeChange (val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange (val) {
            console.log(`当前页: ${val}`);
        }
    }
};
</script>

<style lang='scss' scope>
.systemLog {
    padding: 10px 10px 20px 20px;
    background-color: #fff;
    .el-tabs__active-bar {
      height: 6px;
      background-color: rgb(45, 134,225);
      z-index: 2;
    }
    .el-tabs__header {
      height: 45px;
      padding: 0 0 20px;
    }
    .el-tabs__nav-wrap {
      height: 45px;
    }
    .el-tabs__nav {
      height: 45px;
    }
    .el-tabs__nav-wrap::after {
      height: 1px;
      bottom: 2px;
    }
    .el-button {
      margin-left: 18px;
    }
    .table {
      margin-top: 20px;
      padding-bottom: 20px;
    }
    .operateLog {
      margin-right: 20px;
      .el-select {
         .el-input__inner {
           border-radius:0 4px 4px 0;
         }
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
    }
  }
</style>
