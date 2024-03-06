import instance from '../../network/api';
import {useNavigation} from '@react-navigation/native';
 
interface LogInUserProp {
    loginEmail: string;
  loginPassword: string;
}
 
interface LoginUserResponse {
  success: boolean;
  errorMessage: string;
  statusCode: string;
  loginResp: any;
}
 
export async function loginUser({
    loginEmail,
  loginPassword,
}: LogInUserProp): Promise<LoginUserResponse> {
  let success: boolean = false;
  let errorMessage: string = '';
  let statusCode: string = '';
  let loginResp: any;
 
  const logInPayload = {
    email: loginEmail,
    password: loginPassword,
  };
 
  try {
    const logInResponse = await instance.post(
      '/api/v1/authentication/login',
      logInPayload,
    );
    statusCode = logInResponse.status.toString();
    {
      statusCode === '200' ? (success = true) : (success = false);
    }
    
    loginResp = logInResponse.data;
    console.log(loginResp.id);
 
    // if (statusCode === '200') setStringItem(Constants.IS_LOGIN, 'true');


  } catch (error: any) {
    console.log('Error while logging in:', error);
    errorMessage = error.message;
  }
 
  return {success, statusCode, loginResp, errorMessage};
}