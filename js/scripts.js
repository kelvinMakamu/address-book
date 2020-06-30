/***********
	
	COMMONS

***************/
const iconsDescriptionWrapper="delani-what-we-do";
const notificationPanel = "contact-notification-panel";

const portfolios= ['work1','work2','work3','work4','work5','work6','work7','work8'];
const alphaNumericPattern = /^[a-z0-9]+$/i;
const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let validateInput = (input) => {
	return alphaNumericPattern.test(input);
}

let clearContactFormErrors = (inputType) =>{
	 switch(inputType){

	 	case 'first-name':
		document.getElementById("contact-first-name").innerHTML="";
	 	break;

	 	case 'last-name':
		document.getElementById("contact-last-name").innerHTML="";
	 	break;

	 	case 'all':
		document.getElementById("contact-first-name").innerHTML="";
		document.getElementById("contact-last-name").innerHTML="";
	 	break;
	 }
}

let displayNotification = (notificationPanel,alert,message) => {
	let notification ="<div class='alert "+alert+"' role='alert'>"+message+"</div>";
	document.getElementById(notificationPanel).innerHTML+=notification;
}

let clearNotificationPanel = () => {
	document.getElementById(notificationPanel).innerHTML="";
}

let clearContactForm = () => {
	$("input#new-first-name").val("");
  $("input#new-last-name").val("");
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
		clearNotificationPanel();
    event.preventDefault();
		clearContactFormErrors('all');
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    if(!validateInput(inputtedFirstName)){
    	$("#contact-first-name").text("Please provide your first name");
    	displayNotification(notificationPanel,'alert-danger','Please provide your first name');
    }else if(!validateInput(inputtedLastName)){
    	$("#contact-last-name").text("Please provide your last name");
    	displayNotification(notificationPanel,'alert-danger','Please provide your last name');
    }else{
	    var addContact = new Contact(inputtedFirstName, inputtedLastName);
	    $("ul#contacts").append("<li><span class='contact'>"+addContact.fullName()+"</span></li>");
	    content=addContact.fullName()+' added to your contact list';
    	displayNotification(notificationPanel,'alert-success',content);
		  $(".contact").last().click(function() {
			  $("#show-contact").show();
			  $("#show-contact h4").text(addContact.firstName);
			  $(".first-name").text(addContact.firstName);
			  $(".last-name").text(addContact.lastName);
			}); 
	    clearContactForm();
    }
  }); 

});