"use strict";

const sameWithPassword = (val, { password }) => {
  if (val !== password) {
    throw "Should same with password";
  }
};
$(document).ready(() => {
  onFormSubmit({
    formId: "signup",
    validators: ({ required }) => ({
      username: [required],
      oldPassword: [required],
      password: [required],
      repeatedPassword: [required, sameWithPassword],
    }),
    onSubmit: (data) => {
      $.ajax({
        url: "/api/user",
        method: "put",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: (resp) => {
          $("#submitButton").after(`
            <div class="alert alert-success mt-5 form-result" role="alert">
              You have signed up successfully
            </div>
        `);
          setTimeout(() => {
            window.location.replace("/login");
          });
        },
      }).fail(function (xhr) {
        console.log(xhr);
        $("#submitButton").after(`
            <div class="alert alert-danger mt-5 form-result" role="alert">
              Username has been used.
            </div>
        `);
      });
    },
  });
});
