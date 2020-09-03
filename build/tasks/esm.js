/**
 * Compiles sources from ES Modules in `src/` to an ESM bundle in `dist/jquery.mjs`.
 */

"use strict";

module.exports = function( grunt ) {
	const path = require( "path" );
	const rollup = require( "rollup" );
	const srcFolder = path.resolve( __dirname, "..", "..", "src" );
	const inputFileName = "jquery.js";

	const inputRollupOptions = {
		input: path.resolve( srcFolder, inputFileName )
	};

	const outputRollupOptions = {
		file: "dist/jquery.mjs",
		format: "esm",
		indent: false
	};

	grunt.registerTask(
		"esm",
		"Convert ES modules from `src/` to an ESM module in `dist/`",
		async function() {
			const done = this.async();

			try {
				const bundle = await rollup.rollup( inputRollupOptions );
				await bundle.write( outputRollupOptions );
				grunt.log.ok( "Sources from 'src' converted to ESM bundle in 'dist/jquery.mjs'." );
				done();
			} catch ( err ) {
				done( err );
			}
		} );
};
