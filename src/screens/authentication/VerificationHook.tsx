import instance from '../../network/api';
 
interface VerificationProp {
    email:string;
    enteredOtp:string;
}
 
interface VerificationResponse {
  success: boolean;
  errorMessage: string;
  statusCode: string;
  verificationResp: any;
}
 
export async function verification({
    email,enteredOtp,
}: VerificationProp): Promise<VerificationResponse> {
  let success: boolean = false;
  let errorMessage: string = '';
  let statusCode: string = '';
  let verificationResp: any;
 
  const verificationPayload = {
    email: email,
    enteredOtp:enteredOtp,
  };
 
  try {
    const verificationResponse = await instance.post(
      '/api/v1/authentication/verification',
      verificationPayload,
    );
    statusCode = verificationResponse.status.toString();
    {
      statusCode === '200' ? (success = true) : (success = false);
    }
    
    verificationResp = verificationResponse.data;
    console.log("verificationResp resp",verificationResp);
 


  } catch (error: any) {
    console.log('Error while user creation in:', error);
    errorMessage = error.message;
  }
 
  return {success, statusCode, verificationResp, errorMessage};
}