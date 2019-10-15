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
            <el-button type="primary" icon="el-icon-plus" size="small" @click="add" :disabled="addButton === 1">{{ $t('common.add1')}}</el-button>
            <el-button type="primary" icon="el-icon-edit" size="small" @click="update">{{ $t('common.edit')}}</el-button>
            <el-button type="primary" icon="el-icon-delete" size="small" @click="deleteRole">{{ $t('common.delete')}}</el-button>
            <!-- <el-button type="primary" icon="el-icon-key" size="small" @click="empower">{{ $t('permissionConfiguration.authorize')}}</el-button> -->
          </div>

          <el-breadcrumb separator="/" style="margin-top:10px;">
            <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.index"> {{item}}</el-breadcrumb-item>
          </el-breadcrumb>

          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="accountId" :label="$t('accountmanage.loginAccount')">
              <!-- <template slot-scope="scope">
                <img :src="scope.row.type|getPostTypeIcon" alt="">
                <span style="margin-left: 10px">{{ scope.row.disc }}</span>
              </template> -->
            </el-table-column>
            <el-table-column prop="accountName" :label="$t('accountmanage.nickname')"></el-table-column>
            <el-table-column prop="createAccount" :label="$t('accountmanage.createAccount')"></el-table-column>
            <el-table-column prop="userType" :label="$t('accountmanage.accountType')"></el-table-column>
            <el-table-column prop="role" :label="$t('accountmanage.position')"></el-table-column>
            <el-table-column prop="department" :label="$t('accountmanage.department')"></el-table-column>
            <el-table-column prop="status" :label="$t('accountmanage.status')">
              <template slot-scope="scope"> 
               {{  getStatusType(scope.row.status) }}
              </template>
            </el-table-column>
            <el-table-column prop="" :label="$t('accountmanage.tel')"></el-table-column>
            <el-table-column prop="" :label="$t('accountmanage.meterRating')"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!-- 新建弹框 -->
    <el-dialog :title="$t('common.addAccount1')" :visible.sync="addDialog" width="600px" class="addRole">
      <el-form :rules="rules" ref="form" :model="form" label-width="80px" >
         <el-form-item :label="$t('accountmanage.loginAccount')" class="login" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('accountmanage.nickname')" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
         <el-form-item :label="$t('accountmanage.password')" prop="password" >
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
         <el-form-item :label="$t('accountmanage.checkPSW')"  prop="checkPSW">
          <el-input type="password" v-model="form.checkPSW"></el-input>
        </el-form-item>
         <el-form-item :label="$t('accountmanage.status')">
           <el-select v-model="form.status" style="width: 100%;">
             <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            <!-- <el-option label="异常" value="0"></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="锁定" value="2"></el-option> -->
          </el-select>
        </el-form-item>
         <!-- <el-form-item :label="$t('accountmanage.accountType')">
           <el-select v-model="form.accountType" style="width: 100%;">
            <el-option label="部门" value="2"></el-option>
            <el-option label="岗位" value="3"></el-option>   
          </el-select>
        </el-form-item> -->
         <el-form-item :label="$t('accountmanage.tel')" prop="tel">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item :label="$t('accountmanage.meterRating')" class="postName">
          <!-- <el-input v-model="form.meterRating"></el-input>  -->
           <el-select v-model="form.meterRating" style="width: 100%;">
            <!-- <el-option label="异常" value="0"></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="锁定" value="2"></el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" @click="addRole('form')">{{$t('common.yes')}}</el-button>
      </span>
    </el-dialog>

    <!-- 编辑弹框 -->
     <el-dialog :title="$t('accountmanage.editAccount')" :visible.sync="editDialog" width="600px" class="editRole">
       <el-form :rules="rules1" ref="form1" :model="form1" label-width="80px" >
         <el-form-item :label="$t('accountmanage.nickname')" class="login" prop="nickname">
          <el-input v-model="form1.nickname"></el-input>
        </el-form-item>
         <el-form-item :label="$t('accountmanage.status')">
           <el-select v-model="form1.status" style="width: 100%;">
            <!-- <el-option label="异常" value="0"></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="锁定" value="2"></el-option> -->
             <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
          </el-select>
        </el-form-item>
         <el-form-item :label="$t('accountmanage.tel')" prop="tel">
          <el-input v-model="form1.tel"></el-input>
        </el-form-item>
        <el-form-item :label="$t('accountmanage.meterRating')" class="postName">
           <el-select v-model="form1.meterRating" style="width: 100%;">
            <!-- <el-option label="异常" value="0"></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="锁定" value="2"></el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" @click="updateRole('form1')">{{$t('common.yes')}}</el-button>
      </span>
    </el-dialog>

  
  </div>
</template>

<script>
import { format } from 'date-fns';
export default {
    name: '',

    data () {
        var validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入登录账号'));
            } else {
                // if (this.form.name !== '') {
                //   this.$refs.form.validateField('name');
                // }
                callback();
            }
        };
        var validateNickname = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入昵称'));
            } else {
                // if (this.form.name !== '') {
                //   this.$refs.form.validateField('name');
                // }
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (value.length < 6) {
                callback(new Error('请注意密码不能少于6位'));
            } else {
                callback();
            }
        };
        var validateCheckPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else {
                if (this.form.checkPSW !== this.form.password) {
                    callback(new Error('俩次输入的密码不一致！'));
                }
                callback();
            }
        };
        var validateTel = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入电话'));
            } else if (!(/^[1]([3-9])[0-9]{9}$/.test(value))) {
                callback(new Error('电话格式不规范'));
            } else {
                callback();
            }
        };
        var validateName1 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入登录账号'));
            } else {
                // if (this.form.name !== '') {
                //   this.$refs.form.validateField('name');
                // }
                callback();
            }
        };
        var validateTel1 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入电话'));
            } else if (!(/^[1]([3-9])[0-9]{9}$/.test(value))) {
                callback(new Error('电话格式不规范'));
            } else {
                callback();
            }
        };
        return {
            addButton: 1,
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
                name: '',
                nickname: '',
                password: '',
                checkPSW: '',
                status: '正常',
                tel: '',
                meterRating: '无',
                accountType: ''
            },
            form1: {
                nickname: '',
                status: 1,
                tel: '',
                meterRating: '无'
            },
            statusOptions: [
                {
                    value: 0,
                    label: '异常'
                },
                {
                    value: 1,
                    label: '正常'
                },
                {
                    value: 2,
                    label: '锁定'
                }
            ],
            rules1: {
                loginAccount: [
                    { validator: validateName1, trigger: 'blur' }
                ]
                // tel: [
                //     { validator: validateTel1, trigger: 'blur' }
                //   ],
            },
            rules: {
                name: [
                    { validator: validateName, trigger: 'blur' }
                ],
                nickname: [
                    { validator: validateNickname, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPSW: [
                    { validator: validateCheckPass, trigger: 'blur' }
                ]
                // tel: [
                //     { validator: validateTel, trigger: 'blur' }
                //   ],
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
                'accountId': '',
                'accountName': '',
                'ownerId': 0,
                'ownerType': 0,
                'passWord': '',
                'phone': '',
                'roleId': 0,
                'sex': 0,
                'status': 1,
                'userType': 3
            },
            updateRoleParams: {
                'accountId': '',
                'accountName': '',
                'phone': '',
                'sex': 0,
                'status': 1
            },
            emRoleParams: {
                'id': 0,
                'type': 0
            },
            deleteParams: {
                accountIds: []
            },
            deleteTips: [],
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
            breadcrumbList: ['全局'],
            accountId: ''
        };
    },
    mounted () {
        this.getTreeList();
        this.getTreeTable();
    },
    methods: {
        // 点击左侧树节点
        handleNodeClick (data) {
        // console.log("左侧树节点", data)

            this.treeParams.id = data.id;
            this.treeParams.type = this.getRoleType(data.treeType);
            this.getTreeTable();
            let nodeData = this.$refs.leftTreeNodes.getNode(data.id);

            if (data.treeType == 3) {
                this.addRoleParams.ownerType = 2;
                this.addRoleParams.userType = 3;
                this.addButton = 0;
                if (nodeData.parent.label) {
                    this.addRoleParams.ownerId = nodeData.parent.key;
                }
            } else if (data.treeType == 2) {
                this.addRoleParams.ownerType = data.treeType;
                this.addRoleParams.ownerId = data.id;
                this.addRoleParams.userType = 2;
                this.addButton = 0;
            } else if (data.treeType == 1) {
                this.addRoleParams.ownerType = data.treeType;
                this.addRoleParams.ownerId = data.id;
                this.addRoleParams.userType = 2;
                this.addButton = 0;
            } else if (data.treeType == 0) {
                this.addButton = 1;
            }
            this.addRoleParams.roleId = data.id;

            // console.log(nodeData)
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
                    message: '请选择您要修改的账号',
                    center: true,
                    type: 'warning'
                });
            } else if (this.updateItem.length > 1) {
                this.$message({
                    message: '抱歉暂不支持批量修改账号',
                    center: true,
                    type: 'warning'
                });
            } else {
                this.editDialog = true;

                this.form1.nickname = this.updateItem[0].accountName;
                this.form1.status = this.updateItem[0].status;
                //  this.form1.status = this.updateItem[0].status;
                // 后端字段没加上
                // this.form1.tel = val.accountId;
                // this.form1.meterRating = val.accountId;
            }
        },
        // 选中右侧列表
        handleSelectionChange (val) {
            this.updateItem = val;
            // console.log("选中的item",val)
            this.deleteParams.accountIds = [];
            for (let i = 0; i < val.length; i++) {
                this.deleteParams.accountIds.push(val[i].accountId);
                if (val[i].userType == 1) {
                    this.deleteTips.push(val[i].userType);
                }
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
        // console.log("参数",this.treeParams)
            this.$request('queryAccountAuthorizeTreeList', this.treeParams).then(res => {
                //  console.log("树表格", res);
                if (res.data.returnCode == 0) {
                    this.tableData = res.data.accountInfos;
                }
            });
        },
        //  确定新增角色
        addRole (form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.addRoleParams.accountId = this.form.name;
                    this.addRoleParams.accountName = this.form.nickname;
                    this.addRoleParams.passWord = this.form.password;
                    this.addRoleParams.phone = this.form.tel;
                    // console.log("新增账号参数",this.addRoleParams)
                    this.$request('addAccount', this.addRoleParams).then(res => {
                        // console.log("新增账号res",res)
                        if (res.data.returnCode == 0) {
                            this.addDialog = false;
                            this.$message({
                                message: this.$t('common.addSuccess'),
                                center: true,
                                type: 'success'
                            });
                            this.getTreeList();
                            this.getTreeTable();
                            this.form = {
                                name: '',
                                nickname: '',
                                password: '',
                                checkPSW: '',
                                status: '正常',
                                tel: '',
                                meterRating: '无',
                                accountType: ''
                            };
                        } else {
                            this.$message({
                                message: res.data.returnMsg,
                                center: true,
                                type: 'error'
                            });
                        }
                    });
                } else {
                    this.$message({
                        message: '请注意每一项都是必填项！',
                        center: true,
                        type: 'warning'
                    });
                }
            });
        },

        // 修改角色
        updateRole (form1) {
            this.updateRoleParams.accountId = this.updateItem[0].accountId;
            this.updateRoleParams.accountName = this.form1.nickname;
            this.updateRoleParams.phone = this.form1.tel;
            this.updateRoleParams.status = this.form1.status;
            // this.updateRoleParams.sex = this.form1.sex;

            // console.log("this.updateRoleParams",this.updateRoleParams)
            this.$refs[form1].validate((valid) => {
                if (valid) {
                    this.$request('updateAccount', this.updateRoleParams).then(res => {
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
                } else {
                    this.$message({
                        message: '请注意每一项都是必填项！',
                        center: true,
                        type: 'warning'
                    });
                }
            });
        },
        getRoleType (value) {
            if (value == 0) {
                return 0;
            } else if (value == 1) {
                return 1;
            } else if (value == 2) {
                return 1;
            } else if (value == 3) {
                return 2;
            }
        },

        getStatusType (value) {
            if (value == 0) {
                return '异常';
            } else if (value == 1) {
                return '正常';
            } else if (value == 2) {
                return '锁定';
            }
        },
        // 点击删除按钮
        deleteRole () {
            if (this.updateItem.length < 1) {
                this.$message({
                    message: '请选择您要删除的账号',
                    center: true,
                    type: 'warning'
                });
            } else {
                this.deleteTips = [];
                for (let i = 0; i < this.updateItem.length; i++) {
                    if (this.updateItem[i].userType == 1) {
                        this.deleteTips.push(this.updateItem[i].userType);
                    }
                }
                console.log(' this.deleteTips', this.deleteTips);
                if (this.deleteTips.length == 1) {
                    this.$message({
                        message: '请注意管理员账号不能被删除',
                        center: true,
                        type: 'warning'
                    });
                    this.deleteTips = [];
                } else {
                    this.deleteTips = [];
                    this.$confirm(
                        this.$t('areaManage.deleteTip'),
                        this.$t('areaManage.reminder'),
                        {
                            confirmButtonText: this.$t('common.yes'),
                            cancelButtonText: this.$t('common.cancel'),
                            type: 'warning'
                        }
                    ).then(() => {
                        this.$request('deleteAccount', this.deleteParams).then(res => {
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
            }
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
    .login {
      padding-top: 22px;
    }
    .postName {
       border-bottom: 1px solid #eeeeee;
       padding-bottom: 22px;
       margin-bottom: 0;
    }
    .el-form-item {
      padding-right: 10px;
    }
  }
  .editRole {
     .login {
      padding-top: 22px;
    }
    .el-form-item {
      padding-right: 10px;
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
