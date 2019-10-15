<template>
  <div class="permissionConfiguration">
    <el-row>
      <el-col :span="4">
        <div class="top">
          <h1>{{ $t('permissionConfiguration.roleStructure')}}</h1>
          <el-tree
            :data="data"
            :props="defaultProps"
            node-key="id"
            ref="leftTreeNodes"
            @node-click="handleNodeClick"
            :default-expand-all="true"
            :expand-on-click-node="false"
          > 
            <span slot-scope="{ node, data }">
                <img :src="data.treeType|getPostTypeIcon" alt="">
                <span style="padding-left: 4px;">{{node.label}}</span>
            </span>
          </el-tree>
        </div>
      </el-col>

      <el-col :span="20">
        <div class="left">
          <div class="btns">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="add">{{ $t('common.add1')}}</el-button>
            <el-button type="primary" icon="el-icon-edit" size="small" @click="update">{{ $t('common.edit')}}</el-button>
            <el-button type="primary" icon="el-icon-delete" size="small" @click="deleteRole">{{ $t('common.delete')}}</el-button>
            <el-button type="primary" icon="el-icon-key" size="small" @click="empower">{{ $t('permissionConfiguration.authorize')}}</el-button>
          </div>

          <el-breadcrumb separator="/" style="margin-top:10px;">
            <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.index"> {{item}}</el-breadcrumb-item>
          </el-breadcrumb>

          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="disc" :label="$t('common.name')">
              <template slot-scope="scope">
                <img :src="scope.row.type|getPostTypeIcon" alt="">
                <span style="margin-left: 10px">{{ scope.row.disc }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createAccount" :label="$t('common.addAccount')"></el-table-column>
            <el-table-column prop="createTime" :label="$t('common.buildTime')" :formatter="dateFormat"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!-- 新建弹框 -->
    <el-dialog :title="$t('common.add1')" :visible.sync="addDialog" width="25%" class="addRole">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item :label="$t('devicetype.classifyAlias')">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">{{$t('permissionConfiguration.subDepartment')}}</el-radio>
            <el-radio :label="2">{{$t('permissionConfiguration.post')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('devicetype.classifyAlias')"  class="postName">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" @click="addRole">{{$t('common.yes')}}</el-button>
      </span>
    </el-dialog>

    <!-- 编辑弹框 -->
     <el-dialog :title="$t('common.edit')" :visible.sync="editDialog" width="25%" class="editRole">
      <el-form label-width="80px">
        <el-form-item :label="$t('devicetype.classifyAlias')"  class="postName">
          <el-input v-model="roleName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" @click="updateRole">{{$t('common.yes')}}</el-button>
      </span>
    </el-dialog>

  <!-- 授权弹框 -->
    <el-dialog :title="$t('permissionConfiguration.authorize')" :visible.sync="emDialog" width="45%" class="authorize">
      <el-row class="emtable">
        <el-col :span="12" class="menuBox">
          <h2 style="border-right:1px solid #eeeeee;">{{$t('permissionConfiguration.functionMenu')}}</h2>
          <div style="padding:0 14px; overflow: auto;">
            <el-tree
              :data="menuList"     
              show-checkbox
              node-key="id"
              ref="menuTree"
              @check="menuCheckChange"
              :default-expand-all="true"
              :expand-on-click-node="false"
              :default-checked-keys="menuCheckList">
            ></el-tree>
          </div>
        </el-col>
        <el-col :span="12" class="menuBox">
          <h2>{{$t('permissionConfiguration.projectTree')}}</h2>
          <div style="padding:0 14px; overflow: auto;" >
            <el-tree
              :data="treeList"
              show-checkbox
              node-key="code"
              ref="projectTree"
              @check="projectCheckChange"
              :default-expand-all="true"
              :expand-on-click-node="false"
              :default-checked-keys="treeCheckList"
            ></el-tree>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="emDialog = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" @click="checkAuthorize">{{$t('common.yes')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { format } from 'date-fns';
export default {
    name: '',

    data () {
        return {
            data: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            tableData: [],
            addDialog: false,
            emDialog: false,
            editDialog: false,
            roleName: '',
            form: {
                type: 1,
                name: ''
            },
            menuList: [],
            menuCheckList: [],
            treeList: [],
            treeCheckList: [],
            treeParams: {
                'id': 0,
                'type': 0
            },
            addRoleParams: {
                'disc': '',
                'id': 0,
                'parentId': 0,
                'parentType': 0,
                'type': 0
            },
            updateRoleParams: {
                'disc': '',
                'id': 0,
                'parentId': 0,
                'parentType': 0,
                'type': 0
            },
            emRoleParams: {
                'id': 0,
                'type': 0
            },
            deleteParams: {
                deleteAuthInfos: [
                    {
                        'id': 0,
                        'type': 0
                    }
                ]
            },
            updateItem: [],
            authorizeParams: {
                addressInfos: [
                    {
                        id: 0,
                        type: 0
                    }
                ],
                authTreeList: [],
                id: 0,
                type: 0
            },
            breadcrumbList: ['全局']
        };
    },
    mounted () {
        this.getTreeList();
        this.getTreeTable();
    },
    methods: {
        // 点击左侧树节点
        handleNodeClick (data) {
            this.treeParams.id = data.id;
            this.treeParams.type = data.treeType;
            this.getTreeTable();
            this.addRoleParams.parentId = data.id;
            this.addRoleParams.parentType = data.treeType;

            let nodeData = this.$refs.leftTreeNodes.getNode(data.id);
            this.breadcrumbList = [];
            if (data.id == 0) {
                this.breadcrumbList.push(data.label);
            } else {
                this.breadcrumbList.unshift(data.label);
                if (nodeData.parent.label) {
                    this.breadcrumbList.unshift(nodeData.parent.label);
                    if (nodeData.parent.parent.label) {
                        this.breadcrumbList.unshift(nodeData.parent.parent.label);
                        if (nodeData.parent.parent.parent.label) {
                            this.breadcrumbList.unshift(nodeData.parent.parent.parent.label);
                        }
                    }
                }
            }
            // console.log("this.breadcrumbList",this.breadcrumbList)
        },
        // 点击新建按钮
        add () {
            this.addDialog = true;
        },
        // 点击编辑按钮
        update () {
            if (this.updateItem.length < 1) {
                this.$message({
                    message: '请选择您要修改的角色',
                    center: true,
                    type: 'warning'
                });
            } else if (this.updateItem.length > 1) {
                this.$message({
                    message: '抱歉暂不支持批量修改角色',
                    center: true,
                    type: 'warning'
                });
            } else {
                this.editDialog = true;
                this.roleName = this.updateItem[0].disc;
                this.updateRoleParams.id = this.updateItem[0].id;
                this.updateRoleParams.type = this.getRoleType(this.updateItem[0].type);
            }
        },
        // 选中右侧列表
        handleSelectionChange (val) {
            this.updateItem = val;
            // console.log("选中的item",val)
            this.deleteParams.deleteAuthInfos = [];
            for (let i = 0; i < val.length; i++) {
                let obj = {
                    id: val[i].id,
                    type: val[i].type
                };
                this.deleteParams.deleteAuthInfos.push(obj);
            }
        },
        // 点击授权按钮
        empower () {
            if (this.updateItem.length < 1) {
                this.$message({
                    message: '请选择您要授权的角色',
                    center: true,
                    type: 'warning'
                });
            } else if (this.updateItem.length > 1) {
                this.$message({
                    message: '抱歉暂不支持批量授权,请选择单个角色',
                    center: true,
                    type: 'warning'
                });
            } else {
                this.emRoleParams.id = this.updateItem[0].id;
                this.emRoleParams.type = this.getRoleType(this.updateItem[0].type);
                // console.log("this.emRoleParams",this.emRoleParams)
                this.$request('queryAuthorizeTree', this.emRoleParams).then(res => {
                    // console.log("授权列表", res)
                    if (res.data.returnCode == 0) {
                        this.menuList = res.data.authTreeInfos;
                        this.treeList = res.data.addressTreeInfos;
                        this.menuCheckList = res.data.authTreeList;
                        this.treeCheckList = res.data.addressTreeList;
                        this.authorizeParams.authTreeList = res.data.authTreeList;
                        this.projectCheckChange();
                    }
                });
                this.emDialog = true;
                this.authorizeParams.id = this.updateItem[0].id;
                this.authorizeParams.type = this.getRoleType(this.updateItem[0].type);
            //  this.authorizeParams.authTreeList = this.menuCheckList;
            }
        },
        getTreeList () {
            this.$request('queryAuthorizeTreeList').then(res => {
            // console.log("树节点",res)
                if (res.data.returnCode == 0) {
                    this.data = [];
                    this.data.push(res.data.treeNode);
                }
            });
        },
        getTreeTable () {
            this.$request('getAuthorizeTree', this.treeParams).then(res => {
                console.log('树表格', res);
                if (res.data.returnCode == 0) {
                    this.tableData = res.data.treeInfos;
                }
            });
        },
        dateFormat (row, column) {
            var date = row.createTime;
            if (date == undefined) {
                return '';
            }
            return format(date, 'YYYY-MM-DD HH:mm:ss');
        },
        //  确定新增角色
        addRole () {
            this.addDialog = false;
            this.addRoleParams.type = this.form.type;
            this.addRoleParams.disc = this.form.name;
            this.$request('addAuthorize', this.addRoleParams).then(res => {
                if (res.data.returnCode == 0) {
                    this.$message({
                        message: this.$t('common.addSuccess'),
                        center: true,
                        type: 'success'
                    });
                    this.getTreeList();
                    this.getTreeTable();
                } else {
                    this.$message({
                        message: res.data.returnMsg,
                        center: true,
                        type: 'error'
                    });
                }
            });
        },
        // 修改角色
        updateRole () {
            this.updateRoleParams.disc = this.roleName;
            console.log('this.updateRoleParams', this.updateRoleParams);
            this.$request('updateAuthorize', this.updateRoleParams).then(res => {
                // console.log("编辑结果",res)
                if (res.data.returnCode == 0) {
                    this.editDialog = false;
                    this.getTreeList();
                    this.getTreeTable();
                    this.$message({
                        message: this.$t('common.editSuccess'),
                        center: true,
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: res.data.returnMsg,
                        center: true,
                        type: 'warning'
                    });
                }
            });
        },
        getRoleType (value) {
            if (value == 1) {
                return 1;
            } else if (value == 2) {
                return 1;
            } else if (value == 3) {
                return 2;
            }
        },
        // 点击删除按钮
        deleteRole () {
            if (this.updateItem.length < 1) {
                this.$message({
                    message: '请选择您要删除的角色',
                    center: true,
                    type: 'warning'
                });
            } else {
                this.$confirm(
                    this.$t('areaManage.deleteTip'),
                    this.$t('areaManage.reminder'),
                    {
                        confirmButtonText: this.$t('common.yes'),
                        cancelButtonText: this.$t('common.cancel'),
                        type: 'warning'
                    }
                ).then(() => {
                    //  console.log("this.deleteParams",this.deleteParams)
                    this.$request('deleteAuthorize', this.deleteParams).then(res => {
                    // console.log("删除结果", res);
                        if (res.data.returnCode == 0) {
                            this.$message({
                                message: '删除成功',
                                center: true,
                                type: 'success'
                            });
                            this.getTreeList();
                            this.getTreeTable();
                        } else {
                            this.$message({
                                message: res.data.returnMsg,
                                center: true,
                                type: 'error'
                            });
                        }
                    });
                }).catch(() => {});
            }
        },
        menuCheckChange () {
        // console.log(this.$refs.menuTree.getCheckedKeys());
            this.authorizeParams.authTreeList = [];
            this.authorizeParams.authTreeList = this.$refs.menuTree.getCheckedKeys();
        },
        projectCheckChange () {
            this.authorizeParams.addressInfos = [];
            // console.log(this.$refs.projectTree.getCheckedNodes());
            let arr = this.$refs.projectTree.getCheckedNodes();
            for (let i = 0; i < arr.length; i++) {
                var obj = {
                    id: arr[i].id,
                    type: arr[i].type
                };
                this.authorizeParams.addressInfos.push(obj);
            }

            let arr1 = this.$refs.projectTree.getHalfCheckedNodes();
            for (let i = 0; i < arr1.length; i++) {
                var obj = {
                    id: arr1[i].id,
                    type: arr1[i].type
                };
                this.authorizeParams.addressInfos.push(obj);
            }

        // console.log("半选中", this.$refs.projectTree.getHalfCheckedNodes());
        },
        // 确定授权
        checkAuthorize () {
            //  console.log("授权参数",this.authorizeParams)
            this.$request('authorize', this.authorizeParams).then(res => {
                console.log('授权jieguo', res);
                if (res.data.returnCode == 0) {
                    this.emDialog = false;
                    this.$message({
                        message: '授权成功',
                        center: true,
                        type: 'success'
                    });
                    this.getTreeList();
                    this.getTreeTable();
                } else {
                    this.$message({
                        message: res.data.returnMsg,
                        center: true,
                        type: 'error'
                    });
                }
            });
        }

    }
};
</script>

<style lang='scss' scope>
.permissionConfiguration {
  background: #fff;
  min-height: 600px;
  .top {
    h1 {
      padding: 0.3rem;
      border-bottom: 1px solid #eeeeee;
      font-size: 14px;
    }
    border-right: 1px solid rgb(243, 243, 243);
  }
  .el-tree {
    padding: 15px;
  }
  .btns {
     margin-bottom: 25px;
  }
  .el-table {
    margin-top: 10px;
  }
  .addRole  {
    .el-input__inner {
      width: 95%;
    }
    .postName {
       border-bottom: 1px solid #eeeeee;
       padding-bottom: 22px;
       margin-bottom: 0;
    }
  }
  .editRole {
    .el-input__inner {
      width: 95%;
    }
    .postName {
      margin-top: 22px!important;
      border-bottom: 1px solid #eeeeee;
      padding-bottom: 22px;
      margin-bottom: 0;
    }
  }
  .authorize {
    .el-dialog  {
      height: 710px;
    }
    .menuBox {
      height: 600px;
      .el-tree {
        height: 522px;
      }
    }
    .el-dialog__body {
       border-bottom: 1px solid #eeeeee;
    }
  }
  .left {
    // border-left: 1px solid #eeeeee;
    min-height: 100%;
    padding: 15px;
  }
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
  .el-dialog__body{
    padding: 0;
  }
  .emtable{
    h2{
      padding: 14px 30px;
      border-bottom: 1px solid #eeeeee;
    }
  }
}
</style>
