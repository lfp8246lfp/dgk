  <template>
  <div id="realtimecontrol">
    <div class="device_top" v-show="!switchVisible">
      <el-select v-model="value" :placeholder="$t('common.pleaseSelect')" @change="changeVal">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="input" :placeholder="$t('realtimecontrol.pleaseInput')" clearable v-show="!devClassifyShow"></el-input>
       <el-select v-model="devClassifyVal" :placeholder="$t('common.pleaseSelect')" v-show="devClassifyShow">
        <el-option
          v-for="item in devClassifOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" @click.native="queryByFactor">{{$t('common.query')}}</el-button>
    </div>
    <!-- 开关top -->
    <div class="device_top" v-show="switchVisible">
      <span style="margin-right: 20px; font-size: 18px;">网关{{chooseGatewayItem}}下的开关档案</span>
      <el-button type="primary" @click.native="backGateway">返回网关</el-button>
    </div>
    <!-- 网关body -->
    <div class="device_body" v-show="!switchVisible">
      <el-col :span="24">
        <ul class="device_body_lists">
          <el-row :gutter="13">
           <el-col :xs="12" :sm="6" class="el-col-lg-4-8" v-for="(item,index) in deviceData" :key="index">
              <li class="item"  :class="{selectStyle1 : chooseArr.includes(item.rtuId)}" >
                <img :src="item.deviceType|getDevTypeIcon" alt class="item_img" />
                <p>
                  {{$t('common.deviceName')}}：
                  <span>{{item.disc}}</span>
                </p>
                <p>
                  {{$t('realtimecontrol.devStatus')}}：
                  <span class="status_red">异常</span>
                </p>
                <p>
                   {{$t('realtimecontrol.devClassify')}}：
                  <span>{{item.typeName}}</span>
                </p>
                <p class="item_address">
                  {{$t('realtimecontrol.commAddress')}}：
                  <span>{{item.commAddress}}</span>
                </p>
                <i class="delete checkbox"  @click="selectItem($event,item.rtuId, item)" :class="{selectStyle : chooseArr.includes(item.rtuId)}">
                  <span class="el-icon-check" v-show="chooseArr.includes(item.rtuId)"></span>
                </i>
                <i class="operator">
                   <el-tooltip effect="dark" content="实时数据" placement="top-start">
                      <span class="detail" @click="dialogVisible1 = true">
                        <i class="el-icon-s-data"></i>
                      </span>
                   </el-tooltip>
                    <el-tooltip effect="dark" content="联动" placement="top-start">
                      <span class="detail" @click="linkPoint(item)">
                        <i class="el-icon-link"></i>
                      </span>
                   </el-tooltip>

                </i>
              </li>
           </el-col>
         
          
          </el-row>
        </ul>
      </el-col>
    </div>
   <!-- 开关body -->
    <div class="device_body" v-show="switchVisible">
      <el-col :span="24">
        <ul class="device_body_lists" >
          <el-row :gutter="13" v-infinite-scroll="load">
             <el-col :xs="12" :sm="6" class="el-col-lg-4-8" v-for="(item,index) in piontData" :key="index">
                <li class="item">
                <img src="../../../../static/images/on_off.png" alt class="item_img" />
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
                  <span>{{item.appType | changeAppType}}</span>
                </p>
                <p class="item_address">
                  {{ $t('deviceManage.commAddress')}}：
                  <span>{{item.commAddress}}</span>
                </p>
               
                 <i class="operator1"> 
                   <el-dropdown>     
                    <span class="edit">
                        <img src="../../../../static/images/icon-dev.png" alt />
                    </span>
                   <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="singleToClick(1,item)"> {{$t('realtimecontrol.open')}}</el-dropdown-item>
                      <el-dropdown-item @click.native="singleToClick(0,item)"> {{$t('realtimecontrol.close')}}</el-dropdown-item>
                      <el-dropdown-item @click.native="singleToClick(2,item)"> {{$t('realtimecontrol.restart')}}</el-dropdown-item>
                      <el-dropdown-item @click.native="singleToClick(3,item)"> {{$t('deviceManage.restore')}}</el-dropdown-item>
                      <!-- <el-dropdown-item @click.native="timeStrategy(item)"> {{$t('deviceManage.timeStrategy')}}</el-dropdown-item> -->
                    </el-dropdown-menu>
                  </el-dropdown>
                </i>
              </li>
             </el-col>
          </el-row>
        </ul>
      </el-col>
    </div>
    <div class="device_footer" v-show="!switchVisible">
      <el-button type="primary" @click.native="beginToClick(1)">{{$t('realtimecontrol.open')}}</el-button>
      <el-button type="primary" @click.native="beginToClick(0)">{{$t('realtimecontrol.close')}}</el-button>
      <el-button type="primary" @click.native="beginToClick(2)">{{$t('realtimecontrol.restart')}}</el-button>
      <el-button type="primary" @click.native="beginToClick(3)">{{$t('realtimecontrol.threshold')}}</el-button>
    </div>
    <div class="device_footer" v-show="switchVisible">
      <!-- <el-button type="primary" @click.native="backGateway">返回网关</el-button> -->
      <el-button type="primary" @click.native="timeStrategy">定时策略</el-button>
    </div>
     

  <!-- 实时数据弹框 -->
    <el-dialog
      class="realtime_data_dialog clearfix"
      :title="$t('realtimecontrol.realtimeData')"
      :visible.sync="dialogVisible1"
      width="1000px"
     >
      <div class="dialog_left pull-left">
        <div class="dev_info">
          <h3>{{$t('realtimecontrol.devInfo')}}</h3>
          <p>{{$t('common.deviceName')}}：<span>设备名称1</span></p>
          <p>{{$t('realtimecontrol.devStatus')}}：<span>正常</span></p>
          <p>{{$t('realtimecontrol.devClassify')}}：<span>分类1</span></p>
          <p>{{$t('realtimecontrol.commAddress')}}:<span>115.152.58.181</span></p>
        </div>
        <div class="realtime_data">
          <h3>{{$t('realtimecontrol.realtimeData')}}</h3>
          <p>{{$t('realtimecontrol.currentA')}}：<span>2A</span></p>
          <p>{{$t('realtimecontrol.voltageA')}}：<span>220V</span></p>
          <p>{{$t('realtimecontrol.powerA')}}：<span>440W</span></p>
          <p>{{$t('realtimecontrol.temperatureA')}}：<span>60℃</span></p>
          <p>{{$t('realtimecontrol.residualCurrent')}}：<span>2A</span></p>
        </div>
      </div>
      <div class="dialog_right pull-left">
         <h3>{{$t('realtimecontrol.currentTrendChart')}}</h3>
         <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
            <el-tab-pane :label="$t('realtimecontrol.current')" name="first" lazy>
              <ve-line :data="currentData" :settings="currentChartSettings" style="width: 10rem;" :extend="chartExtend"></ve-line>
            </el-tab-pane>
            <el-tab-pane :label="$t('realtimecontrol.voltage')" name="second" lazy>
                <ve-line :data="currentData" :settings="currentChartSettings" style="width: 10rem;" :extend="chartExtend"></ve-line>
            </el-tab-pane>
            <el-tab-pane :label="$t('realtimecontrol.power')" name="third" lazy>
               <ve-line :data="currentData" :settings="currentChartSettings" style="width: 10rem;" :extend="chartExtend"></ve-line>
            </el-tab-pane>
            <el-tab-pane :label="$t('realtimecontrol.temperature')" name="fourth" lazy>
               <ve-line :data="currentData" :settings="currentChartSettings" style="width: 10rem;" :extend="chartExtend"></ve-line>
            </el-tab-pane>
            <el-tab-pane :label="$t('realtimecontrol.residualCurrent')" name="five" lazy>
               <ve-line :data="currentData" :settings="currentChartSettings" style="width: 10rem;" :extend="chartExtend"></ve-line>
            </el-tab-pane>
        </el-tabs>
      </div>
   </el-dialog>

  <!-- 数据召读 -->
  <el-dialog
      class="realtime_data_dialog  dataReading"
      :title="$t('realtimecontrol.dataReading')"
      :visible.sync="dataReadingVisible"
      width="1200px"
     >
      <el-button type="primary" @click="">召读</el-button>
      <el-table
      :data="tableData"
      style="width: 100%;margin-top: 20px;"
      border
      row-key="id"
      :header-cell-style="{background:'rgb(243,243,243)'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column :label="$t('realtimecontrol.orderNum')" type="index" width="50px"></el-table-column>
      <el-table-column prop="name" :label="$t('realtimecontrol.name')" ></el-table-column>
      <!-- <el-table-column prop="type" :label="$t('devicetype.icon')">
          <template slot-scope="scope">
           <img :src="scope.row.type|getDevTypeIcon" alt="">
          </template>
      </el-table-column> -->
      <el-table-column prop="commaddress" :label="$t('realtimecontrol.commAddress')">
      </el-table-column>
      <el-table-column prop="type" :label="$t('realtimecontrol.type')">
        <!-- <template slot-scope="scope">{{changeDevType(scope.row.type)}}</template> -->
      </el-table-column>
      <el-table-column prop="time" :label="$t('realtimecontrol.dataTime')" width="160px">
        <!-- <template slot-scope="scope">{{ scope.row.appType | changeAppType}}</template> -->
      </el-table-column>
      <el-table-column prop="current" :label="$t('realtimecontrol.current1')"></el-table-column>
      <el-table-column prop="voltage" :label="$t('realtimecontrol.voltage1')"></el-table-column>
      <el-table-column prop="power" :label="$t('realtimecontrol.power1')"></el-table-column>
    </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dataReadingVisible = false">取 消</el-button>
        <el-button type="primary" @click="dataReadingVisible = false">确 定</el-button>
      </span>
   </el-dialog>
  
  <!-- 参数同步 -->
   <el-dialog
      class="realtime_data_dialog  dataReading"
      :title="$t('realtimecontrol.syncParam')"
      :visible.sync="syncParamVisible"
      width="1200px"
     >
      <el-button type="primary" @click="" icon="el-icon-link">手工同步</el-button>
      <el-button type="primary" @click="" >召读</el-button>
      <el-button type="primary" @click="">删除</el-button>
      <el-button type="primary" @click="">刷新</el-button>
      <el-table
      :data="tableData1"
      style="width: 100%;margin-top: 20px;"
      border
      row-key="id"
      :header-cell-style="{background:'rgb(243,243,243)'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column :label="$t('realtimecontrol.orderNum')" type="index" width="50px"></el-table-column>
      <el-table-column prop="commaddress" :label="$t('realtimecontrol.commAddress')">
      </el-table-column>
      <el-table-column prop="measuringNum" :label="$t('realtimecontrol.measuringNum')">
        <!-- <template slot-scope="scope">{{changeDevType(scope.row.type)}}</template> -->
      </el-table-column>
      <el-table-column prop="" :label="$t('realtimecontrol.appType')">
         <template slot-scope="scope">
           <el-select v-model="scope.row.appType" value-key="value"  size="mini" >
            <el-option
              v-for="item in appTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
         </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('realtimecontrol.devType')">
        <template slot-scope="scope">
           <el-select v-model="scope.row.devType" value-key="value"  size="mini" >
            <el-option
              v-for="item in devTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
         </template>
      </el-table-column>
      <el-table-column prop="groupNo" :label="$t('realtimecontrol.groupNo')">
      </el-table-column>
      <el-table-column prop="syncStatus" :label="$t('realtimecontrol.syncStatus')">
        <!-- <template slot-scope="scope">{{ scope.row.appType | changeAppType}}</template> -->
      </el-table-column>
      <el-table-column prop="syncTime" :label="$t('realtimecontrol.syncTime')" width="160px"></el-table-column>
      
    </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dataReadingVisible = false">取 消</el-button>
        <el-button type="primary" @click="dataReadingVisible = false">确 定</el-button>
      </span>
   </el-dialog>
   <!-- 定时策略 -->
      <el-dialog
      class="realtime_data_dialog  dataReading timeStrategy"
      :title="$t('realtimecontrol.timeStrategy')"
      :visible.sync="timeStrategyVisible"
      width="1200px"
     >
      <el-table
      ref="multipleTable"
      :data="timeStrategyTab"
      style="width: 100%;margin-top: 20px;margin-bottom: 20px;"
      border
      row-key="id"
      :header-cell-style="{background:'rgb(243,243,243)'}"
      @selection-change="handleSelecttimeStrategy"
    >
      
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column prop="portName" :label="$t('realtimecontrol.portName')"></el-table-column>
      <el-table-column prop="" :label="$t('realtimecontrol.action1')">
         <template slot-scope="scope">
           <el-select v-model="scope.row.status1" value-key="value">
            <el-option
              v-for="item in switchStaus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-time-picker
            arrow-control
            v-model="scope.row.time1"
            placeholder="时间">
          </el-time-picker>
         </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('realtimecontrol.action2')">
        <template slot-scope="scope">
           <el-select v-model="scope.row.status2" value-key="value"  size="mini" >
            <el-option
              v-for="item in switchStaus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
           <el-time-picker
            arrow-control
            v-model="scope.row.time2"
            placeholder="时间">
          </el-time-picker>
         </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('realtimecontrol.action3')">
        <template slot-scope="scope">
           <el-select v-model="scope.row.status3" value-key="value"  size="mini" >
            <el-option
              v-for="item in switchStaus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
           <el-time-picker
            arrow-control
            v-model="scope.row.time3"
            placeholder="时间">
          </el-time-picker>
         </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('realtimecontrol.action4')">
        <template slot-scope="scope">
           <el-select v-model="scope.row.status4" value-key="value"  size="mini" >
            <el-option
              v-for="item in switchStaus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
           <el-time-picker
            arrow-control
            v-model="scope.row.time4"
            placeholder="时间">
          </el-time-picker>
         </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('realtimecontrol.isOpen')" >未开启</el-table-column> 
    </el-table>

    <el-button type="primary" @click="" >召读</el-button>
    <el-button type="primary" @click="setTimeStrategy" >设置</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="timeStrategyVisible = false">取 消</el-button>
        <el-button type="primary" @click="timeStrategyVisible = false">确 定</el-button>
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
        <p style="margin-top: 10px;" v-show=" percent == 100">{{waitrecvMsg }}</p>
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
        this.currentChartSettings = {
            metrics: ['电流(A)'],
            dimension: ['日期'],
            yAxisName: ['电流(A)']
        };
        return {
            options: [
                {
                    value: 'disc',
                    label: this.$t('common.deviceName')
                },
                {
                    value: 'simCode',
                    label: this.$t('common.devEIMI')
                },
                {
                    value: 'type',
                    label: this.$t('common.devClassify')
                },
                {
                    value: 'commAddress',
                    label: this.$t('common.commAddress')
                }
            ],
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
                devNote: ''
            },
            allDel: false,
            isSelect: false,
            index: '',
            chooseArr: [],
            chooseList: [],
            visible: false,
            dialogVisible1: false,
            dataReadingVisible: false,
            syncParamVisible: false,
            activeName: 'first',
            currentData: {
                columns: ['日期', '电流(A)'],
                rows: [
                    { '日期': '1/1', '电流(A)': 2},
                    { '日期': '1/2', '电流(A)': 4 },
                    { '日期': '1/3', '电流(A)': 2 },
                    { '日期': '1/4', '电流(A)': 6 },
                    { '日期': '1/5', '电流(A)': 1 },
                    { '日期': '1/6', '电流(A)': 3 }
                ]
            },
            chartExtend: {
                legend: {
                    bottom: 0,

                    textStyle: {
                        color: '#409EFF',
                        fontSize: 12
                    }
                },
                xAxis: {
                    show: false
                },
                // yAxis:{
                //   name: '电流(A)'
                // },
                lineStyle: {
                    normal: {
                        width: 10, // 连线粗细
                        color: '#409EFF' // 连线颜色
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#409EFF' // 图标颜色
                    }
                }

            },
            tableData: [
                {
                    name: '1P',
                    commaddress: '11111111111',
                    type: '1P回路设备',
                    time: '2019-07-16 15:31:00',
                    current: 2,
                    voltage: 220,
                    power: 440
                }, {
                    name: '1P',
                    commaddress: '11111111111',
                    type: '1P回路设备',
                    time: '2019-07-16 15:31:00',
                    current: 2,
                    voltage: 220,
                    power: 440
                }, {
                    name: '1P',
                    commaddress: '11111111111',
                    type: '1P回路设备',
                    time: '2019-07-16 15:31:00',
                    current: 2,
                    voltage: 220,
                    power: 440
                }, {
                    name: '1P',
                    commaddress: '11111111111',
                    type: '1P回路设备',
                    time: '2019-07-16 15:31:00',
                    current: 2,
                    voltage: 220,
                    power: 440
                }
            ],
            tableData1: [
                {
                    commaddress: '11111111111',
                    measuringNum: 100,
                    groupNo: '1',
                    appType: 2,
                    devType: 1,
                    syncStatus: '已同步',
                    syncTime: '2019-07-16 15:31:00'
                }, {
                    commaddress: '11111111111',
                    measuringNum: 100,
                    groupNo: '1',
                    appType: 2,
                    devType: 1,
                    syncStatus: '已同步',
                    syncTime: '2019-07-16 15:31:00'
                }, {
                    commaddress: '11111111111',
                    measuringNum: 100,
                    groupNo: '1',
                    appType: 1,
                    devType: 2,
                    syncStatus: '已同步',
                    syncTime: '2019-07-16 15:31:00'
                }, {
                    commaddress: '11111111111',
                    measuringNum: 100,
                    groupNo: '1',
                    appType: 1,
                    devType: 1,
                    syncStatus: '已同步',
                    syncTime: '2019-07-16 15:31:00'
                }
            ],
            timeStrategyTab: [
                {
                    portName: '1',
                    status1: '01',
                    status2: '01',
                    status3: '01',
                    status4: '01',
                    time1: '',
                    time2: '',
                    time3: '',
                    time4: ''
                },
                {
                    portName: '2',
                    status1: '01',
                    status2: '01',
                    status3: '01',
                    status4: '01',
                    time1: '',
                    time2: '',
                    time3: '',
                    time4: ''
                }
            ],
            appTypes: [
                {
                    label: 'ces1',
                    value: 1
                },
                {
                    label: 'ces2',
                    value: 2
                }
            ],
            devTypes: [
                {
                    label: '摄像机',
                    value: 1
                }, {
                    label: '路灯',
                    value: 2
                }
            ],
            switchStaus: [
                {
                    label: '开启',
                    value: '01'
                }, {
                    label: '关闭',
                    value: '00'
                }, {
                    label: '重启',
                    value: '02'
                }
            ],
            multipleSelection: [],
            interrupt: false,
            flag: '',
            procIndex: '',
            switchList: {
                fir: '1',
                fin: '1',
                objectid: 17893,
                objecttype: 1,
                requestid: 'requestid',
                taskid: 5579,
                isresive: 0,
                afn: '1',
                content: {
                    name: 'H250',
                    data: {
                        commaddress: '120111100301',
                        numberid: 101,
                        groupindex: '1', // 相位 1 A相  2 B相   3 C相   255 表示全部
                        control: '1', // 1 开 0 关
                        bright: '99',
                        time: 'FFFF'
                    }
                }
            },
            switchTimeList: {
                fir: '1',
                fin: '1',
                objectid: 17893,
                objecttype: 10,
                requestid: 'requestid',
                taskid: 5579,
                isresive: 0,
                afn: '1',
                content: {
                    name: 'H227',
                    data: {
                        bright1: 0, // 亮度 默认0
                        bright2: 0,
                        bright3: 0,
                        bright4: 0,
                        status1: '00',
                        status2: '00',
                        status3: '00',
                        status4: '00',
                        time1: '00:00',
                        time2: '12:24',
                        time3: '17:24',
                        time4: '23:24',
                        strategyno: '01', // 编号 默认01
                        timecount: '05' // 时段个数（默认05）
                    }
                }
            },
            queryParams: {
                'pageNum': 1,
                'pageSize': 20
            },
            devClassifOptions: [],
            devClassifyShow: false,
            devClassifyVal: '',
            deviceData: [],
            progressVisible: false,
            percent: 20,
            progressTitle: '等待数据回复中...',
            recvTimeoutCount: 10,
            waitrecvMsg: '', // 提示信息
            selectedrecvDcu: [],
            tocontinue: false,
            switchVisible: false,
            chooseGatewayItem: '',
            chooseGatewayRtuId: 0,
            piontData: [],
            timeStrategyVisible: false,
            timeStrategySelect: []

        };
    },
    mounted () {
        this.getDeviceData();
        this.getDevClassify();
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
        // 按条件查询
        queryByFactor () {
            if (this.value == 'type') {
                this.queryParams = {};
                this.queryParams[this.value] = this.devClassifyVal;
            } else {
                this.queryParams = {};
                this.queryParams[this.value] = this.input;
            }
            this.queryParams.pageNum = 1;
            this.queryParams.pageSize = 20;
            this.getDeviceData();
        },
        changeVal (event, item) {
            if (event == 'type') {
                this.devClassifyShow = true;
            } else {
                this.devClassifyShow = false;
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
        selectItem (item, index, list) {
            if (this.chooseArr.includes(index)) {
                this.chooseArr = this.chooseArr.filter(function (ele) { return ele != index; });
            } else {
                this.chooseArr.push(index);
            }
            console.log('this.chooseArr', this.chooseArr);

            let obj = {
                commAddress: list.commAddress,
                rtuId: list.rtuId
            };
            this.chooseList.push(obj);
            //  console.log("选择的网关", list);
            this.selectedrecvDcu = [];
            for (var i = 0; i < this.chooseList.length; i++) {
                for (var j = 0; j < this.chooseArr.length; j++) {
                    if (this.chooseArr[j] == this.chooseList[i].rtuId) {
                        let item = {
                            commAddress: this.chooseList[i].commAddress,
                            rtuId: this.chooseList[i].rtuId
                        };
                        this.selectedrecvDcu.push(item);
                    }
                }
            }
            console.log('选择的网关', this.selectedrecvDcu);
        },

        // tab切换
        handleClick (tab, event) {
        // console.log(tab, event);
        },

        // number  0 close  1 open   2 reset   3 threshold 阈值
        beginToClick (number) {
            this.interrupt = false;
            this.procIndex = 0;
            this.flag = number;
            this.beginToBat();
        },
        beginToBat () {
            this.percent = 0;
            if (this.chooseArr.length < 1) {
                this.$message({
                    title: this.$t('common.tip'),
                    message: '请选择至少一项设备',
                    type: 'warning'
                });
            } else {
                this.interrupt = false;
                this.tocontinue = true;
                if (this.procIndex < this.selectedrecvDcu.length) {
                    let item = this.selectedrecvDcu[this.procIndex];
                    //  this.switchList.objectid = item.rtuId;
                    this.switchList.content.data.commaddress = item.commAddress;
                    if (this.flag == 0) {
                        this.switchList.content.data.control = '0';
                        this.switchList.content.data.bright = '0';
                        this.sendData();
                    } else if (this.flag == 1) {
                        this.switchList.content.data.control = '1';
                        this.switchList.content.data.bright = '99';
                        this.sendData();
                    } else if (this.flag == 2) {
                        this.switchList.content.data.control = '2';
                        this.switchList.content.data.bright = '0';
                        this.sendData();
                    }
                } else {
                    this.percent = 100;
                }
            }
        },
        sendData () {
            this.genTaskid();
            this.genRequestid();
            console.log('switchList', this.switchList);
            this.recvTimeoutCount = 10;
            this.$request('sendData', this.switchList).then(res => {
                console.log('发送数据', res);
                if (res.data.success == 1) {
                    this.receiveData();
                } else {
                    if (this.selectedrecvDcu.length > 1) {
                        this.procIndex++;
                        this.beginToBat();
                    } else {
                        this.$message({
                            title: this.$t('common.tip'),
                            message: '发送数据失败',
                            type: 'warning'
                        });
                    }
                }
            });
        },
        receiveData () {
            this.$request('receiveData', this.switchList).then(res => {
                console.log('//...>>>> receiveData', res);

                if (this.interrupt) {
                    this.progressVisible = false;
                    this.percent = 0;
                } else {
                    if (this.recvTimeoutCount == 10) {
                        this.progressVisible = true;
                        // this.percent = ((10 - this.recvTimeoutCount) / 10) * 100;
                    }
                    this.percent = ((10 - this.recvTimeoutCount) / 10) * 100;
                }

                if (res.data.isresive == 0 && this.recvTimeoutCount > 0 && this.tocontinue) {
                    setTimeout(() => {
                        this.recvTimeoutCount--;
                        this.receiveData();
                    }, 5000);
                } else if (res.data.isresive == 1 && res.data.content.data[0].result == 0) {
                    this.percent = 100;
                    this.progressVisible = true;
                    this.waitrecvMsg = '处理完成';
                    this.tocontinue = false;
                    this.procIndex++;
                    setTimeout(() => {
                        this.beginToBat();
                    }, 500);
                } else if (res.data.isresive == 1 && res.data.content.data[0].result == 1) {
                    this.percent = 100;
                    this.waitrecvMsg = this.getErrorMsg(res.data.content.data[0].errortype, res.data.content.data[0].errorcode);
                    this.recvTimeoutCount = 10;
                    this.tocontinue = false;
                    this.procIndex++;
                    setTimeout(() => {
                        this.beginToBat();
                    }, 500);
                } else {
                    this.percent = 100;
                    this.recvTimeoutCount = 10;
                    this.waitrecvMsg = '超时';
                    this.tocontinue = false;
                    this.procIndex++;
                    setTimeout(() => {
                        this.beginToBat();
                    }, 500);
                }
            });
        },
        genTaskid () {
            this.switchList.taskid = this.genRandomNum(1000, 9999);
        },
        genRequestid () {
            this.switchList.requestid = this.randomWord(false, 8, 8);
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
        },
        // 数据召读
        dataRead () {
            this.dataReadingVisible = true;
        },
        handleSelectionChange (val) {
            this.multipleSelection = val;
        },

        // 参数同步
        syncParam () {
            this.syncParamVisible = true;
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
        linkPoint (item) {
            console.log('当前网关', item);
            this.switchVisible = true;
            this.chooseGatewayItem = item.disc;
            this.chooseGatewayRtuId = item.rtuId;
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
        // 滚动加载数据
        load () {},
        backGateway () {
            this.switchVisible = false;
            this.getDeviceData();
        },
        // 单个操作开关
        singleToClick (number, item) {
            console.log('单个操作开关item', item);
            this.flag = number;
            this.interrupt = false;
            this.switchList.content.data.commaddress = item.commAddress;
            //  this.switchList.objectid= item.rtuId;
            this.beginToSend();
        },
        beginToSend () {
            this.percent = 0;
            this.switchList.content.name = 'H335';
            if (this.flag == 0) {
                this.switchList.content.data.control = '0';
                this.switchList.content.data.bright = '0';
                this.singleSendData();
            } else if (this.flag == 1) {
                this.switchList.content.data.control = '1';
                this.switchList.content.data.bright = '99';
                this.singleSendData();
            } else if (this.flag == 2) {
                this.switchList.content.data.control = '2';
                this.switchList.content.data.bright = '0';
                this.singleSendData();
            } else if (this.flag == 3) {
                this.switchList.content.data.control = '1';
                this.switchList.content.data.bright = '99';
                this.switchList.content.data.time = '0';
                this.singleSendData();
            }
        },
        singleSendData () {
            this.genTaskid();
            this.genRequestid();
            console.log('单个控制请求参数', this.switchList);
            this.recvTimeoutCount = 10;
            this.$request('sendData', this.switchList).then(res => {
                console.log('发送数据', res);
                if (res.data.success == 1) {
                    this.singleReceiveData();
                } else {
                    this.$message({
                        title: this.$t('common.tip'),
                        message: '发送数据失败',
                        type: 'warning'
                    });
                }
            });
        },
        singleReceiveData () {
            this.$request('receiveData', this.switchList).then(res => {
                console.log('//...>>>> receiveData', res);

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
                        this.singleReceiveData();
                    }, 5000);
                } else if (res.data.isresive == 1 && res.data.content.data[0].result == 0) {
                    this.percent = 100;
                    this.progressVisible = true;
                    this.waitrecvMsg = '处理完成';
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
        // 定时策略
        timeStrategy () {
            this.timeStrategyVisible = true;
            console.log(this.piontData);
        },
        // 设置定时策略
        setTimeStrategy () {
            if (this.timeStrategySelect.length < 1) {
                this.$message({
                    title: this.$t('common.tip'),
                    message: '请选择至少一项设备',
                    type: 'warning'
                });
            } else {

            }
        },
        handleSelecttimeStrategy (val) {
            this.timeStrategySelect = val;
            console.log('选择定时策略的开关', this.timeStrategySelect);
        }

    }
};
</script>

<style lang='scss' scope>
#realtimecontrol {
  background-color: #fff;
  box-sizing: border-box;
  .progressCss {
    .el-dialog__header {
      border-bottom: 1px solid rgb(243, 243, 243);
      padding: 20px;
    }
    .el-dialog__body {
       border-bottom: 1px solid rgb(243, 243, 243);
    }
    .el-button  {
      padding: 8px 16px;
    }
  }
  .device_top {
    padding-left:10px;
    height: 80px;
    line-height:80px;
    background-color: #fff;
    box-sizing: border-box;
    .el-input {
      width: 217px;
      margin-right: 10px;
    }
  }
  .device_body {
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
        padding-right: 5px;
        position: relative;
        .status_green {
            color: rgb(34,172,56);
        }
        .status_red {
            color: rgb(228,0,18);
        }
        .status_gray {
            color: rgb(204,204,204);
        }
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
        }
        .operator {
          position: absolute;
          cursor: pointer;
          right: 0;
          bottom: 18px;
          font-size: 14px;
          .detail {
            background-color: rgb(236, 243, 252);
            padding: 8px;
            border-radius: 2px;
            display: inline-block;
            width: 32px;
            height: 32px;
            
            box-sizing: border-box;
            margin-right: 5px;
            i {
              display: block;
              height: 16px;
              width: 16px;
              color: #409EFF;
            }
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
            box-sizing: border-box;
            img {
              display: block;
              height: 16px;
              width: 16px;

            }
          }
        }
        .operator1 {
          position: absolute;
          cursor: pointer;
          right: 12px;
          bottom: 12px;
          font-size: 14px;
          .detail {
            background-color: rgb(236, 243, 252);
            padding: 8px;
            border-radius: 2px;
            display: inline-block;
            width: 32px;
            height: 32px;
            
            box-sizing: border-box;
            margin-right: 5px;
            i {
              display: block;
              height: 16px;
              width: 16px;
              color: #409EFF;
            }
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
            box-sizing: border-box;
            img {
              display: block;
              height: 16px;
              width: 16px;

            }
          }
        }
      }

      .checkbox {
          display: block;
          cursor: pointer;
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
          background-color: rgb(24,144,255);
          border-color: rgb(24,144,255);
      }
      .selectStyle1 {
          border-color: rgb(24,144,255);
      }
    }
  }
  .device_footer {
    height: 80px;
    line-height: 80px;
    background-color: #fff;
    padding-left: 10px;
  }
 
  
  .realtime_data_dialog {
     .el-dialog__header {
          border-bottom: 1px solid rgb(243, 243,243);
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
        overflow: hidden;
        .dialog_left {
          display: inline-block;
          width: 255px;
          .dev_info {
            padding-left: 10px;
            border-bottom: 1px solid rgb(243, 243, 243);
            h3 {
              font-size: 18px;
              color: #000;
              margin-bottom: 15px;
            }
            p {
              color: rgb(153, 153, 153);
              font-size: 14px;
              margin: 8px 0;
              span {
                color: rgb(102,102,102);
              }
            }
          }
          .realtime_data {
            padding-left: 10px;
            h3 {
              font-size: 18px;
              color: #000;
              margin-top: 10px;
              margin-bottom: 15px;
            }
            p {
              color: rgb(153, 153, 153);
              font-size: 14px;
              margin: 8px 0;
              span {
                color: rgb(102,102,102);
              }
            }
          }
        }
        .dialog_right {
          height: 530px;
          border-left: 1px solid rgb(243, 243, 243);
          padding-left: 10px;
          h3 {
            font-size: 18px;
            color: #000;
            margin-bottom: 15px;
          }

        }
      }
      
  }

  .dataReading {
      .el-button {
        padding: 8px 16px;
      }
      .el-dialog__body {
        padding: 20px;
      }
  }
  .timeStrategy {
      .el-dialog__body {
        border-bottom: 1px solid #f3f3f3;
      }
      .el-select {
        width: 80px;
      }
      .el-input__inner  {
        height: 30px!important;
      }
     .el-input__icon {
       line-height: 30px;
     }
     .el-date-editor.el-input {
       width: 80px!important;
      .el-input__icon {
        display: none;
      }
     
     }
    .el-input--prefix .el-input__inner {
            padding-left: 8px!important;
            padding-right: 8px!important;
          }
  }
  @media only screen and (min-width: 1200px) {
    .el-col-lg-4-8 {
      width: 20%;
    }
  }
}
</style>

