import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    /**
     * Cách 2:
     * - Load data ngay khi route đc load (Angular tự chạy) rồi truyền thông qua resolve (xem thêm ở app-routing.module.ts)
     * - It's an alternative - it allows you to load data BEFORE you render a component (server-resolver.service.ts)
     */
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server']; // ở app-routing.module.ts resolve: {server: ServerResolver} lưu ý tên server phải match nhau
      }
    );

    /**
     * Cách 1: 
     */
    // // Dấu '+' để ép nó về kiểu số (nó đang là kiểu string)
    // const serverId = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(serverId);

    // // Also want to react to any changes thereafter (dùng observable)
    // this.route.params.subscribe(
    //   (newParams: Params) => {
    //     // Dấu '+' để ép nó về kiểu số (nó đang là kiểu string)
    //     this.server = this.serversService.getServer(+newParams['id']);
    //   }
    // );
  }

  onEdit() {
    this.router.navigate(
      ['edit'], 
      { relativeTo: this.route, queryParamsHandling: 'preserve' } // Giữ lại query string cũ đã có
    );
  }

}
