<template>
  <div class="devicetype clearfix">
    <el-row>
      <el-button type="primary" size="small" @click="tableDe">{{ $t('common.delete')}}</el-button>
      <el-button type="primary" size="small" @click="tableAdd">{{ $t('common.add')}}</el-button>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;margin-top: 20px;"
      border
      row-key="id"
      :header-cell-style="{background:'rgb(243,243,243)'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column prop="alias" :label="$t('devicetype.alias')" width="180"></el-table-column>
      <el-table-column prop="type" :label="$t('devicetype.icon')">
          <template slot-scope="scope">
           <img :src="scope.row.type|getDevTypeIcon" alt="">
          </template>
      </el-table-column>
      <el-table-column prop="communicationType" :label="$t('devicetype.commType')">
        <template slot-scope="scope">{{ scope.row.communicationType | changeCommType}}</template>
      </el-table-column>
      <el-table-column prop="type" :label="$t('devicetype.devType')">
        <template slot-scope="scope">{{changeDevType(scope.row.type)}}</template>
      </el-table-column>
      <el-table-column prop="appType" :label="$t('devicetype.applicationType')">
        <template slot-scope="scope">{{ scope.row.appType | changeAppType}}</template>
      </el-table-column>
      <el-table-column prop="ua" :label="$t('devicetype.ratedCurrent')"></el-table-column>
      <el-table-column prop="ia" :label="$t('devicetype.ratedVoltage')"></el-table-column>
      <el-table-column prop="pa" :label="$t('devicetype.ratedPower')"></el-table-column>
      <el-table-column prop="address" :label="$t('common.operate')">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.$index, scope.row)">{{ $t('common.edit')}}</el-button>
          <el-button type="text" @click="dele(scope.$index, scope.row)">{{ $t('common.delete')}}</el-button>
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
    <el-dialog :title="conTitle" :visible.sync="dialogVisible" width="25%" class="device_dialog">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item :label="$t('devicetype.classifyAlias')">
          <el-input v-model="form.alias"></el-input>
        </el-form-item>
        <el-form-item :label="$t('devicetype.commType')">
          <el-select
            v-model="form.communicationType"
            :placeholder="$t('devicetype.selectCommtype')"
            style="width:100%"
          >
            <el-option
              v-for="item in commType"
              :value="item.code"
              :key="item.disc"
              :label="$t(item.disc)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('devicetype.devType')">
          <el-select
            v-model="form.type"
            :placeholder="$t('devicetype.selectDevtype')"
            style="width:100%"
          >
            <el-option
              v-for="item in deviceType"
              :value="item.code"
              :key="item.disc"
              :label="item.disc"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('devicetype.applicationType')">
          <el-select
            v-model="form.appType"
            :placeholder="$t('devicetype.selectApptype')"
            style="width:100%"
          >
            <el-option
              v-for="item in appType"
              :value="item.code"
              :key="item.disc"
              :label="$t(item.disc)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('devicetype.ratedCurrent1')">
          <el-input v-model="form.ua"></el-input>
        </el-form-item>
        <el-form-item :label="$t('devicetype.ratedVoltage1')">
          <el-input v-model="form.ia"></el-input>
        </el-form-item>
        <el-form-item :label="$t('devicetype.ratedPower1')">
          <el-input v-model="form.pa"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width:100%">{{btnName}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
    components: {},
    data () {
        return {
            safePage: {
                pageNum: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            total: 0,
            conTitle: this.$t('devicetype.addDevType'),
            dialogVisible: false,
            form: {
                alias: '',
                communicationType: '',
                type: '',
                appType: '',
                ua: '',
                ia: '',
                pa: ''
            },
            commType: [],
            deviceType: [],
            appType: [],
            delArr: [],
            btnName: this.$t('common.add')
        };
    },
    mounted () {
        this.getdeviceTypeData();
        this.getCommType();
        this.getDeviceType();
        this.getAppType();
    },
    methods: {
        getdeviceTypeData () {
            this.$request('queryRtuTypeList', {params: this.safePage }).then(res => {
                console.log('getdeviceTypeData', res);
                this.tableData = res.data.pobRtuTypes;
                this.total = res.data.total;
            });
        },
        // 获取通讯类型
        getCommType () {
            this.$request('getComboDataByParam', {params: {
                comboId: 3
            }}).then(res => {
                this.commType = res.data.comboData;
            });
        },
        // 获取设备类型
        getDeviceType () {
            this.$request('getComboDataByParam', {params: {
                comboId: 1
            }}).then(res => {
                
                this.deviceType = res.data.comboData;
            });
        },
        // 获取应用类型
        getAppType () {
            this.$request('getComboDataByParam', {params: {
                comboId: 2
            }}).then(res => {
                this.appType = res.data.comboData;
            });
        },
        tableDe () {
            const h = this.$createElement;
            if (this.multipleSelection.length == 0) {
                this.$notify({
                    title: this.$t('devicetype.alarm'),
                    message: this.$t('devicetype.selectData'),
                    type: 'warning'
                });
            } else {
                this.delArr = [];
                this.multipleSelection.forEach(item => {
                    this.delArr.push(item.typeNo);
                });
                this.$confirm(
                    this.$t('areaManage.deleteTip'),
                    this.$t('areaManage.reminder'),
                    {
                        confirmButtonText: this.$t('common.yes'),
                        cancelButtonText: this.$t('common.cancel'),
                        type: 'warning'
                    }
                ).then(() => {
                    this.deleteFunc(this.delArr);
                });
            }
        },
        tableAdd () {
            this.dialogVisible = true;
            this.conTitle = this.$t('devicetype.addDevType');
            this.btnName = this.$t('common.add');
            this.form = {
                alias: '',
                communicationType: '',
                type: '',
                appType: '',
                ua: '',
                ia: '',
                pa: ''
            };
        },
        edit (index, row) {
            this.dialogVisible = true;
            this.form = row;
            this.conTitle = this.$t('devicetype.editType');
            this.btnName = this.$t('common.edit');
        },
        dele (index, row) {
            this.delArr = [];
            this.delArr.push(row.typeNo);
            this.$confirm(
                this.$t('areaManage.deleteTip'),
                this.$t('areaManage.reminder'),
                {
                    confirmButtonText: this.$t('common.yes'),
                    cancelButtonText: this.$t('common.cancel'),
                    type: 'warning'
                }
            ).then(() => {
                this.deleteFunc(this.delArr);
            }).catch(() => {});
        },
        deleteFunc (delArr) {
            this.$request('deleteRtuType', {
                typeNos: delArr
            }).then(res => {
                if (res.data.returnCode == 0) {
                    this.$message({
                        title: this.$t('common.tip'),
                        message: this.$t('common.deleteSuccess'),
                        type: 'success'
                    });
                     this.getdeviceTypeData();
                } else {
                    this.$message({
                        title: this.$t('common.tip'),
                        message: res.data.returnMsg,
                        type: 'warning'
                    });
                }
                // this.getdeviceTypeData();
            });
        },
        onSubmit () {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    const apiName = this.form.typeNo ? 'updateRtuType' : 'addRtuType';
                    this.$request(apiName, this.form).then(res => {
                        if (res.data.returnCode == 0) {
                            this.$message({
                                title: this.$t('common.tip'),
                                message: this.$t('common.operatorSuccess'),
                                type: 'success'
                            });
                            this.dialogVisible = false;
                            this.$refs['form'].resetFields();
                            this.getdeviceTypeData();
                        }
                    });
                }
            });
        },
        // 批量删除
        handleSelectionChange (val) {
            this.multipleSelection = val;
        },
        handleSizeChange (val) {
            this.safePage.pageSize = val;
            this.getdeviceTypeData();
        },
        handleCurrentChange (val) {
            this.safePage.pageNum = val;
            this.getdeviceTypeData();
        },
        changeDevType (value) {
            for (let i = 0; i < this.deviceType.length; i++) {
                if (this.deviceType[i].code == value) {
                    return this.deviceType[i].disc;
                }
            }
        }
    }
};
</script>

<style lang="scss" scope>
.devicetype {
  padding: 10px;
  background-color: #fff;
  .device_dialog {
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
  .cell {
    img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
