import { Controller, Get, Post, UseGuards, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from './utils/Guard';
@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'google auth' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleLoginCallback(@Req() req, @Res() res) {
    req.logIn(req.user, (err) => {
      if (err) {
        throw err;
      }
      return res.redirect('/api'); // Redirect ke halaman yang dilindungi
    });
  }


  @Get('status')
  user(@Req() request: Request) {
    console.log("ini status")
    if(request.user){
      return {msg: 'Authenticated'}
    } else{
      return {msg: "Not Authenticated"}
    }
  }



  @Post('logout')
    logout(@Req() req: Request, @Res() res: Response) {
        // Menghapus sesi pengguna
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Logout failed' });
            }
            // Setelah sesi dihapus, kirim respons sukses
            return res.status(200).json({ message: 'Logout successful' });
        });
    }
}
