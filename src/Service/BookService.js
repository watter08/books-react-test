import Service from './Service';
const Route = 'http://booksapirest.somee.com/api/'
const getFullRoute = (ruta) => (Route + ruta);

export const GetBooksAsync = async () => {
    let ListBooks = {HasError : false , Data : [] , Message : ''};
    try {
        let Result = await Service.get(getFullRoute('book'));
        ListBooks = {Data :Result.data.data ??= [] , Message : Result.data.data ? 'Data Encontrada' : 'Data No Encontrada' ,HasError : false};
    } catch (error) {
        ListBooks = {Data :[] , Message : error.message ,HasError : true};
    }
    return ListBooks;
}

export const GetBookByIdAsync = async (id) => {
    let ListBooks = {HasError : false , Data : [] , Message : ''};
    try {
        let Result = await Service.get(getFullRoute(`book/${id}`));
        ListBooks = {Data :Result.data.data ??= [] , Message : Result.data.data ? 'Data Encontrada' : 'Data No Encontrada' ,HasError : false};
    } catch (error) {
        ListBooks = {Data :[] , Message : error.message ,HasError : true};
    }
    return ListBooks;
}

export const PostBookAsync = async (form) => {
    let Resultado =  {Data :[] , Message : '',HasError : true};
    let message = '';
    try {
        let Result = await Service.post(getFullRoute('book'), form);
        if (Result.data.isError)
            throw new Error(Result.data.message)
         Resultado = {Data :[] , Message : Result.data.message ,HasError : false};
    } catch (error) {
        await Object.entries(error.response.data.errors).map(value => {( message += value[1] + ' ' )}).join()
        Resultado = {
            Data :[] ,
            HasError : true,
            Message : message
         };
    }
    return Resultado;
}

export const PutBooksAsync = async (form) => {
    let Resultado =  {Data :[] , Message : '',HasError : true};
    let message = '';
    try {
        let Result = await Service.put(getFullRoute('book'), form);
        if (Result.data.isError)
            throw new Error(Result.data.message)
         Resultado = {Data :[] , Message : Result.data.message ,HasError : false};
    } catch (error) {
        await Object.entries(error.response.data.errors).map(value => {( message += value[1] + ' ' )}).join()
        Resultado = {
            Data :[] ,
            HasError : true,
            Message : message
         };
    }
    return Resultado;
}

export const DeleteBooksAsync = async (id) => {
    let Resultado = {HasError : false , Data : [] , Message : ''};
    try {
        let Result = await Service.delete(getFullRoute(`book/${id}`));
        if (Result.data.isError)
            throw new Error(Result.data.message)
            Resultado = {Data :[] , Message : Result.data.message ,HasError : false};
    } catch (error) {
        Resultado = {Data :[] , Message : error.message ,HasError : true};
    }
    return Resultado;
}

export const fotmatDate = (newDate) => {
    let date = (newDate instanceof Date) ? new Date(newDate) : new Date();
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    let fullDate = year + '-' + month + '-' + day;
    return fullDate;
}