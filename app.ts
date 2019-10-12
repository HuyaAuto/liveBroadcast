import HuyaIns from './core/HuyaIns';
import { initConfig } from './core/init';

global['storage'] = {};

const roomId = 15099719;
// const roomId = 19322980;
//17863630511
// let users = ['15966079278', '17853631355', '17853631355'];
// let users = ['13792642694', '18500077008', '18765137393'];
// let users = ['13054758966', '15063608061', '18053686879'];
// let users = ['17701342615', '15269230875', '18519203764'];
// let users = ['18210355031', '13586820754', '13867847560'];
let users = ['18519203764']
let arr = [];
function enterRoom() {
  console.log('enterRoom');
  let user = users.shift();
  let demo = new HuyaIns(roomId, user, 'hy'+user);
  demo.startConnect();
  arr.push(demo);
  if (users.length) {
    let timeout = Math.round(Math.random()*5);
    setTimeout(() => enterRoom(), timeout * 1000);
  }
}
//退出
// process.on('SIGINT', function () {
//   console.log('Exit now!');
//   let prommises = [];
//   arr.map(demo => prommises.push(demo.userLogout()))
//   Promise.all(prommises).then(res => {
//     console.log('Exit success!');
//     process.exit();
//   });
// });

//开始
initConfig(roomId, () => {
  let timeout = 0//Math.round(Math.random()*5);
  setTimeout(() => enterRoom(), timeout * 1000);
});