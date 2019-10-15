<template src="./template.html"></template>
<style src="./style.css" scoped></style>
<script>
    import constants from '../../config/constants';
    export default {
        data () {
            return {
                tableData: [],
                form: {
                    channelName: '',
                    inviteCode: ''
                },
                page: {
                    pageSize: 10,
                    pageIndex: 1
                },
                total: 0,
                dialogFormVisible: false,
                dialogTitle: '新建用户',
                dialogForm: {
                    username: '',
                    role: ''
                },
                roleTypeDict: [],
                rules: {
                    channelName: [
                        {required: true, message: '请输入用户名称', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            /**
             * 执行搜索
             */
            onSubmit () {
                const params = Object.assign(this.form, this.page);
                params.pageIndex--;
                this.$request('user', params).then(res => {
                    this.tableData = res.userList;
                    this.total = res.total || 0;
                });
            },

            /**
             * 新增或修改操作
             * @param row
             */
            handleEdit (row) {
                if (row.id) {
                    this.dialogTitle = '修改用户';
                    this.dialogForm = row;
                } else {
                    this.dialogTitle = '新增用户';
                }
                this.dialogFormVisible = true;
            },

            /**
             * 监听每页记录数
             * @param pageSize
             */
            handleSizeChange (pageSize) {
                this.page.pageSize = pageSize;
                this.onSubmit();
            },

            /**
             * 监听翻页事件
             * @param pageIndex
             */
            handleCurrentChange (pageIndex) {
                this.page.pageIndex = pageIndex;
                this.onSubmit();
            },

            /**
             * 重置查询表单
             */
            resetForm () {
                this.$refs['form'].resetFields();
            },

            /**
             * 重置弹框表单
             */
            resetDialogForm () {
                this.$refs['dialogForm'].resetFields();
                this.dialogFormVisible = false;
            },

            /**
             * 提交表单数据
             */
            handleSubmitDialog () {
                this.$refs['dialogForm'].validate((valid) => {
                    if (valid) {
                        const apiName = this.dialogForm.id ? 'updateUser' : 'addUser';
                        this.$request(apiName, this.dialogForm).then(() => {
                            this.$message({
                                title: '提示',
                                message: '操作成功！',
                                type: 'success'
                            });
                            this.resetDialogForm();
                            this.onSubmit();
                        });
                    }
                });
            },

            /**
             * 执行删除操作
             * @param id
             */
            handleDelete (id) {
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$request('deleteUser', {
                        id
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.onSubmit();
                    });
                });
            },

            /**
             * 初始化数据
             */
            init () {
                this.roleTypeDict = this.$utils.packObjCodeAndLabelUtil(constants.ROLE_TYPE);
                this.dialogForm.roleType = this.roleTypeDict[0].code;
                this.onSubmit();
            }
        },
        created () {
            this.init();
        }
    };
</script>