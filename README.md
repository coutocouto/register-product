# O que é este projeto?

Um projeto que (CRUD) que cadastra e lista produtos


# Tecnologias usadas 
- Node 20
- Nest
- React
- MySQL
- Docker

# Subindo o docker

Use o comando `docker-compose up` e todos os endpoints vao estar disponiveis com isso ja temos a imagem que nos disponibiliza fazer o deploy! 

# Config
As portas usadas são: 
banco =  http://localhost:3306 
frontend = http://localhost:3030
backend = http://127.0.0.1:3001 

# Informações
o usuario padrão e:
email: felipe.couto@claranet.com
senha: @claranet

As imagens dos projetos estão no docker-hub
Caso queira subir separadamente as aplicações user o comando `docker-compose up` estando dentro da pasta do backend para subir o banco, e depois rode `yarn start`
Para subir o frontend basta estar dentro da pasta e rodar `yarn start`
Não se esqueça de instalar as dependencias usando `yarn` em ambas as pastas
