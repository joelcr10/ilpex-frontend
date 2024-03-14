import { DocumentPickerResponse } from 'react-native-document-picker';
import instance from '../../../network/api';
import Constants from '../../../utils/Constants';
import { getItem } from '../../../utils/utils';
import axios from 'axios';
 
interface CreateCourseResponse {
  success: boolean;
  errorMessage: string;
  statusCode: string;
  loginResp: any;
}
 
export async function createCourse(formData: FormData): Promise<CreateCourseResponse> {
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
    const url = '/api/v2/course';
    console.log("Form Data Is : ", formData);
    const createCourseResponse = await instance.post(url, formData, authorization);

    console.log(createCourseResponse);
    statusCode = createCourseResponse.status.toString();
    {
      statusCode === '200' ? (success = true) : (success = false);
    }

  } catch (error: any) {
    console.log('Errorr:', error);
    errorMessage = error.message;
  }
 
  return {success, statusCode, loginResp, errorMessage};
}