import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, addLike }) => {
  const [fullView, setFullView] = useState(false)
  //const [blogi, setBlogi] = useState(null)

  const deleteButton = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (blog.user.username === user.username) {
        return (
          <button id="delete-button" onClick={handleDelete}>remove</button>
        )
      }
    }
  }

  const handleFullViewChange = async (event) => {
    event.preventDefault()
    if (fullView === false) {
      setFullView(true)
    } else {
      setFullView(false)
    }
  }

  const handleLike = async (event) => {
    event.preventDefault()
    const likedBlog = {
      url: blog.url,
      title: blog.title,
      author: blog.author,
      user: blog.user,
      likes: (blog.likes + 1),
      id: blog.id
    }
    //await setBlogi(likedBlog)
    addLike(likedBlog)
    //setBlogi(null)
    //await blogService.update(likedBlog.id, likedBlog)
    //await window.location.reload()
    //(false)
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      blogService.removal(blog.id)
      window.location.reload()
    }
    //window.location.reload()
    //(false)
  }

  if (fullView === false) {
    return (
      <div>
        {blog.title} {blog.author} <button id="view-button" data-testid="view-button" onClick={handleFullViewChange}>view</button>
      </div>
    )
  }
  return (
    <div>
      <p>{blog.title} <button id="hide-button" onClick={handleFullViewChange}>hide</button><br />
        {blog.url}<br />
        likes {blog.likes} <button id="like-button" data-testid="like-button" onClick={handleLike}>like</button><br />
        {blog.author}<br />
        {deleteButton()}</p>
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
