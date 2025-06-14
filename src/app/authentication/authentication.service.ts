import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {WebSocketSubject} from 'rxjs/internal/observable/dom/WebSocketSubject';
import {webSocket} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  protected address = '';
  protected token = '';
  protected socket: WebSocketSubject<any> | null = null;
  protected connected = false;

  connect(address: string, token: string): Observable<ConnectionResult> {
    return new Observable(subscriber => {
      let waiting = true;
      this.disconnect();
      this.address = address;
      this.token = token;
      this.socket = webSocket({
        url: 'ws://' + address + '/updates',
        serializer: message => message,
        deserializer: message => message,
      });
      this.socket.subscribe({
        next: message => {
          if (waiting) {
            subscriber.next(ConnectionResult.Success);
            waiting = false;
            this.connected = true;
          }
        },
        error: problem => {
          if (waiting) {
            if (problem.type == 'close') {
              subscriber.next(ConnectionResult.BadToken);
              waiting = false;
            } else {
              subscriber.next(ConnectionResult.BadAddress);
              waiting = false;
            }
          }
        },
      });
      this.socket.next(token);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.complete();
      this.socket = null;
      this.connected = false;
    }
  }

  isConnected(): boolean {
    return this.connected;
  }

  getBaseUrl(): string {
    return 'http://' + this.address;
  }

  getRequestHeaders(): HttpHeaders {
    return new HttpHeaders({
      Token: this.token,
    });
  }
}

export enum ConnectionResult {
  Success,
  BadAddress,
  BadToken,
}
