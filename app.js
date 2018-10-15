//listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //Hide Result
    document.getElementById('results').style.display='none';
    
    //Show Loader
    document.getElementById('loading').style.display='block';

    setTimeout(calculateResults, 2000);
    
    e.preventDefault();
});

//Calculate Result
function calculateResults(e){
    console.log("Calculating...");

    //UI Vars
    const amount=document.getElementById('amount');
    const interest=document.getElementById('interest');
    const years=document.getElementById('years');
    const monthlyPayment=document.getElementById('monthly-payment');
    const totalPayment=document.getElementById('total-payment');
    const totalInterest=document.getElementById('total-interest');
    console.log('amount : '+amount.value+' years : '+years.value);

    const principal=parseFloat(amount.value);
    const calculatedInterest=parseFloat(interest.value)/100/12;
    const calculatedPayments=parseFloat(years.value)*12;

    //compute monthly payment
    const x=Math.pow(1+ calculatedInterest, calculatedPayments);
    const monthly=(principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value=monthly.toFixed(2);
        totalPayment.value=(monthly*calculatedPayments).toFixed(2);
        totalInterest.value=((monthly*calculatedPayments)-principal).toFixed(2);

        //Show Result
        document.getElementById('results').style.display='block';

        //Hode Loading
        document.getElementById('loading').style.display='none';
    }else{
        //console.log('Please Check Your Numbers');
        showError('Please Check Your Numbers');
    }
    
    //e.preventDefault();
}

//Show Error
function showError(error){

    //Hode Loading
    document.getElementById('loading').style.display='none';

    //Hode Result
    document.getElementById('results').style.display='none';

    //create div
    const errorDiv=document.createElement('div');

    //Get Element
    const card=document.querySelector('.card');
    const heading=document.querySelector('.heading');

    //add class
    errorDiv.className='alert alert-danger';

    //create Text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading
    card.insertBefore(errorDiv, heading);

    //clear error after 3 sec
    setTimeout(clearError, 3000);
}

function clearError(){
    document.querySelector('.alert').remove();
}

// const y=Math.pow(2, 3);
//     console.log(y);
