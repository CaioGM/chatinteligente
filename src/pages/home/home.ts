import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    messagesUsuario = [];
    messagesWatson = [];
    chatBox = "";
    
    apiUrl = 'http://localhost:8080/chatinteligente/rest/conversacao/';

  constructor(public navCtrl: NavController, public http: HttpClient) {
      
      var nome = this.getUrlParametros("nome");
      var perfil = this.getUrlParametros("perfil");
     
     // alert(nome + " " + perfil);
  
  }
  
    send(message) {
   
        if(message && message != "") {
            this.messagesUsuario.push(message);
            this.messagesWatson.push("");
            return new Promise(resolve => {
                this.http.post(this.apiUrl,JSON.stringify(message)).subscribe(data => {
                    resolve(data);
                    alert(data);
                    this.messagesWatson.push(data);
                    this.messagesUsuario.push("");
                    }, err => {
                    console.log(err)
                    });
                });
        }
            
            
            this.chatBox = "";
        }
    
    getUrlParametros(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
        
    }


