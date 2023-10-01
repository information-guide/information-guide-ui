import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionServiceService {

  deleteContentItem = new Subject();
  errors = new Subject<string[]>();
  topicChangeEvent = new Subject<number>();

  constructor() { }
}
