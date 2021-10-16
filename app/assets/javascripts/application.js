/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll();

  $("[name='select-account']").change(function () {
    $(".account-type").prop("disabled", false);
  })

  $('#navigation li:last').addClass("welcomemenu");
  $('#navigation li:last').click(() => {
    let length = $(this).find(".submenu").length;
    if (length == 0) {
      var newDiv = $('<div class="submenu dropdown-content"><a href="/landing">Logout</a></div>');
      $('#navigation li:last').append(newDiv);
      $(this).find(".submenu").show();
    } else {
      $(this).find(".submenu").toggle();
    }
  })


  $("[name='personal-account-type']").change(function () {

    $(".prsl-acct-type").prop("disabled", false);
  })

  $("[name='initial-payment']").change(function () {

    if (this.value === "auto-topup") {

      $("#auto-topup-options").css("display", "block");
      $("#manual-topup-option").css("display", "none");

    } else if (this.value === "manual-topup") {

      $("#auto-topup-options").css("display", "none");
      $("#manual-topup-option").css("display", "block");

    }

  })


  $.fn.redirectPage = (uri) => {
    window.location.href = `/${uri}`;
  }
  
  $.fn.slideToTop = () => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  $.fn.goBack = () => {
    window.history.back();
  }

  $(".redirectLanding").click(function () {
    $.fn.redirectPage('landing');
  });

  $(".create-acct").click(function () {
    $.fn.redirectPage('create-account');
  });

  $(".send-code").click(function () {
    $.fn.redirectPage('create-account/check-code');
  });

  $(".email-verification").click(function () {
    $.fn.redirectPage('create-account/verification-confirmation');
  });

  $(".confirm-verification").click(function () {
    $.fn.redirectPage('create-account/step-2/select-account');
  });

  $(".account-type").click(function () {
    let accoutTypeVal = $("[name='select-account']:checked").val();
    if (accoutTypeVal === 'perosnal-account') {
      $.fn.redirectPage('create-account/step-2/personal-account-type');
    }

  });

  $(".prsl-acct-type").click(function () {
    let personalAccountType = $("[name='personal-account-type']:checked").val();
     
    if (personalAccountType === 'pre-pay') {
      url = 'pre-pay/prerequisites';
      $.fn.redirectPage(`create-account/step-2/${url}`);
    }
    // if (personalAccountType === 'payg') {
    //   url = 'payg/prerequisites';
    //   $.fn.redirectPage(`create-account/step-2/${url}`);
    // }


  });

  $(".prereq").click(function () {
    $.fn.redirectPage('create-account/step-2/pre-pay/user-info');
  });

  $(".user-info").click(function () {
    $.fn.redirectPage('create-account/step-2/pre-pay/initial-payment');
  });

  $(".initial-payment-next").click(function () {
    $.fn.redirectPage('create-account/step-2/pre-pay/done');
  });

  $(".payg-prereq").click(function () {
    $.fn.redirectPage('create-account/step-2/payg/done');
  });

  $(".redirectStep3").click(function () {
    $.fn.redirectPage('create-account/step-3/vehicle-register');
  });

  $(".vehicle_register").click(function () {
    $.fn.redirectPage('create-account/step-3/vehicle-register');
  });

  $(".vehicle_details").click(function () {
    $.fn.redirectPage('create-account/step-3/vehicle-details');
  });

  $(".add_vehicle").click(function () {
    $.fn.redirectPage('create-account/step-3/step-3-done');
  });

  $(".payments").click(function () {
    $.fn.redirectPage('create-account/step-4/payments');
  });
 
  $(".confrim-payment").click(function () {
    $.fn.redirectPage('create-account/step-4/confirm-payment');
  });

  $(".payment_done").click(function () {
    $.fn.redirectPage('create-account/step-4/step-4-done');
  });

  $(".govuk-back-link").click(function () {
    $.fn.goBack();
  });

  $("#login-btn").click(function () {
    $.fn.redirectPage('login');
  });

  $(".todashboard").click(function () {
    $.fn.redirectPage('dashboard');
  });

  $("[name='selectlink']").change(() => {
    $(".landingNxtBtn").prop("disabled", false);
  })

  $(".landingNxtBtn").click(() => {
    let radioVal = $("[name='selectlink']:checked").val();

    if (radioVal === 'pcn') {

      document.location.href = "https://dartford-crossing-charge.herokuapp.com/demo/flow1";

    } else if (radioVal === 'create-account') {

      $.fn.redirectPage('create-account');

    }else if(radioVal === 'make-oneoff-payment') {

      $.fn.redirectPage('one-off-payment');

    }

  });


  $("#login-submit").on("submit", function (e) {
    e.preventDefault();
    console.log("working");
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (username == "" || username == null) {
      document.getElementById("user-name-error").innerHTML = "Username is required";
    }
    if (password == "" || password == null) {
      document.getElementById("password-error").innerHTML = "Password is required";
    }
  });


})

// One Off Payment

$(".pay-for-crossings").click(function () {
  let makePayment = $("[name='crossingsPayment']:checked").val();
  if (makePayment === 'yes') {
    $.fn.redirectPage('one-off-payment/find-vehicle');
  }
});

$("[name='vrm']").click(() => {
  $("[name='vrm']").val('LO62 NRO');
})

$(".find-vehicle").click(() => {
  let inputVal = $("[name='vrm']").val();
  if(inputVal === 'LO62 NRO') {
    $.fn.redirectPage('one-off-payment/vehicle-details');
  }else {
    $("#vrm-error").css("display", "block");
    $("#vrm").parent().addClass("govuk-form-group--error");
    $("#vrm").addClass("govuk-input--error");
    $(".error-summary").css("display", "block");
    $.fn.slideToTop();
  }
})

$("[name='email']").click(() => {
  $("[name='email']").val('johndoe@gmail.com');
  $("[name='confirm-email']").val('johndoe@gmail.com');
})

$(".proceed-to-pay").click(() => {
  let inputVal = $("[name='email']").val();
  if(inputVal === 'johndoe@gmail.com') {
   alert('redirect');
  }else {
    $(".email-error").css("display", "block");
    $(".email-address").parent().addClass("govuk-form-group--error");
    $(".email-address").addClass("govuk-input--error");
    $(".error-summary").css("display", "block");
    $.fn.slideToTop();
  }
})
