import Header from "./components/Header";
import PizzeriaNavbar from './components/Navbar';
import CardPizza from "./components/CardPizza";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Col, Row, Container } from "react-bootstrap";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="contenedor">
      <PizzeriaNavbar />
      <Header />
      <Container>
        <Row className="justify-content-between g-4">
          <Col md={3} className="d-flex justify-content-center">
            <CardPizza
              name="Napolitana"
              price={5950}
              ingredients={["mozzarella", "tomates", "jamón", "orégano"]}
              img="https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_cl.jpg?alt=media&token=6a9a33da-5c00-49d4-9080-784dcc87ec2c"
            />
          </Col>
          <Col md={3} className="d-flex justify-content-center">
            <CardPizza
              name="Española"
              price={6950}
              ingredients={["mozzarella", "gorgonzola", "parmesano", "provolone"]}
              img="https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fcheese-164872_640_com.jpg?alt=media&token=18b2b821-4d0d-43f2-a1c6-8c57bc388fab"
            />
          </Col>
          <Col md={3} className="d-flex justify-content-center">
            <CardPizza
              name="Pepperoni"
              price={6950}
              ingredients={["mozzarella", "pepperoni", "orégano"]}
              img="https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_com.jpg?alt=media&token=e7cde87a-08d5-4040-ac54-90f6c31eb3e3"
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default App;