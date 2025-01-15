import { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
let books = [
   { id: 1, title: 'Harry Potter', author: 'J.K. Rowling', publishedYear: 1997 ,imgUrl:"https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg"},
   { id: 2, title: 'The Hobbit', author: 'J.R.R. Tolkien', publishedYear: 1937,imgUrl:'https://upload.wikimedia.org/wikipedia/en/3/30/Hobbit_cover.JPG' },
 ];


export const GET=async ()=>{
const data=JSON.stringify(books)
return new Response(data,{status:200})
}
export const POST=async(request:NextRequest):Promise<Response>=>{
 try{
    const newBook=await request.json()
    newBook.id=books.length+1
    books.push(newBook)
    return new Response(JSON.stringify({message:"sucess"}),{status:200})
 }
 catch{
    return new Response(JSON.stringify({message:"error"}), {status:400})
 }

}
export const PUT=async(request:NextRequest):Promise<Response>=>{
    try{
        const updatedBook=await request.json()
        const index=books.findIndex((book)=>book.id===updatedBook.id)
        if(index===-1){
            return new Response(JSON.stringify({message:"book not found"}), {status:404})
        }
        books[index]=updatedBook
        return new Response(JSON.stringify({message:"sucess"}), {status:200})
    }
    catch{
        return new Response(JSON.stringify({message:"error"}), {status:400})
    }
}
// DELETE: Remove a book by ID
export async function DELETE(request: Request) {
   const { searchParams } = new URL(request.url);
   const id = parseInt(searchParams.get('id') || '');
   books = books.filter((book) => book.id !== id);
   return Response.json({ message: 'Book deleted' }, { status: 200 });
 }