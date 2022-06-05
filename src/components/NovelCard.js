import React from "react";
import "./NovelCard.css";
import { Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NovelCard = ({ data, isWritten }) => {
  return (
    <>
      <Container>
        <Card className="cards">
          <Card.Img
            className="cards_Img"
            variant="top"
            src={data.coverFileName}
          />
          <Card.Body>
            <Card.Title style={{ fontSize: "14px" }}>{data.title}</Card.Title>
            <Link
              to={`/novel-list/writer/novel/${data.title}`}
              state={{
                ...data,
                novelId: data.id,
                isWritten: isWritten,
              }}
            >
              <Card.Text style={{ fontSize: "14px" }}>{data.genre}</Card.Text>
              <Button variant="success" style={{ fontSize: "10px" }}>
                소설 챕터 목록
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default NovelCard;
