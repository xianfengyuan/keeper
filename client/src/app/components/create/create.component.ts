import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, DateAdapter, MatDatepickerInputEvent } from '@angular/material';
import { Router } from '@angular/router';

import { LoginService } from '../../_services';
import * as moment_ from 'moment';

const moment = moment_;

class DateConfig {
  startView: 'month' | 'year' | 'multi-year';
  touchUi: boolean;
  minDate: moment_.Moment;
  maxDate: moment_.Moment;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @Input() disabled: boolean;
  @Input() placeholderDate: string;
  @Input() placeholderTime: string;
  @Input() model: Date;
  @Input() purpose: string;
  @Input() dateOnly: boolean;

  @Output() dateUpdate = new EventEmitter<Date>();

  public pickerId: string = "_" + Math.random().toString(36).substr(2, 9);

  public dateForm: FormControl;
  public timeFormGroup: FormGroup;
  public endTime: FormControl;

  public momentDate: moment_.Moment;
  public config: DateConfig;

  createForm: FormGroup;

  constructor(private adapter : DateAdapter<any>, private loginService: LoginService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.createForm = this.fb.group({
      username: ['', Validators.required],
      password: '',
      dateForm: this.dateForm,
      endTime: this.endTime,
      comments: ''
    });
  }

  addLogin(username, password, date, time, comments) {
    var newDate = moment(date, 'MM-DD-YYYY');
    var year = newDate.year();
    var month = newDate.month() + 1;
    var day = newDate.date();
    var established = year + '-' + month + '-' + day + ' ' + time;
    this.loginService.add(username, password, established, comments).subscribe(() => {
      this.snackBar.open('login added successfully', 'OK', {
        duration: 3000,
      });
      this.router.navigate(['/list']);
    }, (error) => {
      this.snackBar.open(error, 'Try again', {
        duration: 3000,
      });
    });
  }

  ngOnInit() {
    this.adapter.setLocale("en-US");//todo: configurable
    this.config = new DateConfig();
    if (this.purpose === "birthday") {
      this.config.startView = 'multi-year';
      this.config.maxDate = moment().add('year', -15);
      this.config.minDate = moment().add('year', -90);
      this.dateOnly = true;
    } //add more configurations
    else {
      this.config.startView = 'month';
      this.config.maxDate = moment().add('year', 100);
      this.config.minDate = moment().add('year', -100);
    }

    if (window.screen.width < 767) {
      this.config.touchUi = true;
    }

    if (this.model) {
      var mom = moment(this.model);
      if (mom.isBefore(moment('1900-01-01'))) {
        this.momentDate = moment();
      } else {
        this.momentDate = mom;
      }
    } else {
      this.momentDate = moment();
    }

    this.dateForm = new FormControl(this.momentDate);
    if (this.disabled) {
      this.dateForm.disable();
    }
    this.endTime = new FormControl(this.momentDate.format("HH:mm"));

    this.timeFormGroup = new FormGroup({
      endTime: this.endTime
    });
  }

  public dateChange(date: MatDatepickerInputEvent<any>) {

    if (moment.isMoment(date.value)) {
      this.momentDate = moment(date.value);
      if (this.dateOnly) {
        this.momentDate = this.momentDate.utc(true);
      }
      var newDate = this.momentDate.toDate();
      this.model = newDate;
      this.dateUpdate.emit(newDate);
    }

    console.log("datechange",date);
  }

  public timeChange(time: string) {

    var splitted = time.split(':');
    var hour = splitted[0];
    var minute = splitted[1];

    console.log("time change", time);
    this.momentDate = this.momentDate.set('hour', parseInt(hour));
    this.momentDate = this.momentDate.set('minute', parseInt(minute));

    var newDate = this.momentDate.toDate();
    this.model = newDate;
    this.dateUpdate.emit(newDate);
  }
}
