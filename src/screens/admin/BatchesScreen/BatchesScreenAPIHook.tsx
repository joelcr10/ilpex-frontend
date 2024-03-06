import api from "../../../network/api";

interface ContentResponse {
    success : boolean;
    statusCode : string;
    contentResp : any;
    errorMessage : string;
}

const batchesAPI = async(url : string) : Promise<ContentResponse> =>{
    let success : boolean = false;
    let statusCode : string = '';
    let errorMessage : string = '';
    let contentResp : any[] = [];
    try {
        const contentResponse = await api.get(url);
        statusCode = contentResponse.status.toString();
        {
            statusCode ==='200' ? (success = true) : (success = false);
        }
        contentResp = contentResponse.data;
        console.log(contentResp)
        console.log(`Response for url ${url} is ${contentResp}`);
    } catch(error : any) {
        console.log('Error while fetching the trainee assessment api : ', error);
        errorMessage = error.message;
    }

    return {success,statusCode,contentResp, errorMessage};
}

export default batchesAPI;