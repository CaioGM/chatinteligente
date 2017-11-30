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
    
     msg = [{
      content :  'Bem-vindo!',
      position : 'left',
      senderName : 'Watson'
    }];
    
    //apiUrl = 'http://54.233.240.217:8080/chatinteligente/rest/conversacao/';
    apiUrl = 'http://localhost:8080/chatinteligente/rest/conversacao/';

  constructor(public navCtrl: NavController, public http: HttpClient) {
      
      var nome = this.getUrlParametros("nome");
      var perfil = this.getUrlParametros("perfil");
      
      /*if(!nome){
          
          this.setMsgWatson("Bem-vindo!");
          
      }else{
          
          this.setMsgWatson("Bem-vindo " + nome);
          
      }*/
     // alert(nome + " " + perfil);
  
  }
  
    send(message) {
        this.setMsgUsuario(message);
        this.chatBox = "";
        //window.location.href='#ancora';
        document.getElementById("inputChat").focus();
        if(message && message != "") {
            //this.messagesUsuario.push(message);
            //this.messagesWatson.push("");
            return new Promise(resolve => {
                this.http.post(this.apiUrl,JSON.stringify(message)).subscribe(data => {
                    resolve(data);
                    //alert(data);
                    this.setMsgWatson(data);
                    //window.location.href='#ancora';
                    //this.messagesWatson.push(data);
                    //this.messagesUsuario.push("");
                    }, err => {
                    console.log(err)
                    });
                
                });
        }
            
         // window.scroll(0,0);  
            
        }
    
    getUrlParametros(variable){
        
    
    

       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
        }
    
    setMsgWatson(conteudo){
        var menssagem = {content: conteudo, position:'left', senderName: 'Watson'};
        this.msg.push(menssagem);
    }
    
    setMsgUsuario(conteudo){
        var menssagem = {content: conteudo, position:'right', senderName: 'Usuario'};
        this.msg.push(menssagem);
        
    }
        
    }


