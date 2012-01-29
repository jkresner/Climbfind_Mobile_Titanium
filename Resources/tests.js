//-- KNOWN ISSUES
/* - After commenting on thread [From main feed] & clicking back => feed not up to date...
 * - After commenting on thread [From profile feed] & clicking back => profile feed not up to date...
 * - On android there is no way to refresh feed (iphone has pull refresh)
 */

//----- Manual Test

/*-- [1] first time user curious
 *  - Sign up with facebook leave USA selected
 *  - Select San Francisco
 *  - Go to profile (with no personal feed + confirm US flag)
 * 	- Click options -> Edit pic, message (should be blank)
 *  - Choose BE, toggle SV, toggle SF
 *  - Click on first JSK post
 *  - Make comment
 *  - Send message
 *  - Make another comment
 *  - Drill into section
 *  - view a climb
 *  - go back to section
 *  - view another climb
 *  - go back to section
 *  - view another climb
 *  - Log climb (Default:Redpoint,Neutral,Notsure,No opinion)
 * 		=> View help
 * 		=> Try without stars 
 * 		=> Confirm climb detail screen updates (logs + rating image + rating count)
 *  - Open logbook (should be updated)
 *  - View climb
 *  - go back
 *  - edit log
 *  - go back
 *  - delete log
 */


/*-- [2] first time user engaged
 *  1) Sign up with facebook select england (confim english flag)
 *  2) Select SF
 *  3) Scan code
 *  4) Log climb [1]  (Default:Attempt,Painful,Easy,No opinion)
 *  5) Scan code
 *  6) Quick log climb [2]
 *  7) Scan code
 *  8) Log climb [3]  (Default:Breaks,Scary,Spot On,Opinion)
 *  9) View logbook
 *  10) Click quick log => Log climb  (Default:Flash,Cruisey,Hard,Testing!!&&)
 *  11) Confirm logbook order is [1]/[2]/[3]
 *  12) Drill into section
 *  13) Open climb
 *  14) Click log row & go through to profile
 *  15) Message user (JSK)
 *  16) Go back => Log climb (Default:Onsight,Fun,Spot on,Testing $$)         ***** PROBLEM ON IPHONE CLIMB DETAIL DIDN'T UPDATE
 *  17) Open logbook
 */

/*-- [3] Existing user FB login (not at the gym)
 * 0) Logout & close app
 * 1) Login with facebook
 * 2) Post a partner call 
 * 		- Try without date 
 * 		- Try without comment
 * 3) Open feed => view a profile
 * 4) Click through on a post => Make a comment 
 * 5) Open logbook
 * 6) Click through to a climb
 * 7) Click through log to another profile
 * 8) Click through to message
 * 9) Hit back without sending message
 */

/*-- [4] Existing user CF login (quick logs session)
 * 0) Logout & close app
 * 1) Login with cf
 * 2) Open section browse a few climbs
 * 3) Choose top rated climb [1]
 * 4) Quick log
 * 5) Quick log again => select no
 * 6) Quick log again => select yes
 * 7) Choose 4 more climbs [2],[3],[4],[5]
 * 8) Go to logbook log [2],[3],[4],[5] out of order => confirm session order [1],[2],[3],[4],[5] 
 */

/*-- [5] Alerts when application is close
 * 1) Comment
 * 2) Message
 */

/*-- [6] Alerts when application is open
 * 1) Comment
 * 2) Message
 */