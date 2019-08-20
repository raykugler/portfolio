document.getElementById("wind").focus();
document.getElementById("searchicon").addEventListener("click", search);
document.getElementById("comparebtn").addEventListener("click", compare);
document.getElementById("resetbtn").addEventListener("click", reset);

function test (){
  console.log('yep');
}

var input = document.getElementById("wind");
input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("searchicon").click();
  }
});


function search(){
  
      var criteria = document.getElementById('wind').value;
      var capped = criteria.toUpperCase();
      var b= 0;

      fetch('https://raykugler.github.io/stock/symbols.json')

  .then(function(r){
      return r.json();
    })

  .then(function(r){
      var matches = [];
      for(i = 0; i < r.length; i++){
        if(r[i]["Company Name"].includes(capped) && capped.length > 3) {
          matches.push(r[i]["Company Name"]);
          matches.push(r[i]["Symbol"]);
          }
          else if (r[i]["Symbol"].includes(capped)) {
            matches.push(r[i]["Company Name"]);
            matches.push(r[i]["Symbol"]);
          }
        }
          if(matches.length === 0){
            alert('no matches');
            reset();
          }
          else{
          return matches;
          }
      })
    
  .then(function (matches){
        p = 0;
        l = 4;
        var resultsTable = document.createElement("TABLE");
        resultsTable.setAttribute("id","myTable");
        for (f = 0; f < matches.length; f+=2){
          var resultsRow = document.createElement("TR");
          var companyCell = document.createTextNode(matches[f]) ;
          var symbMatchCell = document.createTextNode(matches[f+1]);
          var resultsCell = document.createElement("TD");
          var symbolCell = document.createElement("TD");
          resultsCell.classList.add('company_results_cell');
          symbolCell.setAttribute("id", p);
          symbolCell.classList.add('company_results_cell');
          resultsCell.appendChild(companyCell);
          symbolCell.appendChild(symbMatchCell);
          resultsRow.appendChild(resultsCell);
          resultsRow.appendChild(symbolCell);

          resultsRow.setAttribute("class","rows");
          resultsTable.appendChild(resultsRow);
          var buttonCell=document.createElement("TD")
          var x = document.createElement("BUTTON");
          resultsRow.appendChild(buttonCell);
          x.setAttribute("id", p);
          x.setAttribute("class","stockbuttons");
          x.addEventListener("click", stock1, false);
          var t = document.createTextNode("Stock 1");
          x.appendChild(t);
          buttonCell.appendChild(x);

          var y = document.createElement("BUTTON")
          y.setAttribute("id", p);
          y.setAttribute("class","stockbuttons");
          y.addEventListener("click", stock2, false);
          var v = document.createTextNode("Stock 2");
          y.appendChild(v);
          buttonCell.appendChild(y);
          p++;
          l++;
      }
          tableloc = document.getElementById("searchresults");
          tableloc.appendChild(resultsTable);
      })
  }

function stock1(){

  var buttId = this.id;
  var compId = document.getElementById("myTable").rows[buttId].cells[1].innerHTML;
  var compname = document.getElementById("myTable").rows[buttId].cells[0].innerHTML;
  document.getElementById('firstcompany').innerHTML = compname;
  document.getElementById('firstcompany').style.background = "#c8b9cd";
  document.getElementById('firstspot').innerHTML = compId;
  var el = document.getElementById('myTable');
  document.getElementById('wind').value = '';

  el.remove();
}

function stock2(){
  var buttId = this.id;
  var compId = document.getElementById("myTable").rows[buttId].cells[1].innerHTML;
  var compname = document.getElementById("myTable").rows[buttId].cells[0].innerHTML;
  document.getElementById('secondspot').innerHTML = compId;
  document.getElementById('secondcompany').innerHTML = compname;
  document.getElementById('secondcompany').style.background = "#c8b9cd";
  var el = document.getElementById('myTable');
  document.getElementById('wind').value = '';

  el.remove();

}

function  compare(){
  var one = document.getElementById("firstspot").innerHTML
  var two = document.getElementById("secondspot").innerHTML;

  var file = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+ one + '&apikey=GSOAOQ0QAG8ZUVGB';
    var file2 = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+ two + '&apikey=GSOAOQ0QAG8ZUVGB';

  var stockOne = fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+ one + '&apikey=GSOAOQ0QAG8ZUVGB').then(function(response){
  return response.json()
  });
  var stockTwo = fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+ two + '&apikey=GSOAOQ0QAG8ZUVGB').then(function(response){           
  return response.json()
  });


  var combinedData = {"stockOne":{},"stockTwo":{}};
  Promise.all([stockOne,stockTwo]).then(function(values){
      combinedData["stockOne"] = values[0];
      combinedData["stockTwo"] = values[1];
      
      return combinedData;
  })

  .then(function(combinedData){  
    var firstrun= []
    for (y = 0; y < 90; y++){
      var kilo = combinedData["stockOne"]["Time Series (Daily)"];
      var micro = Object.values(kilo);
      var mega = micro[y];
      var duper = Object.values(mega);
      var huge = Object.values(duper);
      var bigone = huge[0];
      firstrun.push(bigone); 
}

var secondrun= []
for (y = 0; y < 90; y++){
  var kilo = combinedData["stockTwo"]["Time Series (Daily)"];
  var micro = Object.values(kilo);
  var mega = micro[y];
  var duper = Object.values(mega);
  var huge = Object.values(duper);
  var bigone = huge[0];
  secondrun.push(bigone);
}
var diffarray = [];
for(y=0; y < 90; y++){
var diff = firstrun[y]-secondrun[y];
diffarray.push(Math.abs(diff))
}
var mean = diffarray.reduce(getSum) / diffarray.length;
  var varianceArray = [];

for(y=0; y < 90; y++){
  var h = (mean - diffarray[y]);
  var n = Math.pow(h,2);
  varianceArray.push(n);

}
sd = Math.sqrt(varianceArray.reduce(getSum) / varianceArray.length);

var onelastclose = firstrun.shift();
var twolastclose = secondrun.shift();
var oneclosenumber = Number(onelastclose);
var twoclosenumber = Number(twolastclose); 
if( oneclosenumber > twoclosenumber){
 var compTwo = document.getElementById('firstspot').innerHTML;
 var compOne = document.getElementById('secondspot').innerHTML;  
}
else{
var compTwo = document.getElementById('secondspot').innerHTML;
var compOne = document.getElementById('firstspot').innerHTML;
}
document.getElementById('instructions').style.display = "grid";
document.getElementById("meanspread").innerHTML= "$" + Math.round(mean*100)/ 100 ;
document.getElementById("deviationcell").innerHTML= "$" + Math.round(sd*100)/ 100;
document.getElementById("currentpriceone").innerHTML="Last close: $" + onelastclose;
document.getElementById("currentpricertwo").innerHTML="Last close: $" + twolastclose;
document.getElementById("highspread").innerHTML= "$" + Math.round((mean + sd)*100)/ 100;
document.getElementById("lowspread").innerHTML= "$" + Math.round((mean - sd)*100)/ 100;
//document.getElementById("spreadrange").innerHTML= "$" + Math.round((mean - sd)*100) / 100 + ' and $' + Math.round((mean + sd)*100) / 100;
document.getElementById("low_symbol_set").innerHTML= compOne;
document.getElementById("high_symbol_set").innerHTML= compTwo;
document.getElementById("low_symbol").innerHTML= 'Buy: ' + compOne;
document.getElementById("high_symbol").innerHTML= 'Short Sell: ' + compTwo;
document.getElementById("low_symbol_two").innerHTML= 'Short Sell: ' + compOne;
document.getElementById("high_symbol_two").innerHTML= 'Buy: ' + compTwo;


})
}
function getFocus() {           

}

function reset (){
  getFocus();
  location.reload();

 }
function getSum(total, num) {
  return total + num;
}
function ford(){
  var fordsymb = "F";
  var ford = "Ford Motor Co";
  var gmsymb = "GM";
  var gm = "General Motors Co"
  document.getElementById('firstspot').innerHTML = fordsymb;
  document.getElementById('firstcompany').innerHTML = ford;
  document.getElementById('secondspot').innerHTML = gmsymb;
  document.getElementById('secondcompany').innerHTML = gm;
  var one = document.getElementById("firstspot").innerHTML;
  document.getElementById("comparebtn").focus();
  compare();
}

function delta(){
  var deltasymb = "DAL";
  var delta = "DELTA AIR LINES";
  var swsymb = "LUV";
  var sw = "SOUTHWEST AIRLINES"
  document.getElementById('firstspot').innerHTML = deltasymb;
  document.getElementById('firstcompany').innerHTML = delta;
  document.getElementById('secondspot').innerHTML = swsymb;
  document.getElementById('secondcompany').innerHTML = sw;
  var one = document.getElementById("firstspot").innerHTML;
  document.getElementById("comparebtn").focus();
  compare();
}
function lowes(){
  var lowessymb = "LOW";
  var lowes = "LOWES COMPANIES";
  var hdsymb = "HD";
  var hd = "HOME DEPOT INC";
  document.getElementById('firstspot').innerHTML = lowessymb;
  document.getElementById('firstcompany').innerHTML = lowes;
  document.getElementById('secondspot').innerHTML = hdsymb;
  document.getElementById('secondcompany').innerHTML = hd;
  var one = document.getElementById("firstspot").innerHTML;
  document.getElementById("comparebtn").focus();
  compare();
}
function apple(){
  var applesymb = "AAPL";
  var apple = "APPLE INC";
  var msftsymb = "MSFT";
  var msft = "MICROSOFT CORP";
  document.getElementById('firstspot').innerHTML = applesymb;
  document.getElementById('firstcompany').innerHTML = apple;
  document.getElementById('secondspot').innerHTML = msftsymb;
  document.getElementById('secondcompany').innerHTML = msft;
  var one = document.getElementById("firstspot").innerHTML;
  document.getElementById("comparebtn").focus();
  compare();
}
function walmart(){
  var walsymb = "WMT";
  var wal = "WALMART INC";
  var targsymb = "TGT";
  var targ = "TARGET CP";
  document.getElementById('firstspot').innerHTML = walsymb;
  document.getElementById('firstcompany').innerHTML = wal;
  document.getElementById('secondspot').innerHTML = targsymb;
  document.getElementById('secondcompany').innerHTML = targ;
  var one = document.getElementById("firstspot").innerHTML;
  document.getElementById("comparebtn").focus();
  compare();
}