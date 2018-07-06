# SpotifyCalendar
This Calendar app was created using React using javascript.
The user can navigate between months but the YEAR is hardset to the current year.
The inputs are not sanitized and app will currently accest blank 'event' parameters.
It will also accept blacnk 'begin' and 'end' time parameters and automatically set them to zero, 
however anything larger than 24 will be rejected. 

The Backend works with Express and Nodejs using mysql. A WAMP local server was used to test that 
data passed to and from the backend.

