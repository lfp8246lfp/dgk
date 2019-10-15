<template>
  <div class="equipmentInspection">
    <div class="perceptionData_top">
        <el-select v-model="value" :placeholder="$t('common.pleaseSelect')" class="selectBox">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="inputVal" :placeholder="$t('equipmentInspection.input')"></el-input>
        <el-button type="primary">{{$t('common.query')}}</el-button>
    </div>

    <div class="perceptionData_table">
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
                prop="devName"
                 :label="$t('common.deviceName')">
              </el-table-column>
              <el-table-column
                prop="orderNum"
                :label="$t('equipmentInspection.devID')">
              </el-table-column>
              <el-table-column
                prop="superior"
                :label="$t('equipmentInspection.installAddress')">
              </el-table-column>
              <el-table-column
                prop="superior"
                :label="$t('equipmentInspection.area')">
              </el-table-column>
              <el-table-column
                prop="number"
                :label="$t('equipmentInspection.inspectionContent')">
              </el-table-column>
               <el-table-column
                prop="user"
                :label="$t('equipmentInspection.inspectionUser')">
              </el-table-column>
               <el-table-column
                prop="dataTime"
                :label="$t('equipmentInspection.inspectionTime')">
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
    </div>

  </div>
</template>

<script>
export default {
    name: '',

    data () {
        return {
            options: [{
                value: '选项1',
                label: '按设备ID'
            }, {
                value: '选项2',
                label: '按设备名称'
            }],
            value: '',
            inputVal: '',
            tableData: [{
                orderNum: 1,
                devName: '设备A',
                superior: '区域A',
                devType: '烟感',
                dataTime: '2019-06-13 06:00:00',
                number: '39.8 ℃',
                devStatus: '正常',
                user: 'statesky'
            }, {
                orderNum: 2,
                devName: '设备B',
                superior: '区域A',
                devType: '水压',
                dataTime: '2019-06-13 06:00:00',
                number: '0.1kPa',
                devStatus: '正常',
                operator: '查看历史数据'
            }, {
                orderNum: 3,
                devName: '设备C',
                superior: '区域A',
                devType: '线路温度传感器',
                dataTime: '2019-06-13 06:00:00',
                number: '0.1kPa',
                devStatus: '异常',
                operator: '查看历史数据'
            }, {
                orderNum: 4,
                devName: '设备C',
                superior: '区域A',
                devType: '漏电传感器',
                dataTime: '2019-06-13 06:00:00',
                number: '0.1A',
                devStatus: '正常',
                operator: '查看历史数据'
            }, {
                orderNum: 5,
                devName: '设备A',
                superior: '区域A',
                devType: '烟感',
                dataTime: '2019-06-13 06:00:00',
                number: '39.8 ℃',
                devStatus: '正常',
                operator: '查看历史数据'
            }, {
                orderNum: 6,
                devName: '设备A',
                superior: '区域A',
                devType: '烟感',
                dataTime: '2019-06-13 06:00:00',
                number: '39.8 ℃',
                devStatus: '正常',
                operator: '查看历史数据'
            }, {
                orderNum: 7,
                devName: '设备A',
                superior: '区域A',
                devType: '烟感',
                dataTime: '2019-06-13 06:00:00',
                number: '39.8 ℃',
                devStatus: '正常',
                operator: '查看历史数据'
            }, {
                orderNum: 8,
                devName: '设备A',
                superior: '区域A',
                devType: '烟感',
                dataTime: '2019-06-13 06:00:00',
                number: '39.8 ℃',
                devStatus: '正常',
                operator: '查看历史数据'
            }, {
                orderNum: 9,
                devName: '设备A',
                superior: '区域A',
                devType: '烟感',
                dataTime: '2019-06-13 06:00:00',
                number: '39.8 ℃',
                devStatus: '正常',
                operator: '查看历史数据'
            }, {
                orderNum: 10,
                devName: '设备A',
                superior: '区域A',
                devType: '烟感',
                dataTime: '2019-06-13 06:00:00',
                number: '39.8 ℃',
                devStatus: '正常',
                operator: '查看历史数据'
            }

            ],
            currentPage: 1
        };
    },

    methods: {
        handleSizeChange (val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange (val) {
            console.log(`当前页: ${val}`);
        },
        check (index, row) {
            this.historicalVisible = true;
        }
    }
};
</script>

<style lang='scss' scope>
  .equipmentInspection {
    background-color: #fff;
    .perceptionData_top {
      background-color: #fff;
      height: 80px;
      line-height: 80px;
      padding-left: 20px;
      box-sizing: border-box;
      .el-input {
        width: 217px;
        margin-left: 10px;
      }
      .selectBox {
        .el-input {
          margin-left: 0;
        }
      }
      .el-button {
        margin-left: 10px;
      }
    }
    .perceptionData_table {
      margin: 10px;
      margin-top: 0;
      background-color: #fff;
      padding: 0 10px 20px 10px;
      p {
        .title {
          font-size: 18px;
          font-weight: 700;

        }
        .icon {
          display: inline-block;
          width: 25px;
          height: 25px;
          border-radius: 5px;
          line-height: 25px;
          background-color: rgb(236,243,252);
          text-align: center;
          cursor: pointer;
          .fa-upload {
            color: rgb(24,144,255);
            font-size: 7px;
          }
        }
      }
      .table {
        margin: 15px 0;
        // .el-table td {
        //   padding: 4px 0;
        // }
      }
    }
    .el-dialog__header {
      border-bottom: 1px solid #F7F7F7;
    }
    .el-dialog__title {
      font-size: 14px;
    }
    .el-dialog__body {
      padding: 10px 20px 20px;
      .el-input__inner {
        height: 30px;
        line-height: 30px;
      }
      .el-input__icon {
        height: 30px;
        line-height: 30px;
      }
      .el-date-editor .el-range-separator {
        line-height: 22px;
      }
      .el-date-editor--daterange.el-input__inner {
        width: 260px;
        margin-left: 8px;
      }
      .el-button {
        padding: 7px 10px;
        margin-left: 10px;
      }
      .export {
        background-color:rgb(236,245,255);
        color: rgb(24,144,255);
        border: 1px solid rgb(24,144,255);
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
      }
      .table {
        margin: 15px 0;
        .el-table .cell {
          line-height: 16px;
        }
        .pagination {
          margin-top: 15px;
        }
      }
    }
  }
</style>
