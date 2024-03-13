import api from "../../../network/api";
import Constants from "../../../utils/Constants";
import { getItem } from "../../../utils/utils";

type responseType = {message: string}

interface Response{
    success: boolean;
    errorMessage: string;
    statusCode: string;
    responseData: responseType;
}
const UpdateAssessmentAPIHook=async(batch_id : number,assessment_name : string,user_id : string | null,start_date : Date | undefined,end_date : Date) : Promise<Response>=>{
    let success: boolean = false;
    let errorMessage: string = '';
    let statusCode: string = '';
    let responseData: any;
    
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
    
        const payload = {
            batch_id: batch_id,
            assessment_name: assessment_name,
            user_id: user_id,
            start_date : start_date,
            end_date : end_date
        }
    
    
            const updateAssessmentResponse = await api.patch(url,payload,authorization);
            
                console.log(updateAssessmentResponse);
            statusCode = updateAssessmentResponse.status.toString();
            {
                statusCode === '200' ? (success = true) : (success = false);
            }
    
            responseData = updateAssessmentResponse.data;
    
    
        }catch(error: any){
            console.log('Error while updating assessment', error);
    
            errorMessage = error.message;
        }
    
        return {success, statusCode, responseData, errorMessage};
    }
    
export default UpdateAssessmentAPIHook;