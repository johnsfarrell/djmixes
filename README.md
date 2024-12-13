# djmixes

## Architecture

<img width="463" alt="image" src="https://github.com/user-attachments/assets/5cd91ad3-81ad-4c5a-93b5-68e97736c425" />


## Description

As DJ mixes have become a new popular form of content to listen to, people have struggled to find ways to interact with them. In this project, we will create a platform that makes it easy for a DJ to upload and share their mix while also answering the pain points of listeners who want to know what songs are being played and where the transitions are happening.

When a DJ uploads a set performance, an algorithm will be run on the performance to segment it both by song and by transition. It will identify all the songs and transitions and label them. Once this is completed, it will be published on a platform where viewers and listeners can watch the DJ sets. The platform offers fans a dynamic and interactive way to engage with DJ mixes by allowing them to comment, like, and react to specific parts of each mix. Each track would display the DJ's visual performance alongside the music, giving fans a complete multimedia experience. Adding a scrubber bar would allow users to easily navigate the mix, jumping between different transition points or selecting individual songs that were played. This feature would make it simple for fans to find their favorite moments, share them, or leave feedback directly on specific transitions or songs. By interacting with the music and video in this way, fans could foster a stronger connection with the DJ's creative process and engage more deeply with the mix.

In addition to viewing singular mixes, people can browse DJ's profiles and see their other mixes. They will be able to save DJs and mixes and find other similar mixes that they might enjoy.

## Key Features

DJMixes is explicitly built for DJs hoping to express their creativity and create new mixes. For that reason, we have a few key features!

### Splitting and Stemming

<img width="655" alt="image" src="https://github.com/user-attachments/assets/5762301f-a135-49ae-9300-225f82403467" />

When a user uploads a mix, it is passed through our algorithm. Our algorithm will determine when original songs were used in the mix.

More information about the stemming and how to use it on a local machine is [here](algorithm/README.md).

When a user uploads a mix, it is passed through the [Demucs](https://github.com/facebookresearch/demucs) separation model to separate the mix into stems. This allows the the user to listen to separate stem tracks, such as **vocals**, **drums**, **bass**, and **other**. Other refers to any sounds that don't fit into the other three categories.

### Studio Mode

<img width="1269" alt="image" src="https://github.com/user-attachments/assets/17886701-b2df-486d-8711-80758523580f" />


Once a mix has successfully uploaded, a user can enter **studio mode**, and _remix_ the existing mix. They can play with the audio levels of individual segments of stems and rearrange them to create their own mixes! The user also has an export option.

### Song Sharing

<div style={{display: "flex"}}>
  <img width="200" alt="image" src="https://github.com/user-attachments/assets/0475f0b9-6767-4e04-9fc2-501db48f0c90" />
  <img width="200" alt="image" src="https://github.com/user-attachments/assets/cae7cc5d-ba84-4df2-ae29-7fbd2b7c2a92" />
  <img width="200" alt="image" src="https://github.com/user-attachments/assets/d7001863-cded-42d6-9247-5987f0fb8aa8" />
  <img width="200" alt="image" src="https://github.com/user-attachments/assets/10059349-adf8-4a53-ab18-fd5ccf99b13f" />
</div>

Users can choose to upload their own mixes, which will appear on their profile page, and they can show up on others' homepages through the "random mix" feature. The mix details page will show stem and original song details, giving other DJs the ability to learn from others mixes.

<img width="200" alt="image" src="https://github.com/user-attachments/assets/94b29528-d360-409a-b935-1dd5fd606f12" />

Users also have the option to search for songs by title or artist!

## Local Setup

Run with `docker`:

```bash
docker-compose up --build
```

To start just the database:

```bash
docker-compose up --build db
```

Right now, individual services can be run locally. See individual documentation: [Algorithm](algorithm/README.md), [API](server/README.md), [Frontend](client/README.md)

## Testing

To test all services of the application, use the `scripts/test.sh` script. This script will run all tests for the services in the application.

```bash
./scripts/test.sh
```

> Run `chmod +x scripts/test.sh` if having permission errors when running script files.

To test services individually, see individual documentation: [Algorithm](algorithm/README.md), [Server](server/README.md), [Client](client/README.md)

## Documentation

- [Algorithm](algorithm/README.md)
- [Server](server/README.md)
- [Client](client/README.md)
- Design Docs
  - [API Design](design-docs/api-design.md)
  - [Requirements and Specifications](design-docs/reqs-specs.md)
  - [Database Tables](design-docs/db-tables.md)
  - [Algorithm Architecture](design-docs/img/algorithm-arch.png)
  - [API Workflow](design-docs/img/api-flow.png)
  - [Database Design](design-docs/img/db-design.png)
  - [User Interface Workflow](design-docs/img/ui-flow.png)
