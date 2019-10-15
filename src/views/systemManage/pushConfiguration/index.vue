<template>
  <div class="pushConfiguration">
    <el-button type="primary" icon="el-icon-setting" @click="configVisible = true">{{$t('pushConfiguration.alarmSet')}}</el-button>
    <el-button type="primary" icon="el-icon-edit" @click="editVisible = true">{{$t('common.edit')}}</el-button>
    <div class="pushConfiguration_table">
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
           >
            <template slot-scope="scope">{{ scope.row.no }}</template>
          </el-table-column>
          <el-table-column
             :label="$t('pushConfiguration.alarmID')"
            >
            <template slot-scope="scope">{{ scope.row.alarmID }}</template>
          </el-table-column>
          <el-table-column
            prop="alarmName"
             :label="$t('pushConfiguration.alarmName')"
           >
          </el-table-column>
          <el-table-column
            prop="alarmReason"
            :label="$t('pushConfiguration.alarmReason')"
            show-overflow-tooltip
            >
          </el-table-column>
       </el-table>
    </div>

     <div class="alarmDetails_pagination clearfix">
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

    <!-- 编辑弹框 -->
    <el-dialog
      title="编辑"
      :visible.sync="editVisible"
      width="490px"
      class="editDialog"
     >
      <el-form ref="form" :model="form" label-width="80px">
          <el-form-item :label="$t('pushConfiguration.alarmID')">
             <el-input v-model="form.alarmID"></el-input>
          </el-form-item>
          <el-form-item :label="$t('pushConfiguration.alarmName')">
             <el-input v-model="form.alarmName"></el-input>
          </el-form-item>
           <el-form-item :label="$t('pushConfiguration.alarmReason')">
              <el-input type="textarea" v-model="form.alarmReason"></el-input>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editVisible = false">确 定</el-button>
      </span>
  </el-dialog>

  <!-- 告警配置弹框 -->
  <el-dialog
      :title="$t('pushConfiguration.alarmSet')"
      :visible.sync="configVisible"
      width="900px"
      class="editDialog configDialog"
     >
      <el-form ref="form" :model="form" label-width="80px">
           <el-select v-model="userVal" multiple :placeholder="$t('pushConfiguration.selectAlarmUser')" style="width: 100%;">
              <el-option
                v-for="item in userLists"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <el-table
              ref="multipleTable"
              :data="tableData1"
              tooltip-effect="dark"
              border
              style="width: 100%"
              height="340"
              @selection-change="handleSelectionChange1">
              <el-table-column
                :label="$t('common.serialNum')"
                type="index"
                :index="indexMethod"
                width="120"
               >
              </el-table-column>
              <el-table-column
                prop="alarmName"
                :label="$t('pushConfiguration.alarmName')"
               >
              </el-table-column>
              <el-table-column>
                <template slot="header" slot-scope="scope">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
                  <span>{{$t('pushConfiguration.SMSalarm')}}</span>
                </template>
                <template slot-scope="scope"><el-checkbox @change="SMSchange(scope.row)" v-model="scope.row.checked"></el-checkbox></template>
              </el-table-column>
               <el-table-column>
                <template slot="header" slot-scope="scope">
                  <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2"></el-checkbox>
                  <span>{{$t('pushConfiguration.PCalarm')}}</span>
                </template>
                <template slot-scope="scope"><el-checkbox v-model="scope.row.PCchecked"></el-checkbox></template>
              </el-table-column>
              <el-table-column>
                <template slot="header" slot-scope="scope">
                  <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3" @change="handleCheckAllChange3"></el-checkbox>
                  <span>{{$t('pushConfiguration.WXalarm')}}</span>
                </template>
                <template slot-scope="scope"><el-checkbox v-model="scope.row.WXchecked"></el-checkbox></template>
              </el-table-column>
              <el-table-column>
                <template slot="header" slot-scope="scope">
                  <el-checkbox :indeterminate="isIndeterminate4" v-model="checkAll4" @change="handleCheckAllChange4"></el-checkbox>
                  <span>{{$t('pushConfiguration.APPalarm')}}</span>
                </template>
                <template slot-scope="scope"><el-checkbox v-model="scope.row.APPchecked"></el-checkbox></template>
              </el-table-column>
            </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" @click="editVisible = false">{{$t('common.yes')}}</el-button>
      </span>
  </el-dialog>
  </div>
</template>

<script>
export default {
    name: '',

    data () {
        return {
            tableData: [{
                no: 1,
                alarmID: '2019062801',
                alarmName: '名称1',
                alarmReason: '随便整点啥'
            }, {
                no: 2,
                alarmID: '2019062802',
                alarmName: '名称2',
                alarmReason: '随便整点啥'
            }, {
                no: 3,
                alarmID: '2019062803',
                alarmName: '名称3',
                alarmReason: '随便整点啥'
            }, {
                no: 4,
                alarmID: '2019062804',
                alarmName: '名称4',
                alarmReason: '随便整点啥'
            }, {
                no: 5,
                alarmID: '2019062805',
                alarmName: '名称5',
                alarmReason: '随便整点啥'
            }, {
                no: 6,
                alarmID: '2019062806',
                alarmName: '名称5',
                alarmReason: '随便整点啥'
            }, {
                no: 7,
                alarmID: '2019062807',
                alarmName: '名称5',
                alarmReason: '随便整点啥'
            }
            ],
            multipleSelection: [],
            currentPage: 1,
            editVisible: false,
            form: {
                alarmID: '2019062801',
                alarmName: '名称5',
                alarmReason: '随便整点啥'
            },
            configVisible: false,
            userVal: '',
            userLists: [
                {
                    value: 'option1',
                    label: '用户1'
                },
                {
                    value: 'option2',
                    label: '用户2'
                },
                {
                    value: 'option3',
                    label: '用户3'
                }
            ],
            tableData1: [{
                alarmName: '告警名称1',
                checked: true,
                PCchecked: true,
                WXchecked: true,
                APPchecked: true
            }, {
                alarmName: '告警名称2',
                checked: true,
                PCchecked: true,
                WXchecked: true,
                APPchecked: true
            }, {
                alarmName: '告警名称3',
                checked: true,
                PCchecked: true,
                WXchecked: true,
                APPchecked: true
            }, {
                alarmName: '告警名称4',
                checked: true,
                PCchecked: true,
                WXchecked: true,
                APPchecked: true
            }, {
                alarmName: '告警名称1',
                checked: true,
                PCchecked: true,
                WXchecked: true,
                APPchecked: true
            }, {
                alarmName: '告警名称1',
                checked: true,
                PCchecked: true,
                WXchecked: true,
                APPchecked: true
            }, {
                alarmName: '告警名称1',
                checked: true,
                PCchecked: true,
                WXchecked: true,
                APPchecked: true
            }
            ],
            multipleSelection1: [],
            multipleSelection2: [],
            isIndeterminate: false,
            isIndeterminate2: false,
            isIndeterminate3: false,
            isIndeterminate4: false,
            checkAll: true,
            checkAll2: true,
            checkAll3: true,
            checkAll4: true,
            checked: true,
            SMScheckVal: [],
            PCcheckVal: [],
            WXcheckVal: [],
            APPcheckVal: []
        };
    },
    computed: {
        newChecked () {
            this.SMScheckVal = [];
            for (var i = 0; i < this.tableData1.length; i++) {
                if (this.tableData1[i].checked) {
                    this.SMScheckVal.push(this.tableData1[i].checked);
                }
            }
            if (this.SMScheckVal.length != this.tableData1.length) {
                this.isIndeterminate = true;
            } else {
                this.isIndeterminate = false;
            }
        },
        newChecked2 () {
            this.PCcheckVal = [];
            for (var i = 0; i < this.tableData1.length; i++) {
                if (this.tableData1[i].PCchecked) {
                    this.PCcheckVal.push(this.tableData1[i].PCchecked);
                }
            }
            if (this.PCcheckVal.length != this.tableData1.length) {
                this.isIndeterminate2 = true;
            } else {
                this.isIndeterminate2 = false;
            }
        },
        newChecked3 () {
            this.WXcheckVal = [];
            for (var i = 0; i < this.tableData1.length; i++) {
                if (this.tableData1[i].WXchecked) {
                    this.WXcheckVal.push(this.tableData1[i].WXchecked);
                }
            }
            if (this.WXcheckVal.length != this.tableData1.length) {
                this.isIndeterminate3 = true;
            } else {
                this.isIndeterminate3 = false;
            }
        },
        newChecked4 () {
            this.APPcheckVal = [];
            for (var i = 0; i < this.tableData1.length; i++) {
                if (this.tableData1[i].APPchecked) {
                    this.APPcheckVal.push(this.tableData1[i].APPchecked);
                }
            }
            if (this.APPcheckVal.length != this.tableData1.length) {
                this.isIndeterminate4 = true;
            } else {
                this.isIndeterminate4 = false;
            }
        }
    },
    watch: {
        newChecked () {},
        newChecked2 () {},
        newChecked3 () {},
        newChecked4 () {}
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
        handleSelectionChange1 (val) {
            this.multipleSelection1 = val;
        },
        handleSelectionChange2 (val) {
            this.multipleSelection2 = val;
        },

        indexMethod (index) {
            return index + 1;
        },
        handleCheckAllChange () {
            if (!this.isIndeterminate) {
                this.isIndeterminate = true;
                this.SMScheckVal = [];
                for (var i = 0; i < this.tableData1.length; i++) {
                    if (this.tableData1[i].checked) {
                        this.tableData1[i].checked = false;
                    }
                }
            } else if (this.isIndeterminate) {
                this.checkAll = true;
                this.isIndeterminate = false;
                this.SMScheckVal = [];
                for (var i = 0; i < this.tableData1.length; i++) {
                    if (!this.tableData1[i].checked) {
                        this.tableData1[i].checked = true;
                    }
                }
            }
        },
        SMSchange (val) {
        // console.log('SMSchange',val)
        },
        handleCheckAllChange2 () {
            if (!this.isIndeterminate2) {
                this.isIndeterminate2 = true;
                this.PCcheckVal = [];
                for (var i = 0; i < this.tableData1.length; i++) {
                    if (this.tableData1[i].PCchecked) {
                        this.tableData1[i].PCchecked = false;
                    }
                }
            } else if (this.isIndeterminate2) {
                this.checkAll2 = true;
                this.isIndeterminate2 = false;
                this.PCcheckVal = [];
                for (var i = 0; i < this.tableData1.length; i++) {
                    if (!this.tableData1[i].PCchecked) {
                        this.tableData1[i].PCchecked = true;
                    }
                }
            }
        },
        handleCheckAllChange3 () {
            if (!this.isIndeterminate3) {
                this.isIndeterminate3 = true;
                this.WXcheckVal = [];
                for (var i = 0; i < this.tableData1.length; i++) {
                    if (this.tableData1[i].WXchecked) {
                        this.tableData1[i].WXchecked = false;
                    }
                }
            } else if (this.isIndeterminate3) {
                this.checkAll3 = true;
                this.isIndeterminate3 = false;
                this.WXcheckVal = [];
                for (var i = 0; i < this.tableData1.length; i++) {
                    if (!this.tableData1[i].WXchecked) {
                        this.tableData1[i].WXchecked = true;
                    }
                }
            }
        },
        handleCheckAllChange4 () {
            if (!this.isIndeterminate4) {
                this.isIndeterminate4 = true;
                this.APPcheckVal = [];
                for (var i = 0; i < this.tableData1.length; i++) {
                    if (this.tableData1[i].APPchecked) {
                        this.tableData1[i].APPchecked = false;
                    }
                }
            } else if (this.isIndeterminate4) {
                this.checkAll4 = true;
                this.isIndeterminate4 = false;
                this.APPcheckVal = [];
                for (var i = 0; i < this.tableData1.length; i++) {
                    if (!this.tableData1[i].APPchecked) {
                        this.tableData1[i].APPchecked = true;
                    }
                }
            }
        }
    }
};
</script>

<style lang='scss' scope>
.pushConfiguration {
    padding: 10px;
    padding-bottom: 20px;
    background-color: #fff;
    .el-button  {
      padding: 8px 20px;
    }
    .pushConfiguration_table {
      margin: 20px 0;
    }
    .editDialog {
      .el-dialog__header {
        border-bottom: 1px solid rgb(220, 223, 230);
      }
      .el-dialog__body {
        border-bottom: 1px solid rgb(220, 223, 230);
      }
      .el-dialog__footer {
        padding-top: 20px;
      }
      .el-dialog__title {
        font-size: 16px;
      }
      .el-form-item__label {
        text-align: left;
      }
    }
    .configDialog {
    //   .el-table th {
    //     padding: 0;
    //  }
     .el-table {
       margin-top: 20px;
     }
     .el-checkbox {
       margin-right: 5px;
     }
    }
  }
</style>
