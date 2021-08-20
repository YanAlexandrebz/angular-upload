# Stage 1: Montar uma imagem node e compilar nosso angular
FROM node:latest as temp

# Definir o diretório em que vamos trabalhar
WORKDIR /usr/local/app

# Adicionar nossos arquivos locais para dentro da imagem
#IMPORTANTE! Deve ser executar de dentro da pasta onde está seu app
COPY ./ /usr/local/app/

# Instalar as dependências
RUN npm install

# Generate the build of the application
RUN npm run build

#Criamos uma imagem com base em node, instalamos as dependências, enviamos nosso código Angular e geramos uma imagem temporária chamada temp

# Stage 2: Criar um web server com nginx
# Vamos pegar nossa imagem base nginx
FROM nginx:latest

# Copiamos o diretório “usr/local/app/dist/sample-angular-app” da imagem #temporária “temp”  para o diretório /usr/share/nginx/html da imagem nginx
COPY --from=build /usr/local/app/dist/sample-angular-app /usr/share/nginx/html

# Abrimos a porta 80, padrão do NGINX
EXPOSE 80