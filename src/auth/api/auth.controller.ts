import {
  Controller,
  Get,
  Post,
  UseGuards,
  Res,
  Req,
  HttpCode,
  Body,
} from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Response } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RefreshTokenGuard } from '../guards/refresh.token.guard';
import { CurrentPayload } from '../current-payload.param.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { CustomThrottlerGuard } from '../guards/custom.throttler.guard';
import { UsersQueryRepository } from '../../users/infrastucture/users.query.repository';
import {
  ErrorCode4__,
  GetMyAccount,
  loginBodyType,
  loginType,
} from '../domain/dto/swagger';

@UseGuards(CustomThrottlerGuard)
@ApiTags('Auth')
@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    protected usersQueryRepository: UsersQueryRepository,
  ) {}

  @ApiOperation({ summary: 'Login Request' })
  @ApiResponse({ status: 200, type: loginType })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: ErrorCode4__ })
  @ApiResponse({ status: 429, description: '5 Запросов за 10 секунд' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async singInAccount(
    @Req() req,
    @Body() dto: loginBodyType,
    @Res() res: Response,
  ) {
    const tokens = await this.authService.login(req.user.id);
    return res
      .cookie('refreshToken', tokens.refreshToken, {
        httpOnly: false,
        secure: false,
      })
      .send({ accessToken: tokens.accessToken });
  }

  @ApiOperation({ summary: 'New Refresh Token' })
  @ApiResponse({ status: 200, type: loginType })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: ErrorCode4__ })
  @ApiResponse({ status: 429, description: '5 Запросов за 10 секунд' })
  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  async updateRefreshToken(
    @Res() res: Response,
    @CurrentPayload() currentPayload,
  ) {
    const tokens = await this.authService.newToken(currentPayload);

    return res
      .status(200)
      .cookie('refreshToken', tokens.refreshToken, {
        expires: new Date(Date.now() + 2000000),
        httpOnly: true,
        secure: true,
      })
      .send({ accessToken: tokens.accessToken });
  }

  @ApiOperation({ summary: 'My account' })
  @ApiResponse({ status: 200, type: GetMyAccount })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: ErrorCode4__ })
  @Throttle()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async myAccount(@Req() req) {
    return this.usersQueryRepository.findUserById(req.user.id);
  }

  // @UseGuards(RefreshTokenGuard) //Нужно подключить сессии
  // @Post('logout')
  // @HttpCode(204)
  // async logOutAccount(@Res() res: Response) {
  //   return res.status(200).cookie('refreshToken', 'No token').send('No Token');
  // }
}
