const db = require("../models");
const User = db.user;
const excel = require("exceljs");


exports.getExcelFile = async (req, res) => {

    try{

        const users = await User.findAll()
       
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet("Users");
        
        worksheet.columns = [   
                { header: "Id", key: "id", width: 5 },
                { header: "username", key: "username", width: 25 },
                { header: "email", key: "email", width: 25 },
                { header: "phone", key: "phone", width: 20 },
                { header: "userRole", key: "userRole", width: 10 },
                { header: "password", key: "password", width: 20 },
            ];
        
        // Add Array Rows
        users.forEach(user => {
            worksheet.addRow(user); 
        });
        
        
        const data = await workbook.xlsx.writeFile('users.xlsx').then(function () {
          res.status(200).json('YOUR EXCELSHEET IS CREATED SUCCESSFULLY');
        });
      
    }catch(err){
        res.status(500).json(err)
    }
}











