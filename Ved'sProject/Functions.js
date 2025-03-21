
if (window.sessionStorage.getItem('SignUpMsg') == "true"){
   document.getElementById('SignUpSuccessMsg').innerHTML = "You have registered successfully! Please login to continue"
}

// Login Button
async function Login(){

    // reset loginSuccess and reset prior success/fail messages

    window.sessionStorage.getItem('loginSuccess') == "false"
    document.getElementById('SignUpSuccessMsg').innerHTML = ""
    document.getElementById("SignUpFailMsg").innerHTML = ""

    // set Username and Password and pass into URL as variables, then call API

    const Uname = document.getElementById("usernameL").value.trim()
    const Pass = document.getElementById("passwordL").value.trim()
    const apiUrl = 'https://veddentalprojectapi.innosol.co.uk/DentalData/UserLogin?Username='+Uname+'&Password='+Pass;
    document.getElementById("usernameL").value = ""
    document.getElementById("passwordL").value = ""

    // Fetch data from the API
    const response = await fetch(apiUrl);
    const apiData = await response.json();
    console.log("API Data:", apiData);
    if(apiData.success == true)
    {
        // valid user if return value is 1, set IsLoggedIn to 1 and reset loginSuccess before jumping to Dashboard Page
        if(apiData.data[0].status == 1){
            sessionStorage.setItem("IsLoggedIn",1)
            sessionStorage.setItem("loginSuccess", false)
            window.location.href = "./dashboard.html";
            
        }
        else{
            // Credentials not found in the database 
            document.getElementById('loginFailMsg').innerHTML = "Invalid Login. Please try again"
        }
    }
    else{

        // error from API retrieval
        document.getElementById('loginFailMsg').innerHTML = "Something went wrong. Please try again"
    }
}

// SignUp Button

async function SignUp() {

    // reset prior success/fail messages

    window.sessionStorage.setItem('SignUpMsg',"false")
    document.getElementById('SignUpSuccessMsg').innerHTML = ""
    document.getElementById("SignUpFailMsg").innerHTML = ""

    //trims username and password for empty space, and initialises error message

    const Uname = document.getElementById("usernameS").value.trim();
    const Pass = document.getElementById("passwordS").value.trim();
    const errorMsg = document.getElementById("SignUpFailMsg");

    // Clear previous messages
    errorMsg.innerHTML = "";

    // Validate input fields
    if (!Uname || !Pass) {
        errorMsg.innerHTML = "Please enter both a username and password";
        return; // Stop execution if fields are empty
    }
    
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

    
    if (Pass.length < 6) {
        errorMsg.innerHTML = "Password must be at least 6 characters long.";
        return;
    }
    
    // checks Pass against special character set
    if (!specialCharPattern.test(Pass)) {
        errorMsg.innerHTML = "Password must contain at least one special character.";
        return;
    }

    const apiUrl = `https://veddentalprojectapi.innosol.co.uk/DentalData/UserRegister?Username=${Uname}&Password=${Pass}`;
        // Fetch data from the API
        const response = await fetch(apiUrl);
        const apiData = await response.json();

        if (apiData.success === true) {
            window.location.href = "./index.html";
    // Clear inputs only if registration is successful, and triggers SignUpMsg to display
    document.getElementById("usernameS").value = "";
    document.getElementById("passwordS").value = "";
    window.sessionStorage.setItem('SignUpMsg',"true")
    
} else{
    if (apiData.data === 0) {
    console.log('100:',apiData)
    errorMsg.innerHTML = "User already Exists, try another one!";
    document.getElementById("usernameS").value = "";
    document.getElementById("passwordS").value = "";
        return; 
    }
    else if (apiData.data === -1) {
        console.log('100:',apiData)

        errorMsg.innerHTML = "Invalid Username format. Try again!";
        document.getElementById("usernameS").value = "";
        document.getElementById("passwordS").value = "";
        return; 
    } 
}
}
function SignUpRedirect() {
    window.location.href = "./sign-up.html";
}

function LoginRedirect() {
    window.location.href = "./index.html";
}
