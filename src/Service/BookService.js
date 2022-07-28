import Service from './Service';
const Route = 'http://booksapirest.somee.com/api/'
const getFullRoute = (ruta) => (Route + ruta);

export const GetBooksAsync = async () => {
    let ListBooks = [];
    try {
        let Result  = await Service.get(getFullRoute('book'));
        ListBooks = Result.data.data ??= [];
    } catch (error) {
        console.log(error)
    }
    return ListBooks;
}

export const GetBookByIdAsync = async () => {
    try {

    } catch (error) {

    }
}

export const PostBookAsync = async () => {
    try {

    } catch (error) {

    }
}

export const PutBooksAsync = async () => {
    try {

    } catch (error) {

    }
}

export const DeleteBooksAsync = async () => {
    try {

    } catch (error) {

    }
}

export  const fotmatDate = (newDate) => { 
    let date = (newDate instanceof Date) ? new Date(newDate) : new Date();    
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;    
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;      
    let fullDate =  year + '-'+ month + '-' + day ;
    return fullDate;    
  }