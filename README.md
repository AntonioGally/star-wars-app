<!-- Template from: https://github.com/othneildrew/Best-README-Template -->
<a id="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/AntonioGally/star-wars-app">
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" alt="Logo" width="80">
  </a>

  <h3 align="center">Star Wars App</h3>

  <p align="center">
    Star Wars characters list with filters
    <br />
    <br />
    <a href="https://starwars-app.antoniogally.com/">View Demo</a>
    ·
    <a href="https://github.com/AntonioGally/star-wars-app/issues/new">Report Bug</a>
    ·
    <a href="https://github.com/AntonioGally/star-wars-app/issues/new">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

I used: 
- `react-redux` to state management of filters
- `react-query` to handle all requests
- `shadcn/ui` to help me with components
- `lucide-react` to help me with icons
- `jest` and `react-testing-library` to unit testing
- `tailwind` to help me with styling
- A lot of coffe

Beside all those libraries, the development was quick. I tried to handle errors as much as I could.

The app is simple, but the golden file is in `use-list-data.ts` where I do the filters logic (it wasn't so easy).

The rest of the app is well organized, divided in dumb-components and custom hooks all over. I'm very critical to imports and modularization, so `api` could be a hole module apart if we decided to go with monoRepo for example.

But that's it! I'd love your feedback :D

[![StarWarsApp][product-screenshot]](https://starwars-app.antoniogally.com/)

### Built With

* [![React][React.js]][React-url]


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* node.js
* npm
  
### Installation with Node

1. Clone the repo
   ```sh
   git clone https://github.com/AntonioGally/star-wars-app.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run development build
   ```sh
   npm run dev
   ```
4. Access it in your browser
   ```sh
   http://localhost:5173/
   ```

### Installation with docker

1. Clone the repo
   ```sh
   git clone https://github.com/AntonioGally/star-wars-app.git
   ```
2. run docker-compose up
   ```sh
   docker-compose up --build
   ```
3. Access it in your browser
   ```sh
   http://localhost:3000
   ```


<!-- ROADMAP -->
## Roadmap

- [ ] Add mock authentication with JWT Server
- [ ] Add listing of vehicles, starships and planets
- [ ] Add metrics of characters
- [ ] Enhance requests performance

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->
## Contact

Antonio Gally - antonio.gally@gmail.com

Project Link: [https://starwars-app.antoniogally.com/](https://starwars-app.antoniogally.com/)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/antonio-gally
[product-screenshot]: assets/product_screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/