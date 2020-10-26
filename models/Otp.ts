export interface RequestTokenReqProps {
  email: string;
  feature: number;
}

export function RequestTokenReq(req: RequestTokenReqProps, json = req) {
  return {
    Email: json.email,
    OTPFeature: json.feature,
  };
}

export interface RequestTokenResProps {
  message: string;
}

export function RequestTokenRes(res): RequestTokenResProps {
  return {
    message: res,
  };
}

export interface ValidateTokenReqProps {
  otpCode: string;
  email: string;
  feature: number;
}

export function ValidateTokenReq(req: ValidateTokenReqProps, json = req) {
  return {
    OTPCode: json.otpCode,
    Email: json.email,
    OTPFeature: json.feature,
  };
}

export interface ValidateTokenResProps {
  message: string;
  data: string;
}

export function ValidateTokenRes(res): ValidateTokenResProps {
  return {
    data: res,
    message: 'OTP has been verified successfully',
  };
}

export interface OtpState {
  errors: any;
  message: string;
  isLoading: boolean;
  sentOtp: boolean;
}
