import { Injectable } from '@angular/core'; 

import 'babel-polyfill';
import * as Ws from "@adonisjs/websocket-client";
import { environment as env } from '@env/environment';

@Injectable({
  providedIn: 'root',
})

export abstract class WebSocketService {

  public socket;
  public channel;
  public channelName: string;

  constructor() {}


  connection(channelName){
    this.channelName = channelName;
    const wsUrl = "ws://"+env.host+":"+env.port;
    this.socket = Ws(wsUrl, {});
  }

  createdChannel(channelName:string){
    this.socket.connect(); // conexão com o websocket
    this.channel = this.socket.subscribe(channelName); // conectando-se ao canal
    return this.channel;
  }

  // escutando as atualizações do canal quando o método 'call' foi invocado
  on(channelMessage:string, event){
    this.channel = this.createdChannel(this.channelName)
    this.channel.on(channelMessage, event);// acões para ser executada quando receber a atualização
  }

  destroyChannel() {
    this.channel.close();
  }

  // esse método será responsável por enviar um evento para o canal
  public sendCall() {
    this.channel.emit("call", {
        /*params*/
    });
}

}
