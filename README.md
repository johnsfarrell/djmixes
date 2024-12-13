# djmixes

## Architecture

![Architecture](https://github.com/user-attachments/assets/20d2d939-9925-4362-868b-7c9317a5027a)

## Description

As DJ mixes have become a new popular form of content to listen to, people have struggled to find ways to interact with them. In this project, we will create a platform that makes it easy for a DJ to upload and share their mix while also answering the pain points of listeners who want to know what songs are being played and where the transitions are happening.

When a DJ uploads a set performance, an algorithm will be run on the performance to segment it both by song and by transition. It will identify all the songs and transitions and label them. Once this is completed, it will be published on a platform where viewers and listeners can watch the DJ sets. The platform offers fans a dynamic and interactive way to engage with DJ mixes by allowing them to comment, like, and react to specific parts of each mix. Each track would display the DJ's visual performance alongside the music, giving fans a complete multimedia experience. Adding a scrubber bar would allow users to easily navigate the mix, jumping between different transition points or selecting individual songs that were played. This feature would make it simple for fans to find their favorite moments, share them, or leave feedback directly on specific transitions or songs. By interacting with the music and video in this way, fans could foster a stronger connection with the DJ's creative process and engage more deeply with the mix.

In addition to viewing singular mixes, people can browse DJ's profiles and see their other mixes. They will be able to save DJs and mixes and find other similar mixes that they might enjoy.

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

To test services individually, see individual documentation: [Algorithm](algorithm/README.md), [API](api/README.md), [Frontend](frontend/README.md), [Database](database/README.md)

## Documentation

- [Algorithm](algorithm/README.md)
- [API](api/README.md)
- [Frontend](frontend/README.md)
- Design Docs
  - [API Design](design-docs/api-design.md)
  - [Requirements and Specifications](design-docs/reqs-specs.md)
  - [Database Tables](design-docs/db-tables.md)
  - [Algorithm Architecture](design-docs/img/algorithm-arch.png)
  - [API Workflow](design-docs/img/api-flow.png)
  - [Database Design](design-docs/img/db-design.png)
  - [User Interface Workflow](design-docs/img/ui-flow.png)
