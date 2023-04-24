2020 Nevada precinct and election results shapefile.

## RDH Date retrieval
06/30/2021

## Sources
Election results from Nevada Secretary of State (https://www.nvsos.gov/sos/elections/election-information/precinct-level-results)
Precinct shapefiles from the U.S. Census Bureau's 2020 Redistricting Data Program, except the following counties use shapefiles sourced from the respective county governments instead: Clark, Douglas, Elko, Humboldt, Lincoln, Lyon, Washoe. Precinct boundaries in Churchill, Eureka, Nye were aligned with county maps.

## Fields metadata

Vote Column Label Format
------------------------
Columns reporting votes follow a standard label pattern. One example is:
G20PRERTRU
The first character is G for a general election, C for recount results, P for a primary, S for a special, and R for a runoff.
Characters 2 and 3 are the year of the election.
Characters 4-6 represent the office type (see list below).
Character 7 represents the party of the candidate.
Characters 8-10 are the first three letters of the candidate's last name.

Office Codes
AGR - Agriculture Commissioner
ATG - Attorney General
AUD - Auditor
COC - Corporation Commissioner
COU - City Council Member
DEL - Delegate to the U.S. House
GOV - Governor
H## - U.S. House, where ## is the district number. AL: at large.
INS - Insurance Commissioner
LAB - Labor Commissioner
LTG - Lieutenant Governor
PRE - President
PSC - Public Service Commissioner
SAC - State Appeals Court (in AL: Civil Appeals)
SCC - State Court of Criminal Appeals
SOS - Secretary of State
SSC - State Supreme Court
SPI - Superintendent of Public Instruction
TRE - Treasurer
USS - U.S. Senate

Party Codes
D and R will always represent Democrat and Republican, respectively.
See the state-specific notes for the remaining codes used in a particular file; note that third-party candidates may appear on the ballot under different party labels in different states.

## Fields
G20PREDBID - Joseph R. Biden (Democratic Party)
G20PRERTRU - Donald J. Trump (Republican Party)
G20PRELJOR - Jo Jorgensen (Libertarian Party)
G20PREIBLA - Dan Blankenship (Independent American Party)
G20PREONON - None of These Candidates

## Processing Steps
President-only ballots were reported countywide for Carson City, Churchill, Clark, Douglas, Esmeralda, Eureka, Humboldt, Lander, Lyon, Nye, Washoe, White Pine. These were distributed by candidate to precincts based on the precinct-level reported vote.
