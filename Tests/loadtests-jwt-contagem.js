import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { jUnit, textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';

export let options = {
    thresholds: {
        http_req_duration: ['avg < 1500'],
        http_req_failed: ['rate < 0.02']
    }    
};

export default function () {
    const session = new Httpx({ });
    
    const respAuthentication = session.post('#{AuthenticationEndpoint}#', {
        UserID: '#{UserID}#',
        Password: '#{Password}#'
    });
    var token = JSON.parse(respAuthentication.body).accessToken;
    
    http.get('#{GetDataEndpoint}#',
        { headers: { 'Authorization': 'Bearer ' + token } });
    sleep(1);
}

export function handleSummary(data) {
    return {
      "loadtests-results.html": htmlReport(data),
      "loadtests-results.xml": jUnit(data),
      stdout: textSummary(data, { indent: " ", enableColors: true })
    };
}