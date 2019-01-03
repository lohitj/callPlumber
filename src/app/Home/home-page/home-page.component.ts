/// <reference types="@types/googlemaps" />
/// <reference types="@types/node" />
/// <reference types="@types/crypto-js" />
/// <reference types="@types/twilio"/>
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HomePageService } from './home-page.service';
import { ViewChild } from '@angular/core';
// import * as T from 'twilio';
const accountSid = 'AC115eb66175b1b1073c6b369fc2de043c';
const authToken = 'c3b64f1820c18cb19c669d850a468c67';
// const client = T(accountSid, authToken);
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  employeeForm: FormGroup;
  currentLat: any;
  currentLong: any;
  marker: any;
  isTracking: any;
  from: any;
  to: any;
  position: any;
 

  constructor(private HomePageService: HomePageService) { }

  ngOnInit() {

    this.employeeForm = new FormGroup({
      usr: new FormControl(),
      password: new FormControl(),
      confPassword: new FormControl(),
      Email: new FormControl(),
      PhoneNo: new FormControl(),
      checkbox: new FormControl(),
      inlineRadioOptions: new FormControl(),
    });


    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

  }


  onSubmit(): void {
    console.log(this.employeeForm.value);
  }
  // sendText() : void {
  //   client.messages.create({
  //     body: 'Hello from Node',
  //     to: '+918427262396',
  //     from: '+17193995051'
  //   })
  //     .then((message) => console.log(message.sid));
  // }
  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
  }
  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(this.currentLat, this.currentLong);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        animation: google.maps.Animation.BOUNCE,
        title: 'Got you!',
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  showTrackingPosition(position) {
    // console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

}
