let email = document.getElementById("username");

 

let resetButton = document.querySelector(".resetButton");





let checkOnSubmit = async (e) => {
 try {
    e.preventDefault()
    email = document.getElementById("username");
   


         let user = await fetch("https://passwordreset-12.herokuapp.com/forget-password", {

             // Adding method type 
             method: "POST",

             // Adding body or contents to send 
             body: JSON.stringify({
                 email:email.value,
             }),
             

             // Adding headers to the request 
             headers: {
                 "Content-type": "application/json"
             }
         })
         console.log(user)

         let userJson = await user.json();
         
         if(userJson.message=="Email sent"){
        location.href="../emailmessage.html"
         }
         else{
            location.href="../emailfail.html"
         }
        
         

 }
 catch(err){
      console.log(err)    
 }
}

(function ()  {
	let form = document.querySelector("#forgetPasswordForm");

	form.addEventListener("input", (e) => {
		if (email.value.length > 0 ) {
			resetButton.removeAttribute("disabled");
		} else {
			resetButton.setAttribute("disabled", "disabled");
		}
	});

 form.addEventListener("submit", checkOnSubmit);
 form.addEventListener("submit", function(){

    let loginButtonDiv = document.querySelector("#resbutton");

    loginButtonDiv.innerHTML = `<button class=" w-100 btn btn-outline-primary py-2" type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>`;
  form.reset()
 })
 
 
})();

