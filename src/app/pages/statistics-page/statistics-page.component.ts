import { Component, OnInit, OnDestroy } from '@angular/core';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { Observable, Subscription } from 'rxjs';
import {
  ChartData,
  easyCreateChartData,
} from 'src/app/models/chart-data.model';
@Component({
  selector: 'statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
})
export class StatisticsPageComponent implements OnInit {
  constructor(private bitcoinService: BitcoinService) {}
  marketPriceStr = 'market-price';
  avgBlockSizeStr = 'avg-block-size';
  tradeVolumeStr = 'trade-volume';
  marketPrice!: ChartData;
  marketPrice$!: Subscription;
  avgBlockSize!: ChartData;
  avgBlockSize$!: Subscription;
  tradeVolume!: ChartData;
  tradeVolume$!: Subscription;
  display: string = this.marketPriceStr;
  ngOnInit(): void {
    this.avgBlockSize$ = this.bitcoinService
      .fetchData(this.avgBlockSizeStr)
      .subscribe((data) => {
        let res = easyCreateChartData(data);
        this.avgBlockSize = res;
      });
    this.marketPrice$ = this.bitcoinService
      .fetchData(this.marketPriceStr)
      .subscribe((data) => {
        let res = easyCreateChartData(data);
        this.marketPrice = res;
      });
    this.tradeVolume$ = this.bitcoinService
      .fetchData(this.tradeVolumeStr)
      .subscribe((data) => {
        let res = easyCreateChartData(data);
        this.tradeVolume = res;
      });
  }
}
