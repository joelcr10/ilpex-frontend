import instance from '../../network/api';
interface ForgotPasswordProp {
    email:string;
}
interface ForgotPasswordResponse {
  success: boolean;
  errorMessage: string;
  statusCode: string;
  forgotPasswordResp: any;
}
 
export async function forgotPassword({
    email,
}: ForgotPasswordProp): Promise<ForgotPasswordResponse> {
  let success: boolean = false;
  let errorMessage: string = '';
  let statusCode: string = '';
  let forgotPasswordResp: any;
 
  const forgotPasswordPayload = {
    email: email,
  };
 
  try {
    const forgotPasswordResponse = await instance.post(
      '/api/v1/authentication/forgotpassword',
      forgotPasswordPayload,
    );
    statusCode = forgotPasswordResponse.status.toString();
    {
      statusCode === '200' ? (success = true) : (success = false);
    }
    
    forgotPasswordResp = forgotPasswordResponse.data;
    console.log("forgotPasswordResponse resp",forgotPasswordResp);
 
  } catch (error: any) {
    console.log('Error while user creation in:', error);
    errorMessage = error.message;
  }
 
  return {success, statusCode, forgotPasswordResp, errorMessage};
};