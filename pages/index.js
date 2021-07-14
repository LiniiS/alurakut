import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([{
    id: '6589', 
    title: 'Nietzsche for Speed',
    image: 'https://i.pinimg.com/originals/f5/53/d7/f553d74ba6525c5ae0219be8957c6863.jpg'
  }]);
  const githubUser = 'LiniiS';
 // const comunidades = ['Alurakut'];
  const pessoasFavoritas = [
    'juunegreiros',
     'omariosouto',
      'peas', 
      'marcobrunodev', 
      'patrick-tobias'
    ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid> 
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
        <ProfileSidebar  githubUser={githubUser}/>
        </div>
        <div  className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subtitle">O que você deseja fazer? </h2>
              <form onSubmit={function handleCriaComunidade(e){
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                const comunidade = {
                  id: new Date().toISOString,
                  title: dadosDoForm.get('title'),
                  image: dadosDoForm.get('image'),
                }
                
                const comunidadesAtualizdas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizdas);
              }}>

                <div>
                  <input placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  />
                </div>
                <div>
                  <input placeholder="Coloque uma URL para a capa"
                  name="image"
                  aria-label="Coloque uma URL para a capa"
                  type="text"
                  />
                </div>
                <button>
                  Criar Comunidade
                </button>
              </form>

          </Box>
        </div>
        <div  className="profileRealationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return(
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                      <img src={itemAtual.image}/>
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>    
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return(
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`}/>
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
