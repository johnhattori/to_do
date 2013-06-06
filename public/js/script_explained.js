$(document).ready(function(){
  // Set global variables. These will be used all over the script.
  var checking = 1000;
  var saving = 2500;

  // Very simply, this is what I want the page to do:
  $("#c_deposit").on("click", checking_deposit);
  $("#c_withdraw").on("click", checking_withdraw);
  $("#s_deposit").on("click", saving_deposit);
  $("#s_withdraw").on("click", saving_withdraw);

  // ---------------------------------------------------------------

  // Now I built the functionality to achieve that:

  function checking_deposit(){
    var amount = get_amount("checking");
    // Notice above that I use "get_amount". This is a function that
    // I haven't defined yet. I will later though. And I'll use it
    // multiple times throughout the script.

    // Here I am using the same 'checking' variable I set at the top
    // of the script:
    checking += amount;

    // Once again, I'm using a function I will define later:
    update_balance(checking, "#checking");
  }

  // Works just like checking_deposit().
  function saving_deposit(){
    var amount = get_amount("saving");
    saving += amount;
    update_balance(saving, "#saving");
  }

  function saving_withdraw(){
    var amount = get_amount("saving");

    // If there is sufficient funds for the withdrawal:
    if(amount <= saving){
      saving -= amount;
      update_balance(saving, "#saving");
    }
  }

  function checking_withdraw(){
    var amount = get_amount("checking");

    // If there is sufficient funds for the withdrawal in checking:
    if(amount <= checking){
      checking -= amount;
    }
    // Or if there is sufficient funds in both checking and saving:
    else if(amount <= (checking + saving)){
      saving = (checking + saving) - amount;
      checking = 0;
    }

    update_balance(checking, "#checking");
    update_balance(saving, "#saving");
  }

  // --------------------------------------------------------------

  // Here are all the functions I use inside the above functions:

  // This function gets the amount the user inputted into the form.
  function get_amount(account){
    if (account == "checking"){
      var selector = "#c_amount";
    }
    else{
      var selector = "#s_amount";
    }

    return parseInt($(selector).val());
  }

  // This function updates the checking/saving amount shown. It also
  // updates the CSS - in case one of the accounts is at zero. It
  // also blanks out the form fields - to give a fresh start.
  function update_balance(amount, selector){
    $(selector).text("$" + amount);
    update_css(amount, selector);
    $("#c_amount").val("");
    $("#s_amount").val("");
  }

  // This function updates the element with CSS to reflect its zero
  // balance. (First I remove the "zero_balance" class. Then I add it
  // back if its new amount is zero.)
  function update_css(amount, selector){
    $(selector).removeClass("zero_balance");

    if (amount == 0){
      $(selector).addClass("zero_balance")
    }
  }

  // -----------------------------------------------------------------

  // Last thing - easy to forget: Catch the form submission events and
  // prevent them from submitting.
  $("form").on("submit", prevent_submission);

  function prevent_submission(event){
    event.preventDefault();
  }
});