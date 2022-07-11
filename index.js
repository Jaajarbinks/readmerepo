const fs = require('fs')

const inquirer = require('inquirer');

const Choice = require('inquirer/lib/objects/choice');

const Choices = require('inquirer/lib/objects/choices');



function renderLicenseBadge(license) {
    const badge = {
        MIT: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
        ISC: '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)',
        GNUGPLv3: '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
    }
    return badge[license]
};

function renderLicenseLink(license) {
    const licenseLink = {
        ISC: '[![License: ISC]](https://opensource.org/licenses/ISC)',
        MIT: '[![License: MIT]](https://opensource.org/licenses/MIT)',
        GNUGPLv3: '[![License: GPL v3]](https://www.gnu.org/licenses/gpl-3.0)'
    }
    return licenseLink[license]
};

function renderLicenseSection(license) {
    if (license) {
        return `Licensed under the ${renderLicenseLink(license)} license`
    }else {
        return ''
    }
};

function generateMarkdown(answers) {
return `# ${answers.title}

${renderLicenseBadge(answers.license)}

## Table Of Contents

* [Description](#Description)
* [Installed](#Installed)
* [Usage](#Usage)
* [contributing](#Contributing)
* [Tests](#Tests)
* [Questions](#Questions)
* [License](#License)
    
## Description

${answers.description}

## Installed

${answers.installed}
    
## Usage

* [picture]()
* [video]()
    
## Contributing

${answers.contributing}

## Tests

${answers.tests}

## Questions

* Email: [${answers.email}](example@example.com)
* Github: [${answers.github}](https://github.com/username)
     
## License

${renderLicenseSection(answers.license)}
    
`;
}

module.exports = generateMarkdown,



inquirer.prompt([
    {
        name: 'title',
        type: 'input',
        message: 'What is your title?'
    },    
    {
        name: 'description',
        message: 'why are you making this readme?',
        type: 'input'
    },
    {
        name: 'installed',
        type: 'input',
        message: 'what installs did you use?'
    },
    {
        name: 'contributing',
        type: 'input',
        message: 'contributed'
    },
    {
        name: 'tests',
        type: 'input',
        message: 'how are you testing this?'
    },
    {
        name: 'email',
        type: 'input',
        message: 'for questions(email)?'
    },
    {
        name: 'github',
        type: 'input',
        message: 'for questions(github)?'
    },
    {
        type: 'list',
        name: 'license',
        message: 'license',
        choices: ['MIT', 'ISC', 'GNUGLv3'] 
        
    }
]).then(answers => {
    const generatedMarkdown = generateMarkdown(answers)
    fs.writeFile('README.md', generatedMarkdown, (err)=> {
        if(err){
            console.log(err)
        } else{
            console.log('success!')
        }
    })
})