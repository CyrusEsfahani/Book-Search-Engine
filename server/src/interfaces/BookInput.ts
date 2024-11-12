export default interface IBookInput {
    authors?: string[] | null;
    description?: string | null;
    title: string | null;
    link?: string | null;
    bookId: string | null;
    image?: string | null;
}