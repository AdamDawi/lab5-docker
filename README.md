# Etap pierwszy w pliku Dockerfile (stage 1)
### Tworzenie pliku Dockerfile_stage_1:
1. Kopiowanie package.json przed kodem aplikacji (index.js)
    - Docker buforuje warstwę RUN npm install, jeśli package.json pozostaje bez zmian.
    - Dzięki temu, jeśli zostanie zmodyfikowany tylko index.js, ponowna instalacja zależności nie będzie konieczna, co znacząco przyspieszy budowanie obrazu.
    - Każda instrukcja RUN i COPY tworzy nową warstwę – użycie dwóch oddzielnych COPY (najpierw package.json, potem kod aplikacji) zwiększa liczbę warstw, ale pozwala na lepsze wykorzystanie cache, co przyspiesza kolejne budowy obrazu. To kompromis między optymalizacją a elastycznością.

### Polecenie do zbudowania obrazu:
```bash
docker build --build-arg VERSION=1.0.1 -f Dockerfile_stage_1 -t zadanie_1 .
```
### Wynik działania polecenia build:
```
[+] Building 1.9s (10/10) FINISHED                                                                                                                                                                                docker:desktop-linux
 => [internal] load build definition from Dockerfile_stage_1                                                                                                                                                                      0.0s
 => => transferring dockerfile: 638B                                                                                                                                                                                              0.0s
 => [internal] load .dockerignore                                                                                                                                                                                                 0.0s
 => => transferring context: 671B                                                                                                                                                                                                 0.0s
 => [internal] load build context                                                                                                                                                                                                 0.0s
 => => transferring context: 1.92kB                                                                                                                                                                                               0.0s
 => CACHED [1/6] ADD alpine-minirootfs-3.21.3-aarch64.tar /                                                                                                                                                                       0.0s
 => CACHED [2/6] WORKDIR /usr/app                                                                                                                                                                                                 0.0s
 => CACHED [3/6] RUN apk add --no-cache nodejs npm                                                                                                                                                                                0.0s
 => CACHED [4/6] COPY ./package.json ./                                                                                                                                                                                           0.0s
 => CACHED [5/6] RUN npm install                                                                                                                                                                                                  0.0s
 => [6/6] COPY ./index.js ./                                                                                                                                                                                                      0.1s
 => exporting to image                                                                                                                                                                                                            1.6s
 => => exporting layers                                                                                                                                                                                                           0.1s
 => => exporting manifest sha256:126ffebcfb420ff9c8d86bc6585424c1fdf2de569eeb28689a58baff9f94ea61                                                                                                                                 0.0s
 => => exporting config sha256:fd6548265e0357c88f11aeda64cfaf87f73c0bdd7412e871d8117b5caf0e6672                                                                                                                                   0.0s
 => => exporting attestation manifest sha256:965a2e424a47df2642ee8ef4304237b9e59d2b745927db942af8c8cc2db0613b                                                                                                                     0.0s 
 => => exporting manifest list sha256:503ef94b2b6568f04ed942ced269b125609fa7e0f7059667e68c2649a6709ddf                                                                                                                            0.0s 
 => => naming to docker.io/library/zadanie_1:latest                                                                                                                                                                               0.0s 
 => => unpacking to docker.io/library/zadanie_1:latest                                                                                                                                                                            1.3s 

View build details: docker-desktop://dashboard/build/desktop-linux/desktop-linux/vif5ezpwmclv5nqj2xj00egjp
```

### Polecenie do uruchomienia kontenera:
```bash
docker run -d --rm --name zadanie_1_test -p 8080:8080 zadanie_1
```
### Wynik działania polecenia run:
```
c40a3b6b0564bce7b409836767d4462fad7cbb4749810869352a50bbda2000d3
```

### Polecenie do wyświetlenia uruchomionych kontenerów:
```bash
docker ps
```
### Wynik działania polecenia ps:
```
CONTAINER ID   IMAGE       COMMAND       CREATED              STATUS              PORTS                    NAMES
c40a3b6b0564   zadanie_1   "npm start"   About a minute ago   Up About a minute   0.0.0.0:8080->8080/tcp   zadanie_1_test
```

### Zdjęcie pokazujące działanie aplikacji webowej:
![Image](https://github.com/user-attachments/assets/136db71a-4f4a-4119-a8cb-932ceb5c4094)