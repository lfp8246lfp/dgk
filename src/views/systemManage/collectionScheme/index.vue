<template>
  <div class="collectionScheme">
    <div class="btntop">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="add">新增</el-button>
      <el-button type="primary" icon="el-icon-edit" size="small">修改</el-button>
      <el-button type="primary" icon="el-icon-delete" size="small">删除</el-button>
    </div>
    <el-table
      :data="eleData"
      border
      :header-cell-style="{background:'#F2F2F2',color:'rgb(51,51,51)'}"
      style="width: 100%; margin-top: 20px;font-size: 14px"
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" :label="$t('collectionScheme.schemeName')"></el-table-column>
      <el-table-column prop="name" :label="$t('collectionScheme.protocolType')"></el-table-column>
      <el-table-column prop="amount1" :label="$t('collectionScheme.startTime')"></el-table-column>
      <el-table-column prop="amount2" :label="$t('deviceManage.note')"></el-table-column>
      <el-table-column prop="amount3" :label="$t('common.operate')">
        <template slot-scope="scope">
          <el-button type="text" @click="detailshow(scope)">查看明细</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="$t('collectionScheme.addscheme')" :visible.sync="colldialog" width="500px">
      <el-form :model="form" class="demo-form-inline" ref="form" label-width="110px">
        <el-form-item :label="$t('collectionScheme.schemeName')" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('collectionScheme.protocolType')" prop="type">
          <el-select v-model="form.type" style="width: 100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('deviceManage.note')" prop="note">
          <el-input type="textarea" v-model="form.note" resize="none" :rows="5"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="colldialog = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" @click="colldialog = false">{{$t('common.yes')}}</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="$t('collectionScheme.schemeDetail')" :visible.sync="detaildialog" width="1000px">
      <div class="btntop">
        <el-button type="primary" icon="el-icon-plus" @click="addDetail">新增</el-button>
        <el-button type="primary" icon="el-icon-edit">修改</el-button>
        <el-button type="primary" icon="el-icon-delete">删除</el-button>
      </div>

      <el-table
        :data="detailData"
        border
        :header-cell-style="{background:'#F2F2F2',color:'rgb(51,51,51)'}"
        style="width: 100%; margin-top: 20px;font-size: 14px"
        @selection-change="handleSelectionChange"
      >
        >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" :label="$t('common.serialNum')"></el-table-column>
        <el-table-column prop="name" :label="$t('collectionScheme.dataType')"></el-table-column>
        <el-table-column prop="amount1" :label="$t('collectionScheme.periodicType')"></el-table-column>
        <el-table-column prop="amount2" :label="$t('collectionScheme.baselineTime')"></el-table-column>
        <el-table-column prop="amount3" :label="$t('collectionScheme.periodicInterval')"></el-table-column>
        <el-table-column prop="amount3" :label="$t('collectionScheme.maxReadingCycle')"></el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="detaildialog = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" @click="detaildialog = false">{{$t('common.yes')}}</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="$t('collectionScheme.addschemeDetail')" :visible.sync="detailadd" width="500px">
      <el-form :model="detailForm" class="demo-form-inline" ref="detailForm" label-width="110px">
        <el-form-item :label="$t('collectionScheme.detailName')" prop="name">
          <el-input v-model="detailForm.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('collectionScheme.dataType')" prop="type">
          <el-select v-model="detailForm.type" style="width: 100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('collectionScheme.deviceType')" prop="type">
          <el-select v-model="detailForm.type" style="width: 100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('collectionScheme.periodicInterval')" prop="type">
          <el-select v-model="detailForm.type" style="width: 100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('collectionScheme.maxReadingCycle')" prop="type">
          <el-select v-model="detailForm.type" style="width: 100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailadd = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" @click="detailadd = false">{{$t('common.yes')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name: '',

    data () {
        return {
            eleData: [
                {
                    id: '12987122',
                    name: '类型',
                    amount1: '2019-03-12',
                    amount2: '3.2',
                    amount3: 10
                },
                {
                    id: '12987123',
                    name: '类型',
                    amount1: '2019-03-12',
                    amount2: '11111',
                    amount3: 12
                },
                {
                    id: '12987124',
                    name: '类型',
                    amount1: '2019-03-12',
                    amount2: '1111',
                    amount3: 9
                }
            ],
            detailData: [
                {
                    id: '1',
                    name: '15分钟数据',
                    amount1: '分钟',
                    amount2: '2019-03-23',
                    amount3: '15分钟'
                },
                {
                    id: '2',
                    name: '15分钟数据',
                    amount1: '分钟',
                    amount2: '2019-03-23',
                    amount3: '15分钟'
                }
            ],
            colldialog: false,
            detaildialog: false,
            detailadd: false,
            form: {
                name: '',
                type: '',
                note: ''
            },
            detailForm: {

            }
        };
    },

    methods: {
        handleSelectionChange () {},
        add () {
            this.colldialog = true;
        },
        detailshow () {
            this.detaildialog = true;
        },
        addDetail () {
            this.detailadd = true;
        }
    }
};
</script>

<style lang='scss' scope>
.collectionScheme {
  padding: 10px;
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
</style>
