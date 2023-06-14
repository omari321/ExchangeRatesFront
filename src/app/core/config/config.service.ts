/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { map } from 'rxjs/internal/operators/map';
import { Config } from './confog.types';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _config: Config;

  constructor(private $http: HttpClient) {}

  public get Config(): Config {
    if (this._config) {
      return this._config;
    } else {
      return {
        API_URL: environment.apiUrl,
      };
    }
  }

  loadAppConfig(filePath: string): Promise<Config> {
    return lastValueFrom(
      this.$http.get<Config>(filePath).pipe(
        map((config) => {
          this._config = config;
          return config;
        })
      )
    );
  }
}
