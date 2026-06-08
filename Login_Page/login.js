const allowedUsers = [
            { name: "gogul", email: "gogul@gmail.com", password: "gogulanand" }
        ];
        const Students=[
            {}
        ]
        function checkLoginPage(event) {
            // Stops page reload
            event.preventDefault(); 
            
            let inputName = document.getElementById("loginname").value.trim();
            let inputEmail = document.getElementById("loginemail").value.trim().toLowerCase();
            let inputPassword = document.getElementById("loginpassword").value;
            
            // Search validation
            let accessGranted = allowedUsers.some(user => 
                user.name === inputName && 
                user.email.toLowerCase() === inputEmail && 
                user.password === inputPassword
            );
            
            if (accessGranted) {
                alert("Access Granted! Welcome to NVSC Login.");
            } else {
                alert("Access Denied: Invalid Name, Email, or Password.");
            }
        }
        function checkForgotPasswordPage(event){
              let inputEmail = document.getElementById("forgotemail").value.trim().toLowerCase();
           
            
           
            let accessGranted = allowedUsers.some(user => 
                user.email.toLowerCase() === inputEmail
            );
            
            if (accessGranted) {
                alert("Enter OTP");
                
            } else {
                alert("Access Denied: Invalid  Email.");
            }
                   
        }
        function checkOtpPage(event){
            event.preventDefault(); 
             const randomNumber = Math.floor(100000 + Math.random() * 900000);
          
            
            let inputEmail = document.getElementById("forgotemail").value.trim().toLowerCase();
           
             if (true) {
       showReset() 
    } else {
        alert("Enter correct OTP!");
        document.getElementById('otp').value = ""; 
    }

        }
        function checkSpelling() {
            correctName=document.getElementById("newpassword").value;
        const inputField = document.getElementById("repassword");
        const typedValue = inputField.value;

       
        if (correctName.startsWith(typedValue)) {
           
            inputField.style.borderColor = "#667eea";
            inputField.style.color = "#333";
        } else {
            inputField.style.borderColor = "red";
            inputField.style.color = "red";
        }
    }
        function hideAll(){
            document.getElementById("loginForm").style.display="none";
             document.getElementById("forgotForm").style.display="none";
              document.getElementById("otpForm").style.display="none";
               document.getElementById("resetForm").style.display="none";
        }
        function showForgot(){
            hideAll();
            document.getElementById("forgotForm").style.display="block";
        }
        function showOtp(){
            hideAll();
            document.getElementById("otpForm").style.display="block";
        }
        function showReset(){
          hideAll();
          document.getElementById("resetForm").style.display="block";
        }