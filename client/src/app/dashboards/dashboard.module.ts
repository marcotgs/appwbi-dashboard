import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CalendarModule, CalendarDateFormatter } from 'angular-calendar';

import { DashboardRoutes } from './dashboard.routing';

import { FaturamentoDevolucaoComponent } from './faturamento-devolucao/faturamento-devolucao.component';

import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { Dashboard4Component } from './dashboard4/dashboard4.component';
import { Dashboard5Component } from './dashboard5/dashboard5.component';
import { Dashboard6Component } from './dashboard6/dashboard6.component';
import { Dashboard7Component } from './dashboard7/dashboard7.component';
import { Dashboard8Component } from './dashboard8/dashboard8.component';
import { Dashboard9Component } from './dashboard9/dashboard9.component';
import { Dashboard10Component } from './dashboard10/dashboard10.component';

import {
  ActivevisitComponent,
  VisitorComponent,
  ActivitypagesComponent,
  CamStatsComponent,
  CamoverComponent,
  ConversionEarningsComponent,
  ChartComponent,
  CurrencyComponent,
  MarketComponent,
  OrderComponent,
  CryptoComponent,
  TradeComponent,
  DeviceSalesComponent,
  EarningsComponent,
  EcomSalesComponent,
  EcomorderComponent,
  EcomproductComponent,
  EcomReviewComponent,
  StatsComponent,
  EmailComponent,
  Emailcompaign2Component,
  FeedsComponent,
  InfocardComponent,
  MixstatsComponent,
  MonthoverviewComponent,
  MonthscheduleComponent,
  MonthviewComponent,
  PollComponent,
  ProapprComponent,
  ProfileactivityComponent,
  ProjectComponent,
  Project2Component,
  RealdataComponent,
  RealtimevisitComponent,
  ChatComponent,
  CommentComponent,
  RpbComponent,
  RevenueviewsComponent,
  ReviewComponent,
  SalelocationComponent,
  SalesComponent,
  SocialComponent,
  TasklistComponent,
  ToplocationsComponent,
  TopreferralsComponent,
  TopsellComponent,
  UserprofileComponent,
  WeatherheaderComponent,
  WeathercardComponent,
  WeekpollComponent
} from './dashboard-components';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ChartsModule,
    ChartistModule,
    RouterModule.forChild(DashboardRoutes),
    PerfectScrollbarModule,
    CalendarModule.forRoot(),
    NgxChartsModule,
    NgxDatatableModule
  ],
  declarations: [
    FaturamentoDevolucaoComponent,
    Dashboard1Component,
    Dashboard2Component,
    Dashboard3Component,
    Dashboard4Component,
    Dashboard5Component,
    Dashboard6Component,
    Dashboard7Component,
    Dashboard8Component,
    Dashboard9Component,
    Dashboard10Component,
    ActivevisitComponent,
    VisitorComponent,
    ActivitypagesComponent,
    CamStatsComponent,
    CamoverComponent,
    ConversionEarningsComponent,
    ChartComponent,
    CurrencyComponent,
    MarketComponent,
    OrderComponent,
    CryptoComponent,
    TradeComponent,
    DeviceSalesComponent,
    EarningsComponent,
    EcomSalesComponent,
    EcomorderComponent,
    EcomproductComponent,
    EcomReviewComponent,
    StatsComponent,
    EmailComponent,
    Emailcompaign2Component,
    FeedsComponent,
    InfocardComponent,
    MixstatsComponent,
    MonthoverviewComponent,
    MonthscheduleComponent,
    MonthviewComponent,
    PollComponent,
    ProapprComponent,
    ProfileactivityComponent,
    ProjectComponent,
    Project2Component,
    RealdataComponent,
    RealtimevisitComponent,
    ChatComponent,
    CommentComponent,
    RpbComponent,
    RevenueviewsComponent,
    ReviewComponent,
    SalelocationComponent,
    SalesComponent,
    SocialComponent,
    TasklistComponent,
    ToplocationsComponent,
    TopreferralsComponent,
    TopsellComponent,
    UserprofileComponent,
    WeatherheaderComponent,
    WeathercardComponent,
    WeekpollComponent
  ]
})
export class DashboardModule {}
