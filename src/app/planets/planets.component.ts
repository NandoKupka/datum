import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.sass']
})
export class PlanetsComponent implements OnInit {
  peoplePage: any;
  searchText: String;
  modalItem: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("https://swapi.co/api/planets").subscribe(data => {
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

  getResidents(item) {
    this.modalItem['residentsData'] = [];
    item.residents.forEach(element => {
      this.http.get(element).subscribe(data => {
        this.modalItem['residentsData'].push(data);
      })
      
    });
  }

  openModal(item) {
    this.modalItem = item;
    this.getResidents(item);

    document.getElementById('modal').classList.add('is-active');
  }

  closeModal() {
    document.getElementById('modal').classList.remove('is-active');
  }

}
