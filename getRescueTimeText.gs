    
    //Clone the Google spreadsheet -  http://goo.gl/tz7zyH
    //The speadsheet includes the following script. Goto Tools -> Script Editor to view the script.
    
    var sheetId = "<REPLACE THIS WITH YOUR SPREADSHEET ID>";
    var sheetName = "mail";


function collectSummaryEmails(){
  
  var sapp = SpreadsheetApp.openById(sheetId);
  var logsheet = sapp.getSheetByName(sheetName);
  
	var threads = GmailApp.search("subject:RescueTime Weekly Summary", 0, 100);

	for (var i=0; i<threads.length; i++) {
      var messages = GmailApp.getMessagesForThread(threads[i]);
      for (var j=0; j<messages.length; j++) {
        var email = messages[j];       
        //Logger.log('Subject: ' + email.getSubject() + ' Date: ' + email.getDate() + ' \n Plain text: \n'+ email.getPlainBody() + '\n HTML Body: \n' + email.getBody());
        
        logsheet.appendRow([''+email.getDate()+'', ''+email.getSubject()+'',''+email.getPlainBody()+'',''+email.getBody()+'']);
      }
    }
}


function splitdata(){
  var sapp = SpreadsheetApp.openById(sheetId);
  var logsheet = sapp.getSheetByName('mail');
  var summarysheet = sapp.getSheetByName('summary');
  var categorysheet = sapp.getSheetByName('category');
  
  var data = logsheet.getDataRange().getValues();
    var ptIndx = 2;

    for (row in data){
    	var ptext = data[row][ptIndx];
    	var records = ptext.match(/(.*)(\d)\w/gm);
        //Logger.log(records);
    	if (records.length > 2) {
    		var hrsLogged = records[0];
    		var productivityPer = records[1];
            var dateinq = data[row][4]
            summarysheet.appendRow([dateinq, hrsLogged, productivityPer]);
            var cats = [];

            cats.push(dateinq);
          
    		for(var cat=2;cat<records.length-2;cat++){
              if(!records[cat].match(/rescuetime/gi)){
                categorysheet.appendRow([dateinq, records[cat]]);
              }
    		}

    	}
    }
}
