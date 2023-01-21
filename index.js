const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program.name("quotes").description("CLI tool for inspiration").version("0.1.0");
program
	.command("getQuote")
	.description("Retrieves a random quote")
	.action(async () => {
		try {
			const data = await fs.readFile(QUOTE_FILE, { encoding: "utf8" });

			/*
			#1. This passes the automated tests but doesn't produce the correct result.
			Splitting the array on the pipe takes the author from the previous quote
			ex. Bjarne Stroustrup
				To understand recursion, you must first understand recursion.

				This quote is attributed to anonymous.

			Also curious is that the test only passes if quoteArray and randomQuote
			are logged to the console. If only randomQuote is logged then the test fails.

			const quoteArray = data.split("|");
			const randomNumber = Math.floor(Math.random() * quoteArray.length);
			const randomQuote = quoteArray[randomNumber];

			console.log(quoteArray);
			console.log(randomQuote);
			*/

			/*
			#2. Splitting on the new line character creates an array where each
			index contains the quote and correct author separated by the pipe
			and the same result is returned when getting a quote from the array using
			randomNumber. This test fails even though the quote with the author is returned.
			
			const quoteArray = data.split("\n");
			const randomNumber = Math.floor(Math.random() * quoteArray.length);
			const randomQuote = quoteArray[randomNumber];
			
			console.log(randomQuote);
			*/

			/*
			#3. Same method as #2 splitting the data on \n. This time
			split the random selected quote on the pipe to get author and 
			quote independent of each other. Test also fails with author and quote
			being returned. 

			const quoteArray = data.split("\n");
			const randomNumber = Math.floor(Math.random() * quoteArray.length);
			const randomQuote = quoteArray[randomNumber].split("|");
			const quote = randomQuote[0];
			const author = randomQuote[1];
			
			console.log(quote);
			console.log(author);
			*/
		} catch (err) {
			console.log(err);
		}
	});

program
	.command("addQuote <quote> [author]")
	.description("adds a quote to the quote file")
	.action(async (quote, author) => {
		try {
			if (typeof author === "undefined") {
				author = "Anonymous";
			}
			const newQuote = `${quote}|${author}`;
			await fs.appendFile(QUOTE_FILE, newQuote);
			console.log(`Successfully written to file`);
		} catch (err) {
			console.log(err);
		}
	});

program.parse();
