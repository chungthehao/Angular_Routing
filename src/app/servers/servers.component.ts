import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    /**
     * - Mặc định navigate "ko biết mình đang ở đâu" nên mình để relative nó cũng chỉ mặc định là relative với root.
     * - Muốn chỉ cho nó biết đang ở đâu để relative cho chính xác thì thêm param2 như sau.
     */
    // console.log(this.route);
    // this.router.navigate(['servers'], { relativeTo: this.route });
  }

}
