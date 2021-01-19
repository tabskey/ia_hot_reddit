# Reddit API on /artificial subreddit

Registro diário( ás 8 da manhã precisamente) da lista de postagens HOTs no subreddit ***/artificial*** utilizando cronJobs para a tarefa.

Feito usando Mysql2 com uma camada de .env para melhor segurança de acesso ao banco de dados.
Basta utilizar o arquivo *redditapi.sql*  no HeidiSQL ou MySQL para gerar o schema necessário no projeto.
Dentro do arquivo .**env** , altere de acordo com as informações do banco de dados :


     DB_HOST=localhost
    DB_USER=your_user                //seu usuario
    DB_PASS=your_password      //sua senha
    DB_DATABASE=redditapi 
	
A documentação necessária para possíveis comportamentos, você encontra aqui:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/70022362c8d563a7dc9d)

Dentro do arquivo de rotas (***./src/routes.js***) foram criadas as duas rotas pedidas:
#### Post_List
 Essa rota(endpoint) é onde você consegue acessar as postagens de acordo com a escolha da ordem, seja por **Comments_Num** ( número de comentários) ou **Ups_Num** (número de ups) e entre as datas escolhidas, começando pela **StartDate**( data inicial) e terminando pela **EndDate**(data final).
 
 #### Author_List
 Essa rota(endpoint) é onde você consegue acessar aos autores das postagens de acordo com a escolha da ordem, seja por **Comments_Num** ( número de comentários) ou **Ups_Num** (número de ups) 
 
![Robot](https://media0.giphy.com/media/1Mng0gXC5Tpcs/200.webp?cid=ecf05e47ufmp1k0svme8dmz32tyo6pkalxsadiuggn3xk6qb&rid=200.webp "Robot")
.
####  Aspectos extras

Foram usados JEST  para os testes em GET das rotas, além da documentação no *PostMan*,  *Winston* foi usado também na parte de inserção do banco e da tarefa agendada, sendo **error.log ** o arquivo com erros de trajeto e a **combined.log** para tarefas realizadas com sucesso.
Eu queria ter usado Sequelize para a criação do banco automático mas foi algo pensado e não consegui mudar a tempo, preferindo manter os testes e a documentação feitos.

