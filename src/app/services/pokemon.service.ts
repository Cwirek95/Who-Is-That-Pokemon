import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl: string = "https://pokeapi.co/api/v2/pokemon/";
  private correct: boolean = false;
  private counter: number = 0;

  constructor(private http: HttpClient) {}

  public getPokemon(): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.baseUrl + this.drawPokemonId().toString()).pipe(
      map(res => this.processPokemon(res)));
  }

  private processPokemon(pokemon: Pokemon) {
    return {
      id: pokemon.id,
      name: pokemon.name,
      correctAnswer: this.chooseCorrectAnswer()
    }
  }

  private chooseCorrectAnswer(): boolean {
    this.counter++;
    if(this.correct === true) {
      return false;
    }
    if(this.correct === false && this.counter >= 4) {
      return true;
    }
    if(Math.random() > 0.5) {
      this.correct = true;
      return true;
    }
    return false;
  }

  private drawPokemonId(): number {
    return Math.round(Math.random() * 800);
  }
}