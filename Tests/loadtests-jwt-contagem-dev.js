import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { jUnit, textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';

export let options = {
    thresholds: {
        http_req_duration: ['avg < 200'],
        http_req_failed: ['rate < 0.05']
    }    
};

export default function () {
    const session = new Httpx({ });

    var applicationUrl = 'http://localhost:5242';
    
    const respAuthentication = session.post(applicationUrl + '/Login', {
        UserID: 'usr01_apis',
        Password: 'Usr01ApiValido01!'
    });

    var token = JSON.parse(respAuthentication.body).accessToken;
    
    // Testes durante implementação (manter comentado para execução do load test)
    //console.log(JSON.stringify(respAuthentication.body));
    //console.log('Token: ' + token);
    
    var resp = http.get(applicationUrl + '/Contador',
        { headers: { 'Authorization': 'Bearer ' + token } });

    // Testes durante implementação (manter comentado para execução do load test)
    //console.log(JSON.stringify(resp.body));
    
    sleep(1);
}

export function handleSummary(data) {
    return {
      "loadtests-results.html": htmlReport(data),
      "loadtests-results.xml": jUnit(data),
      stdout: textSummary(data, { indent: " ", enableColors: true })
    };
}