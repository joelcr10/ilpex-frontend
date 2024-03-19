import instance from '../../network/api';
interface ResetPasswordProp {
    email:string;
    newPassword: string;
    confirmPassword: string;
}
interface ResetPasswordResponse {
  success: boolean;
  errorMessage: string;
  statusCode: string;
  resetPasswordResp: any;
}
 
export async function ResetPassword({
    email,
    newPassword,
    confirmPassword,
}: ResetPasswordProp): Promise<ResetPasswordResponse> {
  let success: boolean = false;
  let errorMessage: string = '';
  let statusCode: string = '';
  let resetPasswordResp: any;
 
  const ResetPasswordPayload = {
    email: email,
    newPassword: newPassword,
    confirmPassword:confirmPassword,
  };
 
  try {
    const resetPasswordResponse = await instance.post(
      '/api/v1/authentication/resetPassword',
      ResetPasswordPayload,
    );
    statusCode = resetPasswordResponse.status.toString();
    {
      statusCode === '200' ? (success = true) : (success = false);
    }
    
    resetPasswordResp = resetPasswordResponse.data;
    console.log("resetPasswordResp resp",resetPasswordResp);
 
  } catch (error: any) {
    console.log('Error while user creation in:', error);
    errorMessage = error.message;
  }
 
  return {success, statusCode, resetPasswordResp, errorMessage};
};