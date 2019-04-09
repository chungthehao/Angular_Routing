

// Trong thực tế, cần thao tác với server để log in / log out / check authentication state
// Ở đầu mình chỉ fake behavior về login / logout
export class AuthService {

    loggedIn = false; // log in state, khởi đầu với giá trị false (chưa log in)

    login() {
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
    }

    // Method to check the state authenticated
    // Vì cần kiểm tra trên server nên mình fake nó mất 1 khoảng thời gian
    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
                }, 800);
            }
        );

        return promise;
    }

}