let email = document.getElementById("username");

let password = document.getElementById("password");

let loginButton = document.querySelector(".loginButton");

let myurl ="https://url-shortner-1.herokuapp.com"

let checkOnSubmit = async (e) => {
  try {
    e.preventDefault();
    email = document.getElementById("username");
    password = document.getElementById("password");

    let user = await fetch(`${myurl}/login`, {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log(user);

    let userJson = await user.json();
    
    let mytoken= localStorage.getItem('jwt-token')
    if(mytoken==userJson.token) {console.log("equal")}
    else{console.log("not equal")}
    if(mytoken!==userJson.token&&mytoken==null){
   localStorage.setItem('jwt-token', userJson.token);
    }
    else{
    if(userJson.token){
      localStorage.setItem('jwt-token', mytoken);
    }
  }

    if (userJson.message == "User Authenticated Successfully") {
      location.href = "../shorturl.html";
    } else {
      location.href = "../usernotfound.html";
    }
  } catch (err) {
    console.log(err);
  }
};

(function () {
  let form = document.querySelector("#loginForm");

  form.addEventListener("input", (e) => {
    if (email.value.length > 0 && password.value.length > 0) {
      loginButton.removeAttribute("disabled");
    } else {
      loginButton.setAttribute("disabled", "disabled");
    }
  });

  form.addEventListener("submit", checkOnSubmit);
  form.addEventListener("submit", function () {
    let loginButtonDiv = document.querySelector("#loginButtonDiv");

    loginButtonDiv.innerHTML = `<button class=" w-100 btn btn-outline-primary py-2" type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>`;
    form.reset();
  });
})();
