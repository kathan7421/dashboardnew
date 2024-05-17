import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { ToastrService } from 'ngx-toastr';
 

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
  })

export class LayoutComponent implements OnInit {

 
    constructor(){}

    ngOnInit(): void {
        
    }
  }