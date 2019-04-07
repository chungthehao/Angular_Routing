import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    // Dấu '+' để ép nó về kiểu số (nó đang là kiểu string)
    const serverId = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(serverId);

    // Also want to react to any changes thereafter (dùng observable)
    this.route.params.subscribe(
      (newParams: Params) => {
        // Dấu '+' để ép nó về kiểu số (nó đang là kiểu string)
        this.server = this.serversService.getServer(+newParams['id']);
      }
    );
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}
