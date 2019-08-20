
document.getElementById('the_button').addEventListener("click", calculate);

document.getElementById('the_reset_button').addEventListener("click", clear);
document.getElementById('principal').disabled = true;
document.getElementById('length').disabled = true;
document.getElementById('interest_rate').disabled = true;
document.getElementById('monthly_payment').disabled = true;
function clear(){
    document.getElementById('principal').value ='';
    document.getElementById('length').value ='';
    document.getElementById('interest_rate').value ='';
    document.getElementById('monthly_payment').value ='';

    document.getElementById('principal').disabled = true;
    document.getElementById('length').disabled = true;
    document.getElementById('interest_rate').disabled = true;
    document.getElementById('monthly_payment').disabled = true;
    
    document.getElementById("length_check").disabled = false;
    document.getElementById("interest_check").disabled = false;
    document.getElementById("monthly_check").disabled = false;
    document.getElementById("principal_check").disabled = false;

    document.getElementById("length_check").checked = false;
    document.getElementById("interest_check").checked = false;
    document.getElementById("monthly_check").checked = false;
    document.getElementById("principal_check").checked = false;
    numbers=[];

    document.getElementById('principal_result').innerHTML = '????';
    document.getElementById('length_result').innerHTML = '????';
    document.getElementById('interest_result').innerHTML ='????';
    document.getElementById('monthly_result').innerHTML ='????';
}

var theirInput = '';
var set = 'lllll';
var numbers=[]
function calculate(){
    var principal = document.getElementById('principal').value;
    var length = document.getElementById('length').value;
    var interest_rate = document.getElementById('interest_rate').value;
    var monthly_payment = document.getElementById('monthly_payment').value;
   if(set==='principal'){
    numbers.push(length)
    numbers.push(interest_rate)
    numbers.push(monthly_payment)
   
    principleCalc(numbers);       
   }
   else if(set === 'length'){
    numbers.push(principal)
    numbers.push(interest_rate)
    numbers.push(monthly_payment)
    lengthCalc(numbers);
   }
   else if(set === 'interest'){
    numbers.push(principal)
    numbers.push(length)
    numbers.push(monthly_payment)
    interestCalc(numbers);
   }
   else if(set === 'payment'){
    numbers.push(principal)
    numbers.push(length)
    numbers.push(interest_rate)
    
    paymentCalc(numbers);
   }
   }

//   document.getElementById("users").value;
document.getElementById('principal_check').addEventListener("click", princheck);
function princheck() {
    var prin_check = document.getElementById('principal_check').checked;
    if (prin_check === true){
    document.getElementById("length_check").disabled = true;
    document.getElementById("interest_check").disabled = true;
    document.getElementById("monthly_check").disabled = true;
    principal_set_form(prin_check);
    
}
else{
    document.getElementById("length_check").disabled = false;
    document.getElementById("interest_check").disabled = false;
    document.getElementById("monthly_check").disabled = false;

    document.getElementById('principal').disabled = true;
    document.getElementById('length').disabled = true;
    document.getElementById('interest_rate').disabled = true;
    document.getElementById('monthly_payment').disabled = true;
    principal_set_form(prin_check);
    
}}
document.getElementById('length_check').addEventListener("click", len_check);
function len_check(length_check) {
    var length_check = document.getElementById('length_check').checked;
    if (length_check === true){
    document.getElementById("principal_check").disabled = true;
    document.getElementById("interest_check").disabled = true;
    document.getElementById("monthly_check").disabled = true;
    length_set_form(length_check);
}
else{
    document.getElementById("principal_check").disabled = false;
    document.getElementById("interest_check").disabled = false;
    document.getElementById("monthly_check").disabled = false;

    document.getElementById('principal').disabled = true;
    document.getElementById('length').disabled = true;
    document.getElementById('interest_rate').disabled = true;
    document.getElementById('monthly_payment').disabled = true;

    length_set_form(length_check);
}}
document.getElementById('interest_check').addEventListener("click", int_check);
function int_check() {
    var interest_check = document.getElementById('interest_check').checked;
    if (interest_check === true){
    document.getElementById("principal_check").disabled = true;
    document.getElementById("length_check").disabled = true;
    document.getElementById("monthly_check").disabled = true;
    interest_form(interest_check);
}
else{
    document.getElementById("principal_check").disabled = false;
    document.getElementById("length_check").disabled = false;
    document.getElementById("monthly_check").disabled = false;

    document.getElementById('principal').disabled = true;
    document.getElementById('length').disabled = true;
    document.getElementById('interest_rate').disabled = true;
    document.getElementById('monthly_payment').disabled = true;

    interest_form(interest_check);
}}
document.getElementById('monthly_check').addEventListener("click", month_check);
function month_check() {
    var month_check = document.getElementById('monthly_check').checked;
    if (month_check === true){
    document.getElementById("principal_check").disabled = true;
    document.getElementById("length_check").disabled = true;
    document.getElementById("interest_check").disabled = true;
    month_set_form(month_check);
}
else{
    document.getElementById("principal_check").disabled = false;
    document.getElementById("length_check").disabled = false;
    document.getElementById("interest_check").disabled = false;

    document.getElementById('principal').disabled = true;
    document.getElementById('length').disabled = true;
    document.getElementById('interest_rate').disabled = true;
    document.getElementById('monthly_payment').disabled = true;

    month_set_form(month_check);
}}

function principal_set_form(prin_check){
    if (prin_check === true){
    document.getElementById("principal").value = 'Find Loan Max'; 
    document.getElementById("principal").disabled = true;
    document.getElementById('length').disabled = false;
    document.getElementById('interest_rate').disabled = false;
    document.getElementById('monthly_payment').disabled = false;
    
    set= 'principal';
    }
    else{
        document.getElementById("principal").value = ''; 
        document.getElementById("principal").disabled = true;
        set= 0;
    }
}
function length_set_form(length_check){
    if (length_check === true){
    document.getElementById("length").value = 'Find Needed Length'; 
    document.getElementById("length").disabled = true;
    document.getElementById('principal').disabled = false;
    document.getElementById('interest_rate').disabled = false;
    document.getElementById('monthly_payment').disabled = false;
    set= 'length';
    }
    else{
        document.getElementById("length").value = '';
        document.getElementById("length").disabled = true; 

    }
}
function interest_form(interest_check){
    if (interest_check === true){
    document.getElementById("interest_rate").value = 'Find Needed Rate'; 
    document.getElementById("interest_rate").disabled = true;
    document.getElementById('principal').disabled = false;
    document.getElementById('length').disabled = false;
    document.getElementById('monthly_payment').disabled = false;
    set='interest';
    }
    else{
        document.getElementById("interest_rate").value = ''; 
        document.getElementById("interest_rate").disabled = true;
    }
}
function month_set_form(month_check){
    if (month_check === true){
    document.getElementById("monthly_payment").value = 'Find Payment Amount';
    document.getElementById("monthly_payment").disabled = true;
    document.getElementById('principal').disabled = false;
    document.getElementById('length').disabled = false;
    document.getElementById('interest_rate').disabled = false;
    set='payment';
    }
    else{
        document.getElementById("monthly_payment").value = ''; 
        document.getElementById("monthly_payment").disabled = true;
    }
}

function principleCalc(numbers){
    var results=[];
    term_length=Number(numbers[0]);
    rate = Number(numbers[1]);
    payment= Number(numbers[2]);
    rate_decimal=rate / 100;
    rate_per_period= rate_decimal / 12;
    power=(12 * term_length) * -1;
    numroot= 1 + rate_per_period;
    numerator_start= Math.pow( numroot,power);
    numerator= 1 - numerator_start;
    solution= payment * (numerator / (rate_per_period));
    solution_fix = solution.toFixed(0);
    results.push(solution_fix);
    results.push(term_length);
    results.push(rate);
    results.push(payment);
    display(results);
}

function lengthCalc(numbers){
    var results=[];
    loan_amount=Number(numbers[0]);
    rate = Number(numbers[1]);
    payment= Number(numbers[2]);
    decimal_rate= rate / 100;
    rate_per_period = decimal_rate / 12;
    one_plus= 1 + rate_per_period;
    step_one= ((one_plus / rate_per_period) -1) * payment;
    step_two= loan_amount - step_one;
    step_three= step_two / step_one;
    step_three_fix = step_three * -1;
    step_four= Math.log(step_three_fix);
    step_five= Math.log(one_plus);
    step_six=step_four / step_five;
    solution = Math.round(step_six * -1);
    solution_display = (solution / 12).toFixed(2);
    
    results.push(loan_amount);
    results.push(solution_display);
    results.push(rate);
    results.push(payment);
    display(results);
}
function interestCalc(numbers){
    loan_amount=Number(numbers[0]);
    term_length = Number(numbers[1]);
    payment= Number(numbers[2]);
    var i = .1;
    var results=[];
    do {
        rate = i /100;
        rate_adjust= rate / 12;
        rate_plus= rate_adjust + 1;
        power_adjust= term_length * -12;
        power =  Math.pow(rate_plus, power_adjust);
        numerator= 1 - power;
        denominator = (rate / 12);
        pre_solution = numerator / denominator;
        solution= pre_solution * payment; 

    final= (rate * 100).toFixed(2);
    i += .002;
    }
    while( solution > loan_amount); 
    results.push(loan_amount);
    results.push(term_length);
    results.push(final);
    results.push(payment);
    display(results);
}

function paymentCalc(numbers){
    var results=[];
    loan_amount=Number(numbers[0]);
    term_length = Number(numbers[1]);
    rate= Number(numbers[2]);
    decimal_rate = rate / 100;
    spread_rate = decimal_rate / 12;
    numerator = loan_amount * spread_rate;
    one_plus= 1 + spread_rate;
    power= term_length * -12;
    one_plus_up = Math.pow(one_plus, power);
    denominator = 1 - one_plus_up; 
    payment= numerator / denominator;
    payment_fix=payment.toFixed(2)
    results.push(loan_amount);
    results.push(term_length);
    results.push(rate);
    results.push(payment_fix);
    display(results);
}

function display(results){
    document.getElementById('principal_result').innerHTML = ` $${results[0]}`;
    document.getElementById('length_result').innerHTML = ` ${results[1]} years`;
    document.getElementById('interest_result').innerHTML =` ${results[2]}%`;
    document.getElementById('monthly_result').innerHTML =` $${results[3]}`;
}
