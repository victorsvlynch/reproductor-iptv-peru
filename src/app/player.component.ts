import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import {
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

import { NgIf } from '@angular/common';
import Hls from 'hls.js';

@Component({
  standalone: true,
  selector: 'app-player',
  template: `
    <ion-card *ngIf="src">
      <ion-card-content>
        <video #video controls autoplay playsinline style="width:100%;border-radius:10px;"></video>
      </ion-card-content>
    </ion-card>
  `,
  imports: [IonCard, IonCardContent, NgIf]
})
export class PlayerComponent implements OnChanges {

  @Input() src?: string;
  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;

  hls?: Hls;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['src'] && this.src) {
      this.startStream();
    }
  }

  startStream() {
    const video = this.videoRef.nativeElement;

    if (this.hls) {
      this.hls.destroy();
      this.hls = undefined;
    }

    if (Hls.isSupported()) {
      console.log("Iniciando HLS.js");
      this.hls = new Hls();
      this.hls.loadSource(this.src!);
      this.hls.attachMedia(video);

      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(err => console.error("Error al reproducir:", err));
      });

    } else {
      console.log("Reproducción nativa");
      video.src = this.src!;
      video.play().catch(err => console.error("Error nativo:", err));
    }
  }
}
