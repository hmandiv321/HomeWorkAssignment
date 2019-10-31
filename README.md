# How to  use the application
# click this: http://www.filterphonenumber.com.s3-website.us-east-2.amazonaws.com
OR
First, download the zip file and extract. Next open the index.html file in either edge or chrome browser to run the application. 

No internet connection is required to run the app.

# HomeWorkAssignment

The goal is, to take phone numbers as input, and apply a list of rules, then returns the resulting list after the rules are applied.

For example, Given the list of ["555-0123", "214-5425", "706-4253"] and the rule "Does not start with 555", it returns  ["214-5425", "706-4253"]

The Inputs checks that it looks like a phone number, so not empty, no letters, 7 digits long, and does not contain a "-".

The Rules dropdown has just two options, "Does not start with" and "Does not end with" which takes 3 and 4 number values respectively, and one is be able to add multiple rules.

When the user clicks "Filter List" the results list contains the output, and there are no duplicate numbers listed.
