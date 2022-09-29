# Module3 Project Gamma

## 🚧 Project Template Todos 🚧

- [ ] ❗❗❗This section should be GONE by the time students see it ❗❗❗
- [x] `.gitignore`
- [x] `.gitlab-ci.yml`
- [ ] `README.md`
  - [ ] getting started instructions
    - [ ] end of week deliverables
      - domain model
      - page flow diagram
      - wire frames
      - repo is setup
      - Heroku account setup
      - deployed
    - [ ] project layout
    - [ ] how to do the initial deploy
- [x] `docker-compose.yml`
  - front-end
  - token/novel backend
- [x] gitlab ci file
  - build & deploy under-construction page to git-lab pages
  - build & deploy token backend

## 🚧 End of Project Template Todos 🚧
---

## Getting started

You have a project repository, now what? The next section lists all of the deliverable that are due at the end of the week. Below is some guidance for getting started on the tasks for this week.

## Week #13 deliverables

- [ ] Domain model
- [ ] Page flow diagram
- [ ] Wire-frame diagrams
- [ ] Gitlab project is setup
- [ ] Heroku account is setup
- [ ] The skeleton app is deployed to GitLab pages and Heroku

## Project layout

The layout of the project is just like all of the projects you did with `docker-compose` in module #2. You will create a directory in the root of the repository for each service that you add to your project just like those previous projects were setup.

There are two directories that have been added to the project that are for documentation specific to this group project. First, the `docs` directory is where you should put all of the design documents that are due at the end of week #13 as well as any other documentation that is generated over the course of the project. The second is the `journals` directory where each team member is required to keep a dev-journal. The dev-journal should be a single markdown file with an entry for each day the project was worked on?????

The following project files have created as a minimal starting point. Please follow the guidance for each one for a most successful project.

- `docker-compose.yaml`: there isn't much in here, just a **really** simple UI. Add services to this file as you did with previous projects in module #2.
- `.gitlab-ci.yml`: This is your "ci/cd" file where you will configure
  automated unit tests, code quality checks, and the building and deployment
  of your production system. Currently, all it does is deploy an
  "under construction" page to your production UI on GitLab. We will learn
  much more about this file
- `.gitignore`: don't keep track of things you don't need to like
  `node_modules`, `__pycache__`, etc.

## How to complete the initial deploy

- setup Heroku account and app
- setup CI/CD variables in GitLab
- push to main
