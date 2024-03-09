import { useSelector } from "react-redux";
import Constants from "../../utils/Constants";
import { getItem } from "../../utils/utils";
import api from "../api";

interface Response{
    success: boolean;
    errorMessage: string;
    statusCode: string;
    responseData: any;
}


export async function getHook(api_url: string): Promise<Response>{
    let success: boolean = false;
    let errorMessage: string = '';
    let statusCode: string = '';
    let responseData: any;

    // const token = await getItem(Constants.TOKEN);

    console.log("[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]");    
    // const token = useSelector((state: any) => state.userDetailsReducer.token);
    const token = await getItem(Constants.TOKEN);

    console.log("--------------:"+token+":-------------------------");

    const authorization =  {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }

    try{
        const response = await api.get(
            api_url, authorization
        );
        
        statusCode = response.status.toString();
        {
            statusCode === '200' ? (success = true) : (success = false);
        }

        responseData = response.data;

        console.log("assessment testing",responseData);


    }catch(error: any){
        console.log('Error in getHook:', error);

        errorMessage = error.message;
    }

    return {success, statusCode, responseData, errorMessage};
}

