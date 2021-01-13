import { Injectable,EventEmitter, Output } from '@angular/core';
import { StompService } from 'ng2-stomp-service';
import { BehaviorSubject } from 'rxjs';
import{testobj} from 'src/services/global.storege.service'
import { User } from 'src/main/system/users/users.service';
 
@Injectable({ providedIn: 'root' })
export class transformService {

  private socketMessage = new BehaviorSubject<SendSocketMessage>({currentUser:undefined,stomp:undefined});
  currentsocketconnect = this.socketMessage.asObservable();

  constructor() { }

  completeconnect(socketmessate: SendSocketMessage) {
    if(this.currentsocketconnect !=null)
    this.socketMessage.next(socketmessate);
  }
  
}
@Injectable({ providedIn: 'root' })
export class AuditResultService {

  @Output() auditResultMessage = new EventEmitter<String>(); 
  constructor() { }

  sendAuditResult(msg: string) {
    console.log(msg);
    console.log(this.auditResultMessage);
     if(this.auditResultMessage!=null)
     {
      this.auditResultMessage.emit(msg); 
     }
  }
  
}
export interface SendSocketMessage
{
  currentUser?:User;
  stomp?:StompService;
}