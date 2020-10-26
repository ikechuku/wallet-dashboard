export default interface OTPInputProps {
  length: number; // Number of inputs
  onChangeOTP: (otp: string) => any; // Handle onOTPChange to use its value

  autoFocus?: boolean; // Auto focus to input programmatically
  isNumberInput?: boolean; // If otp is number
  disabled?: boolean;

  /* style?: CSSProperties; // Style for container OTP */
  className?: string; // Class for container OTP

  /* inputStyle?: CSSProperties; // Style for input */
  inputClassName?: string; // Class for input
}
