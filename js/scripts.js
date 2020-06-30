/***********
	
	COMMONS

***************/
const notificationPanel = "contact-notification-panel";

const alphaNumericPattern = /^[a-z0-9]+$/i;

let validateInput = (input) => {
	return alphaNumericPattern.test(input);
}

let clearApplicationSections = (inputType) =>{
	 switch(inputType){
	 	case 'first-name':
	 	$('#contact-first-name').html("");
	 	break;

	 	case 'last-name':
	 	$('#contact-last-name').html("");
	 	break;

	 	case 'whole-content':
	 	clearNotificationPanel();
	 	$('#contact-first-name').html("");
	 	$('#contact-last-name').html("");
	 	break;

	 	case 'contact-form':
		$("input#new-first-name").val("");
	  $("input#new-last-name").val("");
	 	break;
	 }
}

let displayNotification = (notificationPanel,alert,message) => {
	let notification ="<div class='alert "+alert+"' role='alert'>"+message+"</div>";
	$('#'+notificationPanel).html(notification);
}

let clearNotificationPanel = () => {
	$('#'+notificationPanel).html("");
}

let validateContactForm = (firstName,lastName) =>{
	if(!validateInput(firstName)){
		isValidForm=1001;
	}else if(!validateInput(lastName)){
		isValidForm=1002;
	}else{
		isValidForm=1000;
	}
	return isValidForm;
}

function Contact(first, last){
  this.firstName = first;
  this.lastName = last;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

/***********
	
	UI/UX 

***************/
$(document).ready( () => {

	$("form#new-contact").submit(function(event){
    event.preventDefault();
		clearApplicationSections('whole-content');
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    switch(validateContactForm(inputtedFirstName,inputtedLastName)){
    	case 1000:
	    var addContact = new Contact(inputtedFirstName, inputtedLastName);
	    alertType='alert-success';
    	message=addContact.fullName()+' added to your contact list';
	    $("ul#contacts").append("<li><span class='contact'>"+addContact.fullName()+"</span></li>");
		  $(".contact").last().click(function() {
			  $("#show-contact").show();
			  $("#show-contact h4").text(addContact.firstName);
			  $(".first-name").text(addContact.firstName);
			  $(".last-name").text(addContact.lastName);
			}); 
			clearApplicationSections('contact-form');
    	break;

    	case 1001:
    	alertType='alert-danger';
    	message='Please provide your first name';
    	$("#contact-first-name").text(message);
    	break;

    	case 1002:
    	alertType='alert-danger';
    	message='Please provide your last name';
    	$("#contact-last-name").text(message);
    	break;
    }
    displayNotification(notificationPanel,alertType,message);
  }); 

});