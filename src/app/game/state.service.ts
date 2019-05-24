import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface State {
    n_moves: number,
    turn: string,
    values: string[][]
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

	private _state$: BehaviorSubject<State>;

  constructor() { 

	  let initialState = {
        n_moves: 0,
	    turn: 'PLAYERX',
	    values: [
	      ['-','-','-'],
	      ['-','-','-'],
	      ['-','-','-']
	    ]
	  };

	  this._state$ = new BehaviorSubject(initialState);

  }

  get state$ (): BehaviorSubject<State> {
    return this._state$; 
  }

  get state (): State {
    return this._state$.getValue();
  }

  set state (state: State) {
    this._state$.next(state);
  }
  
  updateValue(row, col) {
    if(this.state.values[row][col] === '-') {
      this.state.n_moves++;
      let newValue = this.state.turn === 'PLAYERX' ? 'X' : '0';
      let newTurn = this.state.turn === 'PLAYERX' ? 'PLAYER0' : 'PLAYERX';
      this.state.values[row][col] = newValue;
      this.state.turn = newTurn;
      this._state$.next(this.state);
    }
  }

  winner() {
    var i,j;
    var count0 = 0;
    var countX = 0;
    
    // Comprueba en horizontal
    for (i = 0; i < this.state.values.length; i++) { 
        count0 = countX = 0;
        for (j = 0; j < this.state.values.length; j++) { 
            if(this.state.values[i][j] === '0') count0++;
            if(this.state.values[i][j] === 'X') countX++;
        }
        if (count0 === 3 || countX === 3) break;
    } 
    
    // Comprueba en vertical
    if (count0 !== 3 && countX !== 3) {
        for (i = 0; i < this.state.values.length; i++) { 
            count0 = countX = 0;
            for (j = 0; j < this.state.values.length; j++) { 
                if(this.state.values[j][i] === '0') count0++;
                if(this.state.values[j][i] === 'X') countX++;
            }
            if (count0 === 3 || countX === 3) break;
        } 
    }
    
    // Comprueba en diagonal
    if (count0 !== 3 && countX !== 3) {
        count0 = countX = 0;
        for (i = 0; i < this.state.values.length; i++) { 
            if(this.state.values[i][i] === '0') count0++;
            if(this.state.values[i][i] === 'X') countX++;
        } 
    }
    
    // Comprueba en diagonal contraria
    if (count0 !== 3 && countX !== 3) {
        count0 = countX = 0;
        for (i = 0; i < this.state.values.length; i++) { 
            if(this.state.values[i][this.state.values.length - i - 1] === '0') count0++;
            if(this.state.values[i][this.state.values.length - i - 1] === 'X') countX++;
        } 
    }
    
    return (count0 >= 3 ? 'PLAYER0' : (countX >= 3 ? 'PLAYERX' : ''));
  }
  
  reset() {
    this.state = {
      n_moves: 0,
      turn: 'PLAYERX',
      values: [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
      ]
    };
  }

}
