import {http, http1} from './http';
export default [
    {
        name: 'solvePlan',
        method: 'get',
        url: http1 + '/solvePlan'
    },
    {
        name: 'getHome',
        method: 'get',
        url: http1 + '/getHome'
    }
];
