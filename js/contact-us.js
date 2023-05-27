const contactContainer = document.querySelector(".contactContainer");

function getContactForm() {
  contactContainer.innerHTML = `
  <form class="contact-form-input" id="contactForm">
        <label for="firstName">Name  </label>
        <input name="firstName" id="firstName" class="contact-input" />
        <label for="email"> Email  </label>
        <input name="email" id="email" class="contact-input" />
        <label for="">Subject  </label>
        <input name="subject" id="subject" class="contact-input" />
        <label for="message">Message  </label>
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
  if (firstName.value.length <= 5) {
    window.alert("Name needs to be at least 5 characters!");
  }
}

function checkEmail() {
  if (email.value.includes("@") === false) {
    window.alert("Must be a valid Email address!");
  }
}

function checkMessage() {
  if (message.value.length <= 25) {
    window.alert("Address needs to be at least 25 characters!");
  }
}

function checkSubject() {
  if (subject.value.length <= 15) {
    window.alert("Subject needs to be at least 10 characters!");
  }
}

function enableButton() {
  console.log(subject.value.length);
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
