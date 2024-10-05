import ListAssessment from "../../../../src/scoring/assessments/readability/ListAssessment";
import Paper from "../../../../src/values/Paper.js";

const listAssessment = new ListAssessment();

describe( "a test for an assessment that checks whether a paper contains a list or not", function() {
	it( "assesses when there are no lists", function() {
		const mockPaper = new Paper( "text with no list" );

		const assessment = listAssessment.getResult( mockPaper );

		expect( assessment.getScore() ).toEqual( 3 );
		expect( assessment.getText() ).toEqual( "<a href='https://yoa.st/shopify38' target='_blank'>Lists</a>: " +
			"No lists appear on this page. <a href='https://yoa.st/shopify39' target='_blank'>Add at least one ordered or unordered list</a>!" );
	} );
	it( "assesses when there is a list inside an element we want to exclude from the analysis", function() {
		const mockPaper = new Paper( "<blockquote>These are the most important things in life:\n" +
			"<ul>\n" +
			" \t<li>cats</li>\n" +
			" \t<li>kittens</li>\n" +
			"</ul>\n" +
			"</blockquote>" );

		const assessment = listAssessment.getResult( mockPaper );

		expect( assessment.getScore() ).toEqual( 3 );
		expect( assessment.getText() ).toEqual( "<a href='https://yoa.st/shopify38' target='_blank'>Lists</a>: " +
			"No lists appear on this page. <a href='https://yoa.st/shopify39' target='_blank'>Add at least one ordered or unordered list</a>!" );
	} );
	it( "assesses when there is an ordered list", function() {
		const mockPaper = new Paper( "text with a list <ol type=\"i\">\n" +
			"  <li>Coffee</li>\n" +
			"  <li>Tea</li>\n" +
			"  <li>Milk</li>\n" +
			"</ol>" );

		const assessment = listAssessment.getResult( mockPaper );

		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual( "<a href='https://yoa.st/shopify38' target='_blank'>Lists</a>: " +
			"There is at least one list on this page. Great!" );
	} );
	it( "assesses when there is an unordered list", function() {
		const mockPaper = new Paper( "This is a text with a list <ul style=\"list-style-type:disc\">\n" +
			"  <li>Coffee</li>\n" +
			"  <li>Tea</li>\n" +
			"  <li>Milk</li>\n" +
			"</ul> and more text after the list" );

		const assessment = listAssessment.getResult( mockPaper );

		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual( "<a href='https://yoa.st/shopify38' target='_blank'>Lists</a>: " +
			"There is at least one list on this page. Great!" );
	} );
} );

describe( "tests for the assessment applicability.", function() {
	it( "returns false when the paper is empty.", function() {
		const paper = new Paper( "" );
		expect( listAssessment.isApplicable( paper ) ).toBe( false );
	} );

	it( "returns true when the paper is not empty.", function() {
		const paper = new Paper( "sample keyword containing a minimum of fifty characters.", {
			slug: "sample-with-keyword",
			keyword: "kéyword",
		} );
		expect( listAssessment.isApplicable( paper ) ).toBe( true );
	} );

	it( "returns false if the text is too short", function() {
		const paper = new Paper( "hallo" );
		expect( listAssessment.isApplicable( paper ) ).toBe( false );
	} );
} );
