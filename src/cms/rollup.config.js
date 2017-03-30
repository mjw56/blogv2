'use strict';

const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const uglify = require("rollup-plugin-uglify");
const nodeResolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');

module.exports = {
    format: 'umd',
    moduleId: 'Inferno',
    moduleName: 'Inferno',
    entry: "./index.js",
    dest: 'public/bundle.js',
    plugins: [
    	replace({
    	    'process.env.NODE_ENV': JSON.stringify( 'development' ),
            'process.env.REDACTED_GITHUB_CLIENT_ID': JSON.stringify( `${process.env.REDACTED_GITHUB_CLIENT_ID}` )
    	}),
        babel({
            presets: ['es2015-rollup'],
            plugins: ['inferno'],
            exclude: "node_modules/**"
        }),
        commonjs({
            include: 'node_modules/**',
        }),
    	nodeResolve({
    	    module: true,
        }),
        uglify()
    ]
};
