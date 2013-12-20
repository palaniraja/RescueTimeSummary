RescueTimeSummary
=================

Google script to parse RescueTime weekly summary email for custom analysis


* Clone the [Spreadsheet](http://goo.gl/tz7zyH)
* Open Tools -> Script Editor 
* Replace _sheetId_ with your cloned spreadsheet id
* Run "collectSummaryEmails", after a while you should see data on your "mail" sheet
* If required, you may need to change #14 for no. of threads to parse
* Once you have data in "mail" sheet, run "splitdata" which will then produce the "summary" and "category" sheet with data from the email content.
