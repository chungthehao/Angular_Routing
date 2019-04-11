import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    /**
     * Chỉ có vấn đề gì nếu như errorMessage thay đổi mà hiện tại đã đang ở component này.
     */
    // this.errorMessage = this.route.snapshot.data['message'];

    // If this could possibly change while you still are on this page
    this.route.data.subscribe(
      (newData: Data) => {
        this.errorMessage = newData['message'];
      }
    );
  }

}
