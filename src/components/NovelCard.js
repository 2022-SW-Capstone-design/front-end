import React from "react";
import "./NovelCard.css";
import {Card, Container, Button} from'react-bootstrap';
import { Link } from 'react-router-dom';

const NovelCard = ({ data }) => {
    console.log(data);
    return(
        <>
            <Container>
                <Card className="cards">
                    <Card.Img className="cards_Img" variant="top" src={data.coverFileName} />
                    <Card.Body>
                        <Card.Title>{data.title}</Card.Title>
                        {/* <Card.Text>
                        {data.description}
                        </Card.Text> */}
                        <Link to={`/novel-list/writer/novel/${data.title}`} state={{
                            ...data,
                            novelId: data.id,
                        }}>
                        <Card.Text>{data.genre}</Card.Text>
                            <Button variant="success">소설 챕터 목록</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default NovelCard;