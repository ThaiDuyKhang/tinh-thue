//Add coma to input
function format(input) {
  var nStr = input.value + '';  
  nStr = nStr.replace(/\,/g, "");
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';  
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  input.value = x1 + x2;
}

// Kiểm tra loại thuế
function checkTaxType(){
    var isNoneVAT = document.getElementById("txtNoneVAT").checked;
    var isVAT = document.getElementById("txtVAT").checked;
    if(isNoneVAT === true) return "txtNoneVAT";
    if(isVAT === true) return "txtVAT";
}
// Main
function calcTax(){
    var priceTax = +document.getElementById("price").value.replace(/\,/g,'');;
    var taxPercent = +document.getElementById("tax").value.replace(/\,/g,'');;
    var taxType = checkTaxType();
    var totalVAT = 0;
    var totalNoneVAT = 0;
    var VAT = 0;

    switch (taxType){
        case "txtNoneVAT":
            VAT = Math.round(priceTax * (taxPercent/100));
            totalVAT = priceTax + VAT;
            document.getElementById("noneTaxShow").innerHTML = priceTax.toLocaleString();
            document.getElementById("numberTaxShow").innerHTML = taxPercent;
            document.getElementById("countTaxShow").innerHTML = VAT.toLocaleString();
            document.getElementById("numberAfterTax").innerHTML = totalVAT.toLocaleString();                   
            document.getElementById("message").style.display = "block";
            break;
        case "txtVAT":
            totalNoneVAT = Math.round(priceTax / (1 + (taxPercent/100)));
            VAT = Math.round(priceTax - totalNoneVAT);
            document.getElementById("noneTaxShow").innerHTML = totalNoneVAT.toLocaleString();
            document.getElementById("numberTaxShow").innerHTML = taxPercent;
            document.getElementById("countTaxShow").innerHTML = VAT.toLocaleString();
            document.getElementById("numberAfterTax").innerHTML = priceTax.toLocaleString();                     
            document.getElementById("message").style.display = "block";
            break;
        default:
            alert("Vui lòng nhập đầy đủ thông tin");
            break;
    }
}
