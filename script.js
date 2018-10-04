

window.onload=function(){  
    document.getElementById('arrow_pointer').addEventListener("click", bioOn);  
    document.getElementById('about').addEventListener("click", function(){
    console.log('yarp');
    window.scroll({
        top: 500, 
        left: 0, 
        behavior: 'smooth' 
    }    )});
document.getElementById('port').addEventListener("click", function(){
    console.log('yarp');
    window.scroll({
        top: 870, 
        left: 0, 
        behavior: 'smooth' 
          })});    
document.getElementById('contact').addEventListener("click", function(){
    console.log('yarp');
    window.scroll({
        top: 2070, 
        left: 0, 
        behavior: 'smooth' 
                });    
    });
   
}

var state = 0
function bioOn() {
    if (state === 0) {
    document.getElementById("bio").classList.add('bio_show');
    document.getElementById("bio").classList.remove('bio_no_show');
    document.getElementById('arrow_straight').classList.add('arrow_turn');
    document.getElementById('arrow_straight').classList.remove('arrow');
    state = 1
    }
    else{
        document.getElementById("bio").classList.add('bio_no_show');
        document.getElementById("bio").classList.remove('bio_show');
        document.getElementById('arrow_straight').classList.add('arrow');
        document.getElementById('arrow_straight').classList.remove('arrow_turn');
    state = 0;
            
    }
}


