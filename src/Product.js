import '../App.css';

import { Col, Card} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Product (props) {
  const {product}=props
  return (
  

    <>
      <Col className="p-3 mb-3" >
        <Card style={{ width: '18rem' }} className="mx-auto">
               <Card.Link href={`/products/${product.id}`} className="text-decoration-none text-dark">
                <Card.Img variant="top" src={product.image} alt={product.name}/>
                <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="m-0">
                  <Rating rating={product.rating} numReview={product.numReview} />
                </Card.Text>
                <Card.Text className="fw-bold m-0"><span className="naira">N</span> {product.price}</Card.Text>
                </Card.Body>
              </Card.Link>
            </Card>
          </Col>

    </>
    
  )
};


function Rating (props){
	const {rating, numReview} = props
	return(
		<>
			<i className={rating >=1?
			 "fa fa-star rate":
			 rating >=0.5? 
			 "fa fa-star-half-o rate": 
			 "fa fa-star-o rate"} />
      <i className={rating >=2? 
      	"fa fa-star rate":
      	rating >=1.5? 
      	"fa fa-star-half-o rate":
      	 "fa fa-star-o rate"} />
      <i className={rating >=3? 
      	"fa fa-star rate":
      	rating >=2.5? 
      	"fa fa-star-half-o rate": 
      	"fa fa-star-o rate"} />
      <i className={rating >=4? 
      	"fa fa-star rate":
      	rating >=3.5? 
      	"fa fa-star-half-o rate": 
      	"fa fa-star-o rate"} />
      <i className={rating >=5? 
      	"fa fa-star rate":
      	rating >=4.5? 
      	"fa fa-star-half-o rate": 
      	"fa fa-star-o rate"} /> 
      <span>{" " + numReview + " reviews"}</span>
		</>


		)
}