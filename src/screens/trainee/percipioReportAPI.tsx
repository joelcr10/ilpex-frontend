import api from "../../network/api";
import Constants from "../../utils/Constants";
import { getItem } from "../../utils/utils";


type responseType = {message: string}

interface Response{
    success: boolean;
    errorMessage: string;
    statusCode: string;
    responseData: responseType;
}


export async function percipioReportAPI(user_id: number): Promise<Response>{
    let success: boolean = false;
    let errorMessage: string = '';
    let statusCode: string = '';
    let responseData: any;


    const payload = {
        user_id: user_id
    }


    const token = await getItem(Constants.TOKEN);

    const authorization =  {
        headers: {
          'Authorization': 'Bearer' + token
        }
    }

    try{
        const response = await api.post(
            `/api/v3/percipio`,
            payload,
            authorization
        );
        

        statusCode = response.status.toString();
        {
            statusCode === '200' ? (success = true) : (success = false);
        }

        responseData = response.data;


    }catch(error: any){
        console.log('Error while fetching percipio report in:', error);

        errorMessage = error.message;
    }

    return {success, statusCode, responseData, errorMessage};
}

