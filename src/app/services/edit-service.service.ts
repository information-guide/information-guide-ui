import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditServiceService {
  informationId: number | null = null;
  selectedTopicId: number | null = null;
  question: string = '';
  answer: any = [];
  constructor() { }
}
