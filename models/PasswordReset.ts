export interface ForgotPassReqProps {
  email: string;
}

export function ForgotPassReq(req: ForgotPassReqProps, json = req) {
  return {
    Email: json.email,
    ResetPasswordUrl: `${process.env.APP_URL}/forgot-password/set-password`,
  };
}

export interface ForgotPassResProps {
  code: string;
}

export function ForgotPassRes(res): ForgotPassResProps {
  return {
    code: res.ResponseCode,
  };
}

export interface ResetPassReqProps {
  resetToken: string;
  email: string;
  confirmPassword: string;
  password: string;
}

export function ResetPassReq(req: ResetPassReqProps, json = req) {
  return {
    ResetToken: json.resetToken,
    Email: json.email,
    ConfirmPassword: json.confirmPassword,
    Password: json.password,
  };
}

export interface ResetPassState {
  resetToken: string;
  isPasswordReset: boolean;
  errors: any;
  message: string;
  isResetLinkSent: boolean;
  isLoading: boolean;
}
