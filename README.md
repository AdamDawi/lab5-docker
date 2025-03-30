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

# Etap drugi w pliku Dockerfile (stage 1 i 2)

### Polecenie do zbudowania obrazu:
```bash
docker build --build-arg VERSION=1.0.1 -f Dockerfile_stage_1_and_2 -t zadanie_2 .
```

### Wynik działania polecenia build:
```
[+] Building 8.2s (16/16) FINISHED                                                                                                                                                                                docker:desktop-linux 
 => [internal] load build definition from Dockerfile_stage_1_and_2                                                                                                                                                                0.0s 
 => => transferring dockerfile: 1.24kB                                                                                                                                                                                            0.0s 
 => [internal] load metadata for docker.io/library/nginx:latest                                                                                                                                                                   0.0s 
 => [internal] load .dockerignore                                                                                                                                                                                                 0.0s 
 => => transferring context: 671B                                                                                                                                                                                                 0.0s 
 => [internal] load build context                                                                                                                                                                                                 0.0s 
 => => transferring context: 151B                                                                                                                                                                                                 0.0s 
 => [stage-1 1/5] FROM docker.io/library/nginx:latest@sha256:124b44bfc9ccd1f3cedf4b592d4d1e8bddb78b51ec2ed5056c52d3692baebc19                                                                                                     0.0s 
 => => resolve docker.io/library/nginx:latest@sha256:124b44bfc9ccd1f3cedf4b592d4d1e8bddb78b51ec2ed5056c52d3692baebc19                                                                                                             0.0s 
 => CACHED [stage-1 2/5] RUN apt update && apt install -y curl nodejs npm                                                                                                                                                         0.0s 
 => CACHED [stage-1 3/5] WORKDIR /usr/app                                                                                                                                                                                         0.0s 
 => CACHED [build-stage 1/6] ADD alpine-minirootfs-3.21.3-aarch64.tar /                                                                                                                                                           0.0s 
 => CACHED [build-stage 2/6] WORKDIR /usr/app                                                                                                                                                                                     0.0s 
 => CACHED [build-stage 3/6] RUN apk add --no-cache nodejs npm                                                                                                                                                                    0.0s 
 => CACHED [build-stage 4/6] COPY ./package.json ./                                                                                                                                                                               0.0s 
 => CACHED [build-stage 5/6] RUN npm install                                                                                                                                                                                      0.0s
 => CACHED [build-stage 6/6] COPY ./index.js ./                                                                                                                                                                                   0.0s
 => CACHED [stage-1 4/5] COPY --from=build-stage /usr/app /usr/app                                                                                                                                                                0.0s
 => CACHED [stage-1 5/5] COPY default.conf /etc/nginx/conf.d/default.conf                                                                                                                                                         0.0s
 => exporting to image                                                                                                                                                                                                            8.0s
 => => exporting layers                                                                                                                                                                                                           0.0s
 => => exporting manifest sha256:7a11ded8b717a99e800efe7a50e959eea4a5956696b10a745d590a628572bf6a                                                                                                                                 0.0s
 => => exporting config sha256:7dfe85cce9393b68c77f297c43cd0c60d3a2250f19ddce2aa5a502f78ef68f53                                                                                                                                   0.0s
 => => exporting attestation manifest sha256:2143cad27cac540d7f839e8c582b9630b5af246f0a71ddee3fe2487d4347d633                                                                                                                     0.0s
 => => exporting manifest list sha256:1da4637486e3023ed226c7462a3340c1fe43442cd2c9ca17fc9a815e63c38f00                                                                                                                            0.0s 
 => => naming to docker.io/library/zadanie_2:latest                                                                                                                                                                               0.0s 
 => => unpacking to docker.io/library/zadanie_2:latest                                                                                                                                                                            7.9s 

View build details: docker-desktop://dashboard/build/desktop-linux/desktop-linux/g8q78wfz3ny7a0rjxu0puqpj8
```

### Polecenie do uruchomienia kontenera:
```bash
docker run -d --rm --name zadanie_2_test -p 80:80 zadanie_2
```
### Wynik działania polecenia run:
```
f8edb21b1cd622fc36137e8169fa60eabfca003f0003072fea4a2b063f8e9638
```

### Polecenie do wyświetlenia uruchomionych kontenerów:
```bash
docker ps
```
### Wynik działania polecenia ps:
```
CONTAINER ID   IMAGE       COMMAND                  CREATED          STATUS                    PORTS                          NAMES
f8edb21b1cd6   zadanie_2   "/docker-entrypoint.…"   46 seconds ago   Up 46 seconds (healthy)   0.0.0.0:80->80/tcp, 8080/tcp   zadanie_2_test
```

### Zdjęcie pokazujące działanie aplikacji webowej:
![Image](https://github.com/user-attachments/assets/afa5ff55-54ed-4597-b52d-16ee7406e610)