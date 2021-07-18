import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
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

function ProfileRelationsBox(propriedades){
  return(
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      {propriedades.title} ({propriedades.items.length})
    </h2>
      <ul>{/*
        {seguidores.map((itemAtual) => {
          return(
            <li key={itemAtual.id}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image}/>
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
  </ProfileRelationsBoxWrapper>   

  )
}

export default function Home(props) {
  const [comunidades, setComunidades] = React.useState([]);
  const githubUser = props.githubUser;
 // const comunidades = ['Alurakut'];
  const pessoasFavoritas = [
    'juunegreiros',
     'omariosouto',
      'peas', 
      'marcobrunodev', 
      'patrick-tobias'
    ]

    
    const [seguidores, setSeguidores] = React.useState([]);
    React.useEffect(function() {
    fetch('https://api.github.com/users/LiniiS/followers')
      .then(function(respostaDoServidor){
        return respostaDoServidor.json();
      })
      .then(function(respostaCompleta) {
        setSeguidores(respostaCompleta);
      })

    //API GraphQL
      fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization': 'f81617877d3be8b7c1821b28375174',
          'Content-Type': 'application/json',
          'Accept':'application/json',
        },
        body: JSON.stringify({"query": `query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
          }
        }` })
      })
      .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        console.log(comunidadesVindasDoDato)
        setComunidades(comunidadesVindasDoDato)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [])

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
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
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  creatorSlug: githubUser,
                }
                
                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)
                })
                .then( async (response) => {
                  const dados = await response.json();
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizdas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizdas);
                })



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
                      <a href={`/communities/${itemAtual.id}`}>
                        <img src={itemAtual.imageUrl}/>
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
          <ProfileRelationsBox title="Seguidores" items ={seguidores}/>   
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context){
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  
  const {isAuthenticated} = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then((resposta) => resposta.json())
  
  if(!isAuthenticated){
    return {
      reditrect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  
  //dps q verificar se está autenticado/existe user
  const { githubUser } = jwt.decode(token);
  return{
    props: {
      githubUser
      //pode trazer outras infos pra carregar
    },
  }
}