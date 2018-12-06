import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass']
})
export class PeopleComponent implements OnInit {
  peoplePage: any;
  searchText: String;
  modalItem: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("https://swapi.co/api/people").subscribe(data => {
      this.peoplePage = data;
    })
  }

  openMenu() {
    document.getElementById('sidebar').classList.add('opened');
  }

  goToPage(page) {
    this.http.get(page).subscribe(data => {
      this.peoplePage = data;
    }) 
  }

  search(ev) {
    ev.preventDefault();
    this.http.get("https://swapi.co/api/people/?search="+this.searchText).subscribe(data => {
      this.peoplePage = data;
    })
  }

  getHomeworld(item) {
    this.http.get(item.homeworld).subscribe(data => {
      this.modalItem['homeworldData'] = data;
    })
  }

  getStarships(item) {
    this.modalItem['starshipsData'] = [];
    item.starships.forEach(element => {
      this.http.get(element).subscribe(data => {
        this.modalItem['starshipsData'].push(data);
      })
      
    });
  }

  openModal(item) {
    this.modalItem = item;
    this.getHomeworld(item);
    this.getStarships(item);

    document.getElementById('modal').classList.add('is-active');
  }

  closeModal() {
    document.getElementById('modal').classList.remove('is-active');
  }

}
