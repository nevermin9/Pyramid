# Pyramid

You have several options to run webapp.

1. Via node & npm  

for Pyramid back-end  
```
npm run dev
```  

for Pyramid front-end  
```
npm run serve 
```  

2. Via Docker  
- you should build image via

```
docker build -t tag:version ./path/to/Dockerfile
```

- run container(s)

```
docker-compose -f ./path/to/docker-compose.yml up
````

__P.S.__ I have zero experience in real (prod) back-end development (so far)), so I got confused about
`.env`-files and how to work with them properly. Do not judge strictly.
