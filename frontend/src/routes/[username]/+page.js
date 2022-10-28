export async function load({params}) {
    return {
        props: {
            username: params.username
        }
    }
}