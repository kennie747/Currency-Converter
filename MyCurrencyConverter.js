
function getOption() {
    var objFrom = document.getElementById("myFromSelection");
    var objTo = document.getElementById("myToSelection");
   var objAmount = document.getElementById("myInputAmount");
    var query = objAmount.value + "_" +  objFrom.options[objFrom.selectedIndex].text + "_" + objTo.options[objTo.selectedIndex].text ;
    document.getElementById("myHidden").value = query;
    // document.getElementById("demo").innerHTML = query;

    convertCurrency(1, 'USD', 'NGN', function(err, amount) {
   document.getElementById("demo").innerHTML = amount;
  console.log(amount);

 // document.write(amount);
});
}


var https = require('https');

function convertCurrency(amount, fromCurrency, toCurrency, cb) {

  var apiKey = 'your-api-key-here';

  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  var query = fromCurrency + '_' + toCurrency;

  var url = 'https://free.currencyconverterapi.com/api/v5/convert?q='
            + query + '&compact=ultra';

  https.get(url, function(res){
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          try {
            var jsonObj = JSON.parse(body);

            var val = jsonObj[query];
            if (val) {
              var total = val * amount;
              cb(null, Math.round(total * 100) / 100);
            } else {
              var err = new Error("Value not found for " + query);
              console.log(err);
              cb(err);
            }
          } catch(e) {
            console.log("Parse error: ", e);
            cb(e);
          }
      });
  }).on('error', function(e){
        //console.log("Got an error: ", e);
        document.write("Got an error: ", e);
        cb(e);
  });
}

//uncomment to test

convertCurrency(1, 'USD', 'PHP', function(err, amount) {
  console.log(amount);
 // document.write(amount);
});

convertCurrency(1, 'USD', 'NGN', function(err, amount) {
  console.log(amount);
 // document.write(amount);
});