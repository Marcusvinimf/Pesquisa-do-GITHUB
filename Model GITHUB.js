class UserModel
    {
 
        constructor() {

            this._nome = "";

            this._repositorio = qual.value;

            this._links = ""

            this._imagem = ""

            this._linguagem = ""

            this._listaDeRepositorios = []
        }

        buscaUsuario()
        {

            let request = new XMLHttpRequest();
            
            request.addEventListener( "load", () =>{
    
                try
                {
                    if ( request.status == 200 )
                    {                
                        let dados = this._processaResponse( request.responseText );

                        this._atualiza( dados );
                    }else{
                        throw new Error("atualize a pagine e tente um nome valido")
                    }
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

            this._imagem = dados[0].owner.avatar_url

            this._listaDeRepositorios = dados

        }

        getRepos()
        {
            return this._listaDeRepositorios;
        }

        getNome()
        {
            return this._nome;
        }

        getImg()
        {
            return this._imagem;
        }

    }

    class UserView
    {
        constructor() {}

        render(dds)
        {

            let body = document.querySelector('body')

            nomeUsuario.innerHTML = `<br> Nome de acesso: ${dds.getNome()}`

            let imgem = document.createElement('div')

            body.appendChild(imgem)

            imgem.innerHTML = `<img src="${dds.getImg()}"><br><br><h2>Lista de Repositorios</h2><br><br>`

            for(let i of dds.getRepos()){

                let link = document.createElement('a'); 
                
                body.appendChild(link); 
                
                link.innerHTML = `Repositorio: <a href="${i.html_url}">${i.name}</a><br>Linguagem: ${i.language}<br><br>`

                console.log(this._links = i.html_url)

            }

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

            busca.style.fontSize = "20px"

            busca.innerHTML = "Pesquisar outro GITHUB";
            busca.onclick = function(){
                document.location.reload(true)
            }
        }
    }
    
    let controller = new UserController();
    
    busca.addEventListener( "click", controller.adicionaUsuario );

    busca.addEventListener( "mouseover", ()=>{
        busca.style.background = "burlywood"
    } );
    busca.addEventListener( "mouseout", ()=>{
        busca.style.background = "white"
    } );

    let logo = document.querySelector('.logo')

    logo.addEventListener( "click", ()=>{
        window.location.href = "https://github.com/"
    } );

    logo.addEventListener( "mouseover", ()=>{
        logo.style.width = "155px"
        logo.style.cursor = "pointer"
    } );
    logo.addEventListener( "mouseout", ()=>{
        logo.style.width = "150px"
        logo.style.cursor = "pointer"
    } );