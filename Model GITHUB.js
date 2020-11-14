class UserModel
    {
 
        constructor() {

            this._nome = "";

            this._repositorio = qual.value;

            this._links = ""

            this._imagem = ""

            this._linguagem = ""
        }

        buscaUsuario()
        {

            let request = new XMLHttpRequest();
            
            request.addEventListener( "load", () =>{
    
                if ( request.status == 200 )
                {                
                    let dados = this._processaResponse( request.responseText );

                    this._atualiza( dados );
                }
                
                try
                {
                    if(request.status != 200)
                    throw new Error("coloque nome certo")
                }
                
                catch(error)
                {
                    alert("atualize a pagine e tente um nome valido")
                    document.location.reload(true)
                }
                
            })

            request.open( "GET", "https://api.github.com/users/" + this._repositorio + "/repos", false);

            request.send();
        }

        _processaResponse( responseString )
        {
            let response = JSON.parse( responseString );
            return response
        }

        _atualiza( dados )
        {
            console.log(dados)

            let body = document.querySelector('body')

            this._nome = dados[0].owner.login

            let imgem = document.createElement('div')

            body.appendChild(imgem)

            imgem.innerHTML = `<img src="${dados[0].owner.avatar_url}"><br><br>`


            for(let i of dados){

                // let maisRepo = document.createElement('p');
                
                // body.appendChild(maisRepo);

                // maisRepo.innerHTML = `${i.name}`;

                // console.log(this._nome = i.name) 

                let link = document.createElement('a'); 
                
                body.appendChild(link); 
                
                link.innerHTML = `Repositorio: <a href="${i.html_url}">${i.name}</a><br>Linguagem: ${i.language}<br><br>`

                console.log(this._links = i.html_url) 

            }

        }

        getNome()
        {
            return this._nome;
        }
        // getRepos()
        // {
        //     return this._repositorio;
        // }
        // getLinks()
        // {
        //     return this._links;
        // }
        // getImagem()
        // {
        //     return this._imagem
        // }
    }

    class UserView
    {
        constructor() {}

        render(dds)
        {
            nomeUsuario.innerHTML = dds.getNome()
        }

    }

    class UserController
    {
 
        constructor() {}

        adicionaUsuario()
        {
            
            let user = new UserModel();
            user.buscaUsuario();

            let view = new UserView();
            view.render( user );

            qual.value = ''
            qual.focus()

            let remover = qual.remove()

            busca.innerHTML = "Pesquisar outro GITHUB";
            busca.onclick = function(){
                document.location.reload(true)
            }
        }
    }
    
    let controller = new UserController();
    
    busca.addEventListener( "click", controller.adicionaUsuario );
