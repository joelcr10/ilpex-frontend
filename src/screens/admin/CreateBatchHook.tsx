import { DocumentPickerResponse } from 'react-native-document-picker';
import instance from '../../network/api';
import Constants from '../../utils/Constants';
import { getItem } from '../../utils/utils';
import axios from 'axios';
 
// interface formData {
//     user_id: string;
//     batchName: string;
//     startDate: Date;
//     endDate : Date;
//     file: DocumentPickerResponse; 
// }
 
interface CreateBatchResponse {
  success: boolean;
  errorMessage: string;
  statusCode: string;
  loginResp: any;
}
 
export async function createBatch(formData: FormData): Promise<CreateBatchResponse> {
  let success: boolean = false;
  let errorMessage: string = '';
  let statusCode: string = '';
  let loginResp: any;
 
  console.log("Form Data : ", formData);
  try {
    
    const token = await getItem(Constants.TOKEN);
    const authorization =  {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        }
    }
    const url = '/api/v2/batch';
    console.log("Form Data Is : ", formData);
    // const createBatchResponse = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'Authorization': 'Bearer ' + token
    // },
    // body: formData,
    // });

    const createBatchResponse = await instance.post(url, formData, authorization);

    console.log(createBatchResponse);
    statusCode = createBatchResponse.status.toString();
    {
      statusCode === '200' ? (success = true) : (success = false);
    }

  } catch (error: any) {
    console.log('Errorr:', error);
    errorMessage = error.message;
  }
 
  return {success, statusCode, loginResp, errorMessage};
}