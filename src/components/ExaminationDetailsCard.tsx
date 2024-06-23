import React from 'react';
import { Card } from 'react-bootstrap';

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
            <Card  className="text-center">
                <h5>
                    <Card.Header>{examinationType}</Card.Header>
                    <Card.Body>
                        {relevantData ? (
                            typeof relevantData === 'object' ? (
                                <div>
                                    {Object.keys(relevantData).map((key) => (
                                        <div key={key}>
                                            <strong>{key}:</strong> {relevantData[key]}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    {relevantData}
                                </div>
                            )
                        ) : (
                            <div>No data available</div>
                        )}
                    </Card.Body>
                </h5>
            </Card>
        </div>
    );
}

export default ExaminationDetailsCard;
