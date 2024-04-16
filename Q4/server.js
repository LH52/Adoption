const express = require('express');
const session = require("express-session");
const path = require('path');
const fs = require("fs");
const cookieParser = require('cookie-parser');

let useri = "";
let passi ="";


//const valid = require("./public/ex7.js");

const login = "./public/info.txt";


const app = express();
app.use(cookieParser());
app.use(session({
  secret :'secret'
}));

app.use(
  express.json(),
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
    
  });

 
    app.get('/Creat', (req, res) => {
    let password = req.session.username;
   // res.write("no");
    


    if (password == null){
      res.sendFile(path.join(__dirname, 'public', 'Create.html'));
      

    }
    else{
      res.sendFile(path.join(__dirname, 'public', 'signedin.html'));
    }
      
    });

    app.post('/validator', (req, res) => {
        
       useri = req.body.user;
        passi = req.body.pass;
        console.log("This"+useri+passi+".")
        let input = validate(useri,passi);
        //let input=[useri,passi];
        if (input[1] == "exists"){
          res.sendFile(path.join(__dirname, 'public', 'existing.html'));
        }
        else if (input[1] == "false"){
          res.sendFile(path.join(__dirname, 'public', 'wrongin.html'));
        }
        else {
          
          writeUser(input[0],input[1]);
          res.sendFile(path.join(__dirname, 'public', 'created.html'));
          
        }

    });
        

    app.get('/drop', (req, res) => {
      let pass = req.session.username;
      if(pass == null){
        res.sendFile(path.join(__dirname, 'public', 'signin.html'));
      }
      else{
        res.sendFile(path.join(__dirname, 'public', 'drop.html'));
      }
        
        
      });

      app.post('/finder', (req, res) => {
          console.log("here");
          let check = checker(req);
          if(check == false){
            console.log("no");
            res.send(html("<h2>Invalid Entry or no pets that match criteria.</h2><h3>Please return to try again.</h3>"));
          }
          else{
            
            res.send(html(check));

          }

          /*if(checker(req)== false){
            
          }
          else{
            
          }*/
          
        });
        app.get('/find', (req, res) => {
          
           res.sendFile(path.join(__dirname, 'public', 'find.html'));
           
          
          
        });

      app.post('/validation', (req, res) => {
       user = req.body.user;
       pass = req.body.pass;
       vuser = user.toLowerCase().trim();
       test = readLogin();

       for (let i =0;i<test.length;i=i+2){
          if(vuser == test[i] && pass == test[i+1]){
            req.session.username = vuser;
            res.redirect("/drop");
          }
       }

       res.sendFile(path.join(__dirname, 'public', 'wrongsess.html'));
       

          
          
        });

        app.post('/animalWrite', (req, res) => {
          //let an = req.body.animal;
          //res.send(an)
         
          if(validations(req)==true){
            res.redirect("./success.html");
          }
          else{
            res.redirect("/drop");
          }        
          
        });

        app.get('/logo', (req, res) => {
         const user = req.session.username;
         if(user == null){
          res.send(html("<h1>You are not signed in!</h1><br><br>"));
         }
         else{
          res.sendFile(path.join(__dirname, 'public', 'logout.html'));
         }
         
        });
        app.get('/logdone', (req, res) => {
          req.session.username=null;
          res.send(html("<h1>You have been successfully signed out!</h1>"))
         });

        

  app.listen(3000, () => {
    console.log("Example app listening on port 3000");
  });
//===============================================================
  function readLogin(){
    const data = fs.readFileSync(login, 'utf8');
    const lines = data.split("\r\n");
    let user = [];
    for (let i =0;i<lines.length; i++){
      let split = lines[i].split(":");
      user.push(split[0],split[1]);
    }
    return user;
  }

  function writeUser(user,pass){
    let arr = [];
    const data = fs.readFileSync(login,"utf8");
    arr = data.split("\r\n");
    arr.push(user+":"+pass);
    arr = arr.join("\r\n");
    fs.writeFileSync(login, arr);
    

  }

  function validate(uss, pss){
    
    let exists = false;
    let works = true;
    let no = ["false","false"];
    let existing = ["exists","exists"];
    let vpass;
    let user = uss.toLowerCase().trim();
    let vuser = user.match(/(\d|[a-z]|[A-Z])+/);
    
   if(vuser == null){

    return no;
   }
   console.log(vuser[0]);
   if(user == vuser[0]){
    console.log("yes user");
    let test = readLogin();
    console.log(test);
    for(let i = 0;i<=test.length;i=i+2){
      if (test[i]==vuser[0]){
        console.log("Existing user");
        return existing;
      }
    }
    console.log('also here');
   }
   else{
    console.log("no user");
    return no;

   }
   console.log("here");
   
    if(pss.indexOf(" ")>=0){
      return no;
    }
    else if(pss.length>=4){
      vpass = pss.match(/(\d|[a-z]|[A-z])*(\d([a-z]|[A-Z])|([a-z]|[A-Z])\d)(\d|[a-z]|[A-Z])*/);
      console.log(vpass);
    }
    else{
      return no;
    }
   
    
    if(vpass == null){
      return no;
    }
    if(vpass[0]==pss){
      let arr = [];
        arr.push(user);
        arr.push(pss);
        return arr;
    }

}

function validations(req){
 
  let error=0;

  let animalo = req.body.animal;
  if(animalo == undefined){
    return false;
  }
      
      let breed = req.body.breed;
      let breedc="";
      if (breed.search(/\w/)<0){
          error++;
      }
      else{
          breedc = breed.trim();
      }

     let age = req.body.age;
     if(age==undefined){
      return false;
     }

  let gender = req.body.gender;
  if (gender == undefined){
    return false;
  }

let dfriendly = req.body.dogfriendly;
    if(dfriendly == undefined){
      return false;
    }

  let cfriendly = req.body.catfriendly;
     if(cfriendly == undefined){
      return false;
     }

  let ffriendly = req.body.familyfriendly;
    if(ffriendly == undefined){
      return false;
    }

      let desc = req.body.description;
      if (desc.search(/\w/)<0){
          error++;
      }

      let fname = req.body.fname;
      if (fname.search(/\w/)<0){
          error++;
      }

      let lname = req.body.lname;
      if (lname.search(/\w/)<0){
          error++;
      }

      let mail = req.body.email;
      let str = mail.match(/([A-Z]|[a-z]|\d)+(([A-Z]|[a-z]|\d)*(\.|\-|\_){0,1}([A-Z]|[a-z]|\d)+)+@([a-z]|[A-Z]|\d)+(([A-Z]|[a-z]|\d)*(\-){0,1}([A-Z]|[a-z]|\d)+)+\.([a-z]|[A-Z]){2,}(\.([a-z]|[A-Z]){2,})?/);
      if( 0<= mail.search(/([A-Z]|[a-z]|\d)+(([A-Z]|[a-z]|\d)*(\.|\-|\_){0,1}([A-Z]|[a-z]|\d)+)+@([a-z]|[A-Z]|\d)+(([A-Z]|[a-z]|\d)*(\-){0,1}([A-Z]|[a-z]|\d)+)+\.([a-z]|[A-Z]){2,}(\.([a-z]|[A-Z]){2,3})?/)){
         
          str = str[0];
      }

      if(mail.trim() == str){
          mail = mail.trim();
      }
      else{error++;}
      
      

  if(error>0){
      //alert("One or more of the values you entered are wrong, or missing. Please try again.");
      return false;
  }
  else{
      writeAnimal(animalo,breedc,age,gender,dfriendly,cfriendly,ffriendly,desc,(fname+" "+lname),mail);
      return true;
  }
}
function writeAnimal(a,b,c,d,e,f,g,h,i,j){
  let arr = [];
  const data = fs.readFileSync("./public/animal.txt","utf8");
  arr = data.split("\r\n");
  let len = arr.length;
  arr.push((len+1)+":"+a+":"+b+":"+c+":"+d+":"+e+":"+f+":"+g+":"+h+":"+i+":"+j);
  arr = arr.join("\r\n");
  fs.writeFileSync("./public/animal.txt", arr);
  

}

function checker(req){
  let error = false;
  let animal = req.body.animal;
    if(animal == undefined){
      console.log("animal");
      error= true;
    }
  let breed = req.body.breed;
  if(breed=="" | breed == undefined){
    
  }
  else{
    breed = breed.toLowerCase().trim();
  }
  
  let age = req.body.age;
  if(age==undefined){
    error = true;
  }
  let gender = req.body.gender;
  if(gender == undefined){
    error = true;
  }
  let dfriendly = req.body.dogfriendly;
  if(dfriendly == undefined){
    error=true;
    console.log("df");
  }
  let cfriendly = req.body.catfriendly;
  if(cfriendly == undefined){
    error = true;
    console.log("cf");
  }
  let ffriendly = req.body.kidfriendly;
  if(ffriendly == undefined){
    console.log("ff");
    error = true;
  }
  
  if (error==true){
    console.log("ma wsolna");
    return false;
  }
  else{
    let str = "";
    let arr = [];
    let position =1;
  const data = fs.readFileSync("./public/animal.txt","utf8");
  arr = data.split("\r\n");
  for(let i =0;i<arr.length;i++){
    let check = arr[i].split(":");
    let boolean = true;

    if(check[1]!=animal){
      boolean = false;
      console.log("animal");
    }
    if(check[2] !=breed && breed!=""){
      boolean = false;
      console.log("breed:"+check[2]+" and "+breed);
    }
    if(check[3] != age){
      boolean = false;
      console.log(check[3]+" and "+age);
    }
    if(check[4] != gender){
      boolean = false;
      console.log("gend");
    }
    if(check[5] != dfriendly){
      boolean = false;
      console.log("df");
    }
    if(check[6] != cfriendly){
      boolean = false;
      console.log("cf");
    }
    if(check[7] != ffriendly){
      console.log("ff")
      boolean = false;
    }
    if(boolean == false){
      console.log(arr[i]);
    }
    else{
      console.log("wsolna");
      str= str+"Number "+position+"<br>Animal: "+check[1]+"<br>Breed: "+check[2]+"<br>Age: "+check[3]+"<br>Gender: "+check[4]+"<br>Dog Friendly: "+check[5]+"<br>Cat Friendly: "+check[6]+"<br>Family Friendly: "+check[7]+"<br>Description: "+check[8]+"<br>Owner: "+check[9]+"<br>Email: "+check[10]+"<br><br>";
      position++;
    }
    
  }
  console.log(str);
  if(str==""){
    console.log("why");
    return false;
  }
  else{
    console.log("is it?");
    return str;
  }
  
  }
}

function html(something){
  let text = `<!DOCTYPE html>
  <html lang="en">
      <head>
          <title>Home</title>
          <meta charset="UTF-8">
          <script src="ex7.js"></script>
          <style>
              table{
                  width:100%;
                  border-collapse: collapse;
                  border: 1px solid black;
                  
              }
              td,tr{
                  border: 1px solid black;
              }
              #time{
                  text-align: center;
              }
              #disclaimer{
                  padding:20px;
                  color:white;
                  background-color: black;
                  
  
              }
              a:link#disc{
                  color:white;
              }
              a:visited#disc{
                  color:red;
              }
              a:hover#disc{
                  color:darkgoldenrod;
              }
              
          </style>
  
      </head>
  
      <body>
          <table>
              <tr>
                  <th colspan="2"><p style="font-size: 60px;margin-top:0;margin-bottom:0;">Adopt Montreal</p><a href="home.html"><img src="logo.png" alt="logo" height="100" id="logo"></a> <p id="time"></p></th>
              </tr>
              <tr>
                  <td style="width:20%;vertical-align: top;padding-top:50px;">
                      <a href="home.html">Home Page</a><br>
                      <a href="/Creat" method="GET" action="/Creat">Create an account</a><br>
                      <a href="find.html">Find a dog/cat</a><br>
                      <a href="dog.html">Dog Care</a><br>
                      <a href="cat.html">Cat Care</a><br>
                      <a href="/drop" method="GET" action="/drop">Have a pet to giveaway?</a><br>
                      <a href="/logo" method="GET" action="/logo">Logout</a><br>
                      <a href="contact.html">Contact Us</a>
  
                  </td>
  
                  <td style="padding:50px;">
                      ${something}
                      
                  </td>
              </tr>
              <tr >
                  <td colspan="2" id="disclaimer"><h2 style="margin:2px">You information is safe!</h2><br>
                      <p style="margin:3px;">We promise that your information will not be sold or misused. We protect the website builder from any incorrect information posted by a pet owner.</p><br>
                      <a id="disc" href="https://www.ataxia.org/privacy-disclaimer-statement/?gad_source=1&gclid=CjwKCAjw5ImwBhBtEiwAFHDZx9h1TqYDe0giSTAcG_E9jzux1wmt6g9dumuDLCLvfy7iZK2k1jHV-xoC2zYQAvD_BwE" target="_blank">Privacy disclaimer</a></td>
              </tr>
              
          </table>
  
          <script>
                  
                    
                  
                  
              
          </script>
  
      </body>
  </html>`;
  return text;
}