$(document).ready(() => {
  updateRandomColors();
  fetchProjects();
});

const baseUrl = 'https://b3-fetch-intro-server.herokuapp.com';

//Requests
const fetchProjects = () => {
  // fetch all projects
  // once we have them, for each one, we need to call appendProject and fetchPalettes

};

const fetchPalettes = (projectId) => {
  // fetch all pallettes, api/v1/projects/:id/palettes,
  // once we have them, call appendPalettes

};








// const postPayload = (body) => {
//   return {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)
//   };
// };

const postProject = () => {
  let newProjectName = $('#new-project').val();

  // post the new project name
  // once we've successfully posted,
    // $('.project-directory').html('');
    // $('#project-menu').html(`<option selected>Select a Project</option>`);
    // fetchProjects();


  $('#new-project').val('');
};

const grabPalette = (event) => {
  event.preventDefault();
  const paletteTitle = $('#new-palette').val();
  const color_1 = $('.hex-code1').text();
  const color_2 = $('.hex-code2').text();
  const color_3 = $('.hex-code3').text();
  const color_4 = $('.hex-code4').text();
  const color_5 = $('.hex-code5').text();
  const projectId = $('#project-menu option:selected').val();

  $('#new-palette').val('');

  const body = {
    palette_title: paletteTitle,
    color_1,
    color_2,
    color_3,
    color_4,
    color_5,
    project_id: projectId,
  };

  postPalette(body);
};

const postPalette = (body) => {
  // post a palette to a project api/v1/projects/:id/palette
  // once post is successful,
    // $(`#project-${body.project_id}`).html('');
    // fetchPalettes(body.project_id);

};









const deleteSmallPalette = (event) => {
  event.preventDefault();
  $(event.target).closest('li').remove();

  const id = $(event.target).closest('li').attr('id');

  //delete the palette api/v1/palettes/:id
};

const deleteProject = (event) => {
  event.preventDefault();
  $(event.target).closest('aside').remove();

  const id = $(event.target).closest('aside').attr('id');

  //delete the project api/v1/projects/:id
};


//other functionality
const updateRandomColors = () => {
  for (var i = 0; i < 6; i++) {

    if (!$(`.color${i}`).hasClass('favorited')) {
      let color = generateColors();
      $(`.color${i}`).css('background-color', color);
      $(`.hex-code${i}`).text(color);
    }
  }
};

const generateColors = () => {
  const characters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += characters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const toggleFavorite = (event) => {
  $(event.target).toggleClass('full-heart-icon');
  $(event.target).parents('.color').toggleClass('favorited');
};


const checkDuplicateName = () => {
  const projectName = $('#new-project').val();

  fetch(`https://b3-fetch-intro-server.herokuapp.com/api/v1/projects/`)
    .then((response) => response.json())
    .then((projects) => {
      const match = projects.find(project => projectName === project.name);
      if (!match) {
        postProject(projectName);
      } else {
        alert(`${projectName} already exists -
              please enter a unique project name!`);
      }
    });
};


//DOM Manipulation
const appendProject = (project, projectId) => {
  $('.project-directory').prepend(`
    <aside class="saved-project" id="${projectId}">
      <div class="project-header">
        <h4 class=${projectId}>${project.project_name}</h4>
        <button class="delete-project">delete</button>
      </div>
      <ul class="project-list" id="project-${projectId}">
      </ul>
    </aside>
  `);
  addProjectToList(project.project_name, projectId);
};

const addProjectToList = (projectName, projectId) => {
  $('#project-menu').prepend(`
    <option
      value="${projectId}"
      id="${projectName}">
      ${projectName}
    </option>
  `);
};

const appendPalettes = (palettes, projectId) => {
  return palettes.forEach(palette => {
    /*eslint-disable max-len*/
    $(`#project-${projectId}`).append(`
      <li
        id="${palette.id}"
        class="small-pallete-data"
        data-colors='${JSON.stringify([palette.color_1, palette.color_2, palette.color_3, palette.color_4, palette.color_5] )}'>
        <p class="small-palette-name">${palette.palette_title}</p>
        <div class="small-palette">
          <div
            class="palette-color list-color-1"
            style="background-color: ${palette.color_1}">
          </div>
          <div
            class="palette-color list-color-2"
            style="background-color: ${palette.color_2}">
          </div>
          <div
            class="palette-color list-color-3"
            style="background-color: ${palette.color_3}">
          </div>
          <div
            class="palette-color list-color-4"
            style="background-color: ${palette.color_4}">
          </div>
          <div
            class="palette-color list-color-5"
            style="background-color: ${palette.color_5}">
          </div>
        </div>
        <div class="delete-icon"></div>
      </li>
      `);
  });
};

//Event Listeners
$('#new-project-btn').on('click', checkDuplicateName);
$('.generate-btn').on('click', updateRandomColors);
$('#new-palette-btn').on('click', grabPalette);
$('.icon').on('click', toggleFavorite);
$('.project-directory').on('click', '.delete-icon', deleteSmallPalette);
$('.project-directory').on('click', '.delete-project', deleteProject);
