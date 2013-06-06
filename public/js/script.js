$(document).ready(function(){
  var checking = 1000;
  var saving = 2500;

  $("#c_deposit").click(checking_deposit);
  $("#c_withdraw").click(checking_withdraw);
  $("#s_deposit").click(saving_deposit);
  $("#s_withdraw").click(saving_withdraw);

  function checking_deposit(){
    var amount = get_amount("checking");
    checking += amount;
    update_balance(checking, "#checking");
  }

  function saving_deposit(){
    var amount = get_amount("saving");
    saving += amount;
    update_balance(saving, "#saving");
  }

  function saving_withdraw(){
    var amount = get_amount("saving");

    if (amount <= saving){
      saving -= amount;
      update_balance(saving, "#saving");
    }
  }

  function checking_withdraw(){
    var amount = get_amount("checking");

    if (amount <= checking){
      checking -= amount;
    }
    else if (amount <= (checking + saving)){
      saving = (checking + saving) - amount;
      checking = 0;
    }

    update_balance(checking, "#checking");
    update_balance(saving, "#saving");
  }

  function get_amount(account){
    if (account == "checking"){
      var selector = "#c_amount";
    }
    else{
      var selector = "#s_amount";
    }

    return parseInt($(selector).val());
  }

  function update_balance(amount, selector){
    $(selector).text("$" + amount);
    update_css(amount, selector);
    $("#c_amount").val("");
    $("#s_amount").val("");
  }

  function update_css(amount, selector){
    $(selector).removeClass("zero_balance");

    if(amount == 0){
      $(selector).addClass("zero_balance");
    }
  }

  $("form").on("submit", dont_submit);

  function dont_submit(event){
    event.preventDefault();
  }
});


















