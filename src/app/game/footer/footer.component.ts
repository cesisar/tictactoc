import { Component, OnInit } from '@angular/core';

import { StateService, State } from './../state.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

	private _state$: BehaviorSubject<State>;

  constructor(stateService: StateService) { 
  	this._state$ = stateService.state$;
  }

  ngOnInit() {
  }

}
