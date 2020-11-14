class UserModel
    {
 
        constructor() {

            this._nome = "";
            this._imagem = "";
            this._repositorio = "";
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
            })

            request.open( "GET", "https://api.github.com/users/Marcusvinimf", false);

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

            this._nome = dados.login
            this._imagem = dados.avatar_url
            this._repositorio = dados.repos_url
        }

        getNome()
        {
            return this._nome;
        }

        getImagem()
        {
            return this._imagem;
        }

        getRepositorio()
        {
            return this._repositorio;
        }
    }

    class UserView
    {
        constructor() {}

        render( model )
        {
            let card = document.createElement( "div" );
            
            card.innerHTML = `
                <img src=${ model.getImagem() }>
                <a href=${model.getRepositorio()}>
                <p>${ model.getNome() }</p>
            `
            document.body.appendChild( card );
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
        }
    }
    
    let controller = new UserController();
    
    busca.addEventListener( "click", controller.adicionaUsuario );
