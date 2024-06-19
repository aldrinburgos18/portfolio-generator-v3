import inquirer from "inquirer";
import fs from "fs";
import generatePage from "./src/page-template.js";

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter your Github username:",
      validate: (githubInput) => {
        if (githubInput) {
          return true;
        } else {
          console.log("Please enter your Github username.");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message: "Would you like to enter some information about yourself for an 'About' section?",
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: ({ github }) => "Provide some information about yourself." + github,
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
    },
  ]);
};

const promptProject = (portfolioData) => {
  //if there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  console.log(`
        =================
        Add a New Project
        =================
        `);
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your project?",
        validate: (projectNameInput) => {
          if (projectNameInput) {
            return true;
          } else {
            console.log("Please enter your project's name.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "description",
        message: "Provide a description of the project: (Required)",
        validate: (descriptionInput) => {
          if (descriptionInput) {
            return true;
          } else {
            console.log("Please enter a short description about your project.");
            return false;
          }
        },
      },
      {
        type: "checkbox",
        name: "languages",
        message: "What did you build this project with? (Check all that apply)",
        choices: ["Javascript", "HTML", "CSS", "ES6", "jQuery", "Bootstrap", "Node"],
        validate: (languagesInput) => {
          if (languagesInput) {
            return true;
          } else {
            console.log("Please select atleast one of the following options:");
            return false;
          }
        },
      },
      {
        name: "input",
        type: "link",
        message: "Enter the Github link to your project. (Required)",
        validate: (linkInput) => {
          if (linkInput) {
            return true;
          } else {
            console.log("Please enter the Github link to your project.");
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "feature",
        message: "Would you like to feature this project?",
        default: false,
      },
      {
        type: "confirm",
        name: "confirmAddProject",
        message: "Would you like to enter another project?",
        default: false,
      },
    ])
    .then((projectData) => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

// promptUser()
//   .then(promptProject)
//   .then((portfolioData) => {
//     const pageHTML = generatePage(portfolioData);
//     fs.writeFile("./index.html", pageHTML, (err) => {
//       if (err) throw err;

//       console.log("Page created! Check out index.html in this directorry to see it!");
//     });
//   });

const mockData = {
  name: "Aldrin Burgos",
  github: "aldrinburgos18",
  confirmAbout: true,
  about:
    "Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.",
  projects: [
    {
      name: "Run Buddy",
      description:
        "Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.",
      languages: ["HTML", "CSS"],
      link: "https://github.com/aldrinburgos18/run-buddy",
      feature: true,
      confirmAddProject: true,
    },
    {
      name: "Taskinator",
      description:
        "Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.",
      languages: ["JavaScript", "HTML", "CSS"],
      link: "https://github.com/aldrinburgos18/taskinator",
      feature: true,
      confirmAddProject: true,
    },
    {
      name: "Taskmaster Pro",
      description:
        "Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.",
      languages: ["JavaScript", "jQuery", "CSS", "HTML", "Bootstrap"],
      link: "https://github.com/aldrinburgos18/taskmaster-pro",
      feature: false,
      confirmAddProject: true,
    },
    {
      name: "Robot Gladiators",
      description:
        "Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.",
      languages: ["JavaScript"],
      link: "https://github.com/aldrinburgos18/robot-gladiators",
      feature: false,
      confirmAddProject: false,
    },
  ],
};

const pageHTML = generatePage(mockData);
fs.writeFile("./index.html", pageHTML, (err) => {
  if (err) throw err;

  console.log("Page created! Check out index.html in this directorry to see it!");
});
