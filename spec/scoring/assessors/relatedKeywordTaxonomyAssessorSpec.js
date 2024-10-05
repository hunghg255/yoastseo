import EnglishResearcher from "../../../src/languageProcessing/languages/en/Researcher.js";
import Assessor from "../../../src/scoring/assessors/relatedKeywordTaxonomyAssessor.js";
import Paper from "../../../src/values/Paper.js";
import { checkAssessmentAvailability } from "../../specHelpers/scoring/relatedKeyphraseAssessorTests.js";

const mockPaper = new Paper( "" );
const assessor = new Assessor( new EnglishResearcher( mockPaper ) );

describe( "running assessments in the assessor", function() {
	checkAssessmentAvailability( assessor );
} );
