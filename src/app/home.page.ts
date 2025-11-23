import { Component } from '@angular/core';
import {
  IonContent, IonList, IonItem, IonLabel, IonHeader, IonToolbar,
  IonTitle, IonAvatar
} from '@ionic/angular/standalone';

import { NgIf, NgFor } from '@angular/common';

import { M3uService, Channel } from './m3u.service';
import { PlayerComponent } from './player.component';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Reproductor IPTV Peru</ion-title>
    </ion-toolbar>
  </ion-header>

  <!-- PLAYER FIJO ARRIBA -->
  <div *ngIf="currentStream" style="padding:10px; background:#f1f1f1;">
    <app-player [src]="currentStream"></app-player>
  </div>

  <!-- CONTENIDO QUE SCROLLEA -->
  <ion-content>

    <!-- LISTA DE CANALES -->
    <ion-list *ngIf="channels.length > 0">
      <ion-item *ngFor="let ch of channels" (click)="play(ch)">
        <ion-avatar slot="start">
          <img src="assets/channel-placeholder.svg"/>
        </ion-avatar>

        <ion-label>
          <h2>{{ ch.name }}</h2>
        </ion-label>
      </ion-item>
    </ion-list>

    <div *ngIf="channels.length === 0" style="padding:20px;">
      Cargando canales…
    </div>

  </ion-content>
  `,
  imports: [
    IonContent, IonList, IonItem, IonLabel, IonHeader, IonToolbar,
    IonTitle, IonAvatar,
    NgIf, NgFor,
    PlayerComponent
  ]
})
export class HomePage {

  channels: Channel[] = [];
  currentStream?: string;

  constructor(private m3u: M3uService) {
    this.load();
  }

  async load() {
    this.channels = await this.m3u.getChannels();
  }

  play(ch: Channel) {
    console.log("Reproduciendo:", ch.streamUrl);
    this.currentStream = ch.streamUrl;
  }
}
