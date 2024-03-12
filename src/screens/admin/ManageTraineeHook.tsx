import React from "react";
import { View,Text,StyleSheet } from "react-native";
import instance from '../../network/api'; 
interface ManageTraineeProp {
    user_id:number|null;
    status: number|null;
    JWT_token:string;
}
 
interface ManageTraineeResponse {
  success: boolean;
  errorMessage: string;
  statusCode: string;
  manageTraineeResp: any;
}
 
export async function UpdateTraineeStatus({
    user_id,
    status,
    JWT_token
}: ManageTraineeProp): Promise<ManageTraineeResponse> {
  let success: boolean = false;
  let errorMessage: string = '';
  let statusCode: string = '';
  let manageTraineeResp: any;
 
  const ManageTraineePayload = {
    user_id: user_id,
    status: status,
  };
 
  try {
    const manageTraineeResponse = await instance.patch(
      '/api/v2/trainee',
      ManageTraineePayload,{
        headers: {
          Authorization: `Bearer ${JWT_token}`, // Include the token in the Authorization header
        },
      }
    );
    statusCode = manageTraineeResponse.status.toString();
    {
      statusCode === '200' ? (success = true) : (success = false);
    }
    
    manageTraineeResp = manageTraineeResponse.data;

    console.log("manageTraineeResp", manageTraineeResp);
    console.log("statusCode", statusCode);
    

  } catch (error: any) {
    console.log('Error while user creation in:', error);
    errorMessage = error.message;
  }
 
  return {success, statusCode, manageTraineeResp, errorMessage};
}