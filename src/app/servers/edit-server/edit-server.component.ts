import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute) { }

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

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
