<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->


[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  
<img src="https://i.ibb.co/nPQ6zcY/nightly-high-resolution-logo-color-on-transparent-background-1.png" alt="nightly-high-resolution-logo-color-on-transparent-background-1" border="0">

  <p align="center">
   This project is a full-stack web application built using the React framework Next.Js, utilizing TailwindCSS and its utility classes for styling, and MongoDB as the database with Prisma as the ORM. Authentication is handled by Next-Auth, which supports email/password credentials as well as various OAuth providers. Route guarding is implemented to ensure secure access to specific pages. The application enables users to record their dreams and store them as audio files in an Amazon S3 bucket, which are then transcribed using an AI service. Users can edit the transcription and save the dream as a "Wink" in a specific category, and can view their saved "Winks" dating up to a week ago.
    <br />
    <br />
    <br />
    <a href="https://nightlyapp.dev//">View Live</a>
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
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
* [![MongoDB][MongoDB]][Mongo-url]
* [![Next][Next]][Next-url]
* [![Tailwind][Tailwind]][Tailwind-url]
* [![Prisma][Prisma]][Prisma-url]

### Hosted By
* [![Vercel][Vercel]][Vercel-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
Here we go...
<br>
<br>
Next-Auth makes utilizing OAuth seamless! They have a large list of providers that can be added to the project with minimum edits. <a href="https://next-auth.js.org/configuration/providers/oauth">List/Flow</a>
<br>
<br>
You'll just need an ID and Secret key from the providers in this case Google and Github to later store in your .env.local
<br>
<br>
Example
   ```sh
   GITHUB_ID=
   GITHUB_SECRET=
   GOOGLE_ID=
   GOOGLE_SECRET=
   ```
 You'll also need an MONGODB_URL which can be done locally through Compass or online through Mongo's Atlas Service
   ```sh
   DATABASE_URL=mongodb+srv://<USER>:<PASSWORD>@cluster0.m5dfb.mongodb.net/<DATABASE>?retryWrites=true&w=majority
   or
   DATABASE_URL=mongodb://localhost:27017
   ```
You'll also ALSO need your own S3 bucket which can be done right.... <a href="https://aws.amazon.com/s3/">Here!</a> and your own access keys which <a href="https://medium.com/@shamnad.p.s/how-to-create-an-s3-bucket-and-aws-access-key-id-and-secret-access-key-for-accessing-it-5653b6e54337">THIS</a> article can help with.
   ```sh
   S3_UPLOAD_KEY= (YOUR bucket key)
   S3_UPLOAD_SECRET= (YOUR bucket secret key)
   S3_UPLOAD_BUCKET= (YOUR bucket name)
   S3_UPLOAD_REGION= (YOUR bucket region)
   ```

Lastly. You'll need an API key from AssemblyAI which can be found <a href="https://www.assemblyai.com/>here</a>
   ```sh
   S3_UPLOAD_KEY= (YOUR bucket key)
   S3_UPLOAD_SECRET= (YOUR bucket secret key)
   S3_UPLOAD_BUCKET= (YOUR bucket name)
   S3_UPLOAD_REGION= (YOUR bucket region)
   ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/sirpuffin1/nightly.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. CD into dreemurs and start the server
   ```js
   npm run dev
   ```
 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/angel-cruz-50304623b/
[Next]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/docs/getting-started
[Prisma]: 	https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]: https://www.mongodb.com/
[Vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/docs
