import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    /**
     * # Cách 1:
     * - Dùng snapshot chỉ 'bắt đc thông tin' khi component đc tạo ra (ngOnInit)
     * - Khi đã ở component này rồi mà query string hoặc hash thay đổi sẽ ko 'bắt' đc thông tin
     */
    console.log(this.route.snapshot.queryParams)
    console.log(this.route.snapshot.fragment)
    
    /**
     * # Cách 2:
     * - Dùng observable
     * - Ko cần unsubscribe ở life cycle hook 'destroy component', Angular do it for you!
     */
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        console.log('allowEdit: ' + queryParams['allowEdit']);
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      }
    );
    this.route.fragment.subscribe();

    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    // Subscribe route params to update the id if params change
    this.route.params.subscribe(
      (newParams: Params) => {
        const id = +newParams['id'];
        this.server = this.serversService.getServer(id);
      }
    );

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});

    this.changesSaved = true;

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  /**
   * This logic will run whenever the can-deactivate-guard is checked by the Angular router
   */
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if ( ! this.allowEdit) { // Ko cho edit thì dĩ nhiên rời khỏi thoải mái
      return true;
    }

    if (
      (this.serverName !== this.server.name || this.serverStatus !== this.server.status) // Nếu có thay đổi
      && // mà
      ! this.changesSaved // chưa save
    ) {
      // thì hỏi xác nhận ng dùng lại, có muốn rời đi mà ko save?
      return confirm('Do you want to discard the changes?');
    } else {
      // Trường hợp ko có đổi, hoặc có thay đổi mà save rồi
      return true; // thì rời đi thoải mái
    }
  }

}
