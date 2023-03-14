#!/usr/bin/env node

/**
 * readme-generator
 * generates readme for stencil projects
 *
 * @author nurjs <https://github.com/nurjs/readme-generator>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const fs = require('fs');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);

	writeNewReadme(flags);
})();
function readme(flags) {
	var reference = fs.readFileSync(
		`${flags.referenceFolderPath}/readme.md`,
		'utf-8'
	);

	var data = fs.readFileSync(
		`${flags.projectPath}/${flags.baseReadmeFileName}`,
		'utf8'
	);
	data = data.replace(reference, '');
	data = `# ${flags.projectName} - ${flags.projectVersion}\n` + data;
	fs.writeFileSync('./readme.md', data);
}
function componentReadme() {
	var referenceTop = fs.readFileSync(
		`${flags.referenceFolderPath}/generated_readmeTop.md`,
		'utf-8'
	);
	var referenceBottom = fs.readFileSync(
		`${flags.referenceFolderPath}/generated_readmeBottom.md`,
		'utf-8'
	);

	var data = fs.readFileSync(
		`${flags.projectPath}/src/components/${
			fs.readdirSync(`${flags.projectPath}/src/components`)[0]
		}/readme.md`,
		'utf8'
	);
	data = data.replace(referenceTop, '').replace(referenceBottom, '');
	var array = [];
	data.split(/\r?\n/).forEach(line => {
		array.push(line);
	});
	return array;
}

function writeNewReadme(flags) {
	readme(flags);
	const allFileContents = fs.readFileSync('./readme.md', 'utf-8');
	var dataArray = [];
	allFileContents.split(/\r?\n/).forEach(async line => {
		dataArray.push(line);
	});
	dataArray.push(...componentReadme());
	if (!fs.existsSync(flags.finalFilePath)) {
		fs.mkdirSync(flags.finalFilePath);
	}
	fs.writeFileSync(
		`${flags.finalFilePath}/${flags.finalFileName}`,
		dataArray.join('\n')
	);
	log('readme generated');
}
