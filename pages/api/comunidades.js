import { SiteClient} from 'datocms-client';

export default async function recebedorDeRequests(request, response){
    if(request.method == 'POST'){
        const TOKEN = 'f81617877d3be8b7c1821b28375174';
        const  client = new SiteClient(TOKEN);
    
        //record do Dato
        //... -> facilita testar
        const registroCriado = await client.items.create({
            itemType: "968025",
            ...request.body,
    
        })
    
        response.json({
            dados: 'dado',
            registroCriado : registroCriado,
        })
        return;
    }
    response.status(404).json({
        message: 'Aguardando o GET, o POST tá indo'
    })
}