import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'], // Ở app module "'users/:id'"
      name: this.route.snapshot.params['name']
    };

    /**
     * - Mặc định nếu dùng routerLink mà hiện tại đã ở component đó thì Angular ko tải lại component.
     * - Nên các tham số trên URL có thay đổi, Angular cũng "ko biết"
     * - Dùng observable để khi 'có gì đó xảy ra trong tương lai' thì nó sẽ chạy 'code mình quy định'. (async)
     */
    this.paramsSubscription = this.route.params.subscribe(
      (newParams: Params) => {
        this.user.id = newParams.id;
        this.user.name = newParams.name;
      }
    );
  }

  /**
   * Angular tự làm việc này cho mình
   */
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
