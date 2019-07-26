import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import dogs from '../../assets/dogs';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss']
})
export class DogsComponent implements OnInit {

  searchValue = '';
  dogs = dogs.data;
  breeds = [];
  filteredBreed;
  filteredAge;
  ages = [{
    text: '0 - 2',
    value: [0, 2],
  }, {
    text: '3 - 5',
    value: [3, 5],
  }, {
    text: '6 - 8',
    value: [6, 8],
  }, {
    text: '9 - 11',
    value: [9, 11],
  }, {
    text: '12 - 14',
    value: [12, 14],
  }, {
    text: '15+',
    value: [15],
  }];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.searchValue = this.route.snapshot.params.searchText || '';
    this.setBreeds();
    this.filterDogs();
  }

  setBreeds() {
    const breedSet = new Set();
    this.dogs.forEach(dog => {
      dog.breeds.forEach(breed => {
        breedSet.add(breed);
      });
    });

    this.breeds = Array.from(breedSet);
  }

  filterDogs() {
    const ageHigh = this.filteredAge && Number(this.filteredAge.split(',')[1]);
    const ageLow = this.filteredAge && Number(this.filteredAge.split(',')[0]);
    const lowerSearch = this.searchValue.toLowerCase();
    const lowerFilteredBreed = this.filteredBreed && this.filteredBreed.toLowerCase();

    this.dogs = dogs.data.filter(dog => {
      if (!this.searchValue && !this.filteredAge && !this.filteredBreed) return true;

      const matchesName = dog.name.toLowerCase().includes(lowerSearch);
      const matchesNickname = dog.nickname.toLowerCase().includes(lowerSearch);
      const matchesDescription = dog.description.toLowerCase().includes(lowerSearch);
      const matchesBreed = !this.filteredBreed && dog.breeds.some(breed => breed.includes(lowerSearch) && !!lowerSearch);
      const isTextMatch = (matchesBreed && matchesName || matchesNickname || matchesDescription) && lowerSearch.length;

      const onlyBreed = dog.breeds.includes(lowerFilteredBreed);
      const isInAgeRange = (dog.age <= ageHigh && dog.age >= ageLow) || (isNaN(ageHigh) && ageLow <= dog.age);
      
      if (this.filteredAge && this.filteredBreed && lowerSearch.length) {
        return isInAgeRange && onlyBreed && isTextMatch;
      } else if (this.filteredAge && this.filteredBreed) {
        return isInAgeRange && onlyBreed;
      } else if (this.filteredAge && lowerSearch.length) {
        return isInAgeRange && isTextMatch;
      } else if (this.filteredBreed && lowerSearch.length) {
        return onlyBreed && isTextMatch;
      } else if (this.filteredAge) {
        return isInAgeRange
      } else if (this.filteredBreed) {
        return onlyBreed;
      } else if (lowerSearch.length) {
        return isTextMatch;
      }
    });
  }

  onKey(event: KeyboardEvent) {
    this.searchValue = (event.target as HTMLInputElement).value;
    this.filterDogs();
  }

  onBreedChange(breed) {
    this.filteredBreed = breed;
    this.filterDogs();
  }

  onAgeChange(age) {
    this.filteredAge = age;
    this.filterDogs();
  }

  clear() {
    this.filteredAge = null;
    this.filteredBreed = null;
    this.searchValue = '';
    this.filterDogs();
  }

  unfavorite(event, name) {
    event.stopPropagation();
    const dog = this.dogs.find(dog => dog.name === name);
    dog.favorite = false;
  }

  favorite(event, name) {
    event.stopPropagation();
    const dog = this.dogs.find(dog => dog.name === name);
    dog.favorite = true;
  }

}
