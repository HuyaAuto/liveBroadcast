import VCore from './../core/VCore';
import ENV from './../const/ENV';
import MessageManger from './../core/MessageManger';
const HUYA = require('./../lib/HUYA');
const TafMx = require('./../lib/TafMx');
import Cookies from './../core/Cookies';

let userId = new HUYA.UserId();
let cookies = new Cookies();
userId.lUid = parseInt(cookies.getCookie("yyuid")) || parseInt(cookies.getCookie("udb_uid")) || 0,
userId.sGuid = '0e74b066dd85895de9a602cd03cdf7c9';
userId.sToken = '';
userId.sHuYaUA = "webh5&1910071223&websocket";
userId.sCookie = 'SoundValue=0.50; __yamid_tt1=0.3687445989565903; __yamid_new=C89C9E5B98C00001E9941410D860EA50; alphaValue=0.80; isInLiveRoom=true; guid=0e74b066dd85895de9a602cd03cdf7c9; sdid=; Hm_lvt_51700b6c722f5bb4cf39906a596ea41f=1568601565,1568877737,1569207289,1569310410; __yasmid=0.3687445989565903; _yasids=__rootsid%3DC89CAE366E600001827D6B831FE0FC40; udb_passdata=3; PHPSESSID=mu26acnq5052tbc9ehesak7sc7; Hm_lpvt_51700b6c722f5bb4cf39906a596ea41f=1569310469';//cookies.value;

let vcore: VCore;
let mesMg: MessageManger;

export default function test() {
    vcore = new VCore();
    vcore.userId = userId;
    mesMg = new MessageManger(vcore, userId);
    vcore.addListener("WEBSOCKET_CONNECTED", wssConnected);
    vcore.addListener("WSRegisterRsp", wssRegisterRsp);
    vcore.addListener("WSRegisterGroupRsp", wssRegisterRsp);
    vcore.wsStart();
    vcore.addListener("8000", enterRoom);
}

function wssConnected () {
    mesMg.sendLivingInfoReq();
    mesMg.sendDoLaunch();
    mesMg.sendPingReq();
    startPing();
}

let pingInter;
function startPing() {
    let config = {
        tickCount: 0,
        interval: 1000,
        times: 0
    };
    pingInter = setInterval(ping, 10, config);
}

function ping(config) {
    if (++config.tickCount % config.interval == 0) {
        let a = config.tickCount / config.interval;
        mesMg.sendPingReq();
        config.times > 0 && config.times <= a && config.tickCount > 0 && clearInterval(pingInter)
    }
}

function wssRegisterRsp (t) {
    // if (ENV.loginRegister) {
    //     return
    // }
    // ENV.loginRegister = true;
    //G.userInTime = Date.now();
    //G.loginRegisterTime = G.userInTime - G.loginRegisterTime;
    // if (G.danmuP2P && G.registGroup && t.iResCode == 0 && t.vSupportP2PGroupId.value.length > 0) {
    //     G.danmuGroudId = t.vSupportP2PGroupId.value.concat();
    //     G.danmuLruCache = true;
    //     Event.fireEvent(Event.ENTER_P2P_AFTER_REGISTER_GOURP)
    // }

    mesMg.sendWebdbUserInfo();
    mesMg.sendUserEventReq();
    mesMg.sendNobleServer();
    mesMg.sendEnterChannelReq();

    
    //vplayerui   33925

    // WSVerifyCookieReq

    //GetCurCheckRoomStatus
}

function enterRoom () {
    mesMg.sendEnterRoom();
}