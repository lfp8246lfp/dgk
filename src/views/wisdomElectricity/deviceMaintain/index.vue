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
      <span style="margin-right: 20px; font-size: 18px;">网关{{chooseGatewayItem}}下的设备档案</span>
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
                <!-- <p>
                  {{$t('realtimecontrol.devStatus')}}：
                  <span class="status_red">异常</span>
                </p> -->
                 <p>
                  {{ $t('deviceManage.devStatus')}}：
                  <span :class="{ green : item.curStatus == 1, grey : item.curStatus !== 1} ">{{item.curStatus|deviceStaus}}</span>
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
                   <!-- <el-tooltip effect="dark" content="实时数据" placement="top-start">
                      <span class="detail" @click="dialogVisible1 = true">
                        <i class="el-icon-s-data"></i>
                      </span>
                   </el-tooltip> -->
                    <el-tooltip effect="dark" content="联动" placement="top-start">
                      <span class="detail" @click="linkPoint(item)">
                        <!-- <i class="el-icon-link"></i> -->
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
   <!-- 开关body -->
    <div class="device_body" v-show="switchVisible">
      <el-col :span="24">
        <ul class="device_body_lists" >
          <el-row :gutter="13" v-infinite-scroll="load">
             <el-col :xs="12" :sm="6" class="el-col-lg-4-8" v-for="(item,index) in piontData" :key="index">
                <li class="item">
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
               
                 <i class="operator"> 
                   <el-dropdown>     
                    <span class="edit">
                        <img src="../../../../static/images/operator.png" alt />
                         <!-- <i class="el-icon-setting"></i> -->
                    </span>
                   <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="singleToClick(1,item)"> {{$t('realtimecontrol.open')}}</el-dropdown-item>
                      <el-dropdown-item @click.native="singleToClick(0,item)"> {{$t('realtimecontrol.close')}}</el-dropdown-item>
                      <el-dropdown-item @click.native="singleToClick(2,item)"> {{$t('realtimecontrol.restart')}}</el-dropdown-item>
                      <el-dropdown-item @click.native="singleToClick(3,item)"> {{$t('deviceManage.restore')}}</el-dropdown-item>
                      <el-dropdown-item @click.native="setThreshold(item)"> {{$t('realtimecontrol.threshold')}}</el-dropdown-item>
                      <el-dropdown-item @click.native="timeStrategy(item)"> {{$t('deviceManage.timeStrategy')}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                   <el-tooltip effect="dark" content="实时数据" placement="top-start">
                      <span class="detail" @click="getPointCurrentData(item)">
                        <!-- <i class="el-icon-s-data"></i> -->
                        <img src="../../../../static/images/realtimeData.png" alt />
                      </span>
                   </el-tooltip>
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
      <el-button type="primary" @click.native="devSetThreshold">{{$t('realtimecontrol.threshold')}}</el-button>
    </div>
    <div class="device_footer" v-show="switchVisible" style="background-color: #f3f3f3!important;">
      <!-- <el-button type="primary" @click.native="backGateway">返回网关</el-button> -->
      <!-- <el-button type="primary" @click.native="timeStrategy">定时策略</el-button> -->
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
          <p>{{$t('common.deviceName')}}：<span>{{pointName}}</span></p>
          <p>{{$t('realtimecontrol.devStatus')}}：<span>正常</span></p>
          <p>{{$t('realtimecontrol.devClassify')}}：<span>{{pointType|changeDevType}}</span></p>
          <p>{{$t('realtimecontrol.commAddress')}}:<span>{{pointComm}}</span></p>
        </div>
        <div class="realtime_data">
          <h3>{{$t('realtimecontrol.realtimeData')}}</h3>
          <p>{{$t('realtimecontrol.currentA')}}：<span>{{nowCurrent}}</span></p>
          <p>{{$t('realtimecontrol.voltageA')}}：<span>{{nowVoltage}}</span></p>
          <p>{{$t('realtimecontrol.powerA')}}：<span>{{nowPower}}</span></p>
          <!-- <p>{{$t('realtimecontrol.temperatureA')}}：<span>60℃</span></p>
          <p>{{$t('realtimecontrol.residualCurrent')}}：<span>2A</span></p> -->
        </div>
      </div>
      <div class="dialog_right pull-left">
         <h3>{{$t('realtimecontrol.currentTrendChart')}}</h3>
         <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
            <el-tab-pane :label="$t('realtimecontrol.current')" name="first" lazy>
              <ve-line :data="currentData" :settings="currentChartSettings" style="width: 10rem;" :extend="chartExtend"></ve-line>
            </el-tab-pane>
            <el-tab-pane :label="$t('realtimecontrol.voltage')" name="second" lazy>
                <ve-line :data="currentData1" :settings="currentChartSettings1" style="width: 10rem;" :extend="chartExtend"></ve-line>
            </el-tab-pane>
            <el-tab-pane :label="$t('realtimecontrol.power')" name="third" lazy>
               <ve-line :data="currentData2" :settings="currentChartSettings2" style="width: 10rem;" :extend="chartExtend"></ve-line>
            </el-tab-pane>
            <!-- <el-tab-pane :label="$t('realtimecontrol.temperature')" name="fourth" lazy>
               <ve-line :data="currentData" :settings="currentChartSettings" style="width: 10rem;" :extend="chartExtend"></ve-line>
            </el-tab-pane>
            <el-tab-pane :label="$t('realtimecontrol.residualCurrent')" name="five" lazy>
               <ve-line :data="currentData" :settings="currentChartSettings" style="width: 10rem;" :extend="chartExtend"></ve-line>
            </el-tab-pane> -->
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
      row-key="index"
      :header-cell-style="{background:'rgb(243,243,243)'}"
      @selection-change="handleSelecttimeStrategy"
    >
      
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column prop="metername" :label="$t('realtimecontrol.portName')"></el-table-column>
      <el-table-column prop="" :label="$t('realtimecontrol.action1')">
         <template slot-scope="scope">
           <el-select v-model="timeStrategyTab[0].status1" value-key="value" placeholder="操作">
            <el-option
              v-for="item in switchStaus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-time-picker
            arrow-control
            v-model="timeStrategyTab[0].time1"
            format="HH:mm"
            placeholder="时间">
          </el-time-picker>
         </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('realtimecontrol.action2')">
        <template slot-scope="scope">
           <el-select v-model="scope.row.status2" value-key="value"  size="mini" placeholder="操作">
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
            format="HH:mm"
            placeholder="时间">
          </el-time-picker>
         </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('realtimecontrol.action3')">
        <template slot-scope="scope">
           <el-select v-model="scope.row.status3" value-key="value"  size="mini" placeholder="操作">
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
            format="HH:mm"
            placeholder="时间">
          </el-time-picker>
         </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('realtimecontrol.action4')">
        <template slot-scope="scope">
           <el-select v-model="scope.row.status4" value-key="value"  size="mini" placeholder="操作">
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
            format="HH:mm"
            placeholder="时间">
          </el-time-picker>
         </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('realtimecontrol.isOpen')" >未开启</el-table-column> 
    </el-table>

    <el-button type="primary" @click="getRead" >召读</el-button>
    <el-button type="primary" @click="setTimeStrategy" >设置</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="timeStrategyVisible = false">取 消</el-button>
        <el-button type="primary" @click="timeStrategyVisible = false">确 定</el-button>
      </span>
   </el-dialog>
   <!-- 开关阈值设置 -->
  <el-dialog
      class="realtime_data_dialog  dataReading timeStrategy"
      :title="$t('realtimecontrol.pointSetThreshold')"
      :visible.sync="pointThresholdVisible"
      width="800px"
     >
     <div class="setThreshold">
         <p class="setThreshold_top">阈值信息</p> 
         <div class="setThreshold_mid">
              <el-checkbox v-model="overPressureCheck" label="过压" style="float: left; width: 94px; height: 40px; line-height: 40px; font-weight: 700;"></el-checkbox>
              <el-form >
               <el-form-item label="过压(V)">
                <el-input v-model="overPressureVal" style="width: 290px;"></el-input>
              </el-form-item>
              </el-form>
         </div>
         <div class="setThreshold_mid">
              <el-checkbox v-model="undervoltageCheck" label="欠压" style="float: left; width: 94px; height: 40px; line-height: 40px; font-weight: 700;"></el-checkbox>
              <el-form >
               <el-form-item label="欠压(V)">
                <el-input v-model="undervoltageVal" style="width: 290px;"></el-input>
              </el-form-item>
              </el-form>
         </div>
         <div class="setThreshold_mid">
              <el-checkbox v-model="overcurrentCheck" label="过流" style="float: left; width: 94px; height: 40px; line-height: 40px; font-weight: 700;"></el-checkbox>
              <el-form >
               <el-form-item label="过流(A)">
                <el-input v-model="overcurrentVal" style="width: 290px;"></el-input>
              </el-form-item>
              </el-form>
         </div>
         <div class="setThreshold_mid">
              <el-checkbox v-model="powerAlarmCheck" label="超功率告警" style="float: left; width: 94px; height: 40px; line-height: 40px; font-weight: 700;"></el-checkbox>
              <el-form >
               <el-form-item label="超功率告警(kW)">
                <el-input v-model="powerAlarmVal" style="width: 290px;"></el-input>
              </el-form-item>
              </el-form>
         </div>
     </div>
    <el-button type="primary" @click="readThresholdCheck" >召读</el-button>
    <el-button type="primary" @click="setThresholdCheck" >设置</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pointThresholdVisible = false">取 消</el-button>
        <el-button type="primary" @click="pointThresholdVisible = false">确 定</el-button>
      </span>
  </el-dialog>

  <!-- 网关阈值弹框 -->
  <el-dialog
      class="realtime_data_dialog  dataReading timeStrategy"
      :title="$t('realtimecontrol.devThreshold')"
      :visible.sync="devThresholdVisible"
      width="800px"
     >
     <div class="setThreshold">
         <p class="setThreshold_top">阈值信息</p> 
         <div class="setThreshold_mid">
              <el-checkbox v-model="temperatureCheck" label="温度" style="float: left; width: 94px; height: 40px; line-height: 40px; font-weight: 700;"></el-checkbox>
              <el-form >
               <el-form-item label="温度(℃)">
                <el-input v-model="temperatureVal" style="width: 290px;"></el-input>
              </el-form-item>
              </el-form>
         </div>
         <div class="setThreshold_mid">
              <el-checkbox v-model="residualCurrentCheck" label="剩余电流" style="float: left; width: 94px; height: 40px; line-height: 40px; font-weight: 700;"></el-checkbox>
              <el-form >
               <el-form-item label="剩余电流(mA)">
                <el-input v-model="residualCurrentVal" style="width: 290px;"></el-input>
              </el-form-item>
              </el-form>
         </div>
     </div>
    <el-button type="primary" @click="setAllRead" >召读</el-button>
    <el-button type="primary" @click="setDevThresholdCheck" >设置</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="devThresholdVisible = false">取 消</el-button>
        <el-button type="primary" @click="devThresholdVisible = false">确 定</el-button>
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

import dateformat from 'date-fns/format'
export default {
    name: '',

    data () {
        this.currentChartSettings = {
            dimension: ['日期'],
            yAxisName: ['电流(A)']
        };
        this.currentChartSettings1 = {
            dimension: ['日期'],
            yAxisName: ['电压(V)']
        };
        this.currentChartSettings2 = {
            dimension: ['日期'],
            yAxisName: ['功率(kW)']
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
                // {
                //     value: 'type',
                //     label: this.$t('common.devClassify')
                // },
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
             currentData1: {
                columns: ['日期', '电压(V)'],
                rows: [
                    { '日期': '1/1', '电压(V)': 2},
                    { '日期': '1/2', '电压(V)': 4 },
                    { '日期': '1/3', '电压(V)': 2 },
                    { '日期': '1/4', '电压(V)': 6 },
                    { '日期': '1/5', '电压(V)': 1 },
                    { '日期': '1/6', '电压(V)': 3 }
                ]
            },
            currentData2: {
                columns: ['日期', '功率(kW)'],
                rows: [
                    { '日期': '1/1', '功率(kW)': 2},
                    { '日期': '1/2', '功率(kW)': 4 },
                    { '日期': '1/3', '功率(kW)': 2 },
                    { '日期': '1/4', '功率(kW)': 6 },
                    { '日期': '1/5', '功率(kW)': 1 },
                    { '日期': '1/6', '功率(kW)': 3 }
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
                metername: '1',
                status1: "01",
                status2: "01",
                status3: "01",
                status4: "01",
                time1: '',
                time2: '',
                time3: '',
                time4: '', 
              },
            ],
             
            appTypes:[
              {
                label: 'ces1',
                value: 1,
              },
               {
                label: 'ces2',
                value: 2,
              },
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
              fir:"1",
              fin:"1",
              objectid: 17893,
              objecttype: 10,
              requestid: "requestid",
              taskid: 5579,
              isresive: 0,
              afn: "1",
              content: {
                name: "H227",
                data: {
                  bright1: 0, // 亮度 默认0
                  bright2: 0,
                  bright3: 0,
                  bright4: 0,
                  status1: "00",
                  status2: "00",
                  status3: "00",
                  status4: "00",
                  time1: "12:00",
                  time2: "12:24",
                  time3: "17:24",
                  time4: "23:24",
                  strategyno: '01', //编号 默认01
                  timecount: '05', //时段个数（默认05）           
                }
              }
            },
            queryParams: {
                'pageNum': 1,
                'pageSize': 20,
                'appType': 1
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
            timeStrategySelect: [],
            reqLineSwitchData: {
                objId: 0,
                objectid: 0,
                objType: 1,
                treeType: 4
            },
            pointThresholdVisible: false,  //开关阈值弹框
            overPressureCheck:'',  //过压
            overPressureVal:0,
            undervoltageCheck:'', // 欠压
            undervoltageVal:0,
            overcurrentCheck: '', //过流
            overcurrentVal: 0,
            powerAlarmCheck: '', // 超功率告警
            powerAlarmVal: 0,
            devThresholdVisible: false, // 网关阈值弹框
            temperatureCheck: '', //温度
            temperatureVal:0,
            residualCurrentCheck: '', //剩余电流
            residualCurrentVal: 0,
            readIndex: 0,
            readIndex1: 0,
            devReadParams:{
                  afn: "2",
                  content: {
                    data: "",
                    name: "F20",
                  },
                  fin: "1",
                  fir: "1",
                  isresive: 0,
                  objectid: 17874,
                  objecttype: 1,
                  requestid: "JdaVAHr8",
                  taskid: 9737  
            },
            setIndex: 0,
            setIndex1: 0,
            pointName: '', // 实时数据里的开关名称
            pointType:'', //设备分类
            pointComm:'', //开关的通讯地址
            queryHistoryParams:{
               "endTime": "2019-06-30",
                "pageNum": 1,
                "pageSize": 300,
                "pointId": 14552,
                "startTime": "2019-05-01"
            },
            time: [new Date(2019,4, 1),new Date(2019,5, 30)],
            nowCurrent:'',
            nowVoltage:'',
            nowPower:''
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
              }  
               else {
                      this.interrupt = false;
                      this.tocontinue = true;
                      this.switchList.content.name = "H250";
                     if(this.procIndex < this.selectedrecvDcu.length ){
                       let item = this.selectedrecvDcu[this.procIndex];
                       this.switchList.objectid = item.rtuId;
                       this.switchList.content.data.commaddress= item.commAddress;
                       if(this.flag == 0){
                            this.switchList.content.data.control = "0";
                            this.switchList.content.data.bright = "0";
                            this.sendData();
                          } else if(this.flag == 1){
                            this.switchList.content.data.control = "1";
                            this.switchList.content.data.bright = "99";
                            this.sendData();
                          }  else if(this.flag == 2){
                            this.switchList.content.data.control = "2"; 
                            this.switchList.content.data.bright = "0";
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
        // 网关的阈值设置
        devSetThreshold(){
             if(this.chooseArr.length !== 1){
                this.$message({
                    title: this.$t('common.tip'),
                    message: '请确定您选择了设备且选择一项',
                    type: 'warning'
                  });
              }  else {
                  this.devThresholdVisible = true;
                  this.devReadParams.objectid = this.chooseArr[0];
              }
           
        },
        //网关阈值信息下的召读
        setAllRead(){
          this.interrupt = false;
          if(this.temperatureCheck || this.residualCurrentCheck){
               this.sendReadProc();
          } else {
            this.$message({
                  title: this.$t('common.tip'),
                  message: '请选择您要召读的阈值信息',
                  type: 'warning'
                });
          }
        },
        sendReadProc(){
            switch (this.readIndex){
              case 0: //读温度
                  if(this.temperatureCheck){
                      this.temperatureVal = null;
                      this.devReadParams.content.name = "F20";
                      this.sendReadStep();
                  } else {
                    this.readIndex++;
                    this.sendReadProc();
                  }
                  break;
              case 1: //读剩余电流
                if(this.residualCurrentCheck){
                      this.residualCurrentVal = null;
                      this.devReadParams.content.name = "F21";
                      this.sendReadStep();
                  } else {
                    this.readIndex++;
                    this.sendReadProc();
                  }
                  break;
              default: //全部读取完成
                break;
            }
        },
        sendReadStep(){
          this.recvTimeoutCount = 10;
          this.genTaskid();
          this.genRequestid();
          this.devReadParams.objecttype = 1;
          console.log("网关召读发送数据params", this.devReadParams);
          this.$request('sendData',this.devReadParams).then(res => {
            console.log("网关召读发送数据res",res);
            if(res.data.success == 1){
                this.recvReadData();
            } else {
                this.readIndex++;
                this.sendReadProc();
                this.$message({
                    title: this.$t('common.tip'),
                    message: res.data.returnMsg,
                    type: 'warning'
                  });
            }
          })

        },
        recvReadData(){
            this.waitrecvMsg = "";
            this.$request('receiveData',this.devReadParams).then(res => {
              console.log("召读发送数据RES",res);
                  if (this.interrupt) {
                    this.progressVisible = false;
                    this.percent = 0;
                  } else {
                      if(this.recvTimeoutCount == 10){
                        this.progressVisible = true;
                      }
                       this.percent = ((10 - this.recvTimeoutCount) / 10) * 100;
                  } 

                 if (res.data.isresive == 0 && this.recvTimeoutCount > 0 ){
                    setTimeout(() => {
                        this.recvTimeoutCount--;
                        this.recvReadData();
                      }, 5000);
                 } else if(res.data.isresive == 1 && res.data.content.data[0].result == 0 ){
                       this.percent = 100;
                       this.setReadData(res.data.content.data[0].data[0]);
                       this.progressVisible = true;
                       this.waitrecvMsg = "处理完成";
                       this.tocontinue = false;
                       this.recvTimeoutCount = 10;
                       this.readIndex++;
                       this.sendReadProc();
                 } else if(res.data.isresive == 1 && res.data.content.data[0].result == 1){
                      this.percent = 100;
                      this.waitrecvMsg = this.getErrorMsg(res.data.content.data[0].errortype, res.data.content.data[0].errorcode);
                      this.recvTimeoutCount = 10;
                      this.readIndex++;
                      this.sendReadProc();
                     
                 } else {
                      this.percent = 100;
                      this.recvTimeoutCount = 10;
                      this.waitrecvMsg = "超时";
                      this.readIndex++;
                      this.sendReadProc();
                 }
             })
        },
        setReadData(data){
            switch (this.readIndex) {
              case 0: //读取温度
                this.temperatureVal = parseFloat(data.data);
                break;
              case 1: //读取剩余电流
                this.residualCurrentVal =parseFloat(data.data);
                break;

            }
        },
        //网关阈值设置
        setDevThresholdCheck(){
          this.interrupt = false;
          if(this.temperatureCheck || this.residualCurrentCheck){
               this.setIndex = 0;
               this.sendSetProc();
          } else {
            this.$message({
                  title: this.$t('common.tip'),
                  message: '请选择您要设置的阈值信息',
                  type: 'warning'
                });
          }
        },
        sendSetProc(){
             switch (this.setIndex){
              case 0: //读温度
                  if(this.temperatureCheck){
                      this.devReadParams.content.data =   this.temperatureVal;
                      this.devReadParams.content.name = "F20";
                      this.sendSetStep();
                  } else {
                    this.setIndex++;
                    this.sendSetProc();
                  }
                  break;
              case 1: //读剩余电流
                if(this.residualCurrentCheck){
                      this.devReadParams.content.data =   this.residualCurrentVal;
                      this.devReadParams.content.name = "F21";
                      this.sendSetStep();
                  } else {
                    this.setIndex++;
                    this.sendSetProc();
                  }
                  break;
              default: //全部读取完成
                break;
            }
        },
        sendSetStep(){
          this.recvTimeoutCount = 10;
          this.genTaskid();
          this.genRequestid();
          this.devReadParams.objecttype = 1;
          this.devReadParams.afn = "1";
          console.log("网关阈值设置发送数据params", this.devReadParams);
          this.$request('sendData',this.devReadParams).then(res => {
            console.log("网关阈值设置发送数据res",res);
            if(res.data.success == 1){
                this.recvSetData();
            } else {
                this.setIndex++;
                this.sendSetProc();
                this.$message({
                    title: this.$t('common.tip'),
                    message: res.data.returnMsg,
                    type: 'warning'
                  });
            }
          })
        },
        recvSetData(){
            this.waitrecvMsg = "";
            this.$request('receiveData',this.devReadParams).then(res => {
              console.log("召读发送数据RES",res);
                  if (this.interrupt) {
                    this.progressVisible = false;
                    this.percent = 0;
                  } else {
                      if(this.recvTimeoutCount == 10){
                        this.progressVisible = true;
                      }
                       this.percent = ((10 - this.recvTimeoutCount) / 10) * 100;
                  } 

                 if (res.data.isresive == 0 && this.recvTimeoutCount > 0 ){
                    setTimeout(() => {
                        this.recvTimeoutCount--;
                        this.recvSetData();
                      }, 5000);
                 } else if(res.data.isresive == 1 && res.data.content.data[0].result == 0 ){
                       this.percent = 100;
                       this.progressVisible = true;
                       this.waitrecvMsg = "处理完成";
                       this.tocontinue = false;
                       this.recvTimeoutCount = 10;
                       this.setIndex++;
                       this.sendSetProc();
                 } else if(res.data.isresive == 1 && res.data.content.data[0].result == 1){
                      this.percent = 100;
                      this.waitrecvMsg = this.getErrorMsg(res.data.content.data[0].errortype, res.data.content.data[0].errorcode);
                      this.recvTimeoutCount = 10;
                      this.setIndex++;
                      this.sendSetProc();
                     
                 } else {
                      this.percent = 100;
                      this.recvTimeoutCount = 10;
                      this.waitrecvMsg = "超时";
                      this.setIndex++;
                      this.sendSetProc();
                 }
             })
        },
        genTaskid() {
          this.switchList.taskid = this.genRandomNum(1000, 9999);
          this.switchTimeList.taskid = this.genRandomNum(1000, 9999);
          this.devReadParams.taskid =  this.genRandomNum(1000, 9999);
        },
        genRequestid() {
          this.switchList.requestid = this.randomWord(false, 8, 8);
          this.switchTimeList.requestid = this.randomWord(false, 8, 8);
          this.devReadParams.requestid =  this.randomWord(false, 8, 8);
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
        linkPoint(item){
          console.log("当前网关",item);
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
        singleToClick (number, item ){
          this.$confirm(
            '确认操作',
            this.$t('areaManage.reminder'),
            {
              confirmButtonText: this.$t('common.yes'),
              cancelButtonText: this.$t('common.cancel'),
              type: 'warning'
            }
          ).then(() => {
              console.log("单个操作开关item", item)
              this.flag = number;
              this.interrupt = false;
              this.switchList.content.data.commaddress=   item.commAddress;
              this.switchList.content.data.numberid= Number   (item.numberId);
              this.switchList.objectid= item.rtuId;
              this.beginToSend();
            }
          ).catch(() => {

          })
           
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
            }  else if(this.flag == 3){
                this.switchList.content.data.control = "1"; 
                this.switchList.content.data.bright = "0";
                this.switchList.content.data.time = "0";
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
        //定时策略弹框
        timeStrategy(item){
          this.timeStrategyVisible = true;
          this.timeStrategyTab[0].metername = item.disc;
          this.switchTimeList.objectid = item.meterId;
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
                this.percent = 0;
                this.switchTimeList.content.data.time1 = dateformat(this.timeStrategyTab[0].time1,'HH:mm');
                this.switchTimeList.content.data.time2 = dateformat(this.timeStrategyTab[0].time2,'HH:mm');
                this.switchTimeList.content.data.time3= dateformat(this.timeStrategyTab[0].time3,'HH:mm');
                this.switchTimeList.content.data.time4 = dateformat(this.timeStrategyTab[0].time4,'HH:mm');
                this.switchTimeList.content.data.status1 =  this.timeStrategyTab[0].status1;
                this.switchTimeList.content.data.status2 =  this.timeStrategyTab[0].status2;
                this.switchTimeList.content.data.status3 =  this.timeStrategyTab[0].status3;
                this.switchTimeList.content.data.status4 =  this.timeStrategyTab[0].status4;
               
             console.log("设置定时策略的参数",this.switchTimeList);
             if ( this.CompareDate(this.switchTimeList.content.data.time2,this.switchTimeList.content.data.time1) &&
                  this.CompareDate(this.switchTimeList.content.data.time3,this.switchTimeList.content.data.time2) &&
                  this.CompareDate(this.switchTimeList.content.data.time4,this.switchTimeList.content.data.time3)) {
                  this.strategySendData();
       
                } else {
                  this.$message({
                    title: this.$t('common.tip'),
                    message: '请注意动作时间应依次递增',
                    type: 'warning'
                  });
                }
            }
        },
        strategySendData(){
           this.genTaskid();
           this.genRequestid();
           this.recvTimeoutCount = 10;
           this.$request('sendData',this.switchTimeList).then( res => {
                      console.log('设置定时策略发送',res);
                      if(res.data.success == 1){
                          this.strategyReceiveData();
                      } else {
                         this.$message({
                            title: this.$t('common.tip'),
                            message: '发送数据失败',
                            type: 'warning'
                          });    
                      }
                    })
        },
        strategyReceiveData(){
           this.$request('receiveData',this.switchTimeList).then(res => {
                   if (this.interrupt) {
                    this.progressVisible = false;
                    this.percent = 0;
                  } else {
                      if(this.recvTimeoutCount == 10){
                        this.progressVisible = true;
                      }
                       this.percent = ((10 - this.recvTimeoutCount) / 10) * 100;
                  } 

                 if (res.data.isresive == 0 && this.recvTimeoutCount > 0 ){
                    setTimeout(() => {
                        this.recvTimeoutCount--;
                        this.strategyReceiveData();
                      }, 5000);
                 } else if(res.data.isresive == 1 && res.data.content.data[0].result == 0 ){
                       this.percent = 100;
                       this.progressVisible = true;
                       this.waitrecvMsg = "处理完成";
                       this.tocontinue = false;
                 } else if(res.data.isresive == 1 && res.data.content.data[0].result == 1){
                      this.percent = 100;
                      this.waitrecvMsg = this.getErrorMsg(res.data.content.data[0].errortype, res.data.content.data[0].errorcode);
                      this.recvTimeoutCount = 10;
                     
                 } else {
                      this.percent = 100;
                      this.recvTimeoutCount = 10;
                      this.waitrecvMsg = "超时";
                 }
           })
        },


        //定时策略的召读
        getRead(){
           if(this.timeStrategySelect.length < 1){
              this.$message({
                    title: this.$t('common.tip'),
                    message: '请选择至少一项设备',
                    type: 'warning'
                  });
          }else {
               this.switchTimeList.afn="2";
               this.percent = 0;
               this.readSendData();
          }
         
        },
        readSendData(){
           this.genTaskid();
           this.genRequestid();
           this.recvTimeoutCount = 10;
            this.$request('sendData',this.switchTimeList).then( res => {
                      console.log('召读发送',res);
                      if(res.data.success == 1){
                          this.readReceiveData();
                      } else {
                         this.$message({
                            title: this.$t('common.tip'),
                            message: '发送数据失败',
                            type: 'warning'
                          });    
                      }
                    })
        },
        readReceiveData(){
          this.$request('receiveData',this.switchTimeList).then(res => {
             if (this.interrupt) {
                    this.progressVisible = false;
                    this.percent = 0;
                  } else {
                      if(this.recvTimeoutCount == 10){
                        this.progressVisible = true;
                      }
                       this.percent = ((10 - this.recvTimeoutCount) / 10) * 100;
                  } 

                 if (res.data.isresive == 0 && this.recvTimeoutCount > 0 ){
                    setTimeout(() => {
                        this.recvTimeoutCount--;
                        this.readReceiveData();
                      }, 5000);
                 } else if(res.data.isresive == 1 && res.data.content.data[0].result == 0 ){
                       this.percent = 100;
                       this.progressVisible = true;
                       this.waitrecvMsg = "处理完成";
                       this.tocontinue = false;

                       
                        let date = new Date();
                        let year = dateformat(date,'YYYY');
                        let month = dateformat(date,'MM');
                        let day = dateformat(date,'DD');
                        let num1 = res.data.content.data[0].data[0].time1.split(":");
                        let num2 = res.data.content.data[0].data[0].time2.split(":");
                        let num3 = res.data.content.data[0].data[0].time3.split(":");
                        let num4 = res.data.content.data[0].data[0].time4.split(":");
                       
                        this.timeStrategyTab[0].status1 = res.data.content.data[0].data[0].status1;
                        this.timeStrategyTab[0].status2 = res.data.content.data[0].data[0].status2
                        this.timeStrategyTab[0].status3 = res.data.content.data[0].data[0].status3;
                        this.timeStrategyTab[0].status4 = res.data.content.data[0].data[0].status4;
                        this.timeStrategyTab[0].time1 = new Date(year, month, day, num1[0], num1[1]);
                        this.timeStrategyTab[0].time2 = new Date(year, month, day, num2[0], num2[1]);
                        this.timeStrategyTab[0].time3 = new Date(year, month, day, num3[0], num3[1]);
                        this.timeStrategyTab[0].time4 = new Date(year, month, day, num4[0], num4[1]);

                      
                 } else if(res.data.isresive == 1 && res.data.content.data[0].result == 1){
                      this.percent = 100;
                      this.waitrecvMsg = this.getErrorMsg(res.data.content.data[0].errortype, res.data.content.data[0].errorcode);
                      this.recvTimeoutCount = 10;
                     
                 } else {
                      this.percent = 100;
                      this.recvTimeoutCount = 10;
                      this.waitrecvMsg = "超时";
                       
                 }
          })
        },
        handleSelecttimeStrategy(val){
          this.timeStrategySelect = val;
          console.log("选择定时策略的开关",this.timeStrategySelect );
        },
        //比较时间大小
        CompareDate(t1, t2) {
          var date = new Date();
          var a = t1.split(":");
          var b = t2.split(":");
          return date.setHours(a[0], a[1]) > date.setHours(b[0], b[1]);
        },
        //定时策略数据
        getLineSwitchCtrlData(){
        
          this.reqLineSwitchData.objId =  17893;
          this.reqLineSwitchData.objectid = 17893;
          this.$request('deviceStrategies',this.reqLineSwitchData).then( res => {
              console.log("定时策略数据", res);
              if(res.success == 1){
                this.timeStrategyTab=res.data.listitem;
              }
          })
        },
        //开关阈值设置
        setThreshold(item){
          this.pointThresholdVisible = true;
          console.log(item)
          this.devReadParams.objectid = item.meterId;
        },
        setThresholdCheck(){
          this.interrupt = false;
          if(this.overPressureCheck || this.undervoltageCheck || this.overcurrentCheck || this.powerAlarmCheck){
               this.setIndex1 = 0;
               this.sendSetProc1();
          } else {
            this.$message({
                  title: this.$t('common.tip'),
                  message: '请选择您要设置的阈值信息',
                  type: 'warning'
                });
          }
        },
        sendSetProc1(){
             switch (this.setIndex1){
              case 0: //设置过压
                  if(this.overPressureCheck){
                      // this.devReadParams.content.data =   this.overPressureVal;
                      this.devReadParams.content.data = {};
                      this.devReadParams.content.data.voltage = this.overPressureVal;
                      this.devReadParams.content.name = "10002403";
                      this.sendSetStep1();
                  } else {
                    this.setIndex1++;
                    this.sendSetProc1();
                  }
                  break;
              case 1: //设置欠压
                if(this.undervoltageCheck){
                      // this.devReadParams.content.data =   this.undervoltageVal;
                       this.devReadParams.content.data = {};
                        this.devReadParams.content.data.voltage = this.undervoltageVal;
                      this.devReadParams.content.name = "10002405";
                      this.sendSetStep1();
                  } else {
                    this.setIndex1++;
                    this.sendSetProc1();
                  }
                  break;
                   break;
              case 2: //设置过流
                if(this.overcurrentCheck){
                      this.devReadParams.content.data = {};
                      this.devReadParams.content.data.current = this.overcurrentVal;
                      this.devReadParams.content.name = "10002404";
                      this.sendSetStep1();
                  } else {
                    this.setIndex1++;
                    this.sendSetProc1();
                  }
                  break;
               case 3:  //设置超功率告警
                if(this.powerAlarmCheck){
                      this.devReadParams.content.data = {};
                      this.devReadParams.content.data.power = this.powerAlarmVal;
                      this.devReadParams.content.name = "10002401";
                      this.sendSetStep1();
                  } else {
                    this.setIndex1++;
                    this.sendSetProc1();
                  }
                  break;
              default: //全部设置完成
                break;
            }
        },
        sendSetStep1(){
          this.recvTimeoutCount = 10;
          this.genTaskid();
          this.genRequestid();
          this.devReadParams.objecttype = 10;
          this.devReadParams.afn = "1";
          console.log("开关阈值设置发送数据params", this.devReadParams);
          this.$request('sendData',this.devReadParams).then(res => {
            console.log("开关阈值设置发送数据res",res);
            if(res.data.success == 1){
                this.recvSetData1();
            } else {
                this.setIndex1++;
                this.sendSetProc1();
                this.$message({
                    title: this.$t('common.tip'),
                    message: res.data.returnMsg,
                    type: 'warning'
                  });
            }
          })
        },
        recvSetData1(){
            this.waitrecvMsg = "";
            this.$request('receiveData',this.devReadParams).then(res => {
              console.log("开关阈值设置发送数据RES",res);
                  if (this.interrupt) {
                    this.progressVisible = false;
                    this.percent = 0;
                  } else {
                      if(this.recvTimeoutCount == 10){
                        this.progressVisible = true;
                      }
                       this.percent = ((10 - this.recvTimeoutCount) / 10) * 100;
                  } 

                 if (res.data.isresive == 0 && this.recvTimeoutCount > 0 ){
                    setTimeout(() => {
                        this.recvTimeoutCount--;
                        this.recvSetData1();
                      }, 5000);
                 } else if(res.data.isresive == 1 && res.data.content.data[0].result == 0 ){
                       this.percent = 100;
                       this.progressVisible = true;
                       this.waitrecvMsg = "处理完成";
                       this.tocontinue = false;
                       this.recvTimeoutCount = 10;
                       this.setIndex1++;
                       this.sendSetProc1();
                 } else if(res.data.isresive == 1 && res.data.content.data[0].result == 1){
                      this.percent = 100;
                      this.waitrecvMsg = this.getErrorMsg(res.data.content.data[0].errortype, res.data.content.data[0].errorcode);
                      this.recvTimeoutCount = 10;
                      this.setIndex1++;
                      this.sendSetProc1();
                     
                 } else {
                      this.percent = 100;
                      this.recvTimeoutCount = 10;
                      this.waitrecvMsg = "超时";
                      this.setIndex1++;
                      this.sendSetProc1();
                 }
             })
        },
        //开关阈值的召读
        readThresholdCheck(){
          this.interrupt = false;
           if(this.overPressureCheck || this.undervoltageCheck || this.overcurrentCheck || this.powerAlarmCheck){
               this.readIndex1 = 0;
               this.sendReadProc1();
          } else {
            this.$message({
                  title: this.$t('common.tip'),
                  message: '请选择您要召读的阈值信息',
                  type: 'warning'
                });
          }
        },
        sendReadProc1(){
            switch (this.readIndex1){
              case 0: //读过压
                  if(this.overPressureCheck){
                      this.overPressureVal = null;
                      this.devReadParams.content.name = "10002403";
                      this.sendReadStep1();
                  } else {
                    this.readIndex1++;
                    this.sendReadProc1();
                  }
                  break;
              case 1: //读欠压
                if(this.undervoltageCheck){
                      this.undervoltageVal = null;
                      this.devReadParams.content.name = "10002405";
                      this.sendReadStep1();
                  } else {
                    this.readIndex1++;
                    this.sendReadProc1();
                  }
                  break;
               case 2: //读过流
                if(this.overcurrentCheck){
                      this.overcurrentVal = null;
                      this.devReadParams.content.name = "10002404";
                      this.sendReadStep1();
                  } else {
                    this.readIndex1++;
                    this.sendReadProc1();
                  }
                  break;
               case 3: //读超功率告警
                if(this.powerAlarmCheck){
                      this.powerAlarmVal = null;
                      this.devReadParams.content.name = "10002401";
                      this.sendReadStep1();
                  } else {
                    this.readIndex1++;
                    this.sendReadProc1();
                  }
                  break;
              default: //全部读取完成
                break;
            }
        },
        sendReadStep1(){
          this.recvTimeoutCount = 10;
          this.genTaskid();
          this.genRequestid();
          this.devReadParams.objecttype = 10;
          console.log("开关召读发送数据params", this.devReadParams);
          this.$request('sendData',this.devReadParams).then(res => {
            console.log("开关召读发送数据res",res);
            if(res.data.success == 1){
                this.recvReadData1();
            } else {
                this.readIndex1++;
                this.sendReadProc1();
                this.$message({
                    title: this.$t('common.tip'),
                    message: res.data.returnMsg,
                    type: 'warning'
                  });
            }
          })
        },
        recvReadData1(){
            this.waitrecvMsg = "";
            this.$request('receiveData',this.devReadParams).then(res => {
              console.log("召读发送数据RES",res);
                  if (this.interrupt) {
                    this.progressVisible = false;
                    this.percent = 0;
                  } else {
                      if(this.recvTimeoutCount == 10){
                        this.progressVisible = true;
                      }
                       this.percent = ((10 - this.recvTimeoutCount) / 10) * 100;
                  } 

                 if (res.data.isresive == 0 && this.recvTimeoutCount > 0 ){
                    setTimeout(() => {
                        this.recvTimeoutCount--;
                        this.recvReadData1();
                      }, 5000);
                 } else if(res.data.isresive == 1 && res.data.content.data[0].result == 0 ){
                       this.percent = 100;
                       this.setReadData1(res.data.content.data[0].data[0]);
                       this.progressVisible = true;
                       this.waitrecvMsg = "处理完成";
                       this.tocontinue = false;
                       this.recvTimeoutCount = 10;
                       this.readIndex1++;
                       this.sendReadProc1();
                 } else if(res.data.isresive == 1 && res.data.content.data[0].result == 1){
                      this.percent = 100;
                      this.waitrecvMsg = this.getErrorMsg(res.data.content.data[0].errortype, res.data.content.data[0].errorcode);
                      this.recvTimeoutCount = 10;
                      this.readIndex1++;
                      this.sendReadProc1();
                     
                 } else {
                      this.percent = 100;
                      this.recvTimeoutCount = 10;
                      this.waitrecvMsg = "超时";
                      this.readIndex1++;
                      this.sendReadProc1();
                 }
             })
        },
        setReadData1(data){
            switch (this.readIndex1) {
              case 0: //过压
                this.overPressureVal = parseFloat(data.voltage);
                break;
              case 1: //欠压
                this.undervoltageVal =parseFloat(data.voltage);
                break;
              case 2: //过流
                this.overcurrentVal =parseFloat(data.current);
                break;
              case 3: //超功率告警
                this.powerAlarmVal =parseFloat(data.power);
                break;

            }
        },

        getPointCurrentData(item){
          console.log("kaiguan",item)
          this.dialogVisible1 = true;
          this.pointName = item.disc;
          this.pointType = item.appType;
          this.pointComm = item.commAddress;
          this.queryHistoryParams.pointId = item.pointId;
          //  this.queryHistoryParams.pointId = 14552;
           let date = new Date();
           let year = dateformat(date,'YYYY');
           let month = dateformat(date,'MM');
           let day = dateformat(date,'DD');
           this.time = [new Date(year,month-1, day),new Date(year,month-1, day)];
            // this.time = [new Date(year,8, 3),new Date(year,8, 3)];
           this.queryHistoryParams.startTime  =  dateformat(this.time[0],'YYYY-MM-DD');
           this.queryHistoryParams.endTime  =  dateformat(this.time[1],'YYYY-MM-DD');

           console.log("查询历史数据的参数",this.queryHistoryParams);
           this.$request('queryPointData',this.queryHistoryParams).then( res => {
              console.log("查询历史数据res",res)
             
              if(res.data.returnCode == 0){
                this.currentData.rows =[];
                this.currentData1.rows = [];
                this.currentData2.rows = [];
                if(res.data.loops.length>0){
                    this.nowCurrent = res.data.loops[res.data.loops.length-1].ia;
                    this.nowVoltage = res.data.loops[res.data.loops.length-1].ua;
                    this.nowPower = res.data.loops[res.data.loops.length-1].pa;

                    for(let i=0; i<res.data.loops.length; i++ ){
                      let obj = {
                        '日期': dateformat(res.data.loops[i].dataTime,'YYYY-MM-DD HH:mm'),
                        '电流(A)': res.data.loops[i].ia
                      }
                      this.currentData.rows.push(obj);

                      let obj1 = {
                        '日期': dateformat(res.data.loops[i].dataTime,'YYYY-MM-DD HH:mm'),
                        '电压(V)': res.data.loops[i].ua
                      }
                      this.currentData1.rows.push(obj1);

                      let obj2 = {
                        '日期': dateformat(res.data.loops[i].dataTime,'YYYY-MM-DD HH:mm'),
                        '功率(kW)': res.data.loops[i].pa
                      }
                      this.currentData2.rows.push(obj2);
                    }
                }
                
              }
           })

        }

    }
};
</script>

<style lang='scss' scope>
#realtimecontrol {
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
        padding-bottom: 60px;
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
          right: 10px;
          bottom: 18px;
          // bottom: 12px;
          // right: 0;
          // bottom: 18px;
          // font-size: 14px;
          .detail {
            background-color: rgb(236, 243, 252);
            padding: 10px;
            border-radius: 2px;
            display: inline-block;
            width: 36px;
            height: 36px; 
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
            padding: 10px;
            border-radius: 2px;
            display: inline-block;
            width: 36px;
            height: 36px;
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
  .setThreshold {
    width: 100%;
    height: 300px;
   
    .setThreshold_top {
         background-color: #f3f3f3;
         height: 35px;
         text-align: center;
         line-height: 35px;
         margin-bottom: 20px;
         font-weight: 700;
    }
    .setThreshold_mid {
      padding-left: 100px;
        
        .el-form-item__label {
            border: 1px solid #DCDFE6;
            border-right: none;
            border-radius: 4px 0 0 4px;
            padding: 0 10px;;
            height: 40px;
            line-height: 40px;
           
        }
        .el-input__inner  {
            height: 40px!important;
            border-radius: 0 4px 4px 0;
            line-height: 40px;
            width: 290px;
        }
    }
  }
  @media only screen and (min-width: 1200px) {
    .el-col-lg-4-8 {
      width: 20%;
    }
  }
}
</style>

