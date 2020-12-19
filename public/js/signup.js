$(document).ready(function () {
  // Getting references to our form and input
  let signUpBtn = $("#signup-btn");
  let emailInput = $("#email-input");
  let passwordInput = $("#password-input");
  let usernameInput = $("#username-input");
  let phoneInput = $("#phone-input");
  // When the signup button is clicked, we validate the email and password are not blank
  signUpBtn.on("click", function (event) {
    event.preventDefault();
    let userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      username: usernameInput.val().trim(),
      phoneNumber: phoneInput.val().trim(),
    };
    console.log(userData);

    if (!userData.email || !userData.password || !userData.username) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.password,
      userData.username,
      userData.phoneNumber
    );
    emailInput.val("");
    passwordInput.val("");
    usernameInput.val("");
    phoneInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, username, phone) {
    $.post("/api/signup", {
      email: email,
      password: password,
      username: username,
      phoneNumber: phone,
    })
      .then(function (data) {
        window.location.replace("/home");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
