<template src="./template.html"></template>
<style src="./style.css" scoped></style>
<script>
import axios from 'axios';
import mockdata from '../../../mock';

export default {
    data () {
        const validateUsername = (rule, value, callback) => {
            if (!value.trim()) {
                callback(new Error('Please enter the correct user name'));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('The passWord can not be less than 6 digits'));
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                accountId: '',
                passWord: ''
            },
            loginRules: {
                accountId: [{ required: true, trigger: 'blur', validator: validateUsername }],
                passWord: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            passwordType: 'passWord',
            capsTooltip: false,
            loading: false,
            userList: [],
            index: ''
        };
    },
    methods: {
        checkCapslock ({ shiftKey, key } = {}) {
            if (key && key.length === 1) {
                if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
                    this.capsTooltip = true;
                } else {
                    this.capsTooltip = false;
                }
            }
            if (key === 'CapsLock' && this.capsTooltip === true) {
                this.capsTooltip = false;
            }
        },
        containsObj (_key, _value) {
            var bln = false;
            try {
                for (i = 0; i < this.userList.length; i++) {
                    if (this.userList[i].username == _key && this.userList[i].passWord == _value) {
                        bln = true;
                    }
                }
            } catch (e) {
                bln = false;
            }
            return bln;
        },
        login () {
            const params = {
                accountId: this.loginForm.accountId,
                passWord: this.loginForm.passWord
            };

            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    var captcha1 = new TencentCaptcha('2006697241', res => {
                        // console.log(res.randstr,res.ticket);
                        this.$request('loginVerify', {
                            'randStr': res.randstr,
                            'ticket': res.ticket
                        }).then(res => {
                            if (res.data.returnCode == 0) {
                                this.$request('login', params).then(res => {
                                    if (res.data.returnCode == 0) {
                                        // console.log('登录res',res)
                                        localStorage.setItem('HTTP_ACCESS_TOKEN', res.data.token);
                                        localStorage.setItem('accountId', this.loginForm.accountId);
                                        localStorage.setItem('password', this.loginForm.passWord);
                                        this.$message({
                                            message: res.data.returnMsg,
                                            center: true,
                                            type: 'success'
                                        });
                                        this.$router.push('/home');
                                    } else {
                                        this.$message({
                                            message: res.data.returnMsg,
                                            center: true,
                                            type: 'error'
                                        });
                                    }
                                    this.loading = false;
                                });
                            } else {
                                this.$message({
                                    message: res.data.returnMsg,
                                    center: true,
                                    type: 'error'
                                });
                                this.loading = false;
                            }
                        });
                    });
                    captcha1.show();
                }
            });
        }
    }
};
</script>
