import instance from './api';
 
interface CreateUserProp {
    createEmail:string;
    createUserName: string;
    createPassword: string;
    JWT_token:string;
}
 
interface CreateUserResponse {
  success: boolean;
  errorMessage: string;
  statusCode: string;
  createUserResp: any;
}
 
export async function createUser({
    createEmail,
    createUserName,
    createPassword,
    JWT_token
}: CreateUserProp): Promise<CreateUserResponse> {
  let success: boolean = false;
  let errorMessage: string = '';
  let statusCode: string = '';
  let createUserResp: any;
 
  const createUserPayload = {
    email: createEmail,
    password: createPassword,
    user_name:createUserName,
    role_id:102,
  };
 
  try {
    const createUserResponse = await instance.post(
      '/api/v2/admin/registration',
      createUserPayload,
      {
        headers: {
          Authorization: `Bearer ${JWT_token}`, // Include the token in the Authorization header
        },
      }
    );
    statusCode = createUserResponse.status.toString();
    {
      statusCode === '200' ? (success = true) : (success = false);
    }
    
    createUserResp = createUserResponse.data;
    console.log("createUserResp resp",createUserResp);
 


  } catch (error: any) {
    console.log('Error while user creation in:', error);
    errorMessage = error.message;
  }
 
  return {success, statusCode, createUserResp, errorMessage};
}