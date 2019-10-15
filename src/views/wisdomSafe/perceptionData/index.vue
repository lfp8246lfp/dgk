<template>
  <div class="perceptionData">
    <div class="perceptionData_top">
        <el-select v-model="value" :placeholder="$t('perceptionData.selectArea')" class="selectBox">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="inputVal" :placeholder="$t('perceptionData.searchDevName')"></el-input>
        <el-button type="primary">{{$t('common.query')}}</el-button>
    </div>

    <div class="perceptionData_table">
      <p class="clearfix">
        <span class="pull-left title">{{$t('perceptionData.devList')}}</span>
        <el-dropdown class="pull-right icon">
          <span class="el-dropdown-link">
            <i class="fa fa-upload" aria-hidden="true"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{$t('common.exportExcel')}}</el-dropdown-item>
            <el-dropdown-item>{{$t('perceptionData.exportPDF')}}</el-dropdown-item>
          </el-dropdown-menu>
       </el-dropdown>
      </p>
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
                prop="superior"
                :label="$t('perceptionData.area')">
              </el-table-column>
              <el-table-column
                prop="devType"
                :label="$t('perceptionData.devType')">
              </el-table-column>
              <el-table-column
                prop="dataTime"
                :label="$t('perceptionData.dataTime')">
              </el-table-column>
              <el-table-column
                prop="number"
                :label="$t('perceptionData.numercialVal')">
              </el-table-column>
              <el-table-column
                :label="$t('perceptionData.devStatus')">
                <template slot-scope="scope">
                  <span v-if="scope.row.devStatus=== '正常'" style="color: green">{{ scope.row.devStatus }}</span>
                  <span v-else style="color: red">{{ scope.row.devStatus }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="operator"
                 :label="$t('common.operate')">
                  <template slot-scope="scope">
                    <el-button type="text" @click="check(scope.$index, scope.row)">{{$t('common.operate')}}</el-button>
                  </template>
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

    <!-- 历史数据弹框 -->
    <el-dialog
      :title="$t('perceptionData.devDetails')"
      :visible.sync="historicalVisible"
      width="50%"
      >
      <el-select v-model="value1" :placeholder="$t('common.pleaseSelect')" style="width: 100px;">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker
        v-model="value2"
        type="daterange"
        :range-separator="$t('common.to')"
        :start-placeholder="$t('common.startDate')"
        :end-placeholder="$t('common.endDate')">
      </el-date-picker>
      <el-button type="primary">{{$t('common.query')}}</el-button>
      <!-- <el-button type="primary pull-right export">导出</el-button> -->
      <el-dropdown class="pull-right export">
        <span class="el-dropdown-link">
          {{$t('common.export')}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{$t('common.exportExcel')}}</el-dropdown-item>
          <el-dropdown-item>{{$t('perceptionData.exportPDF')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="table" v-if="value1=='2'">
        <el-table   
              :data="tableData1"
              border
              :header-cell-style="{background:'#F2F2F2',color:'rgb(51,51,51)'}"
              style="width: 100%;font-size: 14px">
                <el-table-column
                    prop="time"
                    :label="$t('common.time')">
                </el-table-column>
                <el-table-column
                    prop="number"
                    :label="$t('perceptionData.numercialVal')">
                </el-table-column>
                <el-table-column
                     :label="$t('perceptionData.status')">
                    <template slot-scope="scope">
                      <span v-if="scope.row.status=== '正常'" style="color: green">{{ scope.row.status }}</span>
                      <span v-else style="color: red">{{ scope.row.status }}</span>
                    </template>
                </el-table-column>
        </el-table>
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
      <div class="chart" v-else>
        <ve-line
        :data="chartData"
        height="500px"
        :legend-visible="false"
        :colors="colors"
        :settings="chartSettings"
        :extend="chartExtend"
        ></ve-line>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name: '',

    data () {
        return {
            options: [{
                value: '选项1',
                label: '萧山区'
            }, {
                value: '选项2',
                label: '西湖区'
            }, {
                value: '选项3',
                label: '上城区'
            }, {
                value: '选项4',
                label: '下城区'
            }, {
                value: '选项5',
                label: '滨江区'
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
                operator: '查看历史数据'
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
            currentPage: 1,
            historicalVisible: false,
            options1: [
                {
                    value: '1',
                    label: '折线图'
                },
                {
                    value: '2',
                    label: '列表'
                }
            ],
            value1: '2',
            value2: '',
            tableData1: [
                {
                    time: '2019-05-01 06：00：09',
                    number: '21.5℃',
                    status: '正常'
                }, {
                    time: '2019-05-01 06：00：09',
                    number: '21.5℃',
                    status: '正常'
                }, {
                    time: '2019-05-01 06：00：09',
                    number: '21.5℃',
                    status: '正常'
                }, {
                    time: '2019-05-01 06：00：09',
                    number: '21.5℃',
                    status: '正常'
                }, {
                    time: '2019-05-01 06：00：09',
                    number: '21.5℃',
                    status: '正常'
                }, {
                    time: '2019-05-01 06：00：09',
                    number: '21.5℃',
                    status: '正常'
                }, {
                    time: '2019-05-01 06：00：09',
                    number: '21.5℃',
                    status: '正常'
                }, {
                    time: '2019-05-01 06：00：09',
                    number: '21.5℃',
                    status: '正常'
                }
            ],
            chartData: {
                columns: ['日期', '温度'],
                rows: [
                    { 日期: '1/1', 温度: 22 },
                    { 日期: '1/2', 温度: 23 },
                    { 日期: '1/3', 温度: 13 },
                    { 日期: '1/4', 温度: 25 },
                    { 日期: '1/5', 温度: 18 },
                    { 日期: '1/6', 温度: 16 }
                ]
            },
            chartSettings: {
                area: true,
                yAxisName: ['(℃)']
            },
            colors: ['#2d86e1'],
            chartExtend: {
                xAxis: {
                    boundaryGap: false
                },
                grid: {
                    bottom: 0
                }
            }

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
  .perceptionData {
    .perceptionData_top {
      background-color: #fff;
      height: 80px;
      line-height: 80px;
      padding-left: 10px;
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
      background-color: #fff;
      padding: 10px 10px 20px 10px;
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
        .el-table td {
          padding: 4px 0;
        }
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
