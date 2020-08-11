import React, {useState} from 'react'

const Blog = ({ blog }) => {
  const [fullView, setFullView] = useState(false)

  const handleFullViewChange = async (event) => {
    event.preventDefault()
    if (fullView === false) {
      setFullView(true)
    } else {
      setFullView(false)
    }
  }
  if (fullView === false) {
    return (
      <div>
        {blog.title} {blog.author} <button onClick={handleFullViewChange}>view</button>
      </div>
    )
  }
  return (
    <div>
      <p>{blog.title} <button onClick={handleFullViewChange}>hide</button></p>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button>like</button></p>
      <p>{blog.author}</p>
    </div>
  )
}

/*const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}*/

export default Blog
