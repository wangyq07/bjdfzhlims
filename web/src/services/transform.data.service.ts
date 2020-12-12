import { Injectable } from '@angular/core';
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

  private auditResultMessage = new BehaviorSubject<String>("");
  auditResult = this.auditResultMessage.asObservable();

  constructor() { }

  sendAuditResult(msg: string) {
    if(this.auditResult !=null)
    this.auditResultMessage.next(msg);
  }
  
}
export interface SendSocketMessage
{
  currentUser?:User;
  stomp?:StompService;
}