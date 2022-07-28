export class Book {
    id;
    title;
    description;
    pageCount;
    excerpt;
    publishDate;

    constructor({
        id,
        title,
        description,
        pageCount,
        excerpt,
        publishDate
    }) {
        this.id = id ??= 0;
        this.title = title ??= '';
        this.description = description ??= '';
        this.pageCount = pageCount ??= 0;
        this.excerpt = excerpt ??= '';
        this.publishDate = publishDate ??= new Date();
    }
}