import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { SelectItemGroup } from 'primeng/api';
import { MailserviceService } from '../mailservice.service';


@Component({
  selector: 'app-createmeeting',
  templateUrl: './createmeeting.component.html',
  styleUrls: ['./createmeeting.component.css']
})
export class CreatemeetingComponent implements OnInit {

  meetingForm: FormGroup;
  frequencyName: any = ['Once', 'Weekly', 'Monthly', 'Yearly']
  isSubmitted: boolean = false;
  selectedMail: any;
  mails: any[];
  filteredMails: any[];
  selectedMails: any[];
  selectedMailAdvanced: any[];
  filteredBrands: any[];
  suggestion: any = [];
  //const dateTime = new Date();

  constructor(private fb: FormBuilder, private mailser: MailserviceService) {

  }

  ngOnInit(): void {
    const dateTime = new Date();
    this.meetingForm = this.fb.group({
      meetingTitle: ['', [Validators.required]],
      meetingDate: [''],
      meetingTime: [''],
      duration: ['', [Validators.required]],
      location: ['', [Validators.required]],
      frequency: [''],
      meetingType: ['', [Validators.required]],
      defaultApproveHours: ['36'],
      agenda: this.fb.array([
      //  this.addAgendaFormGroup()
      ])
    })
    this.mailser.getMails().then(mails => {
      this.mails = mails;
      //console.log("***" + JSON.stringify(mails));
    });
  }

  addAgendaButtonclick(): void {
    console.log("Work");
   (<FormArray>this.meetingForm.get('agenda')).push(this.addAgendaFormGroup());
  }

  addAgendaFormGroup(): FormGroup {
    return this.fb.group({
      agendaTitle: ['', [Validators.required]],
      presenter: [''],
      durations: [''],
      notes: [''],
      predefinedNotes: ['']
    })
  }
  changeFrequency(e) {
    //console.log(e.value)
    this.frequency.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get frequency() {
    return this.meetingForm.get('frequency');
  }

  onSubmit(): void {
    //this.isSubmitted = true
    console.log(JSON.stringify(this.meetingForm.value))
  }

  filterMail(event) {
    console.log("**** " + JSON.stringify(event))
    let filtered: any[] = [];
    let query = event.query;
    console.log("##### " + JSON.stringify(query))
    for (let i = 0; i < this.mails.length; i++) {
      let mail = this.mails[i];
      // console.log("Mail ####"+JSON.stringify(mail))
      if (mail.Email.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        console.log("Inside if " + JSON.stringify(mail))
        filtered.push(mail);
      }
    }

    this.filteredMails = filtered;
  }
}
