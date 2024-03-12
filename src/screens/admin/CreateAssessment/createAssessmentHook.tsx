import { useSelector } from "react-redux";
import api from "../../../network/api";
import Constants from "../../../utils/Constants";
import { getItem } from "../../../utils/utils";


type responseType = {message: string}

interface Response{
    success: boolean;
    errorMessage: string;
    statusCode: string;
    responseData: any;
}


export async function createAssessmentAPI(formData: FormData): Promise<Response> {
    let success: boolean = false;
    let errorMessage: string = '';
    let statusCode: string = '';
    let responseData: any;

    console.log("Form Data Inside Hook : ", formData);
try{

    const token = await getItem(Constants.TOKEN);

    console.log("--------------:"+token+":-------------------------");

    const authorization =  {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        }
    }
    const url = '/api/v2/assessment';
    console.log("Form Data Is : ", formData);

        const createAssessmentResponse = await api.post(url,formData,authorization);
        
            console.log(createAssessmentResponse);
        statusCode = createAssessmentResponse.status.toString();
        {
            statusCode === '200'|| '201' ? (success = true) : (success = false);
        }

        responseData = createAssessmentResponse.data;


    }catch(error: any){
        console.log('Error while creating assessment', error);

        errorMessage = error.response.data.error;
    }

    return {success, statusCode, responseData, errorMessage};
}

