import loginApi from './login.api';
import systemApi from './system.api';
import homeApi from './home.api';
import fileManageApi from './fileManage.api';
import systemManageApi from './systemManage.api';
import smartElectricityApi from './smartElectricity.api';
import wisdomEnergyApi from './wisdomEnergy.api';
import wisdomEnvironmentApi from './wisdomEnvironment.api';
import wisdomSafeApi from './wisdomsafe.api';

const apis = [
    ...loginApi,
    ...systemApi,
    ...homeApi,
    ...fileManageApi,
    ...systemManageApi,
    ...smartElectricityApi,
    ...wisdomEnergyApi,
    ...wisdomEnvironmentApi,
    ...wisdomSafeApi
];

export default apis;
