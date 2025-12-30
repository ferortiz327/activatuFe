import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeServiceService {
  constructor(private http: HttpClient) {}

  getLatestVideoId(): Observable<string> {
    const rssUrl = encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=UCmI8EsQ8lOXXjf9FZcI8GHw');
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

    return this.http.get<any>(url).pipe(
      map(res => {
        console.log('Respuesta de RSS2JSON:', res);
        return res.items?.[0]?.link?.split('=')[1];
      })
    );
  }
}
