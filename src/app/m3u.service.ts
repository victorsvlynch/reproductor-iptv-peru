import { Injectable } from '@angular/core';

export interface Channel {
  name: string;
  streamUrl: string;
}

@Injectable({ providedIn: 'root' })
export class M3uService {

  async getChannels(): Promise<Channel[]> {
    const res = await fetch('assets/pe.m3u');
    const data = await res.text();
    return this.parse(data);
  }

  private parse(text: string): Channel[] {
    const lines = text.split("\n");
    const channels: Channel[] = [];
    let name = "Canal";

    for (let l of lines) {
      l = l.trim();
      if (l.startsWith("#EXTINF")) {
        const temp = l.split(",")[1];
        name = temp ? temp.trim() : "Canal";
      }
      if (l.startsWith("http")) {
        channels.push({
          name,
          streamUrl: l.trim()
        });
      }
    }

    return channels;
  }
}
