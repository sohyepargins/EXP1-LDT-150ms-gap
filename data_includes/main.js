// This is a simple demo script, feel free to edit or delete it
// Find a tutorial and the list of availalbe elements at:
// https://www.pcibex.net/documentation/

PennController.ResetPrefix(null) // Shorten command names (keep this line here)

// Show the 'intro' trial first, then all the 'experiment' trials in a random order
// then send the results and finally show the trial labeled 'bye'
Sequence( "intro", randomize("experiment") , SendResults() , "bye" )


// What is in Header happens at the beginning of every single trial
Header(
    // We will use this global Var element later to store the participant's name
    newVar("ParticipantName")
        .global()
    ,
    // Delay of 250ms before every trial
    newTimer(250)
        .start()
        .wait()
)
.log( "Name" , getVar("ParticipantName") )
// This log command adds a column reporting the participant's name to every line saved to the results


newTrial( "intro" ,
    newImage("pcibex-logo.png")
        .size( 150 , 200 )      // Resize the image to 150x250px
        .print()
    ,
    newText("<p>Welcome to the PCIbex demo experiment.</p><p>Please enter your name below and press Enter:</p>")
        .print()
    ,
    newTextInput()
        .print()
        .wait()                 // The next command won't be executed until Enter is pressed
        .setVar( "ParticipantName" )
        // This setVar command stores the value from the TextInput element into the Var element
)


// This Template command generates as many trials as there are rows in myTable.csv
Template( "myTable.csv" ,
    // Row will iteratively point to every row in myTable.csv
    row => newTrial( "experiment" ,
        // The trials are minimal: choose a pronoun from a DropDown list
        newDropDown("pronoun", "...")
            .before( newText(row.Sentence) )    // Print the sentence to the left of the list
            .add( row.Pronoun1 )
            .add( row.Pronoun2 )
            .shuffle()                          // Randomly order the options in the list (Pronoun1 and Pronoun2)
            .once()                             // Disable the list after the first selection
            .print()
            .wait()
            .log()                              // Make sure to log the participant's selection
        ,
        newButton("Next")
            .print()
            .wait()
    )
    .log( "Sentence" , row.Sentence )
    .log( "Pronoun1" , row.Pronoun1 )
    .log( "Pronoun2" , row.Pronoun2 )
    // Add these three columns to the results lines of these Template-based trials
)


// Spaces and linebreaks don't matter to the script: we've only been using them for the sake of readability
newTrial( "bye" ,
    newText("Thank you for your participation!").print(),
    newButton().wait()  // Wait for a click on a non-displayed button = wait here forever
)
.setOption( "countsForProgressBar" , false )
// Make sure the progress bar is full upon reaching this last (non-)trial
