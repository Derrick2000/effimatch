<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">EffiMatch</h3>
  <br/>

<img src="https://i.loli.net/2021/09/02/8FOoK6SsDyZV2a1.png" >
  <br/>

  <p align="center">
    A platform to connect referrers and job-seekers.
    <br />
    <a href="https://effimatch.ucsdtriplec.cn">View Demo</a>
    ·
    <a href="https://www.figma.com/file/1lfjwrjZ6SMgCcB9oge1rQ/Referral-Project?node-id=132%3A0">View Design</a>
    ·
    <a href="https://github.com/ucsdtriplec/effimatch/issues">Report Bug</a>
    ·
    <a href="https://github.com/ucsdtriplec/effimatch/issues">Request Feature</a>
  </p>

  <br/>
  <p>frontend build: </p>
  <a href='https://effimatch-jenkins.ucsdtriplec.cn/job/effimatch-frontend/'><img src='https://effimatch-jenkins.ucsdtriplec.cn/buildStatus/icon?job=effimatch-frontend'></a>
  <p>backend build: </p>
  <a href='https://effimatch-jenkins.ucsdtriplec.cn/job/effimatch-backend/'><img src='https://effimatch-jenkins.ucsdtriplec.cn/buildStatus/icon?job=effimatch-backend'></a>  

</p>

  Note that we are only making our frontend open-source due to security reasons. If you want the access to our backend code, please [contact](#contact) the tech lead.



<!-- TABLE OF CONTENTS -->
## Table of Contents

- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Maintainence](#maintainence)
  - [Manage Member Information](#manage-member-information)
  - [Update Timeline](#update-timeline)
  - [Update Project Readmes](#update-project-readmes)
  - [Update Department Readmes](#update-department-readmes)
  - [Sync Newletters](#sync-newletters)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


<!-- ABOUT THE PROJECT -->
## About The Project

EffiMatch is a platform to facilitate job referring process for both job-seekers and referrals.  

The users of our platform can log in as either referrer or job-seeker, and they can switch role whenever they want to.  

Referrers are full-time employees who are willing to share the refer opportunities to apply for their companies. By sharing the refer opportunities, the referrers could potentially earn reward from their companies by successfully refer someone.  

Job-seekers are people applying for jobs. They can search for refer opportunities to their target companies on the platform. 

![image.png](https://i.loli.net/2021/09/02/fv6XSG5jdrU3Cxy.png)  
![image.png](https://i.loli.net/2021/09/02/TlFn7f6vt9O5RjD.png)  

### Built With
* Front-end
  * [React](https://reactjs.org/)
  * [TypeScript](https://www.typescriptlang.org/)
  * [Ant Design](https://ant.design/)
  * Misc
    * Redux
    * React Router
    * [Craco](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md)
    * Eslint
    * Prettier
    * Axios
    * [ts-codegen](https://github.com/reeli/ts-codegen)
    * [ClearBit logo API](https://clearbit.com/logo)
    * [less](https://lesscss.org/)

* Back-end
  * Springboot
    * Spring Data JPA
    * Spring Security
    * Redis
  * MySQL
    * MyBatis
    * Flyway
  * AWS
    * S3

* CI/CD
    * Jenkins



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* yarn

```sh
# macOS
$ brew install yarn

# Windows
$ choco install yarn

# CentOS / Fedora / RHEL
$ curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
```

### Installation

1. Clone the repo  

If you are in our GitHub repo: 
```sh
$ git clone https://github.com/ucsdtriplec/effimatch.git
```  
If you are in our GitLab repo:  
```sh
$ git clone https://gitlab.com/ucsd-triple-c/referral-frontend.git
```  

2. Install NPM packages
```bash
# install dependencies
$ yarn
```
2. Build and start the server

```bash
# serve with hot reload at localhost:3000
$ yarn start

# build for production
$ yarn build

# generate api client using ts-codegen
$ yarn api

# check style before committing
$ yarn pre-commit
```

## Maintainence
The repository on GitHub is a mirror of our development repository on GitLab. You can view code and submit issues here. If you want to join the active development team, please [contact](#contact) the tech lead.


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/ucsdtriplec/official-website/issues) for a list of proposed features (and known issues).
<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

This project is licensed under the **GPL-3 license**.  

This means that you may copy, distribute and modify the software as long as you track changes/dates in source files. Any modifications to or software including (via compiler) GPL-licensed code must also be made available under the GPL along with build & install instructions.

<!-- CONTACT -->
## Contact

Dekun Ma (Tech Lead) - William@dekun.me

GitLab Repository Links (for Triple C internal developers): 
- [frontend repo](https://gitlab.com/ucsd-triple-c/referral-frontend)
- [backend repo](https://gitlab.com/ucsd-triple-c/referral-backend)
- [mailer service](https://gitlab.com/ucsd-triple-c/referral-mailer)