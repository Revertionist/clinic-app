import React from 'react';
import { Card, ListGroup, ListGroupItem, Table } from 'react-bootstrap';

interface ExaminationDetailsCardProps {
    ExaminationData: {
        [key: string]: any;
    };
    examinationType: string;
}

const ExaminationDetailsCard: React.FC<ExaminationDetailsCardProps> = (props) => {
    const { ExaminationData, examinationType } = props;
    const relevantData = ExaminationData?.[examinationType];

    return (
        <div>
            <Card className="text-center">

                <Card.Header>{examinationType}</Card.Header>
                <Card.Body>
                    {relevantData ? (
                        typeof relevantData === 'object' ? (
                            <ListGroup>
                                {Object.keys(relevantData).map((key) => (
                                    <ListGroup.Item key={key}>

                                        <strong>{key}:</strong> {relevantData[key]}

                                    </ListGroup.Item>

                                ))}
                                <br />
                            </ListGroup>



                        ) : (
                            <div>
                                <h4>{relevantData}</h4>
                            </div>
                        )
                    ) : (
                        <div>No data available</div>
                    )}
                </Card.Body>

            </Card>
        </div>
    );
}

export default ExaminationDetailsCard;
