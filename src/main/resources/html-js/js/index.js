/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var ws;
var coinData=document.getElementById('coinData');
var connectionStatus=document.querySelector('#connectionStatus');
var connectionButton=document.querySelector('#connectionButton');
var token=document.getElementById('token');
connectionButton.addEventListener('click',startConnection);
function startConnection(){
    ws=new WebSocket('ws://localhost:8081/createConnection');
    connectionStatus.innerHTML='Connecting...';
    ws.onopen=()=>{
        connectionStatus.innerHTML='Connection established';
        var coinsToSearch=document.getElementById('coinsToSearch').value;
        coinData.innerHTML=formElementsForCoins(coinsToSearch);
        ws.send("{\"coins\":\"" + coinsToSearch + "\", \"sec_token\":\"" + token.value + "\"}");
    };
    ws.onmessage=(event)=>{
        var data=event.data
        document.getElementById(data.split(':')[0].replace('\"', "")).innerHTML=data;
    };
    ws.onclose=(event)=>{
        connectionStatus.innerHTML='Connection closed';
    };
    connectionButton.value="Close connection";
    connectionButton.addEventListener('click', closeConnection);
};

function closeConnection(){
    ws.close()
    connectionButton.value="Start connection";
    connectionButton.addEventListener('click', startConnection);
};

function formElementsForCoins(coins){
    var coinsArr=coins.split(/[^A-Z]+/);
    var element='';
    for(var i=0;i<coinsArr.length;i++){
        element+='<div id=\'' + coinsArr[i] + '\'>No data yet</div>';
    }
    return element;
}
