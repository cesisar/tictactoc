import { Component, OnInit } from '@angular/core';
import { StateService, State } from './../state.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private _state$: BehaviorSubject<State>;
  private _stateService: StateService;

  constructor(stateService: StateService) { 
  	 this._state$ = stateService.state$;
     this._stateService = stateService;
  }

  ngOnInit() {
  }
    
  _handleResetClick = function () {
      this._stateService.reset();
  }
}
