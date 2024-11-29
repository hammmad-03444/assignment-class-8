'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useState } from "react"

type Book={
  id:number,
  title:string,
  author:string,
  imgUrl:string,
  publishedYear:number
}

export default  function Home() {
const [books,setBooks]=useState<Book[]>([])
const[formData,setFormData]=useState({
  title:"",
  author:"",
  imgUrl:"",
  publishedYear:"",
})
    
const [editingBook,setEditingBook]=useState<Book|null>(null)

useEffect(()=>{
  fetchBooks()
},[])

const fetchBooks=async()=>{
  const response=await fetch("/api/books")
  const data=await response.json()
  setBooks(data)}

  const addBook=async()=>{
    const response=await fetch("/api/books",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
       ...formData,
       publishedYear:Number(formData.publishedYear)    
      }
        ),
    })
    
    await response.json()
    fetchBooks()
    setFormData({title:"",author:"",imgUrl:"",publishedYear:""})
  }

const updateBook=async(e:React.FormEvent)=>{
  e.preventDefault();
  const response=await fetch(`/api/books`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(editingBook)
  })
  await response.json()
  fetchBooks()
  setEditingBook(null)
}
  const deleteBook=async(id:number)=>{
    const response=await fetch(`/api/books?id=${id}`,{
      method:"DELETE"
    })
    await response.json()
    fetchBooks()
  }
  return(
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Book Manager</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-5 gap-5 container lg:row-span-2  ">
      

        {books.map((book) => (
          <Card  key={book.id} className="h-full w-full max-w-sm mx-auto">
        
                <CardHeader className='p-0 '>
            <div className="aspect-[3/4] relative overflow-hidden">
              <Image
              src={book.imgUrl || "/vercel.svg"}
              alt={book.title}
              fill
              className='object-co rounded-t-lg'/>
            </div>
            </CardHeader>
            <CardContent className="flex items-center  mt-5 justify-around">
            
              <CardTitle className="text-xl"><strong>{book.title}</strong></CardTitle>
               <CardDescription className="text-lg">  by {book.author} ({book.publishedYear})</CardDescription>
               
            </CardContent>
            <CardFooter className='p-6 justify-around flex'>
            
              <Button className='w-1/2 mx-2' variant={'outline'}
                onClick={() => setEditingBook(book)}
              >
                Edit
              </Button>
              <Button className='w-1/2 mx-2' variant={'destructive'}
                onClick={() => deleteBook(book.id)}
              >
                Delete
              </Button>

            </CardFooter>
          
          </Card>
        ))}
      
      </section>
      <form
        className="border p-4 rounded"
        onSubmit={editingBook ? updateBook : addBook}
      >
        <h2 className="text-xl font-bold mb-3">
          {editingBook ? "Edit Book" : "Add a Book"}
        </h2>
        <input
          className="border p-2 mb-3 w-full rounded"
          type="text"
          placeholder="Title"
          value={editingBook?.title || formData.title}
          onChange={(e) =>
            editingBook
              ? setEditingBook({ ...editingBook, title: e.target.value })
              : setFormData({ ...formData, title: e.target.value })
          }
          required
        />
        <input
          className="border p-2 mb-3 w-full rounded"
          type="text"
          placeholder="Image URL"
          value={editingBook?.imgUrl || formData.imgUrl}
          onChange={(e) =>
            editingBook
              ? setEditingBook({ ...editingBook, imgUrl: e.target.value })
              : setFormData({ ...formData, imgUrl: e.target.value })
          }
          required
        />
        
        
        <input
          className="border p-2 mb-3 w-full rounded"
          type="text"
          placeholder="Author"
          value={editingBook?.author || formData.author}
          onChange={(e) =>
            editingBook
              ? setEditingBook({ ...editingBook, author: e.target.value })
              : setFormData({ ...formData, author: e.target.value })
          }
          required
        />
        <input
          className="border p-2 mb-3 w-full rounded"
          type="number"
          placeholder="Published Year"
          value={editingBook?.publishedYear.toString() || formData.publishedYear}
          onChange={(e) =>
            editingBook
              ? setEditingBook({
                  ...editingBook,
                  publishedYear: parseInt(e.target.value),
                })
              : setFormData({ ...formData, publishedYear:e.target.value  })
          }
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {editingBook ? 'Update Book' : 'Add Book'}
        </button>
      </form>
    </div>
  )
  
}
