import { 
    CanActivate, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    Router
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router) {}

    /**
     * - Angular should execute this code before a router is loaded
     * - So, it will give us this data (params đầu vào)
     * 
     * - Nó trả về 1 observable (wrap a boolean)
     * - Alternatively, this route returns a promise (also returning a boolean in the end)
     * - Or it returns just a boolean
     * 
     * # canActive() can run both async (returning an observale or a promise)
     * or sync (boolean). Because you might have some guards which execute some code which runs
     * completely on the client. therefore it runs synchronously or you might have some code which
     * takes a couple of seconds to finish (use a timeout in there or reach out to a server). So
     * it runs asynchronously and both is possible with canActivate()
     */
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // Check whether the user is logged in or not
        return this.authService.isAuthenticated()
            .then(
                (authenticated: boolean) => {
                    if (authenticated) {
                        return true;
                    } else {
                        // Nếu ng ta chưa log in thì navigate đi chỗ khác
                        this.router.navigate(['/']);
                    }
                }
            );            
    }

}