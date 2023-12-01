import {google} from "googleapis"

async function handler(req,res){
    if(req.method === 'POST'){
        const {First_Name,Last_Name,Father_Name,mobileNumber,Address,Enrollment_no} = req.body

        console.log(First_Name,Last_Name,Father_Name,mobileNumber,Address,Enrollment_no)

        const auth = new google.auth.GoogleAuth({credentials:{
            client_email:process.env.CLIENT_EMAIL,
            client_id:process.env.CLIENT_ID,
            private_key:process.env.PRIVATE_KEY

        },
    scopes:[
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets'
    ]})

    const sheets = google.sheets({
        auth,
        version:'v4'
    })

    const response = await sheets.spreadsheets.values.append({
        spreadsheetId:'1cayauFxyZRTgB1gKbUlZIEl8KqIgal61Kc6t4SmF6XY',
        range:'Sheet1!A2:G', 
        valueInputOption:'USER_ENTERED',
        requestBody:{
            values:[[First_Name,Last_Name,Father_Name,mobileNumber,Address,Enrollment_no]]
        }
    });

    res.status(201).json({message:"data is recived."});
    
    }
    res.status(200).json({message:"Sucessfull"});

}

export default handler;