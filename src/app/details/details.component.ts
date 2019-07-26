import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import dogs from '../../assets/dogs';

interface Dog {
  name: string;
  nickname?: string;
  description?: string;
  imgPath?: string;
  breeds?: string[];
  weight?: number;
  age?: number;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  dog: Dog;
  breeds: [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const name = this.route.snapshot.params.name || '';
    this.dog = dogs.data.find((dog) => dog.name === name) || {name: 'not found'};
  }

}
