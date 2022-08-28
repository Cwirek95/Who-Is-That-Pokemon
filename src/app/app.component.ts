import { Component, OnInit } from '@angular/core';
import { Pokemon } from './interfaces/pokemon.interface';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pokemons: Pokemon[];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemons = [];
    for (let i = 0; i < 4; i++) {
      this.pokemonService.getPokemon().subscribe(
        (result: Pokemon) => {
          this.pokemons.push(result);
        }
      ) 
    }
  }
}