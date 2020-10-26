import { ProfileResProps } from './Profile';

export interface LoginReqProps {
  password: string;
  email: string;
}

export function LoginReq(req: LoginReqProps, json = req) {
  return {
    EmailAddress: json.email,
    ConfirmPassword: json.password,
    Password: json.password,
  };
}

export interface AuthResProps {
  expiresIn: string;
  refreshToken: string;
  token: string;
}

export function AuthRes(res): AuthResProps {
  return {
    expiresIn: res.ExpiresIn,
    refreshToken: res.RefreshToken,
    token: res.Token,
  };
}
export interface VerifyEmailReqProps {
  verificationToken: string;
  email: string;
}

export function VerifyEmailReq(req: VerifyEmailReqProps, json = req) {
  return {
    Email: json.email,
    EmailVerificationToken: json.verificationToken,
  };
}

export interface VerifyEmailResProps {
  message: string;
  isEmailVerified: boolean;
  email: string;
}

export function VerifyEmailRes(res): VerifyEmailResProps {
  return {
    message: res.ResponseMessage,
    isEmailVerified: true,
    email: res.Data,
  };
}

export interface SignUpReqProps {
  password: string;
  email: string;
  userProfileId: string;
  country: string;
}

export function SignUpReq(req: SignUpReqProps, json = req) {
  return {
    ConfirmPassword: json.password,
    EmailAddress: json.email,
    Password: json.password,
    UserProfileTypeId: json.userProfileId === 'personal' ? 1 : 2,
    CountryId: json.country,
  };
}
export interface AuthState {
  user: UserProps;
  isAuthenticated: boolean;
  isEmailVerifySent: boolean;
  isEmailVerified: boolean;
  errors: any;
  profile: ProfileResProps;
  message: string;
  isSettingAuth: boolean;
  isLoading: boolean;
}
export interface UserProps {
  expiresIn: number;
  refreshToken: string;
  token: string;
  email: string;
}
