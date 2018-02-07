# workshop

## Pre-requisites

```
cd ~/src
git clone https://github.com/wiiee/core.git
cd core/java/core
gradle install
cd ~/src
git clone https://github.com/wiiee/workshop.git
cd workshop
docker-compose up
```

## frontend

```
cd ~/src/workshop/angular/workshop
ng serve --open
```

## backend

```
cd ~/src/workshop/java/workshop
gradle :app:bootRun
```

## mongo client
```
npm install -g mongo-monkey
mongo-monkey
```