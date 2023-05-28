/** Source for email validation taken from ImmortalFirefly's answer:
 * https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
 * It was also used in a previous project by me this semester with YR.no API
 */

const contactContainer = document.querySelector(".contactContainer");

function getContactForm() {
  contactContainer.innerHTML = `
  <form class="contact-form-input" id="contactForm">
        <label for="firstName">Name  </label>
        <p id="nameError" class="errorMessage">Name must be more than 5 characters long</p>
        <input name="firstName" id="firstName" class="contact-input" />
        <label for="email"> Email  </label>
        <p id="emailError" class="errorMessage">Enter a valid e-mail address</p>
        <input name="email" id="email" class="contact-input" />
        <label for="">Subject  </label>
        <p id="subjectError" class="errorMessage">Subject must be more than 15 characters long</p>
        <input name="subject" id="subject" class="contact-input" />
        <label for="message">Message  </label>
        <p id="messageError" class="errorMessage">Message content must be more than 25 characters long</p>
        <textarea name="message" id="message" class="contact-input"></textarea>
        <br> <br> <br>
        <button type="submit" id="submit" value="Submit" disabled=true class="cta">Submit</button
</form>
`;
  let submitButton = document.getElementById("submit");

  document.getElementById("firstName").onchange = function () {
    checkName();
  };
  document.getElementById("email").onchange = function () {
    checkEmail();
  };
  document.getElementById("message").onchange = function () {
    checkMessage();
  };
  document.getElementById("subject").onchange = function () {
    checkSubject();
  };
  document.getElementById("contactForm").onchange = function () {
    submitButton.disabled = enableButton();
  };
}

function checkName() {
  let error = document.getElementById("nameError");
  if (firstName.value.length <= 5) {
    document.getElementById("nameError").style.display = "inline";
    document.getElementById("nameError").classList.add("error");
    error.innerHTML = "Name needs to be at least 5 characters!";
  } else {
    document.getElementById("nameError").style.display = "none";
  }
}

function validateEmail(input) {
  let testString = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return testString.test(input);
}

function checkEmail() {
  let error = document.getElementById("emailError");
  if (validateEmail(email.value) === false) {
    document.getElementById("emailError").style.display = "inline";
    document.getElementById("emailError").classList.add("error");
    error.innerHTML = "Must be a valid Email address!";
  } else {
    document.getElementById("emailError").style.display = "none";
  }
}

function checkSubject() {
  let error = document.getElementById("subjectError");
  if (subject.value.length <= 15) {
    document.getElementById("subjectError").style.display = "inline";
    document.getElementById("subjectError").classList.add("error");
    error.innerHTML = "Subject needs to be at least 15 characters!";
  } else {
    document.getElementById("subjectError").style.display = "none";
  }
}

function checkMessage() {
  let error = document.getElementById("messageError");
  if (message.value.length <= 25) {
    document.getElementById("messageError").style.display = "inline";
    document.getElementById("messageError").classList.add("error");
    error.innerHTML = "Message needs to be at least 25 characters!";
  } else {
    document.getElementById("messageError").style.display = "none";
  }
}

function enableButton() {
  if (
    firstName.value.length >= 5 &&
    subject.value.length >= 15 &&
    email.value.includes("@") === true &&
    message.value.length >= 25
  ) {
    return false;
  } else {
    return true;
  }
}

getContactForm();
