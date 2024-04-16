

function getCurrentDate(){
    const date = new Date();
    let day ="";
    let month="";
    switch(date.getDay()){
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        case 0:
            day = "Sunday";
            break;
        default:
            day = "error";
            break;
    }
    switch(date.getMonth()){
        case 0:
            month = "Jan";
            break;
        case 1:
            month = "Feb";
            break;
        case 2:
            month = "Mar";
            break;
        case 3:
            month = "Apr";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "Jun";
            break;
        case 6:
            month = "Jul";
            break;
        case 7:
            month = "Aug";
            break;
        case 8:
            month = "Sep";
            break;
        case 9:
            month = "Oct";
            break;
        case 10:
            month="Nov";
            break;
        case 11:
            month = "Dec";
            break;
        default:
            month = "error";
            break;
    }
    
    
    document.getElementById("time").innerHTML= "<i>"+day+", "+month+" "+date.getDate()+", "+ date.getFullYear()+"<br>"+date.toLocaleTimeString()+"</i>";

}
setInterval(getCurrentDate,1000); 

function validation(event){
    event.preventDefault();
    let error=0;
    let animal = document.getElementsByName('animal');
    let animalc;
        for (let i =0; i<animal.length; i++){
            if (animal[i].checked){
                animalc = animal[i].value;
            }
        }
        if (animalc ==undefined){
            error++;
        }
        
        let breed = document.getElementById('breed').value;
        if (breed.search(/\w/)<0){
            error++;
        }

       let age = document.getElementsByName('age');
       let agec;
       for (let i =0; i<age.length; i++){
        if (age[i].checked){
            agec = age[i].value;
        }
    }
    if (agec ==undefined){
        error++;
    }
    let gender = document.getElementsByName('gender');
    let genderc;
    for (let i =0; i<gender.length; i++){
     if (gender[i].checked){
         genderc = gender[i].value;
     }
 }
 if (genderc ==undefined){
     error++;
 } 

 let friendly = document.getElementsByName('friendly');
       let friendlyc;
       for (let i =0; i<friendly.length; i++){
        if (friendly[i].checked){
            friendlyc = friendly[i].value;
        }
    }
    if (friendlyc ==undefined){
        error++;
    }
    if(error>0){
        alert("One or more of the values you entered are wrong, or missing. Please try again.")
    }
}

function validations(event){
    event.preventDefault();
    let error=0;

    let animal = document.getElementsByName('animal');
    let animalc;
        for (let i =0; i<animal.length; i++){
            if (animal[i].checked){
                animalc = animal[i].value;
            }
        }
        if (animalc ==undefined){
            error++;
        }
        
        let breed = document.getElementById('breed').value;
        let breedc="";
        if (breed.search(/\w/)<0){
            error++;
        }
        else{
            breedc = breed.trim();
        }

       let age = document.getElementsByName('age');
       let agec;
       for (let i =0; i<age.length; i++){
        if (age[i].checked){
            agec = age[i].value;
        }
    }
    if (agec ==undefined){
        error++;
    }
    let gender = document.getElementsByName('gender');
    let genderc;
    for (let i =0; i<gender.length; i++){
     if (gender[i].checked){
         genderc = gender[i].value;
     }
 }
 if (genderc ==undefined){
     error++;
 } 

 let dfriendly = document.getElementsByName('dogfriendly');
       let dfriendlyc;
       for (let i =0; i<dfriendly.length; i++){
        if (dfriendly[i].checked){
            dfriendlyc = dfriendly[i].value;
        }
    }
    if (dfriendlyc ==undefined){
        error++;
    }

    let cfriendly = document.getElementsByName('catfriendly');
       let cfriendlyc;
       for (let i =0; i<cfriendly.length; i++){
        if (cfriendly[i].checked){
            cfriendlyc = cfriendly[i].value;
        }
    }
    if (cfriendlyc ==undefined){
        error++;
    }

    let ffriendly = document.getElementsByName('familyfriendly');
       let ffriendlyc;
       for (let i =0; i<ffriendly.length; i++){
        if (ffriendly[i].checked){
            ffriendlyc = ffriendly[i].value;
        }
    }
    if (ffriendlyc ==undefined){
        error++;
    }

    let desc = document.getElementById('description').value;
        if (desc.search(/\w/)<0){
            error++;
        }

        let fname = document.getElementById('fname').value;
        if (fname.search(/\w/)<0){
            error++;
        }

        let lname = document.getElementById('lname').value;
        if (lname.search(/\w/)<0){
            error++;
        }

        let mail = document.getElementById("email").value;
        let str = mail.match(/([A-Z]|[a-z]|\d)+(([A-Z]|[a-z]|\d)*(\.|\-|\_){0,1}([A-Z]|[a-z]|\d)+)+@([a-z]|[A-Z]|\d)+(([A-Z]|[a-z]|\d)*(\-){0,1}([A-Z]|[a-z]|\d)+)+\.([a-z]|[A-Z]){2,}(\.([a-z]|[A-Z]){2,})?/);
        if( 0<= mail.search(/([A-Z]|[a-z]|\d)+(([A-Z]|[a-z]|\d)*(\.|\-|\_){0,1}([A-Z]|[a-z]|\d)+)+@([a-z]|[A-Z]|\d)+(([A-Z]|[a-z]|\d)*(\-){0,1}([A-Z]|[a-z]|\d)+)+\.([a-z]|[A-Z]){2,}(\.([a-z]|[A-Z]){2,3})?/)){
           
            str = str[0];
        }

        if(mail.trim() == str){
            mail = mail.trim();
        }
        else{error++;}
        
        

    if(error>0){
        alert("One or more of the values you entered are wrong, or missing. Please try again.");
    }
    else{
        writeUser(animalc,breedc,agec,genderc,dfriendlyc,cfriendlyc,ffriendlyc,(fname+" "+lname),mail)
    }
}
function writeUser(a,b,c,d,e,f,g,h,i){
    let arr = [];
    const data = fs.readFileSync("./animal.txt","utf8");
    arr = data.split("\r\n");
    let len = arr.length;
    arr.push((len+1)+":"+a+":"+b+":"+c+":"+d+":"+e+":"+f+":"+g+":"+h+":"+i);
    arr = arr.join("\r\n");
    fs.writeFileSync("./animal.txt", arr);
    

  }
function readLogin(){
    const data = fs.readFileSync("./info.txt", 'utf8');
    const lines = data.split("\r\n");
    let user = [];
    for (let i =0;i<lines.length; i++){
      let split = lines[i].split(":");
      user.push(split[0],split[1]);
    }
    return user;
  }

function validate(){
    
    let exists = false;
    let works = true;
    let cuser = document.getElementsByName("user").value;
    let pass = document.getElementsByName("pass").value;


    let user = cuser.trim();

    let vuser = user.match(/(\d| [a-z] | [A-Z])+/);
    let vpass = pass.match(/(\d|[a-z]|[A-z])*(\d([a-z]|[A-Z])|([a-z]|[A-Z])\d)(\d|[a-z]|[A-Z])*/);

    if (user.length > 0 && user == vuser && user !=""){
            let users = readLogin();
            for (let i = 0; i<users.length;i+2){
                if (user== users[i]){
                    exists = true;
                }
            }
    }
    else {
        works = false
    }

    if(vpass == pass && vpass.length>=4){

    }
    else {
        works = false;
    }

    if (exists == true){
        alert("The username you have entered is already in use. Please try a different username.")
    }
    else if(works == false){
        alert("The username or password does not meet the criteria.")
    }
    else{
        let arr = [];
        arr.push(user);
        arr.push(pass);
        return arr;
    }

    
}


