const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: false,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: true,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		desc: `Print CLI version`
	},
	referenceFolderPath: {
		type: `string`,
		alias: `rf`,
		desc: `Path to the reference folder`,
		default: `./reference`
	},
	projectName: {
		type: `string`,
		alias: `p`,
		desc: `Project name`
	},
	projectVersion: {
		type: `string`,
		alias: `v`,
		desc: `version of the project`
	},
	finalFileName: {
		type: `string`,
		alias: `ff`,
		desc: `Final file name`,
		default: `readme.md`
	},
	baseReadmeFileName: {
		type: `string`,
		alias: `bf`,
		desc: `Base readme file name`,
		default: `readme_base.md`
	},
	projectPath: {
		type: `string`,
		alias: `pp`,
		desc: `Project path`,
        default: `./`
	},
	finalFilePath: {
		type: `string`,
		alias: `ffp`,
		desc: `Final file path`,
		default: `./`
	}

};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `readme-generator`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
