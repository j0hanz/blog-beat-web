import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon';
import styles from './styles/Comment.module.css';

const Comment = (props) => {
  const { profile_id, profile_image, owner, updated_at, content } = props;

  return (
    <div>
      <hr />
      <Card className="bg-dark text-white">
        <Card.Body>
          <Row>
            <Col xs={2} className="text-center">
              <Link to={`/profiles/${profile_id}`}>
                <Icon src={profile_image} height={45} />
              </Link>
            </Col>
            <Col xs={10}>
              <div>
                <span className={styles.Owner}>{owner}</span>
                <span className={styles.Date}>{updated_at}</span>
                <p>{content}</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Comment;
