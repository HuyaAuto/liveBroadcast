import * as http from 'request';
// import * as util from 'util';

// let username = '';
// let password = '';
// let proxyIp = '223.99.214.21';
// let proxyPort = 53281;

// let proxy = util.format('http://%s:%s@%s:%d', username, password, proxyIp, proxyPort);  
export function request (options, proxy?) {
  if (proxy) {
    options.proxy = proxy;
  }
  console.log(options)
  let promise: Promise<any> = new Promise(function(resolve, reject){
    http(options, function(error, response, body) {
			if (error) {
        reject(error)
      } else {
        if (options.getCookies) {
          resolve({
            data: body,
            cookies: response
          });
        } else {
          console.log(body)
          resolve(body);
        }
        
      }
	  });
  });

  return promise;
}