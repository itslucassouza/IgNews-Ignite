import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { getPrismicClient } from "../../services/prismic"
import { RichText } from 'prismic-dom'

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function Post({ post }: PostProps) {
    return(
        <h1>Teste</h1>
    )
} 

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({req})
    const { slug } = params;


    // if(!session){
    // }

    const prismic = getPrismicClient(req)

    const response = await prismic.getByUID('publication', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }) 
    }

    return{
        props: {
            post,
        }
    }
}   