# SpotifyCalendar
This Calendar app was created using React using javascript.
The user can navigate between months but the YEAR is hardset to the current year.
The inputs are not sanitized and app will currently accest blank 'event' parameters.
It will also accept blank 'begin' and 'end' time parameters and automatically set them to zero, 
however anything larger than 24 will be rejected. 

The Backend works with Express and Nodejs using mysql. A WAMP local server was used to test that 
data passed to and from the backend.

The database used has no password. 
The login username : root.
there is no password, simply leave it blank.

The database is named 'users' and the table is named 'events'. The table consists of four 
columns labled [date, myEvent, begin, end].


