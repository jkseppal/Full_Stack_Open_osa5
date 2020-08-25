import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders only title and author', () => {
  const blog = {
    title: 'Testi Blogi',
    author: 'Testimies',
    url: 'http://testiurl.com',
    likes: 5
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Testi Blogi Testimies'
  )
})

test('renders url and likes in full view', () => {
  const blog = {
    title: 'Testi Blogi',
    author: 'Testimies',
    url: 'http://testiurl.com',
    likes: 5
  }

  //const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'http://testiurl.com',
    'likes 5'
  )
})

test('if like clicked twice eventhandler called twice', async () => {
  /*const user = {
    username: 'pekka1',
    name: 'Pekka'
  }*/

  const blog = {
    title: 'Testi Blogi',
    author: 'Testimies',
    url: 'http://testiurl.com',
    likes: 5,
    //user: user
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} addLike={mockHandler} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = screen.getByTestId('like-button')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})