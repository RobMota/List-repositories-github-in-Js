import api from './api';

// react-community/create-react-native-app
//react-navigation/react-navigation
//Rocketseat/awesome

class App {
  
  constructor(){
    this.repositories = [];  
    
    //form
    this.formEl = document.getElementById('repo-form');
    
    // entrada de texto
    this.inputEl = document.querySelector('input[name=repository]');

    // UL e li
    this.listEl = document.getElementById('repo-list');
    
    //click do botao
    this.registerHandlers();
  }
  
  registerHandlers(){
    this.formEl.onsubmit = event => this.addRepository(event);
  }
  
  // carregamento do conteudo
  setLoading(loading = true){
    if(loading === true){
      let loadingEl = document.createElement('p')
      loadingEl.appendChild(document.createTextNode("Carregando"))
      loadingEl.setAttribute('id', 'loading')
      
      this.formEl.appendChild(loadingEl);
    }
    else{
      document.getElementById('loading').remove();
    }
  }
  
 async addRepository(event){
    event.preventDefault(); // prefenir que a pagina va para outra ( GET ou POST)
    
    const repoInput = this.inputEl.value;
    if(repoInput.length === 0) 
      return;
    
    this.setLoading();
    
    try{      
      const response = await api.get(`/repos/${repoInput}`);
      
      const {name, description, html_url, owner: { avatar_url} } = response.data; // campos da requisicao do axios
      
      this.repositories.push({
        name,
        description,
        avatar_url,
        html_url,
      });

    this.inputEl.value = ' ';
    this.render(); // img, titulo, descricao, link
    
    }   catch(err){
      alert('O repositorio nao existe');
    }
    
    this.setLoading(false);
  } 
  
  render(){
    this.listEl.innerHTML = ' ';
    
    this.repositories.forEach( repo => {  // para cada requisicao feita ao clicar no botao, trazer os campos
    
    // imagem
      let imgEl = document.createElement('img');
      imgEl.setAttribute('src', repo.avatar_url)
    
    // title
      let titleEl = document.createElement('strong');
      titleEl.appendChild(document.createTextNode(repo.name))
      
    //paragrafo
      let descriptionEl = document.createElement('p');
      descriptionEl.appendChild(document.createTextNode(repo.description))
      
      //link
      let linkEl = document.createElement('a');
      linkEl.setAttribute('target', '_blank');
      linkEl.setAttribute('href', repo.html_url)
      linkEl.appendChild(document.createTextNode('Acessar'))
      
      //adicionando o LI's ao UL
      let listItemEl = document.createElement('li');
      listItemEl.appendChild(imgEl)
      listItemEl.appendChild(titleEl)
      listItemEl.appendChild(descriptionEl)
      listItemEl.appendChild(linkEl)
      
      // insercao dos campos no UL usando o li
      this.listEl.appendChild(listItemEl);
    })
  }
}


new App();