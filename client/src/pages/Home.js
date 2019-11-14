// import react because it must be in the scope when using JSX
// deconstruct Component from the react library so that we can extend component in our class declaration.
import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Book from "../components/Book";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

// utilize the javascript es6 class method in order to declare a class component named Home
// extends Component -> this line allows the Home component to inherit everything that comes with a React component. This includes: state object, component life cycle methods, render() method.
class Home extends Component {
  state = {
    books: [],
    q: "",
    message: "Search For A Book To Begin!"
  };

  // handleInputChange -> A class component that harbors an event function (noted with the: =>) this contains a declared object where the value of: name is updated.
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  // This is a declared function that is bound to a => method where the API is imported
  getBooks = () => {
    API.getBooks(this.state.q)
      .then(res =>
        this.setState({
          books: res.data
        })
      )
      // .catch() method is bound to the setState method with a fat arrow function and will throw an error message if the user's search request did not find any books.
      .catch(() =>
        this.setState({
          books: [],
          message: "No New Books Found, Try a Different Query"
        })
      );
  };

  // handleFormSubmit is a declared event binded to an arrow function and preventDefault prevents the page from refreshing / reloading and it will obtain the books the user inputs into the form.
  handleFormSubmit = event => {
    event.preventDefault();
    this.getBooks();
  };

  // handleBookSave is declared and set to equal to an id band bounded to an arrow function. A variable named book is declared and the concatenated to the state and a find method where book.id is equal to the id.
  handleBookSave = id => {
    const book = this.state.books.find(book => book.id === id);

    // Concatenate API to saveBook function and set the target parameters.
    API.saveBook({
      googleId: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail
    }).then(() => this.getBooks());
  };

  // Render the objects utilizing JSX format.
  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>(React) Google Books Search</strong>
              </h1>
              <h2 className="text-center">Search for and Save Books of Interest.</h2>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <Card title="Book Search" icon="far fa-book">
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Results">
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <Book
                      key={book.id}
                      title={book.volumeInfo.title}
                      subtitle={book.volumeInfo.subtitle}
                      link={book.volumeInfo.infoLink}
                      authors={book.volumeInfo.authors.join(", ")}
                      description={book.volumeInfo.description}
                      image={book.volumeInfo.imageLinks.thumbnail}
                      Button={() => (
                        <button
                          onClick={() => this.handleBookSave(book.id)}
                          className="btn btn-primary ml-2"
                        >
                          Save
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">{this.state.message}</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

// export so the .js file can be used elsewhere.
export default Home;
