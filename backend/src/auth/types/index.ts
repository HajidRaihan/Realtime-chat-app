interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

interface LoginUser {
    email: string;
    password: string;
}


export {RegisterUser, LoginUser}