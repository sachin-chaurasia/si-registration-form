"use client";

import { useForm, Controller } from "react-hook-form";
import { useRef, useState } from "react";
import jsPDF from "jspdf";
import '../styles/globals.css';





export default function Home() {
  const pdfRef = useRef();
  const [studentId, setStudentId] = useState(1); 
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const [isPreview, setPreview] = useState(false);
  const [formData, setFormData] = useState(null);

  

  

  function submitHandler(data) {
    setPreview(true);
    setFormData(data);
   
    
  }

  function handleConfirm() {
    setStudentId((prevStudentId) => prevStudentId + 1);
    downloadPDF();
    
    // fetch api request
    fetch("/api/sheet", {
      method: "POST",
      
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
   

    reset({ mobileNumber: "" });

    // Reset the form and preview state
    reset();
    setPreview(false);
    setFormData(null);
  }

  function handleEdit() {
    setPreview(false);
  }
  
  
  const downloadPDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4', true);
    
    // Set margins manually by adjusting the positioning
    const margin = 10;
    const borderWidth = 1;
  
    // Draw border
    pdf.setLineWidth(borderWidth);
    pdf.rect(
      margin,  // Left margin
      margin,  // Top margin
      pdf.internal.pageSize.getWidth() - 2 * margin,  // Width
      pdf.internal.pageSize.getHeight() - 2 * margin,  // Height
    );
  
    // Load Montserrat font
    pdf.addFont('Montserrat.ttf', 'Montserrat', 'Bold');
    pdf.setFont('Montserrat');
  
    const baseFontSize = 16; // Base font size for most text
    const largerFontSize = 24; // Larger font size for "Students Name:"
  
    // Set base font size
    pdf.setFontSize(baseFontSize);
  
    
  
    // Arrange text
    const textX = 20 // Adjust starting X-coordinate
    const textY = 50 // Adjust starting Y-coordinate

    // Text options
    const textOptions = {
      align: 'left', // Change to 'center' or 'right' if needed
    };

    // Add a logo
  const logoImg = new Image();
  logoImg.src = '/platform-logo.png'; // Replace with the actual path to your logo image
  pdf.addImage(logoImg, 'PNG', margin+3, margin+3, 30, 30); // Adjust the position and size as needed
   // Add a logo
   const logoImg1 = new Image();
   logoImg1.src = '/toa-logo.png'; // Replace with the actual path to your logo image
   pdf.addImage(logoImg1, 'PNG', 165, margin+5, 30, 20); // Adjust the position and size as needed

   // Set base font size
   pdf.setFontSize(20)
   // Reset color for Static Data
   pdf.setTextColor("#0A0708");
   pdf.text(`The Platform Coaching`, 72, 20, textOptions);
   pdf.setTextColor("#F28C28");
   pdf.text(`(A Unit Of The Officer's Academy)`, 55, 30, textOptions);
  
  
    
    
    // Change to your preferred color
    pdf.setTextColor('#FF0000');
    // Customize the style for each line of text
    pdf.setFontSize(largerFontSize); 
    // Set larger font size for "Batch Name"
    pdf.text(`Bihar Daroga Selection Batch`, 57, textY, textOptions);
    
    // Reset font size for other lines
    pdf.setFontSize(baseFontSize); 

   

    // Reset font for other lines
    // Load Lato font
    pdf.addFont('Poppins.ttf', 'Poppins', 'Bold');
    pdf.setFont('Poppins');

    // Reset color for Static Data
    pdf.setTextColor("#0A0708");
    pdf.text(`Students ID`, textX, textY+12, textOptions);
    pdf.text(`:`, textX+45, textY+12, textOptions);
    // Reset color for Var Data
    pdf.setTextColor("#444444");
    pdf.text(`${studentId}`, textX+50, textY+12, textOptions);

     // Reset color for Static Data
     pdf.setTextColor("#0A0708");
    pdf.text(`Students Name`, textX, textY+19, textOptions);
    pdf.text(`:`, textX+45, textY+19, textOptions);
    // Reset color for Var Data
    pdf.setTextColor("#444444");
    pdf.text(`${formData.First_Name}`, textX+50, textY+19, textOptions);

     // Reset color for Static Data
     pdf.setTextColor("#0A0708");
    pdf.text(`Aadhaar Card`, textX, textY + 26, textOptions);
    pdf.text(`:`, textX+45, textY + 26, textOptions);
    // Reset color for Var Data
    pdf.setTextColor("#444444");
    pdf.text(`${formData.Last_Name}`, textX+50, textY + 26, textOptions);

     // Reset color for Static Data
     pdf.setTextColor("#0A0708");
    pdf.text(`Father's Name`, textX, textY + 33, textOptions);
    pdf.text(`:`, textX+45, textY + 33, textOptions);
    // Reset color for Var Data
    pdf.setTextColor("#444444");
    pdf.text(`${formData.Father_Name}`, textX+50, textY + 33, textOptions);

     // Reset color for Static Data
     pdf.setTextColor("#0A0708");
    pdf.text(`Mobile Number`, textX, textY + 40 , textOptions);
    pdf.text(`:`, textX+45, textY + 40 , textOptions);
    // Reset color for Var Data
    pdf.setTextColor("#444444");
    pdf.text(`${formData.mobileNumber}`, textX+50, textY + 40 , textOptions);

     // Reset color for Static Data
     pdf.setTextColor("#0A0708");
    pdf.text(`Address`, textX, textY + 47 , textOptions);
    pdf.text(`:`, textX+45, textY + 47 , textOptions);
    // Reset color for Var Data
    pdf.setTextColor("#444444");
    pdf.text(`${formData.Address}`, textX+50, textY + 47 , textOptions);

     // Reset color for Static Data
     pdf.setTextColor("#0A0708");
    pdf.text(`Roll Number`, textX, textY + 54, textOptions);
    pdf.text(`:`, textX+45, textY + 54, textOptions);
    // Reset color for Var Data
    pdf.setTextColor("#444444");
    pdf.text(`${formData.Enrollment_no}`, textX+50, textY + 54, textOptions);

    // Reset color for Static Data
    pdf.setTextColor("#0A0708");
    // Set font style
  
    pdf.addFont('Poppins.ttf', 'Poppins', 'Italic');
    pdf.setFont("Poppins")
    pdf.setFontSize(14);
    pdf.setTextColor("#FF0000");
    pdf.text(`Important Notice :-`, textX-2, textY + 70, textOptions); 
    pdf.setFontSize(12);
    pdf.setTextColor("#0A0708"); 
    pdf.text(`1 ) The batch will start from December 7, 2023. `, textX-3, textY+80, textOptions);
    pdf.text(`2 ) This batch will run exclusively at the offline center.`, textX-3, textY + 85, textOptions);
    pdf.text(`    (The Platform Coaching, East of Mussallahpur Hatt, Shahganj). `, textX-3, textY + 90, textOptions);
    pdf.text(`3 ) Entry will not be allowed without the ID card.`, textX-3, textY + 95, textOptions);    
    pdf.text(`4 ) This batch is only for students appearing for the Bihar Daroga exam.`, textX-3, textY + 100, textOptions);


  
    // Add vertical line just below the logo
  const lineX1 = 47; // Adjust the X-coordinate based on your content
  const lineY1 = margin + 28; // Adjust the Y-coordinate based on your content
  const lineY2 = pdf.internal.pageSize.getHeight() - margin;

  // Vertical line
  //  // Set the width of the line
  // pdf.line(lineX1, lineY1, lineX1, lineY2);

  // Horizontal line below the logo
  pdf.setLineWidth(0.5);
  const lineX2 = pdf.internal.pageSize.getWidth() - margin;
  pdf.line(margin, lineY1, lineX2, lineY1);

    // Save PDF
    pdf.save('identityCard.pdf');
  };
  
  
  
   
  
  
  

  return (
    <main className="max-w-2xl mx-auto mt-8 p-4 flex flex-col">
    <h1 className="text-2xl text-center font-bold mb-6 underline">Bihar Daroga Selection Batch Registration Form</h1>
      {!isPreview ? (
        
        <form
          onSubmit={handleSubmit(submitHandler)}
          autoComplete="on"
          className="flex flex-col flex-grow"
        ><div >
          <div className="space-y-4 flex-grow">
            <label className="block mb-2">
              Name:
              <input
                type="text"
                placeholder="Enter Name"
                {...register("First_Name", {
                  required: "Please enter the Name",
                })}
                className="block w-full p-2 border border-gray-300 rounded text-black"
              />
              {errors.First_Name && (
                <p className="text-red-500">{errors.First_Name.message}</p>
              )}
            </label>

            

            <label className="block mb-2">
              Father's Name:
              <input
                type="text"
                placeholder="Father's Name"
                {...register("Father_Name", {
                  required: "Please enter the Father's Name",
                })}
                className="block w-full p-2 border border-gray-300 rounded text-black"
              />
              {errors.Father_Name && (
                <p className="text-red-500">{errors.Father_Name.message}</p>
              )}
            </label>

            <label className="block mb-2">
              Adhaar Card Number:
              <input
                type="text"
                placeholder="Aadhaar Card Number"
                {...register("Last_Name", {
                  pattern: {
                    value: /^[0-9]+$/, // Regular expression to only allow numbers
                    message: "Invalid Aadhaar Number, please enter valid Aadhaar number.",
                  },
                  required: "Please enter the 12 Digit Aadhaar Number",
                })}
                className="block w-full p-2 border border-gray-300 rounded text-black"
              />
              {errors.Last_Name && (
                <p className="text-red-500">{errors.Last_Name.message}</p>
              )}
            </label>

            <label className="block mb-2">
              Mobile Number:
              <Controller
                name="mobileNumber"
                control={control}
                rules={{
                  required: "Please enter the Mobile Number",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid mobile number, enter valid number",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Enter Mobile Number"
                    className="block w-full p-2 border border-gray-300 rounded text-black"
                  />
                )}
              />
              {errors.mobileNumber && (
                <p className="text-red-500">{errors.mobileNumber.message}</p>
              )}
            </label>

            <label className="block mb-2">
              Address:
              <input
                type="text"
                placeholder="Enter District Name Only"
                {...register("Address", {
                  required: "Please enter the Address",
                })}
                className="block w-full p-2 border border-gray-300 rounded text-black"
              />
              {errors.Address && (
                <p className="text-red-500">{errors.Address.message}</p>
              )}
            </label>

            <label className="block mb-2">
              Bihar SI Admit Card Roll Number:
              <input
                type="text"
                placeholder="Enter Bihar SI Roll Number"
                {...register("Enrollment_no", {
                  required: "Please enter the Roll Number",
                  pattern: {
                    value: /^[0-9]+$/, // Regular expression to only allow numbers
                    message: "Invalid Roll Number, please enter valid roll number.",
                  },
                })}
                className="block w-full p-2 border border-gray-300 rounded text-black"
              />
              {errors.Enrollment_no && (
                <p className="text-red-500">{errors.Enrollment_no.message}</p>
              )}
            </label>
            </div>
          </div>

          <button className="block w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">
            Preview Form
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-2">Form Preview</h2>
          {/* Display preview of form data */}
          {formData && (
            <div ref={pdfRef}>
              <p className="text-black"><span >Students Name:</span> {formData.First_Name}</p>
              <p className=" text-black" >Aadhaar Number : {formData.Last_Name}</p>
              <p>Father's Name: {formData.Father_Name}</p>
              <p>Mobile Number: {formData.mobileNumber}</p>
              <p>Address: {formData.Address}</p>
              <p>Bihar SI Roll Number: {formData.Enrollment_no}</p>
            </div>
          )}
          <button
            onClick={handleEdit}
            className="block w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit Form
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="block w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Confirm and Submit
          </button>
          
          
        </div>
      )}
      
    </main>
  );
}
