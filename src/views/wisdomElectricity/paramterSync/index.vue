<template>
  <div id="device">
    <div class="device_top" v-show="!switchVisible">
      <el-select v-model="value" :placeholder="$t('common.pleaseSelect')" @change="changeVal">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="input" :placeholder="$t('deviceManage.pleaseInput')" clearable v-show="!devClassifyShow&&!appTypeShow"></el-input>
      <el-button type="primary" @click.native="queryByFactor">{{ $t('common.query')}}</el-button>
    </div>

    <div class="device_top" v-show="switchVisible">
      <span style="margin-right: 20px; font-size: 18px;">{{chooseGatewayItem}}下的设备档案</span>
      <el-button type="primary" @click.native="backGateway">返回上层</el-button>
    </div>

    <div class="device_body" v-show="!switchVisible">
      <el-col :span="24">
        <ul class="device_body_lists" >
          <el-row :gutter="13" v-infinite-scroll="load">
            <el-col :xs="12" :sm="6" class="el-col-lg-4-8" v-for="(item,index) in deviceData" :key="index">
              <li
                class="item"
                @click="allDel && selectItem($event,index+1, item.rtuId)"
                :class="{selectStyle1 : chooseArr.includes(item.rtuId)}"
              >
                <img :src="item.deviceType|getDevTypeIcon" alt class="item_img" />
                <p>
                  {{ $t('common.deviceName')}}：
                  <span>{{item.disc}}</span>
                </p>
                <p>
                  {{ $t('deviceManage.devStatus')}}：
                  <span :class="{ green : item.curStatus == 1, grey : item.curStatus !== 1} ">{{item.curStatus|deviceStaus}}</span>
                </p>
                <p>
                  {{ $t('deviceManage.deviceType')}}：
                  <span>{{item.typeName}}</span>
                </p>
                <p class="item_address">
                  {{ $t('deviceManage.commAddress')}}：
                  <span>{{item.commAddress}}</span>
                </p>
                  <i class="operator" v-show="!allDel1"> 
                   <el-tooltip class="item" effect="dark" content="联动" placement="top-start">
                    <span class="edit" @click="linkPoint(item)">
                       <img src="../../../../static/images/link.png" alt />
                     </span>
                   </el-tooltip>
                </i>
              </li>
            </el-col>
          </el-row>
        </ul>
      </el-col>
    </div>
    <!-- 开关列表 -->
     <div class="device_body" v-show="switchVisible">
      <el-col :span="24">
        <ul class="device_body_lists" >
          <el-row :gutter="13" v-infinite-scroll="load">
             <el-col :xs="12" :sm="6" class="el-col-lg-4-8" v-for="(item,index) in piontData" :key="index">
                <li
                class="item"
                @click="allDel1 && selectItem($event,index+1, item.pointId)"
                :class="{selectStyle1 : chooseArr.includes(item.pointId)}"
              >
                <!-- <img src="../../../../static/images/on_off.png" alt class="item_img" /> -->
                 <img :src="item.appType|getDevTypeIcon" alt class="item_img" />
                <p>
                  {{ $t('deviceManage.piontName')}}：
                  <span>{{item.disc}}</span>
                </p>
                <p>
                  {{ $t('deviceManage.numberId')}}：
                  <span>{{item.numberId }}</span>
                </p>
                <p>
                  {{ $t('deviceManage.appType')}}：
                  <span>{{item.appType | changeDevType}}</span>
                </p>
                <p class="item_address">
                  {{ $t('deviceManage.commAddress')}}：
                  <span>{{item.commAddress}}</span>
                </p>
                <!-- <i class="el-icon-close delete" @click="dele1(item)" v-show="!allDel1"></i>
                <i
                  class="delete checkbox"
                  v-show="allDel1"
                  :class="{selectStyle : chooseArr.includes(item.pointId)}"
                >
                  <span class="el-icon-check" v-show="chooseArr.includes(item.pointId)"></span>
                </i> -->
                 <!-- <i class="operator" v-show="!allDel1"> 
                   <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                    <span class="edit" @click="editPoint(item)">
                       <img src="../../../../static/images/edit.png" alt />
                     </span>
                   </el-tooltip>
                </i> -->
              </li>
             </el-col>
          </el-row>
        </ul>
      </el-col>
    </div>
    <!-- 网关下的添加/批量删除按钮 -->
    <div class="device_footer" v-show="!switchVisible">
      <!-- <el-button
        type="primary"
        @click="clickAddDev"
        v-show="!allDel"
      >{{ $t('common.add')}}</el-button>
      <el-button
        type="primary"
        @click="batchDel"
        v-show="!allDel"
      >{{ $t('deviceManage.multipleDelete')}}</el-button>
      <el-button type="primary" @click="cancleDel()" v-show="allDel">{{ $t('common.cancel')}}</el-button>
      <el-button type="primary" @click="deleteItem()" v-show="allDel">{{ $t('common.delete')}}</el-button> -->
    </div>

    <!-- 开关下的添加/批量删除按钮 -->
    <div class="device_footer" v-show="switchVisible">
      <!-- <el-button
        type="primary"
        @click="clickAddPoint"
        v-show="!allDel1"
      >{{ $t('common.add')}}</el-button>
      <el-button
        type="primary"
        @click="batchDel1"
        v-show="!allDel1"
      >{{ $t('deviceManage.multipleDelete')}}</el-button> -->
      <el-button
        type="primary"
        @click="bottomInstall"
        v-show="!allDel1"
      >{{ $t('deviceManage.syncParams')}}</el-button>
      <!-- <el-button type="primary" @click="cancleDel1()" v-show="allDel1">{{ $t('common.cancel')}}</el-button>
      <el-button type="primary" @click="deleteItem1()" v-show="allDel1">{{ $t('common.delete')}}</el-button> -->
    </div>


    <!-- 设备详情弹框 -->
    <el-dialog
      class="detail_dialog"
      :title="$t('deviceManage.deviceDetails')"
      :visible.sync="dialogVisible"
      width="420px"
      >
      <img :src="detailData.deviceType|getDevTypeIcon" alt class="detail_img" />
      <p>
        {{ $t('common.deviceName')}}：
        <span>{{detailData.disc}}</span>
      </p>
      <p>
        {{ $t('deviceManage.deviceEIMI')}}：
        <span>{{detailData.simCode}}</span>
      </p>
      <p>
        {{ $t('deviceManage.deviceType')}}：
        <span>{{detailData.typeName}}</span>
      </p>
      <p>
        {{ $t('deviceManage.commAddress')}}：
        <span>{{detailData.commAddress}}</span>
      </p>
      <p>
        {{ $t('deviceManage.location')}}：
        <span>{{detailData.localtion}}</span>
      </p>
      <p>
        {{ $t('deviceManage.installAddress')}}:
        <span>{{detailData.installer}}</span>
      </p>
      <p>
        {{ $t('deviceManage.longitude')}}:
        <span>{{detailData.longitude}}</span>
      </p>
      <p>
        {{ $t('deviceManage.dimension')}}:
        <span>{{detailData.dimension}}</span>
      </p>
      <p>
        {{ $t('deviceManage.note')}}:
        <span>{{detailData.describe}}</span>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogVisible = false"
          style="width: 100%;"
        >{{ $t('common.yes')}}</el-button>
      </span>
    </el-dialog>

    <!-- 增加设备 -->
    <el-dialog
      class="addDev_dialog"
      :title="$t('deviceManage.addDevice')"
      :visible.sync="addDialogVisible"
      width="510px"
     >
      <el-form label-position="left" label-width="80px" ref="formLabelAlign1" :model="formLabelAlign1" :rules="rules">
        <el-form-item :label="$t('common.deviceName')" prop="devName">
          <el-input v-model="formLabelAlign1.devName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceManage.deviceEIMI')" prop="devEIMI">
          <el-input v-model="formLabelAlign1.devEIMI"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceManage.deviceType')" required>
          <el-select v-model="addTypeVal" :placeholder="$t('deviceManage.pleaseSelectDev')" @change="getAddType">
            <el-option
              v-for="item in devClassifOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('deviceManage.commAddress')" prop="devAddress">
          <el-input v-model="formLabelAlign1.devAddress"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceManage.location')" required>
           <el-cascader
            v-model="addLocationVal"
            :options="locationOptions"
            :props="{ expandTrigger: 'hover' }"
            style="width: 100%"
            :placeholder="$t('deviceManage.pleaseSelectAddress')"
            @change="handleChange1">
          </el-cascader>
          <!-- <el-select v-model="value" :placeholder="$t('deviceManage.pleaseSelectAddress')">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item :label="$t('deviceManage.installAddress')" prop="installAddress">
          <el-input v-model="formLabelAlign1.installAddress"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceManage.longitude')" prop="devLongitude">
          <el-input v-model="formLabelAlign1.devLongitude"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceManage.dimension')" prop="devLatitude">
          <el-input v-model="formLabelAlign1.devLatitude "></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceManage.note')">
          <el-input v-model="formLabelAlign1.devNote" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="checkAddDev('formLabelAlign1')"
          style="width: 100%;"
        >{{$t('deviceManage.newBuild')}}</el-button>
      </span>
    </el-dialog>

    <!-- 编辑设备弹框 -->
    <el-dialog
      class="addDev_dialog editDev_dialog"
      :title="$t('deviceManage.editDev')"
      :visible.sync="editDialogVisible"
      width="510px"
      >
      <el-form label-position="left" label-width="80px" ref="formLabelAlign" :model="formLabelAlign" :rules="rules">
        <el-form-item :label="$t('common.deviceName')" prop="devName">
          <el-input v-model="formLabelAlign.devName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceManage.deviceEIMI')">
          <el-input v-model="formLabelAlign.devEIMI"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceManage.deviceType')" required>
          <el-select v-model="editDeviceTypeVal" :placeholder="$t('deviceManage.pleaseSelectDev')" @change="getEditType">
            <el-option
              v-for="item in devClassifOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('deviceManage.commAddress')" prop="devAddress">
          <el-input v-model="formLabelAlign.devAddress"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceManage.location')" required>
          <el-cascader
            v-model="locationVal"
            :options="locationOptions"
            :props="{ expandTrigger: 'hover' }"
            style="width: 100%"
            :placeholder="$t('deviceManage.pleaseSelectAddress')"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item :label="$t('deviceManage.installAddress')" prop="installAddress">
          <!-- <el-select v-model="value" :placeholder="$t('deviceManage.pleaseSelectInstallAddress')">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option> -->
            <el-input v-model="formLabelAlign.installAddress"></el-input>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('deviceManage.longitude')">
          <el-input v-model="formLabelAlign.devLongitude"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceManage.dimension')">
          <el-input v-model="formLabelAlign.devLatitude "></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceManage.note')">
          <el-input v-model="formLabelAlign.devNote" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="checkEdit('formLabelAlign')"
          style="width: 100%;"
        >{{$t('common.yes')}}</el-button>
      </span>
    </el-dialog>

    <!-- 新增开关弹框 -->
    <el-dialog
      class="addDev_dialog"
      :title="$t('deviceManage.addPoint')"
      :visible.sync="addPointVisible"
      width="510px"
     >
      <el-form label-position="left" label-width="130px" ref="formPoint" :model="formPoint" :rules="rules1">
        <el-form-item :label="$t('deviceManage.piontName')" prop="piontName">
          <el-input v-model="formPoint.piontName"></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t('deviceManage.numberId')" prop="numberId">
          <el-input v-model="formPoint.numberId"></el-input>
        </el-form-item> -->
        <el-form-item :label="$t('deviceManage.commAddress')" prop="commAddress">
          <el-input v-model="formPoint.commAddress"></el-input>
        </el-form-item>
        <el-form-item :label="$t('devicetype.devType')" required>
          <el-select
            v-model="formPoint.type"
            :placeholder="$t('devicetype.selectDevtype')"
            style="width:100%"
          >
            <el-option
              v-for="item in deviceType"
              :value="item.value"
              :key="item.label"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('deviceManage.overPower')" prop="overPower">
          <el-input v-model="formPoint.overPower"></el-input>
        </el-form-item>
         <el-form-item :label="$t('deviceManage.overVoltage')" prop="overVoltage">
          <el-input v-model="formPoint.overVoltage"></el-input>
        </el-form-item>
         <el-form-item :label="$t('deviceManage.overCurrent')" prop="overCurrent">
          <el-input v-model="formPoint.overCurrent"></el-input>
        </el-form-item>
         <el-form-item :label="$t('deviceManage.underVoltage')" prop="underVoltage">
          <el-input v-model="formPoint.underVoltage"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="checkAddPoint('formPoint')"
          style="width: 100%;"
        >{{$t('deviceManage.newBuild')}}</el-button>
      </span>
    </el-dialog>

    <!-- 编辑开关弹框 -->
    <el-dialog
      class="addDev_dialog"
      :title="$t('deviceManage.editPoint')"
      :visible.sync="editPointVisible"
      width="510px"
     >
      <el-form label-position="left" label-width="130px" ref="formPoint1" :model="formPoint1" :rules="PointRules1">
        <el-form-item :label="$t('deviceManage.piontName')" prop="piontName">
          <el-input v-model="formPoint1.piontName"></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t('deviceManage.numberId')" prop="numberId">
          <el-input v-model="formPoint.numberId"></el-input>
        </el-form-item> -->
        <el-form-item :label="$t('deviceManage.commAddress')" prop="commAddress">
          <el-input v-model="formPoint1.commAddress"></el-input>
        </el-form-item>
        <el-form-item :label="$t('devicetype.devType')" required>
          <el-select
            v-model="formPoint1.type"
            :placeholder="$t('devicetype.selectDevtype')"
            style="width:100%"
          >
            <el-option
              v-for="item in deviceType"
              :value="item.value"
              :key="item.label"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('deviceManage.overPower')" prop="overPower">
          <el-input v-model="formPoint1.overPower"></el-input>
        </el-form-item>
         <el-form-item :label="$t('deviceManage.overVoltage')" prop="overVoltage">
          <el-input v-model="formPoint1.overVoltage"></el-input>
        </el-form-item>
         <el-form-item :label="$t('deviceManage.overCurrent')" prop="overCurrent">
          <el-input v-model="formPoint1.overCurrent"></el-input>
        </el-form-item>
         <el-form-item :label="$t('deviceManage.underVoltage')" prop="underVoltage">
          <el-input v-model="formPoint1.underVoltage"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="checkEditPoint('formPoint1')"
          style="width: 100%;"
        >{{$t('deviceManage.newBuild')}}</el-button>
      </span>
    </el-dialog>


    <!-- 进度条弹框 -->
      <el-dialog
      class="progressCss"
      :title="progressTitle"
      :visible.sync="progressVisible"
      width="510px"
     >
        <el-progress :percentage="percent" :stroke-width="10"></el-progress>
        <p style="margin-top: 10px;" v-show=" percent == 100">处理成功</p>
         <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="progressVisible=false"
        >关闭</el-button>
      </span>
     </el-dialog>
  </div>
</template>

<script>
export default {
    name: '',

    data () {
        return {
            options: [
                {
                    value: 'disc',
                    label: this.$t('common.deviceName')
                },
                {
                    value: 'commAddress',
                    label: this.$t('common.commAddress')
                }
            ],
            devClassifOptions: [],
            appTypeOptions: [],
            locationOptions: [],
            deviceData: [],
            detailData: {},
            value: '',
            input: '',
            dialogVisible: false,
            addDialogVisible: false,
            editDialogVisible: false,
            formLabelAlign: {
                devName: '',
                devEIMI: '',
                devAddress: '',
                devLongitude: '',
                devLatitude: '',
                devNote: '',
                installAddress: ''
            },
            formLabelAlign1: {
                devName: '',
                devEIMI: '',
                devAddress: '',
                devLongitude: '',
                devLatitude: '',
                devNote: '',
                installAddress: ''
            },
            formPoint: {
                piontName:'',
                commAddress:'',
                type: '',
                overPower:'',
                overVoltage:'',
                overCurrent: '',
                underVoltage: ''
            },
            deviceType: [
               {
                    value: 3,
                    label: this.$t('item.1p')
                },
                {
                    value: 4,
                    label: this.$t('item.2p')
                },
               
            ],
            formPoint1: {
                piontName:'',
                commAddress:'',
                type: '',
                overPower:'',
                overVoltage:'',
                overCurrent: '',
                underVoltage: ''
            },
            rules: {
                devName: [
                    { required: true, message: '请输入设备名称', trigger: 'blur' }
                ],
                // devEIMI: [
                //     { required: true, message: '请输入设备EIMI', trigger: 'blur'}
                // ],
                devAddress: [
                    {required: true, message: '请输入通信地址', trigger: 'blur'}
                ],
                installAddress: [
                    {required: true, message: '请输入安装位置', trigger: 'blur'}
                ]
                // devLongitude: [
                //     {required: true, message: '请输入经度', trigger: 'blur'}
                // ],
                // devLatitude: [
                //     {required: true, message: '请输入纬度', trigger: 'blur'}
                // ]

            },
            rules2: {
                devName: [
                    { required: true, message: '请输入设备名称', trigger: 'blur' }
                ],
                devAddress: [
                    { required: true, message: '请输入通信地址', trigger: 'blur'}
                ]
            },
            rules1: {
                piontName: [
                    { required: true, message: '请输入设备名称', trigger: 'blur' }
                ],
                commAddress: [
                    {required: true, message: '请输入通信地址', trigger: 'blur'}
                ]
            },
            PointRules1:{
               piontName: [
                    { required: true, message: '请输入设备名称', trigger: 'blur' }
                ],
                commAddress: [
                    {required: true, message: '请输入通信地址', trigger: 'blur'}
                ],
            },
            addTypeVal: '',
            addLocationVal: '',
            editDeviceTypeVal: '',
            locationVal: '',
            allDel: false,
            allDel1: false,
            isSelect: false,
            index: '',
            chooseArr: [],
            queryParams: {
                'pageNum': 1,
                'pageSize': 20,
                'appType':1
            },
            totalNum: 0,
            devClassifyShow: false,
            appTypeShow: false,
            devClassifyVal: '',
            appTypeVal:'',
            deleteParams: {
                'rtuIdList': []
            },
            editDevParams: {
                'commAddress': 'string',
                'describe': 'string',
                'dimension': 'string',
                'disc': 'string',
                'installer': 'string',
                'longitude': 'string',
                'ownerId': 0,
                'ownerType': 0,
                'rtuId': 0,
                'simCode': 'string',
                'type': 0
            },
            addDevParams: {
                'commAddress': 'string',
                'describe': 'string',
                'dimension': 'string',
                'disc': 'string',
                'installer': 'string',
                'longitude': 'string',
                'ownerId': 0,
                'ownerType': 0,
                'rtuId': 0,
                'simCode': 'string',
                'type': 0
            },
            switchVisible: false,
            reqdata: {
                type: 3,
                id: 17423,
                searchValue: '',
                pageNum: '',
                pageSize: ''
            },
            piontData: [],
            chooseGatewayItem: '',
            chooseGatewayRtuId: 0,
            addPointVisible: false,
            editPointVisible: false,
            addPointParams: {

              'commAddress':'',
              'disc':'',
              'numberId':'',
              'rtuId': '',
              'appType':''
            },
            deletePointParams: {
                pointIds: []
            },
            editPointParams: {
              'commAddress':'',
              'disc':'',
              'overCurrent':0,
              'overPower':0,
              'overVoltage': 0,
              'pointId': 0,
              'rtuId':0,
              'underVoltage':0,
              'appType': 0
            },
            asyncList: {
                fir: '1',
                fin: '1',
                afn: '1',
                objectid: 17767,
                objecttype: 1,
                isresive: 0,
                requestid: 'requestid',
                taskid: 5579,
                content: {
                    name: 'H228',
                    data: [
                        {
                            bulppassword: '000000',
                            commaddress: '180101111002',
                            connectport: '3',
                            databit: '3',
                            dimension: '',
                            groupno: '1',
                            isparitybit: '0',
                            longitude: '',
                            loopno: '1',
                            numberid: '100',
                            paritybit: '0',
                            pointprofile: '2',
                            pointstatus: '0',
                            pointtype: '3',
                            portbaudrate: '6',
                            stopbit: '0'
                        }
                    ]
                }
            },
            interrupt: false,
            percent: 20, // 进度
            // showDialog: false,
            waitrecvMsg: '', // 提示信息
            recvTimeoutCount: 10,
            selectDevItem: '',
            progressVisible: false,
            progressTitle: '等待数据回复中...',
            progressStatus: ''

        };
    },
    mounted () {
        this.getDeviceData();
        this.getDevClassify();
        this.getAppTypeOptions();
        this.getAreaList();
        // this.getDeviceType();
    },
    methods: {
        getDeviceData () {
            this.$request('queryDeviceList', this.queryParams).then(res => {
                if (res.data.returnCode == 0) {
                    console.log('getDeviceData', res);
                    this.totalNum = res.data.total;
                    if (this.queryParams.pageNum == 1) {
                        this.deviceData = res.data.deviceInfos;
                    } else {
                        this.deviceData.concat(res.data.deviceInfos);
                    }
                }
            });
        },
         // 获取设备类型
        getDeviceType () {
            this.$request('getComboDataByParam', {params: {
                comboId: 1
            }}).then(res => {
              console.log("设备类型", res);
                this.deviceType = res.data.comboData;
            });
        },
        // 滚动加载数据
        load () {
            if (this.deviceData.length < this.totalNum) {
                this.queryParams.pageNum += 1;
                this.getDeviceData();
            }
        },
        changeVal (event, item) {
            if (event == 'type') {
                this.devClassifyShow = true;
                 this.appTypeShow = false;
            } else if(event == 'appType'){
                this.appTypeShow = true;
                this.devClassifyShow = false;
            }
            else{
                this.devClassifyShow = false;
                this.appTypeShow = false;
            }
        },
        // 按设备分类查询的选项
        getDevClassify () {
            this.$request('queryDeviceTypeList').then(res => {
                if (res.data.returnCode == 0) {
                    for (let i = 0; i < res.data.typeInfos.length; i++) {
                        let obj = {
                            value: res.data.typeInfos[i].typeNo,
                            label: res.data.typeInfos[i].alias
                        };
                        this.devClassifOptions.push(obj);
                    }
                }
            });
        },
        getAppTypeOptions(){
           this.$request('getComboDataByParam', {params: {
                comboId: 2
            }}).then(res => {
                this.appTypeOptions = res.data.comboData;
            });
           
        },
        // 按条件查询
        queryByFactor () {
            if (this.value == 'type') {
                this.queryParams = {};
                this.queryParams[this.value] = this.devClassifyVal;
                this.queryParams.pageNum = 1;
                this.queryParams.pageSize = 20;
                this.getDeviceData();
            } else if(this.value == 'appType'){
               this.queryParams = {};
               this.queryParams[this.value] = this.appTypeVal;
                this.queryParams.pageNum = 1;
                this.queryParams.pageSize = 20;
                this.getDeviceData();
             } else{
                this.queryParams = {};
                this.queryParams[this.value] = this.input;
                 this.queryParams.pageNum = 1;
                this.queryParams.pageSize = 20;
                this.getDeviceData();
            }
           
        },
        // 编辑设备
        editDev (item) {
            this.editDialogVisible = true;
            this.formLabelAlign.devName = item.disc;
            this.formLabelAlign.devEIMI = item.simCode;
            this.editDeviceTypeVal = item.typeName;
            this.formLabelAlign.devAddress = item.commAddress;
            this.formLabelAlign.installAddress = item.installer;
            this.formLabelAlign.devLongitude = item.longitude;
            this.formLabelAlign.devLatitude = item.dimension;
            this.formLabelAlign.devNote = item.describe;
            this.locationVal = item.addressIds;
            // this.locationVal = [3,80,45,45];
            this.editDevParams.rtuId = item.rtuId;
        },
        // 编辑开关
        editPoint (item) {
            console.log('开关item', item);
            this.editPointVisible = true;
            this.formPoint1.piontName = item.disc;
            this.formPoint1.commAddress = item.commAddress;
            this.formPoint1.overPower = item.overPower;
            this.formPoint1.overVoltage = item.overVoltage;
            this.formPoint1.overCurrent = item.overCurrent;
            this.formPoint1.underVoltage = item.underVoltage;

            this.formPoint1.type = item.appType;
            this.editPointParams.rtuId = item.rtuId; 
            this.editPointParams.pointId = item.pointId; 
        },
        // 确定编辑设备
        checkEdit (formLabelAlign) {
            this.$refs[formLabelAlign].validate((valid) => {
                if (valid) {
                    if (this.editDeviceTypeVal && this.locationVal.length > 0) {
                        this.editDialogVisible = false;
                        this.editDevParams.commAddress = this.formLabelAlign.devAddress;
                        this.editDevParams.describe = this.formLabelAlign.devNote;
                        this.editDevParams.dimension = this.formLabelAlign.devLatitude;
                        this.editDevParams.disc = this.formLabelAlign.devName;
                        this.editDevParams.installer = this.formLabelAlign.installAddress;
                        this.editDevParams.longitude = this.formLabelAlign.devLongitude;
                        this.editDevParams.ownerId = this.locationVal[3];
                        this.editDevParams.ownerType = 33;
                        this.editDevParams.simCode = this.formLabelAlign.devEIMI;
                        this.$request('updateDevice', this.editDevParams).then(res => {
                            if (res.data.returnCode == 0) {
                                this.getDeviceData();
                                this.$message({
                                    title: this.$t('common.tip'),
                                    message: this.$t('common.editSuccess'),
                                    type: 'success'
                                });
                            } else {
                                this.$message({
                                    title: this.$t('common.tip'),
                                    message: res.data.returnMsg,
                                    type: 'warning'
                                });
                            }
                        });
                    } else {
                        this.$message({
                            title: this.$t('common.tip'),
                            message: '设备分类和所在区域不能为空~',
                            type: 'warning'
                        });
                    }
                }
            });
        },
        // 确定编辑开关
        checkEditPoint(formPoint1){
              this.$refs[formPoint1].validate((valid) => {
                    if(valid){
                      if(this.formPoint1.type) {
                            this.editPointParams.commAddress = this.formPoint1.commAddress;
                            this.editPointParams.disc = this.formPoint1.piontName;
                            this.editPointParams.overPower = this.formPoint1.overPower ? this.formPoint1.overPower : 0;
                            this.editPointParams.overVoltage = this.formPoint1.overVoltage ? this.formPoint1.overVoltage : 0 ;
                            this.editPointParams.overCurrent = this.formPoint1.overCurrent ? this.formPoint1.overCurrent : 0 ;
                            this.editPointParams.underVoltage = this.formPoint1.underVoltage ? this.formPoint1.underVoltage : 0 ;
                            this.editPointParams.appType = Number(this.formPoint1.type);
                            console.log("编辑开关参数",this.editPointParams);
                            this.$request('updatePoint', this.editPointParams).then( res => {
                              console.log("updatePoint",res)
                              if(res.data.returnCode == 0){
                                  this.getPointList();
                                  this.editPointVisible = false;
                                    this.$message({
                                        title: this.$t('common.tip'),
                                        message: this.$t('common.editSuccess'),
                                        type: 'success'
                                    });
                              } else {
                                  this.$message({
                                        title: this.$t('common.tip'),
                                        message: res.data.returnMsg,
                                        type: 'warning'
                                    });
                              }
                            })
                      } else {
                         this.$message({
                                title: this.$t('common.tip'),
                                message: '设备类型不能为空~',
                                type: 'warning'
                            });
                      }
                    }


              })
 
        },
        getAreaList () {
            this.$request('manageAreaList').then(res => {
            // console.log("省市区", res)
                if (res.data.returnCode == 0) {
                    this.locationOptions = res.data.areaInfos;
                }
            });
        },
        handleChange (value) {
            this.locationVal = value;
        },
        getEditType (value) {
            this.editDevParams.type = value;
        },
        //  单个删除网关
        dele (item) {
            this.deleteParams.rtuIdList.push(item.rtuId);
            this.$confirm(
                this.$t('areaManage.deleteTip'),
                this.$t('areaManage.reminder'),
                {
                    confirmButtonText: this.$t('common.yes'),
                    cancelButtonText: this.$t('common.cancel'),
                    type: 'warning'
                }
            ).then(() => {
                this.$request('deleteDevice', this.deleteParams).then(res => {
                // console.log("shanchu", res)
                    if (res.data.returnCode == 0) {
                        this.getDeviceData();
                        this.$message({
                            title: this.$t('common.tip'),
                            message: this.$t('common.deleteSuccess'),
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            title: this.$t('common.tip'),
                            message: res.data.returnMsg,
                            type: 'warning'
                        });
                    }
                });
            }).catch(() => {

            });
        },
        // 单个删除开关
        dele1 (item) {
            this.deletePointParams.pointIds = [];
            this.deletePointParams.pointIds.push(item.pointId);
            this.$confirm(
                this.$t('areaManage.deleteTip'),
                this.$t('areaManage.reminder'),
                {
                    confirmButtonText: this.$t('common.yes'),
                    cancelButtonText: this.$t('common.cancel'),
                    type: 'warning'
                }
            ).then(() => {
                console.log('删除开关res', this.deletePointParams);
                this.$request('deletePoint', this.deletePointParams).then(res => {
                    console.log('删除开关res', res);
                    if (res.data.returnCode == 0) {
                        this.getPointList();
                        this.$message({
                            title: this.$t('common.tip'),
                            message: this.$t('common.deleteSuccess'),
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            title: this.$t('common.tip'),
                            message: res.data.returnMsg,
                            type: 'warning'
                        });
                    }
                });
            }).catch(() => {

            });
        },
        // 点击批量删除按钮
        batchDel () {
            this.allDel = true;
        },
        batchDel1 () {
            this.allDel1 = true;
        },
        selectItem (item, index, id) {
            if (this.chooseArr.includes(id)) {
                this.chooseArr = this.chooseArr.filter(function (ele) {
                    return ele != id;
                });
            } else {
                this.chooseArr.push(id);
            }
            console.log('this.chooseArr', this.chooseArr);
        },
        // 取消批量删除
        cancleDel () {
            this.allDel = false;
            this.isSelect = false;
            this.chooseArr = [];
        },
        cancleDel1 () {
            this.allDel1 = false;
            this.isSelect = false;
            this.chooseArr = [];
        },
        // 确定批量删除网关
        deleteItem () {
            this.deleteParams.rtuIdList = this.chooseArr;
            this.$confirm(
                this.$t('areaManage.deleteTip'),
                this.$t('areaManage.reminder'),
                {
                    confirmButtonText: this.$t('common.yes'),
                    cancelButtonText: this.$t('common.cancel'),
                    type: 'warning'
                }
            ).then(() => {
                this.$request('deleteDevice', this.deleteParams).then(res => {
                    if (res.data.returnCode == 0) {
                        this.getDeviceData();
                        this.$message({
                            title: this.$t('common.tip'),
                            message: this.$t('common.deleteSuccess'),
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            title: this.$t('common.tip'),
                            message: res.data.returnMsg,
                            type: 'warning'
                        });
                    }
                });
            }).catch(() => {

            });
        },
        // 批量删除开关
        deleteItem1 () {
            this.deletePointParams.pointIds = this.chooseArr;
            this.$confirm(
                this.$t('areaManage.deleteTip'),
                this.$t('areaManage.reminder'),
                {
                    confirmButtonText: this.$t('common.yes'),
                    cancelButtonText: this.$t('common.cancel'),
                    type: 'warning'
                }
            ).then(() => {
                this.$request('deletePoint', this.deletePointParams).then(res => {
                    console.log('批量删除开关res', res);
                    if (res.data.returnCode == 0) {
                        this.getPointList();
                        this.$message({
                            title: this.$t('common.tip'),
                            message: this.$t('common.deleteSuccess'),
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            title: this.$t('common.tip'),
                            message: res.data.returnMsg,
                            type: 'warning'
                        });
                    }
                });
            }).catch(() => {

            });
        },
        // 设备详情显示
        showDetail (item) {
            this.dialogVisible = true;
            this.detailData = item;
        },
        // 新增设备
        clickAddDev () {
            this.addDialogVisible = true;
        },
        checkAddDev (formLabelAlign1) {
            this.$refs[formLabelAlign1].validate((valid) => {
                // console.log("valid",valid)
                if (valid) {
                    if (this.addTypeVal) {
                        this.addDialogVisible = false;
                        this.addDevParams.commAddress = this.formLabelAlign1.devAddress;
                        this.addDevParams.describe = this.formLabelAlign1.devNote;
                        this.addDevParams.dimension = this.formLabelAlign1.devLatitude;
                        this.addDevParams.disc = this.formLabelAlign1.devName;
                        this.addDevParams.installer = this.formLabelAlign1.installAddress;
                        this.addDevParams.longitude = this.formLabelAlign1.devLongitude;
                        this.addDevParams.ownerId = this.addLocationVal[3];
                        this.addDevParams.ownerType = 33;
                        this.addDevParams.simCode = this.formLabelAlign1.devEIMI;
                        this.$request('addDevice', this.addDevParams).then(res => {
                            if (res.data.returnCode == 0) {
                                this.getDeviceData();
                                this.$message({
                                    title: this.$t('common.tip'),
                                    message: this.$t('common.addSuccess'),
                                    type: 'success'
                                });

                                this.formLabelAlign = {
                                    devName: '',
                                    devEIMI: '',
                                    devAddress: '',
                                    devLongitude: '',
                                    devLatitude: '',
                                    devNote: '',
                                    installAddress: ''
                                };
                            } else {
                                this.$message({
                                    title: this.$t('common.tip'),
                                    message: res.data.returnMsg,
                                    type: 'warning'
                                });
                            }
                        });
                    } else {
                        this.$message({
                            title: this.$t('common.tip'),
                            message: '请选择设备分类',
                            type: 'warning'
                        });
                    }
                } else {
                //  this.$message({
                //         title: this.$t('common.tip'),
                //         message: this.$t('common.invalid'),
                //         type: 'warning'
                //     });
                }
            });
        },
        // 新增开关
        clickAddPoint () {
            this.addPointVisible = true;
        },

        checkAddPoint(formPoint){
             this.$refs[formPoint].validate((valid) => {
               if(valid){
                  if(this.formPoint.type){
                       this.addPointParams.commAddress = this.formPoint.commAddress;
                       this.addPointParams.disc = this.formPoint.piontName;
                       this.addPointParams.appType = Number(this.formPoint.type);
                      //  console.log("增加开关参数", this.addPointParams);
                        this.$request('addPoint', this.addPointParams).then( res => {
                           
                            if(res.data.returnCode == 0){
                              this.getPointList();
                              this.addPointVisible = false;
                            } else {
                              this.$message({
                                        title: this.$t('common.tip'),
                                        message: res.data.returnMsg,
                                        type: 'warning'
                                    });
                              }
                            })
                  } else {
                    this.$message({
                                title: this.$t('common.tip'),
                                message:'请选择设备类型',
                                type: 'warning'
                            });
                  }  
               } else {}
             })
        },
        handleChange1 (value) {
            // console.log(value)
            this.addLocationVal = value;
        },
        getAddType (value) {
            // console.log(value)
            this.addDevParams.type = value;
        },
        backGateway () {
            this.switchVisible = false;
            this.getDeviceData();
        },
        linkPoint (item) {
            console.log('当前网关', item);
            this.selectDevItem = item;
            this.addPointParams.rtuId = item.rtuId;
            this.chooseGatewayRtuId = item.rtuId;
            this.chooseGatewayItem = item.disc;
            this.switchVisible = true;
            this.getPointList();
        },
        getPointList () {
            this.$request('queryPoint', {params: {rtuId: this.chooseGatewayRtuId}}).then(res => {
                console.log('PPOk', res);
                if (res.data.returnCode == 0) {
                    this.piontData = res.data.pointInfos;
                } else {
                    this.$message({
                        title: this.$t('common.tip'),
                        message: res.data.returnMsg,
                        type: 'warning'
                    });
                }
            });
        },
        // beginToClick(){},
        // timeStrategy(){},

        // 开关下装
        bottomInstall () {
            this.asyncList.objectid = this.selectDevItem.rtuId;
            this.genTaskid();
            this.genRequestid();
            this.getContentDate();
            this.asyncSend();
            console.log('下装参数', this.asyncList);
        },
        getContentDate (){
           this.asyncList.content.data = [];
           for(let i=0; i< this.piontData.length;i++){
              let obj = {
                bulppassword:"000000",
                commaddress:this.piontData[i].commAddress+"",
                connectport:"3",
                databit:"3",
                dimension:"",
                groupno:"1",
                isparitybit:"0",
                longitude:"",
                loopno:"1",
                numberid:this.piontData[i].numberId+"",
                paritybit:"0",
                pointprofile:this.piontData[i].type+"",
                pointstatus:"0",
                pointtype:this.piontData[i].apptype == 4 ? "11" : "10",
                portbaudrate:"6",
                stopbit:"0"
              };
            this.asyncList.content.data.push(obj);

            }
        },
        asyncSend () {
            this.$request('sendData', this.asyncList).then(res => {
                console.log('>>>>> asyncSend', res);
                if (res.data.success == 1) {
                    this.asyncReceive();
                } else {
                    this.$message({
                        title: this.$t('common.tip'),
                        message: '发送数据失败',
                        type: 'warning'
                    });
                }
                return res;
            });
        },
        asyncReceive () {
            this.$request('receiveData', this.asyncList).then(res => {
                console.log('>>>> asyncReceive', res);
                if (this.interrupt) {
                    this.progressVisible = false;
                    this.percent = 0;
                } else {
                    if (this.recvTimeoutCount == 10) {
                        this.progressVisible = true;
                    }
                    this.percent = ((10 - this.recvTimeoutCount) / 10) * 100;
                }

                if (res.data.isresive == 0 && this.recvTimeoutCount > 0) {
                    setTimeout(() => {
                        this.recvTimeoutCount--;
                        this.asyncReceive();
                    }, 5000);
                } else if (res.data.isresive == 1 && res.data.content.data[0].result == 0) {
                    this.percent = 100;
                    this.progressVisible = true;
                    this.waitrecvMsg = '批量处理完成';
                    this.tocontinue = false;
                } else if (res.data.isresive == 1 && res.data.content.data[0].result == 1) {
                    this.percent = 100;
                    this.waitrecvMsg = this.getErrorMsg(res.data.content.data[0].errortype, res.data.content.data[0].errorcode);
                    this.recvTimeoutCount = 10;
                } else {
                    this.percent = 100;
                    this.recvTimeoutCount = 10;
                    this.waitrecvMsg = '超时';
                }
            });
        },
        getErrorMsg (errortype, errorcode) {
            if (errortype == '0') {
                return this.$t('errorMsg.errortype0');
            } else if (errortype == '1') {
                if (errorcode == '0') {
                    return this.$t('errorMsg.errorcode1_0');
                } else
                if (errorcode == '1') {
                    return this.$t('errorMsg.errorcode1_1');
                } else
                if (errorcode == '2') {
                    return this.$t('errorMsg.errorcode1_2');
                } else
                if (errorcode == '3') {
                    return this.$t('errorMsg.errorcode1_3');
                } else
                if (errorcode == '4') {
                    return this.$t('errorMsg.errorcode1_4');
                } else {
                    return this.$t('errorMsg.errorcode1_other');
                }
            } else if (errortype == '2' || errortype == '3') {
                if (errorcode == '0') {
                    return this.$t('errorMsg.errorcode23_0');
                } else if (errorcode == '3') {
                    return this.$t('errorMsg.errorcode23_3');
                } else if (errorcode == '4') {
                    return this.$t('errorMsg.errorcode23_4');
                } else if (errorcode == '12') {
                    return this.$t('errorMsg.errorcode23_12');
                } else {
                    return this.$t('errorMsg.errorcode23_other');
                }
            } else if (errortype == '4') {
                return this.$t('errorMsg.errortype4');
            } else {
                return this.$t('errorMsg.errortypeother');
            }
        },
        genTaskid () {
            // this.switchList.taskid = this.genRandomNum(1000, 9999);
            this.asyncList.taskid = this.genRandomNum(1000, 9999);
        },
        genRequestid () {
            // this.switchList.requestid = this.randomWord(false, 8, 8);
            this.asyncList.requestid = this.randomWord(false, 8, 8);
        },
        genRandomNum (min, max) {
            let range = max - min;
            let rand = Math.random();
            return min + Math.round(rand * range);
        },
        randomWord (randomFlag, min, max) {
            let str = '',
                range = min,
                arr = [
                    '0',
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    'a',
                    'b',
                    'c',
                    'd',
                    'e',
                    'f',
                    'g',
                    'h',
                    'i',
                    'j',
                    'k',
                    'l',
                    'm',
                    'n',
                    'o',
                    'p',
                    'q',
                    'r',
                    's',
                    't',
                    'u',
                    'v',
                    'w',
                    'x',
                    'y',
                    'z',
                    'A',
                    'B',
                    'C',
                    'D',
                    'E',
                    'F',
                    'G',
                    'H',
                    'I',
                    'J',
                    'K',
                    'L',
                    'M',
                    'N',
                    'O',
                    'P',
                    'Q',
                    'R',
                    'S',
                    'T',
                    'U',
                    'V',
                    'W',
                    'X',
                    'Y',
                    'Z'
                ];
            let pos;
            // 随机产生
            if (randomFlag) {
                range = Math.round(Math.random() * (max - min)) + min;
            }
            for (var i = 0; i < range; i++) {
                pos = Math.round(Math.random() * (arr.length - 1));
                str += arr[pos];
            }
            return str;
        },
        intercept () {
            this.interrupt = false;
            this.recvTimeoutCount = 10;
            this.progressVisible = false;
            this.percent = 0;
            this.waitrecvMsg = '';
        }

    }
};
</script>

<style lang='scss' scope>
#device {
  background-color: #fff;
  box-sizing: border-box;
   .green {
    color: green!important;
  }
  .grey {
    color: grey!important;
  }
  .progressCss {
    .el-dialog__header {
      border-bottom: 1px solid rgb(243, 243, 243);
      padding: 10px;
    }
    .el-dialog__body {
       border-bottom: 1px solid rgb(243, 243, 243);
      // padding: 10px;
    }
  }
  .device_top {
    padding-left: 10px;
    height: 80px;
    line-height: 80px;
    background-color: #fff;
    box-sizing: border-box;
    .el-input {
      width: 217px;
      margin-right: 10px;
    }
  }
  .device_body {
    // height: 79%;
    height: 61vh;
    background-color: rgb(243, 243, 243);
    padding: 10px;
    padding-top: 0;
    overflow-y: auto;
    .device_body_lists {
      .item {
        border: 1px solid transparent;
        background-color: #fff;
        box-sizing: border-box;
        // height: 200px;
        margin-top: 15px;
        padding: 15px;
        position: relative;
        .item_img {
          display: block;
          width: 0.65rem;
          height: 0.65rem;
          margin-bottom: 0.3rem;
        }
        p {
          font-size: 14px;
          color: rgb(153, 153, 153);
          margin-bottom: 0.2rem;
          span {
            color: rgb(51, 51, 51);
          }
        }
        .item_address {
          margin-bottom: 0;
        }
        .delete {
          position: absolute;
          right: 15px;
          top: 15px;
          font-size: 18px;
          color: rgb(153, 153, 153);
          cursor: pointer;
        }
        .operator {
          position: absolute;
          right: 15px;
          bottom: 12px;
          .detail {
            background-color: rgb(236, 243, 252);
            padding: 8px;
            border-radius: 2px;
            display: inline-block;
            width: 32px;
            height: 32px;
            cursor: pointer;
            box-sizing: border-box;
            margin-right: 5px;
            img {
              display: block;
              height: 16px;
              width: 16px;
            }
          }
          .edit {
            background-color: rgb(236, 243, 252);
            padding: 10px;
            border-radius: 2px;
            display: inline-block;
            width: 36px;
            height: 36px;
            cursor: pointer;
            box-sizing: border-box;
            img {
              display: block;
              height: 16px;
              width: 16px;
            }
          }
        }

        .operator1  {
            .detail {
            background-color: rgb(236, 243, 252);
            padding: 8px;
            border-radius: 2px;
            display: inline-block;
            width: 32px;
            height: 32px;
            cursor: pointer;
            box-sizing: border-box;
            margin-right: 5px;
            img {
              display: block;
              height: 16px;
              width: 16px;
            }
          }
          .edit {
            background-color: rgb(236, 243, 252);
            padding: 8px;
            border-radius: 2px;
            display: inline-block;
            width: 32px;
            height: 32px;
            cursor: pointer;
            box-sizing: border-box;
            img {
              display: block;
              height: 16px;
              width: 16px;
            }
          }
          .edit1 {
            background-color: rgb(236, 243, 252);
            // padding: 8px;
            border-radius: 2px;
            display: inline-block;
            width: 32px;
            height: 32px;
            cursor: pointer;
            box-sizing: border-box;
            i {
              display: block;
              height: 16px;
              width: 16px;
            }
          }
        }
      }

      .checkbox {
        display: block;
        border: 1px solid rgb(243, 243, 243);
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        span {
          font-size: 17px;
          color: #fff;
        }
      }
      .selectStyle {
        background-color: rgb(24, 144, 255);
        border-color: rgb(24, 144, 255);
      }
      .selectStyle1 {
        border-color: rgb(24, 144, 255);
      }
    }
  }
  .device_footer {
    height: 88px;
    line-height: 88px;
    // background-color: #fff;
    padding-left: 10px;
  }
  .detail_dialog {
    .el-dialog__header {
      border-bottom: 1px solid rgb(243, 243, 243);
      padding: 10px;
      padding-left: 20px;
    }
    .el-dialog__title {
      font-size: 16px;
      color: rgb(51, 51, 51);
    }
    .el-dialog__headerbtn {
      top: 12px;
      right: 10px;
    }
    .el-dialog__body {
      padding: 10px;
      padding-left: 20px;
    }
    .detail_img {
      display: block;
      width: 0.65rem;
      height: 0.65rem;
      margin: 0 auto;
    }
    p {
      font-size: 14px;
      color: rgb(153, 153, 153);
      margin-top: 10px;
      span {
        color: rgb(51, 51, 51);
      }
    }
  }
  .addDev_dialog {
    .el-dialog__header {
      border-bottom: 1px solid rgb(243, 243, 243);
      padding: 10px;
    }
    .el-dialog__headerbtn {
      top: 12px;
      right: 10px;
    }
    .el-dialog__title {
      font-size: 16px;
    }
    .el-dialog__body {
      padding: 10px;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
    .el-form-item__label {
      text-align: left;
      color: rgb(102, 102, 102);
      font-size: 14px;
    }
    .el-input__inner {
      height: 30px;
      line-height: 30px;
    }
    .el-select {
      width: 100%;
    }
    .el-button {
      padding: 8px 127px;
    }
  }

  @media only screen and (min-width: 1200px) {
    .el-col-lg-4-8 {
      width: 20%;
    }
  }
}
</style>
