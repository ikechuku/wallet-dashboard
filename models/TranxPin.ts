export interface PinReqProps {
  pin: number;
}

export function PinReq(req: PinReqProps, json = req) {
  return {
    pin: json.pin,
  };
}

export interface SetPinResProps {
  userId: string;
  pin: string;
  id: string;
}

export function SetPinRes(res): SetPinResProps {
  return {
    userId: res.user_id,
    pin: res.pin,
    id: res.id,
  };
}

export interface ValidatePinResProps {
  success: boolean;
}

export function ValidatePinRes(res): ValidatePinResProps {
  return {
    success: res.success,
  };
}
