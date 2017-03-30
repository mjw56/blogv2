'use strict';

const babel = require("rollup-plugin-babel");
import typescript from 'rollup-plugin-typescript';
const commonjs = require("rollup-plugin-commonjs");
const uglify = require("rollup-plugin-uglify");
const nodeResolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');

module.exports = {
    format: 'umd',
    moduleId: 'Inferno',
    moduleName: 'Inferno',
    entry: "./index.tsx",
    dest: 'public/bundle.js',
    plugins: [
    	replace({
    	    'process.env.NODE_ENV': JSON.stringify( 'development' ),
            'process.env.REDACTED_GITHUB_CLIENT_ID': JSON.stringify( `${process.env.REDACTED_GITHUB_CLIENT_ID}` )
    	}),
        typescript({
            typescript: require('typescript'), // BYOT (bring your own typescript)
            jsx: 'Preserve', // we need the custom JSX parser for inferno
            exclude: "node_modules/**"
        }),
        // do a once over to finish up JSX
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
